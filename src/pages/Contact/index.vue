<template>
  <div class="contactWrap">
    <NavBar title="Contact" />
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { NavBar } from "vant";
@Options({
  components: {
    NavBar
  }
})
export default class Contact extends Vue {}
</script>

<style scoped></style>
