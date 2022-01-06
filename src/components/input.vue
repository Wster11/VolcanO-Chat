<template>
  <div class="inputWrap">
    <contenteditable
      class="input"
      tag="div"
      v-model="ipt.txt"
      :noHTML="false"
      :noNL="true"
      @returned="ipt.handleEnter"
      placeholder="请输入"
    />
  </div>
</template>

<script lang="ts">
import contenteditable from "vue-contenteditable";
import { Options, Vue, setup } from "vue-class-component";
import { ref } from "vue";
@Options({
  emits: ["send"],
  components: {
    contenteditable
  }
})
export default class Contact extends Vue {
  ipt = setup(() => {
    const txt = ref("");

    const handleEnter = () => {
      this.$emit("send", txt.value);
    };

    const clear = () => {
      txt.value = "";
    };

    return {
      txt,
      handleEnter,
      clear
    };
  });
}
</script>

<style scoped>
.input {
  outline: none;
  height: 6vw;
  overflow: scroll;
  border-radius: 2vw;
  width: 100%;
  text-align: left;
  padding-left: 2vw;
  width: 75vw;
  font-size: 14px;
}
div[contenteditable]:empty:not(:focus):before {
  content: attr(placeholder);
  color: #aaa;
}
</style>
