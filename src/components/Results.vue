<template>
  <div class="result-box mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{ title }}</h2>
    </div>
    <hr/>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <div v-if="valid">
        <div v-if="vars" class="result-box-results" v-for="vars,varName in results">
          <h5 class="mdl-color-text--accent">{{ varNames[varName] }}</h5>
          <table class="mdl-data-table mdl-shadow--2dp">
            <tbody>
              <tr v-bind:title="vars.L">
                <td class="mdl-data-table__cell--non-numeric">L</td>
                <td>{{ vars.L.toFixed(4) }}</td>
              </tr>
              <tr v-bind:title="vars.M">
                <td class="mdl-data-table__cell--non-numeric">Predicted (M)</td>
                <td>{{ vars.M.toFixed(4) }}</td>
              </tr>
              <tr v-bind:title="vars.S">
                <td class="mdl-data-table__cell--non-numeric">S</td>
                <td>{{ vars.S.toFixed(4) }}</td>
              </tr>
              <tr v-bind:title="vars.LNN">
                <td class="mdl-data-table__cell--non-numeric">LNN</td>
                <td>
                  <div>{{ vars.LNN.toFixed(4) }}</div>
                </td>
              </tr>
              <tr v-bind:title="vars.Zscore">
                <td class="mdl-data-table__cell--non-numeric"><strong>Z score</strong></td>
                <td><strong>{{ vars.Zscore.toFixed(4) }}</strong></td>
              </tr>
              <tr v-bind:title="vars.percPredicted">
                <td class="mdl-data-table__cell--non-numeric"><strong>% predicted</strong></td>
                <td><strong>{{ vars.percPredicted.toFixed(2) }}%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <p><i>{{ note }}</i></p>
        <chart :results="results" />
      </div>
      <p v-else>{{ invalidText }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from './Chart';

export default {
  name: 'Results',
  components: {
    Chart,
  },
  computed: mapState({
    valid: state => state.valid,
    results: state => state.results,
  }),
  data: () => ({
    title: 'Results',
    note: 'NOTE: Results are displayed with 0.0001 precision. Move your mouse over the table rows to see the full precision number.',
    invalidText: 'Provide the patient age, height, gender, ethnicity and at least one measured value.',
    varNames: {
      FEV1: 'FEV₁',
      FVC: 'FVC',
      FEV1FVC: 'FEV₁/FVC',
    },
  }),
};
</script>

<style scoped>
h3 {
  float: none;
}
.result-box {
  margin: 10px 0;
}
.result-box hr {
  margin: 0;
}
.result-box-results {
  float: left;
  margin: 0 1rem 1rem 0;
}
.result-box-results + p {
  display: block;
  clear: left;
}
</style>
