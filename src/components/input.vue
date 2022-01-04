<template>
  <div class="inputWrap">
    <div
      class="input"
      v-text="ipt.txt"
      contenteditable="true"
      placeholder="请输入"
      @keyup.enter="ipt.handleEnter"
      @input="ipt.handleInput"
    ></div>
  </div>
</template>

<script lang="ts">
import { Options, Vue, setup } from "vue-class-component";
import { ref } from "vue";
@Options({
  emits: ["send"]
})
export default class Contact extends Vue {
  ipt = setup(() => {
    const txt = ref("");
    const handleInput = ($event: InputEvent) => {
      const input = $event.target as HTMLDivElement;
      txt.value = input.innerText;
    };

    const handleEnter = () => {
      this.$emit("send", txt.value);
    };

    return {
      txt,
      handleInput,
      handleEnter
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
