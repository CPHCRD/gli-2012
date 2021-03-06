<template>
  <div class="patient-box mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{ title }}</h2>
    </div>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <div style="margin-bottom: 1rem">
        <div v-mdl id="ageInput" class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
          <input v-model="age" class="mdl-textfield__input" type="number" step="0.01" pattern="[0-9]+(\.[0-9]{1,2})?" min="3" max="95">
          <label class="mdl-textfield__label">Age (3-95 years with decimals)</label>
          <span class="mdl-textfield__error">Please specify a valid age between 3.00 and 95.00 years!</span>
        </div>
        <div v-mdl class="mdl-textfield mdl-textfield--compact mdl-textfield--dirty mdl-textfield--floating-label is-dirty">
          <input v-model="birthDate" class="mdl-textfield__input" type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
          <label class="mdl-textfield__label">calculate age from birth date</label>
        </div>
      </div>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="height" class="mdl-textfield__input" type="number" step="0.01" pattern="[0-9]*(\.[0-9]+)?" min="50" max="250">
        <label class="mdl-textfield__label">Height (cm with decimals)</label>
        <span class="mdl-textfield__error">Please specify a valid height between 50.00 and 250.00 centimeters!</span>
      </div>
      <div class="mdl-selectfield">
        <label class="mdl-textfield__label" htmlFor="gender">Gender</label>
        <select v-model="gender" id="gender" class="mdl-selectfield__select">
          <option disabled value="">Select an option</option>
          <option
            v-for="option in genders"
            v-bind:value="option.value"
            v-bind:key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="mdl-selectfield">
        <label class="mdl-textfield__label" htmlFor="ethnicity">Ethnicity</label>
        <select v-model="ethnicity" id="ethnicity" class="mdl-selectfield__select">
          <option disabled value="0">Select an option</option>
          <option
            v-for="option in ethnicities"
            v-bind:value="option.value"
            v-bind:key="option.value"
          >
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <p class="mdl-typography--text-left">Measured values</p>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="FEV1" class="mdl-textfield__input" type="number" step="0.0001" pattern="-?[0-9]*(\.[0-9]+)?" min="0.2" max="9.0">
        <label class="mdl-textfield__label">FEV₁ (L)</label>
        <span class="mdl-textfield__error">Please specify a valid FEV₁ measure in litres! (0.2 ~ 9.0)</span>
      </div>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="FVC" class="mdl-textfield__input" type="number" step="0.0001" pattern="-?[0-9]*(\.[0-9]+)?" min="0.3" max="11.0">
        <label class="mdl-textfield__label">FVC (L)</label>
        <span class="mdl-textfield__error">Please specify a valid FVC measure in litres! (0.3 ~ 11.0)</span>
      </div>
      <div v-show="FEV1FVC !== ''" class="mdl-textfield mdl-textfield--floating-label is-upgraded is-dirty" style="display: none;">
        <input disabled v-model="FEV1FVC" class="mdl-textfield__input" type="number" step="0.0001" pattern="-?[0-9]*(\.[0-9]+)?" min="0.3" max="11.0" style="color: #9e9e9e;">
        <label class="mdl-textfield__label" style="color: #9e9e9e;">FEV₁/FVC (L)</label>
      </div>
    </div>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <p class="mdl-typography--text-left">Optional information</p>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="name" class="mdl-textfield__input" type="text">
        <label class="mdl-textfield__label">Patient name</label>
      </div>
        <div v-mdl class="mdl-textfield mdl-textfield--compact mdl-textfield--dirty mdl-textfield--floating-label is-dirty">
        <input v-model="date" class="mdl-textfield__input" type="date" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}">
        <label class="mdl-textfield__label">Report date</label>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
// generate the query object and call the router
const pushQueryToRouter = (query, $router = {}) => {
  $router.push({ query });
};
const setAttributeToRouteQuery = (attribute, value, $router) => {
  const { currentRoute = {} } = $router;
  const { query: currentQuery = {} } = currentRoute;
  const query = Object.assign({}, currentQuery, {
    [attribute]: value,
  });
  pushQueryToRouter(query, $router);
};
const setAttributesToRouteQuery = (attributes, $router) => {
  const { currentRoute = {} } = $router;
  const { query: currentQuery = {} } = currentRoute;
  const query = Object.assign({}, currentQuery);
  attributes.forEach((attributeValue) => {
    const [attribute, value] = attributeValue;
    Object.assign(query, {
      [attribute]: value,
    });
  });
  pushQueryToRouter(query, $router);
};

export default {
  name: 'PatientInformation',
  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch('update');
    });
  },
  updated() {
    this.$nextTick(() => {
      this.$store.dispatch('update');
    });
  },
  computed: {
    age: {
      get() {
        return this.$store.state.route.query.age || '';
      },
      set(value) {
        const newValue = value === '' ? value : +value;
        setAttributesToRouteQuery([
          ['birthDate', ''],
          ['age', newValue],
        ], this.$router);
      },
    },
    birthDate: {
      get() {
        return this.$store.state.route.query.birthDate || '';
      },
      set(value) {
        document.getElementById('ageInput').classList.remove('is-invalid');
        const birthDate = new Date(value);
        const currentDate = new Date();
        let age = moment.duration(currentDate - birthDate).years();
        if (age < 3) {
          age = 3;
        }
        if (age > 95) {
          age = 95;
        }
        setAttributesToRouteQuery([
          ['birthDate', value],
          ['age', age],
        ], this.$router);
        document.getElementById('ageInput').classList.add('is-dirty');
      },
    },
    height: {
      get() {
        return this.$store.state.route.query.height || '';
      },
      set(value) {
        const newValue = value === '' ? value : +value;
        if (newValue < 50 || newValue > 250) {
          return;
        }
        setAttributeToRouteQuery('height', newValue, this.$router);
      },
    },
    gender: {
      get() {
        return this.$store.state.route.query.gender || '';
      },
      set(value) {
        setAttributeToRouteQuery('gender', value, this.$router);
      },
    },
    ethnicity: {
      get() {
        return this.$store.state.route.query.ethnicity || 0;
      },
      set(value) {
        setAttributeToRouteQuery('ethnicity', value, this.$router);
      },
    },
    FEV1: {
      get() {
        return this.$store.state.route.query.FEV1 || '';
      },
      set(value) {
        const newValue = value === '' ? value : +value;
        if (newValue !== '' && (newValue < 0.2 || newValue > 9.0)) {
          return;
        }
        setAttributeToRouteQuery('FEV1', newValue, this.$router);
      },
    },
    FVC: {
      get() {
        return this.$store.state.route.query.FVC || '';
      },
      set(value) {
        const newValue = value === '' ? value : +value;
        if (newValue !== '' && (newValue < 0.3 || newValue > 11)) {
          return;
        }
        setAttributeToRouteQuery('FVC', newValue, this.$router);
      },
    },
    FEV1FVC: {
      get() {
        const { FEV1, FVC } = this.$store.state.route.query;
        if (FEV1 === '' || FVC === '') {
          return '';
        }
        return (FEV1 / FVC).toFixed(2);
      },
      set(value) {
        return value;
      },
    },
    name: {
      get() {
        return this.$store.state.route.query.name || '';
      },
      set(value) {
        setAttributeToRouteQuery('name', value, this.$router);
      },
    },
    date: {
      get() {
        return this.$store.state.route.query.date || '';
      },
      set(value) {
        setAttributeToRouteQuery('date', value, this.$router);
      },
    },
  },
  data: () => ({
    title: 'Patient Information',
    ethnicities: [
      { text: 'Caucasian', value: 1 },
      { text: 'African American', value: 2 },
      { text: 'North East Asian', value: 3 },
      { text: 'South East Asian', value: 4 },
      { text: 'Other/Mixed', value: 5 },
    ],
    genders: [
      { text: 'Male', value: 'M' },
      { text: 'Female', value: 'F' },
    ],
  }),
};
</script>

<style scoped>
.patient-box {
  margin: 10px 0;
}
.patient-box > .mdl-card__title {
  color: #fff;
  background: #448aff;
}
.patient-box > .mdl-card__menu {
  color: #fff;
}
select {
  font-family: inherit;
  background-color: transparent;
  width: 100%;
  padding: 4px 0;
  font-size: 16px;
  color: rgba(0,0,0, 0.51);
  border: none;
  border-bottom: 1px solid rgba(0,0,0, 0.12);
}
select:focus {
  outline: none;
}
select:disabled {
  color: rgba(0, 0, 0, 0.2);
}
select option.noval {
  color: rgba(0, 0, 0, 0.5);
}
hr {
  border-top: 1px solid rgba(0,0,0,.1);
}
.mdl-selectfield {
  position: relative;
  padding: 10px 0 15px;
  overflow: hidden;
}
.mdl-selectfield select {
  border-radius: 0;
}
.mdl-selectfield label {
  display: block;
  font-size: 12px;
  position: static;
}
.mdl-textfield.is-invalid .mdl-textfield__error {
  background: rgba(255,255,255,0.6);
  z-index: 2;
}
.fieldset[disabled] .mdl-textfield .mdl-textfield__label,
.mdl-textfield.is-disabled.is-disabled .mdl-textfield__label,
.fieldset[disabled] .mdl-textfield .mdl-textfield__input,
.mdl-textfield.is-disabled .mdl-textfield__input {
  color: rgba(96,125,139,0.7);
}
.mdl-textfield--dirty .mdl-textfield__label {
    color: rgb(96,125,139);
    font-size: 12px;
    top: 4px;
    visibility: visible;
}
.mdl-textfield--compact {
  margin-top: -1rem;
  padding-bottom: 0;
}
.mdl-textfield--compact .mdl-textfield__label,
.mdl-textfield--compact .mdl-textfield__input {
  color: gray;
  opacity: 0.9;
  font-size: 75%;
}
</style>
