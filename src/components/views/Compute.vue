<template>
  <div class="compute">
    <CharacterCompute></CharacterCompute>
  </div>
</template>

<script>
import CharacterCompute from "../compute/CharacterCompute.vue";
export default {
  name: "Compute.vue",
  components: {
    CharacterCompute
  }
}
</script>

<style scoped>
.compute{
  width: 100%;
}
</style>