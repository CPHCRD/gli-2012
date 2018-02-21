<template>
  <div class="mdl-grid">
    <div class="calculator-container mdl-cell mdl-cell--12-col">
      <patient />
      <results />
    </div>
    <a class="logo" href="http://www.ers-education.org/guidelines/global-lung-function-initiative.aspx" target="_blank">
      <img src="../assets/gli-logo.jpg" />
    </a>
  </div>
</template>

<script>
import Patient from './Patient';
import Results from './Results';

export default {
  name: 'Calculator',
  components: {
    Patient,
    Results,
  },
};
</script>

<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.calculator-container .result-box,
.calculator-container .patient-box {
  display: block;
  float: left;
}

.calculator-container .patient-box {
  min-width: 250px;
  width: 30%;
}

.calculator-container .result-box {
  max-width: 800px;
  margin-left: 20px;
  width: 60%;
}

.logo {
  margin: -5rem 2rem 2rem auto;
  float: right;
  height: 5rem;
}

.logo img {
  height: 100%;
}

@media only screen and (max-width: 767px) {
  .calculator-container .patient-box,
  .calculator-container .result-box {
    float: none;
    max-width: 330px;
    width: 90%;
    margin: 20px auto 40px;
  }
  .logo {
    margin-top: 0;
  }
}
</style>
