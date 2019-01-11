import { calculateInterpolation, calculateValues, calculateResults } from '@/lib/gli-2012';
import gli2012Data from 'gli-2012-data';

describe('gli-2012.js', () => {
  const patient = {
    FEV1: '0.8',
    FEV1FVC: '0.96',
    FVC: '0.5',
    age: '10.1',
    ethnicity: '3',
    gender: 'M',
    height: '140',
  };
  const patientFEV1results = {
    L: 1.0831655110270133,
    Lspline: 0,
    M: 2.025363224409621,
    Mspline: -0.05346,
    S: 0.11190783220961181,
    Sspline: -0.047819999999999994,
    LLN: 1.64943486382004,
    Zscore: -5.233474300036205,
    percPredicted: 39.499087884998715,
  };
  it('should provide a function to calculate the interpolation', () => {
    expect(!!calculateInterpolation).to.equal(true);
  });
  it('should provide a function to calculate the values', () => {
    expect(!!calculateValues).to.equal(true);
  });
  it('should provide a function to aggregate the results', () => {
    expect(!!calculateResults).to.equal(true);
  });
  it('should calculate the interpolation correctly', () => {
    const interpolation = calculateInterpolation(10.10, 10.25, 0.25, 0.5, 0.7);
    expect(interpolation).to.equal(0.3799999999999997);
  });
  it('should calculate the values correctly', () => {
    const values = calculateValues(patient, patient.FEV1, gli2012Data.FEV1);
    expect(values).to.deep.equal(patientFEV1results);
  });
  it('should always returns the results', () => {
    let results = calculateResults(undefined);
    expect(results.FEV1).to.equal(false);
    results = calculateResults({});
    expect(results.FVC).to.equal(false);
    results = calculateResults({ age: null, FEV1FVC: 0.5 });
    expect(results.FEV1FVC).to.equal(false);
  });
  it('should returns the correct results', () => {
    const results = calculateResults(patient);
    expect(results.FEV1).to.deep.equal(patientFEV1results);
    expect(results.FVC).to.not.deep.equal(patientFEV1results);
    expect(results.FEV1FVC).to.not.deep.equal(patientFEV1results);
  });
});
