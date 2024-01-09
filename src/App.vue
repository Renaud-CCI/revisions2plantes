<template>
  <section class="test">

    <nav class="fixed top-0 left-0 w-full bg-zinc-100 z-50">
      <button id="adventices-button" @click="togglePage" :class="{ 'selected-button': adventicesPage }">Adventices</button>
      <button id="ornementals-button" @click="togglePage" :class="{ 'selected-button': !adventicesPage }">Ornementales</button>
    </nav>

    <div id="slide-container">
    <div class="flex justify-center">
          <AdventicesLearningContainer :class="{ 'adventices-in': adventicesPage, 'adventices-out': !adventicesPage }" />
          <OrnamentalsLearningContainer :class="{ 'ornamentals-in': !adventicesPage, 'ornamentals-out': adventicesPage }" />
          </div>
    </div>

    <div class="flex justify-center items-center">
      <ContactForm />
    </div>
  </section>
</template>

<script>
import AdventicesLearningContainer from './components/AdventicesLearningContainer.vue';
import OrnamentalsLearningContainer from './components/OrnamentalsLearningContainer.vue';
import ContactForm from './components/ContactForm.vue';

export default {
  name: 'App',
  components: {
    AdventicesLearningContainer,
    OrnamentalsLearningContainer,
    ContactForm
  },
  data() {
    return {
      adventicesPage: true,
    };
  },
  methods: {
    togglePage() {
      this.adventicesPage = !this.adventicesPage;
    }
  },
  watch: {
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'Herb';
  src: url('./assets/polices/Herb.ttf') format('truetype');
}

@font-face {
  font-family: 'Flower';
  src: url('./assets/polices/Flower.ttf') format('truetype');
}

nav {
  height: 3rem;
  padding: 0 30%;

  button {
    width: 50%;
    height: 3rem;
    color: #e4e4e7; /* tailwind zinc-200 */
    transition: color 0.4s ease-in-out;
  }

  #adventices-button {
    font-size: 1.8rem;
    font-family: 'Herb';
  }

  #ornementals-button {
    font-size: 2rem;
    font-family: 'Flower';
  }

  .selected-button {
    color: #4d7c0f; /* tailwind lime-700 */
  }
}

  
#slide-container {
  overflow-x: hidden;
  height: auto;


  .adventices-in, .ornamentals-in {
  width: 100vw;
  height: auto;
  position: relative;
  left: 0;
  transition: left 0.6s ease-in-out, width 0.3s ease-in-out;
}

  .adventices-out {
    width: 0;
    position: relative;
    left: -100vw;
    transition: left 0.6s ease-in-out, width 0.3s ease-in-out;
  }

  .ornamentals-out {
    width: 0;
    position: relative;
    left: 100vw;
    transition: left 0.6s ease-in-out, width 0.3s ease-in-out;
  }
}

@media screen and (max-width: 768px) {
  nav {
    height: 3rem; 
    padding: 0;

    button {
      width: 50%;
      height: 3rem;
    }

    #adventices-button {
      font-size: 1.8rem;
    }

    #ornementals-button {
      font-size: 2rem;
    }
  }
} 

</style>