<template>
  <section class="container">

    <div class="score-div">
      <ScoreContainer :isRevision="isRevision" />
    </div>

    <h1 
      class="text-center"
      :class="isRevision ? 'text-sky-600' : 'text-amber-500'" 
    >
      {{ 'Adventices'.toUpperCase() }}
    </h1>

    <div class="">
      <ToggleSwitch @toggle-mode="handleToggleMode" />
    </div>

    <div class="refresh-div flex justify-center items-center">
      <button class="text-white bg-sky-600 rounded" @click="refreshPage">Réinitialiser</button>
    </div>

      <AdventiceCard v-if="isRevision" v-for="(adventice, index) in adventicesArray" :key="key" :adventice="adventice" />

      <AdventiceQuizzCardContainer v-if="!isRevision" v-for="(adventice, index) in adventicesArray" :key="index" :index="index" :adventicesArray="adventicesArray" />
    
    <div class="refresh-div flex justify-center items-center">
      <button 
        class="text-white px-4 py-1 rounded" 
        :class="isRevision ? 'bg-sky-600' : 'bg-amber-500'" 
        @click="refreshClick"
      >
        Réinitialiser
      </button>
    </div>

  </section>

  

</template>

<script>
import smoothscroll from 'smoothscroll-polyfill';
smoothscroll.polyfill();
import ScoreContainer from './AdventicesComponents/ScoreContainer.vue';
import ToggleSwitch from './AdventicesComponents/ToggleSwitch.vue';
import AdventiceCard from './AdventicesComponents/AdventiceCard.vue';
import AdventiceQuizzCardContainer from './AdventicesComponents/AdventiceQuizzCard/AdventiceQuizzCardContainer.vue';
import adventices from '../assets/adventices.json';

export default {
  name: 'AdventicesLearningContainer',
  components: {
    ScoreContainer,
    ToggleSwitch,
    AdventiceCard,
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
    scrollToTop() {
         window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    refreshClick() {
        this.scrollToTop();
  setTimeout(() => {
    this.refreshPage();
  }, 800);
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
      this.$emit('adventiceIsRevisionEvent', this.IsRevision)
    }
  }
}

</script>

<style scoped>

@font-face {
  font-family: 'Herb';
  src: url('@/assets/polices/Herb.ttf') format('truetype');
}

.container {
  padding-top: 3rem;

  h1 {
    font-size: 3rem;
    padding-top: 1rem;
    font-family: 'Herb', sans-serif;
  }
}

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

