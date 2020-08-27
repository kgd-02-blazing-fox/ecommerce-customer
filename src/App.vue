<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
</script>

<style>
#app {
  font-family: 'Baloo Tamma 2', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #ecf0f1;
}

#nav a.router-link-exact-active {
  color: #222f3e;
}

#nav b {
  font-weight: bold;
  color: #222f3e;
}

#nav b.router-link-exact-active {
  color: #222f3e;
}
</style>
