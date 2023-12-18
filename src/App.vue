<template>
  <AdventiceCard v-for="(adventice, key) in adventices" :key="key" :adventice="adventice" />
</template>

<script>
import AdventiceCard from './components/AdventiceCard.vue'
import adventices from './assets/adventices.json';

export default {
  name: 'App',
  components: {
    AdventiceCard,
  },
  data() {
  return {
    adventices
  };
}
}
</script>

<style scoped>

</style>
