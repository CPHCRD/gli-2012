<template>
  <div class="patient-box mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{ title }}</h2>
    </div>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="age" class="mdl-textfield__input" type="number" step="0.01" pattern="[0-9]+(\.[0-9]{1,2})?" min="3" max="95">
        <label class="mdl-textfield__label">Age (3-95 years with decimals)</label>
        <span class="mdl-textfield__error">Please specify a valid age between 3.00 and 95.00 years!</span>
      </div>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="height" class="mdl-textfield__input" type="number" step="0.01" pattern="[0-9]*(\.[0-9]+)?" min="50" max="250">
        <label class="mdl-textfield__label">Height (cm)</label>
        <span class="mdl-textfield__error">Please specify a valid height between 50.00 and 250.00 centimeters!</span>
      </div>
      <div class="mdl-selectfield">
        <label class="mdl-textfield__label" htmlFor="gender">Gender</label>
        <select v-model="gender" id="gender" class="mdl-selectfield__select">
          <option disabled value="">Select an option</option>
          <option v-for="option in genders" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="mdl-selectfield">
        <label class="mdl-textfield__label" htmlFor="ethnicity">Ethnicity</label>
        <select v-model="ethnicity" id="ethnicity" class="mdl-selectfield__select">
          <option disabled value="0">Select an option</option>
          <option v-for="option in ethnicities" v-bind:value="option.value">
            {{ option.text }}
          </option>
        </select>
      </div>
    </div>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <p class="mdl-typography--text-left">Measured values</p>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="FEV1" class="mdl-textfield__input" type="number" step="0.0001" pattern="-?[0-9]*(\.[0-9]+)?" min="0.2" max="9.0">
        <label class="mdl-textfield__label">FEV₁</label>
        <span class="mdl-textfield__error">Please specify a valid FEV₁ measure in litres! (0.2 ~ 9.0)</span>
      </div>
      <div v-mdl class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input v-model="FVC" class="mdl-textfield__input" type="number" step="0.0001" pattern="-?[0-9]*(\.[0-9]+)?" min="0.3" max="11.0">
        <label class="mdl-textfield__label">FVC</label>
        <span class="mdl-textfield__error">Please specify a valid FVC measure in litres! (0.3 ~ 11.0)</span>
      </div>
    </div>
  </div>
</template>

<script>
// generate the query object and call the router
const setAttributeToRouteQuery = (attribute, value, $router = {}) => {
  const { currentRoute = {} } = $router;
  const { query: currentQuery = {} } = currentRoute;
  const query = Object.assign({}, currentQuery, {
    [attribute]: value,
  });
  $router.push({ query });
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
        if (newValue < 3 || newValue > 95) {
          return;
        }
        setAttributeToRouteQuery('age', newValue, this.$router);
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
  z-index: 1;
}
</style>
