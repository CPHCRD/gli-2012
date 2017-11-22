import gli2012Data from 'gli-2012-data';

const AGE_DECIMAL_INTERVAL = 0.25;
const LNN_CONSTANT = 1.645;
const DECIMAL_SIZE = 2;

export const calculateInterpolation = (age, age1, ageInterval, spline1, spline2) =>
  spline1 + ((age - age1) / ageInterval) * (spline2 - spline1);

export const calculateValues = (patient, measured, constants) => {
  const { age, height, gender, ethnicity } = patient;
  const { males, females } = constants;
  let coefficients;
  let lookupTable;
  if (gender === 'F') {
    coefficients = females.coefficients;
    lookupTable = females.lookupTable;
  } else {
    coefficients = males.coefficients;
    lookupTable = males.lookupTable;
  }
  // calculate upper and lower age intervals
  // ex: 4.8; upper = 5; lower = 4.75;
  // based on AGE_DECIMAL_INTERVAL (ex: 0.25) and DECIMAL_SIZE (ex: 2; 5.00);
  const upperAge = +(Math.ceil(age * (1 / AGE_DECIMAL_INTERVAL)) / (1 / AGE_DECIMAL_INTERVAL)).toFixed(DECIMAL_SIZE);
  const lowerAge = +(upperAge - AGE_DECIMAL_INTERVAL);
  const upperTable = lookupTable[upperAge];
  const lowerTable = lookupTable[lowerAge];
  // calculate Lspline, Mspline, Sspline variables
  // interpolation based on lookup tables
  const Lspline = calculateInterpolation(age, lowerAge, AGE_DECIMAL_INTERVAL, lowerTable.Lspline, upperTable.Lspline);
  const Mspline = calculateInterpolation(age, lowerAge, AGE_DECIMAL_INTERVAL, lowerTable.Mspline, upperTable.Mspline);
  const Sspline = calculateInterpolation(age, lowerAge, AGE_DECIMAL_INTERVAL, lowerTable.Sspline, upperTable.Sspline);
  // calculate predicted variables
  // L = q0 +q1*ln(Age) + Lspline
  const { q0, q1 } = coefficients.L;
  const L = q0 + q1 * Math.log(age) + Lspline;
  // M =  exp(a0 + a1*ln(Height) + a2*ln(Age) + a3*AfrAm + a4*NEAsia + a5*SEAsia + a6*Other + Mspline)
  const { a0, a1, a2, a3, a4, a5, a6 } = coefficients.M;
  const M = Math.exp(
    a0 +
    (a1 * Math.log(height)) +
    (a2 * Math.log(age)) +
    (a3 * (ethnicity === 2 ? 1 : 0)) +
    (a4 * (ethnicity === 3 ? 1 : 0)) +
    (a5 * (ethnicity === 4 ? 1 : 0)) +
    (a6 * (ethnicity === 5 ? 1 : 0))
    + Mspline);
  // S =  exp(p0 + p1*ln(Age) + p2*AfrAm + p3*NEAsia + p4*SEAsia + p5*Other + Sspline)
  const { p0, p1, p2, p3, p4, p5 } = coefficients.S;
  const S = Math.exp(
    p0 +
    (p1 * Math.log(age)) +
    (p2 * (ethnicity === 2 ? 1 : 0)) +
    (p3 * (ethnicity === 3 ? 1 : 0)) +
    (p4 * (ethnicity === 4 ? 1 : 0)) +
    (p5 * (ethnicity === 5 ? 1 : 0))
    + Sspline);
  // LLN (5th percentile) = exp(ln(1 - 1.645*L*S)/L +ln(M))
  const LNN = Math.exp((Math.log(1 - (LNN_CONSTANT * L * S)) / L) + Math.log(M));
  // Z-score = ((measured/M)^L - 1)/(L·S)
  const Zscore = (((measured / M) ** L) - 1) / (L * S);
  // % predicted = (measured/M) ·100
  const percPredicted = (measured / M) * 100;
  return {
    L,
    Lspline,
    M,
    Mspline,
    S,
    Sspline,
    LNN,
    Zscore,
    percPredicted,
  };
};

export const calculateResults = (patient) => {
  const results = {
    FEV1: false,
    FVC: false,
    FEV1FVC: false,
  };
  if (!patient || Object.keys(patient).length < 1) {
    return results;
  }
  if (!patient.age || !patient.height || !patient.gender || !patient.ethnicity) {
    return results;
  }
  Object.keys(results).forEach((variable) => {
    const patientVariable = patient[variable] || '';
    if (patientVariable !== '') {
      const variableConstants = gli2012Data[variable];
      results[variable] = calculateValues(
        patient, // patient information (age, gender, height, ...)
        patientVariable, // measured variable (FEV1, FVC or FEV1FVC)
        variableConstants, // measure costants (for FEV1, FVC or FEV1FVC)
      );
    }
  });
  return results;
};
