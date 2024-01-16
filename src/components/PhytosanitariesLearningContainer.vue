<template>
  <section class="container">

    <div class="score-div">
      <PhytosanitaryScoreContainer :PhytosanitaryIsRevision="PhytosanitaryIsRevision" />
    </div>

    <div class="pt-6">
      <PhytosanitaryToggleSwitch @phytosanitary-toggle-mode="handleToggleMode" />
    </div>

    <div class="phytosanitary-refresh-div flex justify-center items-center">
      <button class="text-white bg-sky-600 rounded" @click="refreshPage">Réinitialiser</button>
    </div>

      <PhytosanitaryCard v-if="PhytosanitaryIsRevision" v-for="(phytosanitary, index) in phytosanitariesArray" :key="key" :phytosanitary="phytosanitary" />

      <PhytosanitaryQuizzCardContainer v-if="!PhytosanitaryIsRevision" v-for="(phytosanitary, index) in phytosanitariesArray" :key="index" :index="index" :phytosanitariesArray="phytosanitariesArray" />
    
    <div class="phytosanitary-refresh-div flex justify-center items-center">
      <button 
        class="text-white px-4 py-1 rounded" 
        :class="PhytosanitaryIsRevision ? 'bg-sky-600' : 'bg-amber-500'" 
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
import PhytosanitaryScoreContainer from './PhytosanitariesComponents/PhytosanitaryScoreContainer.vue';
import PhytosanitaryToggleSwitch from './PhytosanitariesComponents/PhytosanitaryToggleSwitch.vue';
import PhytosanitaryCard from './PhytosanitariesComponents/PhytosanitaryCard.vue';
import PhytosanitaryQuizzCardContainer from './PhytosanitariesComponents/PhytosanitaryQuizzCard/PhytosanitaryQuizzCardContainer.vue';
import phytosanitaries from '../assets/phytosanitaries.json';

export default {
  name: 'PhytosanitariesLearningContainer',
  components: {
    PhytosanitaryScoreContainer,
    PhytosanitaryToggleSwitch,
    PhytosanitaryCard,
    PhytosanitaryQuizzCardContainer
  },
   data() {
    return {
      phytosanitariesArray: this.shuffle(Object.values(phytosanitaries)),
      PhytosanitaryIsRevision: true,
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
      this.PhytosanitaryIsRevision = !this.PhytosanitaryIsRevision;
      const button = document.querySelector('.phytosanitary-refresh-div button');
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (this.PhytosanitaryIsRevision) {
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
      this.$emit('phytosanitaryIsRevisionEvent', this.PhytosanitaryIsRevision);
    }
  }
}

</script>

<style scoped>
.container {
  padding-top: 3rem;
}

.phytosanitary-refresh-div button {
  font-size: 1.2rem;
  margin-top: 1rem;
  height: 3rem;
  padding: 0.5rem 1rem;
  transition: opacity 0.5s, margin-top 0.5s, height 0.5s;
}

@media screen and (max-width: 768px) {
  .phytosanitary-refresh-div button {
    font-size: 0.8rem;
    height: 2rem;
    padding: 0.2rem 1rem;
  }
} 
</style>
