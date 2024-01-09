<template>
  <section class="test">

    <nav class="fixed top-0 left-0 w-full bg-zinc-100 z-50">
      <button @click="togglePage">🌿 Adventices</button>
      <button @click="togglePage">Ornamentales 🪴</button>
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
.test {
  background-color: blue;
  overflow-x: hidden;
}

  nav {
    height: 2rem; 
  }

  
  #slide-container {
    background-color: yellow;
    overflow-x: hidden;
    height: auto;
  

    .adventices-in, .ornamentals-in {
    width: 100vw;
    height: auto;
    position: relative;
    left: 0;
    transition: left 0.6s ease-in-out, width 0.6s ease-in-out;
  }

  .adventices-out {
    width: 0;
    position: relative;
    left: -100vw;
    transition: left 0.6s ease-in-out, width 0.6s ease-in-out;
  }

  .ornamentals-out {
    width: 0;
    position: relative;
    left: 100vw;
    transition: left 0.6s ease-in-out, width 0.6s ease-in-out;
  }
}

</style>