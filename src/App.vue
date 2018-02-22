<template>
  <!-- Always shows a header, even in smaller screens. -->
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header mdl-layout--no-desktop-drawer-button">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <!-- Title -->
        <span class="mdl-layout-title">
          <img class="logo" src="./assets/gli-logo.jpg" />
          <b>{{ title }}</b>
        </span>
        <!-- Add spacer, to align navigation to the right -->
        <div class="mdl-layout-spacer"></div>
        <!-- Navigation. We hide it in small screens. -->
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a class="mdl-navigation__link" v-for="option in pages" v-bind:href="option.href">
            {{ option.text }}
          </a>
        </nav>
      </div>
    </header>
    <div class="mdl-layout__drawer">
      <span class="mdl-layout-title">
        {{ title }}
      </span>
      <nav class="mdl-navigation">
        <a v-on:click="closeDrawer" class="mdl-navigation__link" v-for="option in pages" v-bind:href="option.href">
          {{ option.text }}
        </a>
      </nav>
    </div>
    <main id="app" class="mdl-layout__content">
      <div class="page-content">
        <router-view/>
      </div>
    </main>
    <disclaimer />
  </div>
</template>

<script>
import Disclaimer from './components/Disclaimer';

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

  .logo {
    float: left;
    height: 64px;
    box-sizing: border-box;
    padding: 4px;
    background: #fff;
    display: block;
  }
  
  .logo + b {
    font-weight: normal;
    margin: 21px 0 0 21px;
    display: inline-block;
  }

  @media only screen and (max-width: 767px) {
    .logo {
      height: 56px;
    }
    
    .logo + b {
      margin: 18px 0 0 18px;
    }
  }
</style>
