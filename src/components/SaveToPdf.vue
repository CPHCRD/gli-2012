<template>
  <div title="Download results" v-on:click="download">
    <i class="material-icons">picture_as_pdf</i>
  </div>
</template>

<script>
import moment from 'moment';
import { mapState } from 'vuex';
import JsPDF from 'jspdf';

import gliLogoData from '../assets/gli-logo';

export default {
  name: 'chart',
  computed: mapState({
    data: state => state.route.query,
    results: state => state.results,
  }),
  methods: {
    download: function download() {
      const el = this;
      const leftMargin = 10;
      const titleFont = 24;
      const subTitleFont = 14;
      const textFont = 10;
      const valuesXOffset = 35;
      const blocksYOffset = 10;
      const patientName = el.data.name || 'Patient';
      const reportDate = el.data.date || moment().format('YYYY-MM-DD');
      const doc = new JsPDF();
      // You'll need to make your image into a Data URL
      doc.addImage(gliLogoData, 'JPEG', 155, 10, 40, 18);
      let firstBlockYOffset = 30;
      doc.setFontSize(titleFont);
      doc.text(leftMargin, firstBlockYOffset, patientName);
      firstBlockYOffset += 3;
      doc.line(leftMargin, firstBlockYOffset, 115, 33);
      doc.setFontSize(subTitleFont);
      doc.setTextColor(0, 0, 255);
      doc.textWithLink('GLI-2012 calculator results', leftMargin, 40, { url: window.location.href });
      doc.setTextColor(0, 0, 0);

      let secondBlockYOffset = firstBlockYOffset + blocksYOffset;
      doc.setFontSize(textFont);
      secondBlockYOffset += 10;
      doc.text(leftMargin, secondBlockYOffset, 'Report date');
      doc.text(leftMargin + valuesXOffset, secondBlockYOffset, `${reportDate}`);
      secondBlockYOffset += 5;
      if (el.data.birthDate) {
        doc.text(leftMargin, secondBlockYOffset, 'Birth date');
        doc.text(leftMargin + valuesXOffset, secondBlockYOffset, `${el.data.birthDate}`);
        secondBlockYOffset += 5;
      }
      doc.text(leftMargin, secondBlockYOffset, 'Age');
      doc.text(leftMargin + valuesXOffset, secondBlockYOffset, `${el.data.age} years old`);
      secondBlockYOffset += 5;
      doc.text(leftMargin, secondBlockYOffset, 'Height');
      doc.text(leftMargin + valuesXOffset, secondBlockYOffset, `${el.data.height} cm`);
      secondBlockYOffset += 5;
      doc.text(leftMargin, secondBlockYOffset, 'Gender');
      doc.text(leftMargin + valuesXOffset, secondBlockYOffset, `${el.data.gender}`);
      secondBlockYOffset += 5;
      doc.text(leftMargin, secondBlockYOffset, 'Ethnicity');
      doc.text(leftMargin + valuesXOffset, secondBlockYOffset, `${el.ethnicities[el.data.ethnicity].text}`);
      secondBlockYOffset += 5;

      let thirdBlockYOffset = secondBlockYOffset + blocksYOffset;
      doc.setFontSize(subTitleFont);
      doc.text(leftMargin, thirdBlockYOffset, 'Measured values');
      doc.setFontSize(textFont);
      thirdBlockYOffset += 10;
      const FEV1text = el.data.FEV1 ? `${el.data.FEV1} L` : 'Unavalaible';
      doc.text(leftMargin, thirdBlockYOffset, 'FEV1');
      doc.text(leftMargin + valuesXOffset, thirdBlockYOffset, `${FEV1text}`);
      thirdBlockYOffset += 5;
      const FVCtext = el.data.FVC ? `${el.data.FVC} L` : 'Unavalaible';
      doc.text(leftMargin, thirdBlockYOffset, 'FVC');
      doc.text(leftMargin + valuesXOffset, thirdBlockYOffset, `${FVCtext}`);
      thirdBlockYOffset += 5;
      const FEV1FVCtext = (el.data.FEV1 && el.data.FVC) ? `${(el.data.FEV1 / el.data.FVC).toFixed(2)} L` : 'Unavalaible';
      doc.text(leftMargin, thirdBlockYOffset, 'FEV1FVC');
      doc.text(leftMargin + valuesXOffset, thirdBlockYOffset, `${FEV1FVCtext}`);
      thirdBlockYOffset += 5;

      let forthBlockYOffset = thirdBlockYOffset + blocksYOffset;
      doc.setFontSize(subTitleFont);
      doc.text(leftMargin, forthBlockYOffset, 'Results');
      doc.setFontSize(textFont);
      forthBlockYOffset += 10;
      Object.keys(el.results).forEach((resultName) => {
        const result = el.results[resultName];
        if (result !== false) {
          doc.setFontType('bold');
          doc.text(leftMargin, forthBlockYOffset, resultName);
          doc.setFontType('normal');
          forthBlockYOffset += 5;
          doc.text(leftMargin, forthBlockYOffset, 'Predicted');
          doc.text(leftMargin + valuesXOffset, forthBlockYOffset, `${result.M.toFixed(2)}`);
          forthBlockYOffset += 5;
          doc.text(leftMargin, forthBlockYOffset, 'LLN');
          doc.text(leftMargin + valuesXOffset, forthBlockYOffset, `${result.LLN.toFixed(2)}`);
          forthBlockYOffset += 5;
          doc.text(leftMargin, forthBlockYOffset, 'Z score');
          doc.text(leftMargin + valuesXOffset, forthBlockYOffset, `${result.Zscore.toFixed(2)}`);
          forthBlockYOffset += 5;
          doc.text(leftMargin, forthBlockYOffset, '% predicted');
          doc.text(leftMargin + valuesXOffset, forthBlockYOffset, `${result.percPredicted.toFixed(0)}%`);
          forthBlockYOffset += 10;
        }
      });
      doc.save(`gli-2012-${patientName.replace(' ', '-').toLowerCase()}-${reportDate}.pdf`);
    },
  },
  data: () => ({
    ethnicities: {
      1: { text: 'Caucasian', value: 1 },
      2: { text: 'African American', value: 2 },
      3: { text: 'North East Asian', value: 3 },
      4: { text: 'South East Asian', value: 4 },
      5: { text: 'Other/Mixed', value: 5 },
    },
    genders: [
      { text: 'Male', value: 'M' },
      { text: 'Female', value: 'F' },
    ],
  }),
};
</script>

<style scoped>
</style>
