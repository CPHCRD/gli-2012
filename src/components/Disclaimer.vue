<template>
  <dialog v-mdl class="mdl-dialog">
    <h4 class="mdl-dialog__title">Disclaimer</h4>
    <div class="mdl-dialog__content">
      <p>The equations and look-up tables are freely available for software implementation by IT engineers and medical device companies.</p>
      <p>The GLI software packages are to be used for research, education, training and validation of implementation in software, and not for use in patient treatment.</p>
      <p>For treatment/diagnostic purposes, please use the GLI reference equations as implemented by medical device companies.</p>
    </div>
    <div class="mdl-dialog__actions">
      <button type="button" class="mdl-button close">I understand</button>
    </div>
  </dialog>
</template>

<script>
import { mapState } from 'vuex';

let dialog;

export default {
  name: 'disclaimer',
  computed: mapState(['ready']),
  mounted: () => {
    dialog = document.querySelector('dialog');
    if (!dialog.showModal) {
      window.dialogPolyfill.registerDialog(dialog);
    }
    dialog.querySelector('.close').addEventListener('click', () => {
      dialog.close();
    });
  },
  watch: {
    ready(val) {
      if (val === true) {
        setTimeout(() => {
          dialog.showModal();
        }, 1000);
      }
    },
  },
};
</script>

<style scoped>
  dialog {
    z-index: 99;
    width: 70%;
    min-width: 320px;
    max-width: 640px;
  }
</style>
