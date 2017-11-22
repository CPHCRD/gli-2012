<template>
  <div class="about-us">
    <h1 class="mdl-typography--display-3">gli-2012</h1>
    <p class="mdl-color-text--primary mdl-typography--title">calculator</p>
    <div class="about-content">
      <p class="mdl-typography--display-1">Essential Links</p>
      <ul>
        <li><a href="http://gligastransfer.org.au/calcs/index.html" title="Global Lung Function Initiative" target="_blank">GLI homepage</a></li>
        <li><a href="http://www.ers-education.org/guidelines/global-lung-function-initiative/gli-resources.aspx" title="GLI resources" target="_blank">GLI resources</a></li>
        <li><a href="https://github.com/CPHCRD/gli-2012" title="Github gli-2012 repository" target="_blank">Github repository</a></li>
        <li><a href="https://github.com/CPHCRD/gli-2012/issues" title="Github issues" target="_blank">Report an issue</a></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
};
</script>

<style scoped>
.about-us {
  padding-top: 2rem;
}

.about-content {
  padding-top: 2rem;
  margin-top: 3rem;
}

h1 + p {
  margin-top: -2rem;
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
</style>
