<template>
  <section class="">
    <div class="pt-6">
      <ToggleSwitch @toggle-mode="handleToggleMode" />
    </div>

    <div class="refresh-div flex justify-center items-center">
      <button class="text-white bg-sky-600 rounded" @click="refreshPage">Réinitialiser</button>
    </div>

      <AdventiceCard v-if="isRevision" v-for="(adventice, key) in adventicesArray" :key="key" :adventice="adventice" />

      <AdventiceQuizzCardContainer v-if="!isRevision" v-for="(adventice, key) in adventicesArray" :key="key" :adventice="adventice" />
    
    <div class="refresh-div flex justify-center items-center">
      <button class="text-white bg-sky-600 px-4 py-1 rounded" @click="refreshPage">Réinitialiser</button>
    </div>

    <div class="flex justify-center items-center">
      <ContactForm />
    </div>

  </section>

  

</template>

<script>
import ToggleSwitch from './components/ToggleSwitch.vue';
import AdventiceCard from './components/AdventiceCard.vue';
import AdventiceQuizzCardContainer from './components/AdventiceQuizzCard/AdventiceQuizzCardContainer.vue';
import ContactForm from './components/ContactForm.vue';
import adventices from './assets/adventices.json';

export default {
  name: 'App',
  components: {
    ToggleSwitch,
    AdventiceCard,
    ContactForm,
    AdventiceQuizzCardContainer
  },
   data() {
    return {
      adventicesArray: this.shuffle(Object.values(adventices)),
      isRevision: true,
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
    handleToggleMode() {
      this.isRevision = !this.isRevision;
      const button = document.querySelector('.refresh-div button');
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (this.isRevision) {
        button.style.opacity = "1";
        button.style.marginTop = "1rem";
        button.style.height = isMobile ? "2rem" : "3rem";
        button.style.pointerEvents = "auto";
      } else {
        button.style.opacity = "0";
        button.style.marginTop = "0";
        button.style.height = "0";
        button.style.pointerEvents = "none";
      }
    }
  }
}

</script>

<style scoped>
.refresh-div button {
  font-size: 1.2rem;
  margin-top: 1rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  transition: opacity 0.5s, margin-top 0.5s, height 0.5s;
}

@media screen and (max-width: 768px) {
  .refresh-div button {
    font-size: 0.8rem;
    height: 2rem;
    padding: 0.2rem 1rem;
  }
} 
</style>
