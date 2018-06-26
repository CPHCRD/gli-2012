<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-desktop-drawer-button">
    <header class="mdl-layout__header" v-show="target === 'desktop'">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">{{ title }}</span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a
            class="mdl-navigation__link"
            v-for="option in pages"
            v-bind:href="option.href"
            v-bind:key="option.href"
          >
            {{ option.text }}
          </a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer" v-show="target === 'desktop'">
      <span class="mdl-layout-title">{{ title }}</span>
      <nav class="mdl-navigation">
        <a
          v-on:click="closeDrawer"
          class="mdl-navigation__link"
          v-for="option in pages"
          v-bind:href="option.href"
          v-bind:key="option.href"
        >
          {{ option.text }}
        </a>
      </nav>
    </div>
    <main id="app" class="mdl-layout__content">
      <div class="page-content">
        <router-view/>
      </div>
    </main>
    <disclaimer v-show="target === 'desktop'" />
  </div>
</template>

<script>
import Disclaimer from './components/Disclaimer';

const target = process.env.TARGET || 'desktop';

export default {
  name: 'app',
  components: {
    Disclaimer,
  },
  methods: {
    closeDrawer() {
      document.querySelector('.mdl-layout').MaterialLayout.toggleDrawer();
    },
  },
  data: () => ({
    title: 'GLI-2012 calculator',
    target,
    pages: [{
      text: 'Calculator',
      href: '#/',
    }, {
      text: 'About',
      href: '#/about',
    }, {
      text: 'Github',
      href: 'https://github.com/CPHCRD/gli-2012',
    }],
  }),
};
</script>

<style scoped>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
