<template>
  <RouterView />
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { RouterView } from "vue-router";
@Options({
  components: {
    RouterView
  }
})
export default class App extends Vue {}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  background: #f5efef;
}
</style>
