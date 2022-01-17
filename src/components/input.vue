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
      if (txt.value) {
        this.$emit("send", txt.value);
      }
    };

    const clear = () => {
      txt.value = " ";
    };

    const mergeTxt = (str: string) => {
      txt.value = `${txt.value}${str}`;
    };

    return {
      txt,
      handleEnter,
      clear,
      mergeTxt
    };
  });
}
</script>

<style lang="less" scoped>
.input {
  outline: none;
  height: 10vw;
  overflow-y: scroll;
  border-radius: 2vw;
  text-align: left;
  padding-left: 2vw;
  font-size: 14px;
}
div[contenteditable]:empty:not(:focus):before {
  content: attr(placeholder);
  color: #aaa;
}
</style>
