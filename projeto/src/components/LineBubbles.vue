<script setup>

const props = defineProps({
  bottom: {
    type: Boolean,
    default: false,
  },
  withoutBubble: {
    type: Boolean,
    default: false,
  },
  vertical: {
    type: Boolean,
    default: false,
  },
})

</script>

<template>
  <div
    class="line"
    :style="props.bottom ? 'transform: rotate(180deg); margin-top: 2vw;' : props.vertical ? 'transform: rotate(180deg); margin-top: 2vw;' : ''">
    <template v-if="!props.withoutBubble">
      <span class="circle"></span>
      <span class="circle circle2"></span>
    </template>
  </div>
</template>


<style scoped>
.line {
  display: flex;
  justify-content: flex-start;
  padding-left: 2vw;
  width: 100%;
  align-items: center;
  /* margin-top: 30px; */
  border-top: 0.12rem solid black;


  & .circle {
    display: inline-block;
    width: 40px;
    height: 40px;
    margin: 0 5px;
    border: 0.12rem solid black;
    border-radius: 50%;
    margin-top: -1.1vw;
  }


  & .circle2 {
    margin-left: -1vw;
  }

  .line-vertical {
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: auto;
    padding: 0;
    border-top: none;
    border-left: 0.12rem solid black;

    & .circle {
      margin: 5px 0;
    }

    & .circle2 {
      margin-top: -1vw;
      margin-left: 0;
    }
  }
}


</style>
