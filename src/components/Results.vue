<template>
  <div class="result-box mdl-card mdl-shadow--2dp">
    <div class="mdl-card__title">
      <h2 class="mdl-card__title-text">{{ title }}</h2>
      <div class="loading-box">
        <save-to-pdf class="loading-box-pdf" />
        <i class="loading-box-refresh material-icons">refresh</i>
        <i class="loading-box-success material-icons" v-on:click="refresh"><span class="normal">check_circle</span><span class="hover">refresh</span></i>
      </div>
    </div>
    <hr/>
    <div class="mdl-card__supporting-text mdl-typography--text-left">
      <div v-if="valid">
        <p>These results are re-calculated automatically when you update the patient information.</p>
        <div v-if="vars" class="result-box-results" v-for="vars,varName in results">
          <h5 v-bind:class="'mdl-color-text--'+varName">{{ varNames[varName] }}</h5>
          <table class="mdl-data-table mdl-shadow--2dp">
            <tbody>
              <tr v-if="debug" v-bind:title="vars.L">
                <td class="mdl-data-table__cell--non-numeric">L</td>
                <td>{{ vars.L.toFixed(2) }}</td>
              </tr>
              <tr v-bind:title="vars.M">
                <td class="mdl-data-table__cell--non-numeric">Predicted<span v-if="debug"> (M)</span></td>
                <td>{{ vars.M.toFixed(2) }}</td>
              </tr>
              <tr v-if="debug" v-bind:title="vars.S">
                <td class="mdl-data-table__cell--non-numeric">S</td>
                <td>{{ vars.S.toFixed(2) }}</td>
              </tr>
              <tr v-bind:title="vars.LNN">
                <td class="mdl-data-table__cell--non-numeric">LNN</td>
                <td>
                  <div>{{ vars.LNN.toFixed(2) }}</div>
                </td>
              </tr>
              <tr v-bind:title="vars.Zscore">
                <td class="mdl-data-table__cell--non-numeric"><strong>Z score</strong></td>
                <td><strong>{{ vars.Zscore.toFixed(2) }}</strong></td>
              </tr>
              <tr v-bind:title="vars.percPredicted">
                <td class="mdl-data-table__cell--non-numeric"><strong>% predicted</strong></td>
                <td><strong>{{ vars.percPredicted.toFixed(0) }}%</strong></td>
              </tr>
            </tbody>
          </table>
        </div>
        <br clear="both"/>
        <chart :results="results" />
      </div>
      <p v-else>{{ invalidText }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Chart from './Chart';
import SaveToPdf from './SaveToPdf';

export default {
  name: 'Results',
  components: {
    Chart,
    SaveToPdf,
  },
  computed: mapState({
    valid: state => state.valid,
    results: state => state.results,
    debug: state => state.debug,
  }),
  methods: {
    refresh: function refresh() {
      const { valid } = this;
      if (valid === true) {
        document.querySelector('.loading-box').classList.add('loading-box--valid');
        document.querySelector('.loading-box').classList.add('loading-box--active');
        setTimeout(() => {
          document.querySelector('.loading-box').classList.remove('loading-box--active');
        }, 500);
      } else {
        document.querySelector('.loading-box').classList.remove('loading-box--valid');
      }
    },
  },
  watch: {
    results: function results() {
      this.refresh();
    },
  },
  data: () => ({
    title: 'Results',
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
.mdl-card__title {
  justify-content: space-between;
}
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
.loading-box {
  color: rgb(96,125,139);
}
.mdl-color-text--FEV1 {
  color: rgb(33, 150, 243);
}
.mdl-color-text--FVC {
  color: rgb(156, 39, 176);
}
.mdl-color-text--FEV1FVC {
  color: rgb(63, 81, 181);
}
.loading-box-refresh {
	animation: rotation 0.5s infinite linear;
	-webkit-animation: rotation 0.5s infinite linear;
}
.loading-box .loading-box-success,
.loading-box .loading-box-pdf,
.loading-box .loading-box-refresh {
  display: none;
}
.loading-box .loading-box-success .hover {
  display: none;
}
.loading-box .loading-box-success:hover .normal {
  display: none;
}
.loading-box .loading-box-success:hover .hover {
  display: block;
}
.loading-box.loading-box--valid .loading-box-success,
.loading-box.loading-box--valid .loading-box-pdf {
  display: inline-block;
  cursor: pointer;
}
.loading-box.loading-box--valid.loading-box--active .loading-box-success,
.loading-box.loading-box--valid.loading-box--active .loading-box-pdf {
  display: none;
}
.loading-box.loading-box--active .loading-box-refresh {
  display: inline-block;
}
@-keyframes rotation {
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(359deg);
	}
}
@-webkit-keyframes rotation {
	from {
		-webkit-transform: rotate(0deg);
	}
	to {
		-webkit-transform: rotate(359deg);
	}
}
</style>
