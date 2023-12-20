<template>
  <div class="flex justify-center items-center mt-6">
    <button class="text-white bg-neutral-500 px-6 py-2 rounded" @click="refreshPage">Réinitialiser</button>
  </div>

  <AdventiceCard v-for="(adventice, key) in adventicesArray" :key="key" :adventice="adventice" />

  <div class="flex justify-center items-center mt-8">
    <button class="text-white bg-neutral-500 px-6 py-2 rounded" @click="refreshPage">Réinitialiser</button>
  </div>

  <div class="flex justify-center items-center">
    <ContactForm />
  </div>

  

</template>

<script>
import AdventiceCard from './components/AdventiceCard.vue';
import ContactForm from './components/ContactForm.vue';
import adventices from './assets/adventices.json';

export default {
  name: 'App',
  components: {
    AdventiceCard,
    ContactForm,
  },
   data() {
    return {
      adventicesArray: this.shuffle(Object.values(adventices))
    };
  },
  methods: {
    shuffle(array) {
      let currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    },
    refreshPage() {
      window.location.reload();
    },
  }
}

</script>

<style scoped>

</style>
