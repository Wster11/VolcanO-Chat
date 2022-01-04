<template>
  <div class="userWrap">
    <span>我的</span>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
@Options({
  props: {
    name: String
  }
})
export default class Contact extends Vue {}
</script>

<style scoped></style>
