<template>
  <div class="result">
    <div class="title">{{ results[resultIndex].title }}</div>
    <div class="desc">
      {{ results[resultIndex].desc }}
    </div>
  </div>
</template>

<script>
export default {
  name: "Result",
  props: ["results", "totalCorrect"],
  computed: {
    resultIndex() {
      let index = 0;
      this.results.forEach((element, i) =>{
        if (element.min <= this.totalCorrect && element.max >= this.totalCorrect) {
          index = i;
        }
      })
      return index;
    }
  }
}
</script>
