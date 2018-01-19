<template>
  <div>
    <div class="graph-container mdl-color--primary">
      <div>
        <div class="graph-section mdl-color--primary" v-for="interval in graphIntervals" v-bind:style="{
            left: `${(interval.x * 10)}%`,
            width: `${interval.width * 10}%`
          }"
        >
          <div class="graph-section-label">{{ interval.label }}</div>
        </div>
      </div>
      <div>
        <div
          class="graph-section graph-section--area"
          v-bind:title="interval.title"
          v-for="interval in graphLimitIntervals"
          v-bind:style="{
            left: `${(interval.x * 10)}%`,
            width: `${interval.width * 10}%`
          }"
        >
          <div class="graph-section-label graph-section-label--level-one">{{ interval.label }}</div>
        </div>
      </div>
      <div>
        <div
        class="graph-section graph-section--area"
        v-bind:title="interval.title"
        v-for="interval in graphNormalIntervals"
        v-bind:style="{
            left: `${(interval.x * 10)}%`,
            width: `${interval.width * 10}%`
          }"
        >
          <div class="graph-section-label graph-section-label--level-two">{{ interval.label }}</div>
        </div>
      </div>
      <div
        class="graph-result-bar"
        v-for="result,varName in results"
        v-bind:class="'graph-result-bar--' + varName"
        v-bind:title="result.Zscore"
        v-bind:style="{
          left: `${(calculateResultOffset(result.Zscore) * 10)}%`,
        }"
        v-if="result !== false"
      >
        <div class="graph-result-label">{{ varNames[varName] }}</div>
      </div>
    </div>
    <div class="graph-legend">
      <div
        class="graph-legend-item"
        v-for="result,varName in results"
        v-if="result !== false"
      >
        <div class="graph-legend-bar" v-bind:class="'graph-legend-bar--' + varName"></div>
        <div class="graph-legend-label">{{ varNames[varName] }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'chart',
  props: {
    results: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    calculateOffset(size) {
      const { viewSize } = this;
      return viewSize - size;
    },
    graphCustomIntervals(size, label = true) {
      const { viewSize } = this;
      const offset = this.calculateOffset(size);
      return [{
        x: offset,
        width: viewSize - offset,
        z: -size,
        label: label ? -size : '',
        title: `${-size}`,
      }, {
        x: viewSize,
        width: viewSize - offset,
        z: size,
        label: label ? size : '',
        title: `${size}`,
      }];
    },
    calculateResultOffset(value) {
      const { viewSize } = this;
      // z < -5 = -5
      if (viewSize + value < 0) {
        return 0;
      }
      // z > 5 = 5
      if (viewSize - value < 0) {
        return viewSize * 2;
      }
      // -5 < z < +5
      return viewSize + value;
    },
  },
  computed: {
    viewMargin() {
      return this.size / 4;
    },
    viewSize() {
      return this.size + this.viewMargin;
    },
    graphIntervals() {
      const { viewMargin, viewSize } = this;
      return [{
        x: 0,
        width: viewMargin,
        z: -viewSize,
        label: '',
      }, {
        x: viewMargin,
        width: viewMargin * 2,
        z: -viewSize + viewMargin,
        label: -viewSize + viewMargin,
      }, {
        x: viewMargin + viewMargin * 2,
        width: viewMargin * 2,
        z: -viewSize + viewMargin + viewMargin * 2,
        label: '',
      }, {
        x: viewMargin + viewMargin * 4,
        width: viewMargin * 2,
        z: -viewSize + viewMargin + viewMargin * 4,
        label: -viewSize + viewMargin + viewMargin * 4,
      }, {
        x: viewMargin + viewMargin * 6,
        width: viewMargin * 2,
        z: -viewSize + viewMargin + viewMargin * 6,
        label: '',
      }, {
        x: viewMargin + viewMargin * 8,
        width: viewMargin,
        z: -viewSize + viewMargin + viewMargin * 8,
        label: -viewSize + viewMargin + viewMargin * 8,
      }];
    },
    graphNormalIntervals() {
      return this.graphCustomIntervals(this.normalSize);
    },
    graphLimitIntervals() {
      return this.graphCustomIntervals(this.limitSize);
    },
  },
  data: () => ({
    size: 4,
    normalSize: 1.64,
    limitSize: 1.96,
    varNames: {
      FEV1: 'FEV₁',
      FVC: 'FVC',
      FEV1FVC: 'FEV₁/FVC',
    },
  }),
};
</script>

<style scoped>
  .graph-container {
    position: relative;
    width: 90%;
    height: 3rem;
    margin: 4rem auto;
    border: 1px solid #333;
  }
  .graph-container::after {
    content: "";
    display: block;
    overflow: hidden;
    clear: both;
  }
  .graph-section {
    background: rgba(255, 255, 255, .54);
    position: absolute;
    top: 0;
    bottom: 0;
  }
  /*.graph-section.mdl-color--primary {
    background: #f44336 !important;
  }*/
  /*.graph-section::before,
  .graph-section + .graph-section::after {
    display: block;
    content: "";
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.2);
    width: 1px;
  }*/
  .graph-section::before {
    left: 0;
  }
  .graph-section:first-child::before {
    display: none;
  }
  .graph-section:last-child::after {
    display: none;
  }
  .graph-section-label {
    position: absolute;
    left: -1.3rem;
    bottom: -1.3rem;
    font-size: 0.7rem;
    width: 2rem;
    text-align: center;
  }
  .graph-section-label--level-one {
    left: -1.5rem;
  }
  .graph-section-label--level-two {
    left: -0.5rem;
  }
  .graph-section--area + .graph-section--area .graph-section-label--level-one {
    left: auto;
    right: -1.4rem;
  }
  .graph-section--area + .graph-section--area .graph-section-label--level-two {
    left: auto;
    right: -0.6rem;
  }
  .graph-result-bar {
    position: absolute;
    background: white;
    border: 1px solid black;
    margin-left: -1px;
    width: 3px;
    top: -4px;
    bottom: -4px;
    transition: 1s;
    box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25);
  }
  .graph-result-bar--FEV1,
  .graph-legend-bar--FEV1 {
    background-color: rgba(33, 150, 243, 0.75)
  }
  .graph-result-bar--FVC,
  .graph-legend-bar--FVC {
    background-color: rgba(156, 39, 176, 0.75);
  }
  .graph-result-bar--FEV1FVC,
  .graph-legend-bar--FEV1FVC {
    background-color: rgba(63, 81, 181, 0.75);
  }
  .graph-result-label {
    display: none;
    color: black;
    position: absolute;
    font-size: 0.8rem;
    width: 4rem;
    text-align: center;
    top: -1.7rem;
    left: -2rem;
  }
  .graph-legend-item {
    margin-bottom: 0.25rem;
  }
  .graph-legend-label {
    display: inline-block;
    font-size: 0.8rem;
  }
  .graph-legend-bar {
    display: inline-block;
    border: 1px solid black;
    width: 3rem;
    height: 4px;
    box-shadow: -1px -1px 0px rgba(0, 0, 0, 0.25);
  }
</style>
