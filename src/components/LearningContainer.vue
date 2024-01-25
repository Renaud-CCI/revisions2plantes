<template>
  <section class="container">

    <div class="score-div">
      <ScoreContainer :isRevision="isRevision" />
    </div>

    <h1 
      class="text-center title-h1"
      :class="isRevision ? 'text-sky-600' : 'text-amber-500'"
      :style="{ fontFamily: font }"
    >
      {{ theme['title'].toUpperCase() }}
    </h1>

    <div class="">
      <ToggleSwitch :isRevision="isRevision" @toggle-mode="handleToggleMode" />
    </div>

    <div class="phytosanitary-refresh-div flex justify-center items-center">
      <button class="text-white bg-sky-600 rounded" @click="refreshPage">Réinitialiser</button>
    </div>

      <Card v-if="isRevision" v-for="(componentItemInfos, index) in componentArray" :key="key" :componentItemInfos="componentItemInfos" :componentName="theme['name']" />

      <QuizzCard v-if="!isRevision" v-for="(componentItemInfos, index) in componentArray" :key="index" :index="index" :componentArray="componentArray" :componentName="theme['name']" />
    
    <div class="phytosanitary-refresh-div flex justify-center items-center">
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
import ScoreContainer from './ReusablesComponents/ScoreContainer.vue';
import ToggleSwitch from './ReusablesComponents/ToggleSwitch.vue';
import Card from './ReusablesComponents/Card.vue';
import QuizzCard from './ReusablesComponents/QuizzCard.vue';


export default {
  name: 'LearningContainer',
  
  components: {
    ScoreContainer,
    ToggleSwitch,
    Card,
    QuizzCard
  },
  props: {
    theme: {
      type: String,
      required: true
    }
  },
   data() {
    return {
      componentArray: null,
      isRevision: true,
    };
  },
  mounted() {
    this.loadData();
  },
  watch: {
    theme() {
      console.log('ppl');
      this.componentArray = null;
      this.isRevision = true;
      this.loadData();
    }
  },
  computed: {
    font() {
      switch (this.theme.name) {
        case 'phytosanitaries':
          return 'Science';
        case 'ornamentals':
          return 'Flower';
        case 'adventices':
          return 'Herb';
        default:
          return 'Herb';
      }
    }
  },
  methods: {
    async loadData() {
      let importedArray = await import(`../assets/${this.theme.json}`);
      this.componentArray = this.shuffle(Object.values(importedArray.default));
    },
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
      const button = document.querySelector('.phytosanitary-refresh-div button');
      const titleH1 = document.querySelector('.title-h1');
      const isMobile = window.matchMedia('(max-width: 768px)').matches;
      if (this.isRevision) {
        button.style.opacity = "1";
        button.style.marginTop = "1rem";
        button.style.height = isMobile ? "2rem" : "3rem";
        button.style.pointerEvents = "auto";
        titleH1.style.marginTop = "0";
      } else {
        button.style.opacity = "0";
        button.style.marginTop = "0";
        button.style.height = "0";
        button.style.pointerEvents = "none";
        titleH1.style.marginTop = "0.5rem";
      }
      this.$emit('phytosanitaryIsRevisionEvent', this.isRevision);
    }
  }
}

</script>

<style scoped>
@font-face {
  font-family: 'Science';
  src: url('@/assets/polices/Science.ttf') format('truetype');
}

@font-face {
  font-family: 'Flower';
  src: url('@/assets/polices/Flower.ttf') format('truetype');
}

@font-face {
  font-family: 'Herb';
  src: url('@/assets/polices/Herb.ttf') format('truetype');
}

.container {
  padding-top: 3rem;

  h1 {
    font-size: 3.2rem;
    padding-top: 1rem;
    margin-top: 0;
    transition: margin-top 0.5s;
  }
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
