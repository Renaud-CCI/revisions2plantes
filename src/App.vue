<template>
  <section class="test">

    <nav class="fixed top-0 left-0 w-full bg-zinc-100 z-50">
      <button id="adventices-button" @click="togglePage('adventicesPage')" :class="{ 'selected-button': adventicesPage }"><i class="lni lni-sprout"></i></button>
      <button id="ornementals-button" @click="togglePage('ornamentalsPage')" :class="{ 'selected-button': ornamentalsPage }"> <i class="lni lni-flower"></i> </button>
      <button id="phytosanitaries-button" @click="togglePage('phytosanitariesPage')" :class="{ 'selected-button': phytosanitariesPage }"> <i class="lni lni-first-aid"></i> </button>
    </nav>

    <div id="slide-container">
    <div class="flex justify-center">
          <AdventicesLearningContainer
            :class="{ 'page-in': adventicesPage, 'page-out': !adventicesPage }"
            @adventiceIsRevisionEvent="handleAdventiceIsRevisionEvent"
            :theme="theme"
          />

          <OrnamentalsLearningContainer
            :class="{ 'page-in': ornamentalsPage, 'page-out': !ornamentalsPage }"
            @ornamentalIsRevisionEvent="handleOrnamentalIsRevisionEvent"
            :theme="theme"
          />

          <LearningContainer
          :class="{ 'page-in': phytosanitariesPage, 'page-out': !phytosanitariesPage }"
          @phytosanitaryIsRevisionEvent="handlePhytosanitaryIsRevisionEvent"
          :theme="theme"
          />
          
          />

          </div>
    </div>

    <div
      ref="contact-div"
      class="flex justify-center items-center"
      :style="{ 'margin-top': formMarginTop + 'vh' }"
    >
      <ContactForm />
    </div>
  </section>
</template>

<script>
import AdventicesLearningContainer from './components/AdventicesLearningContainer.vue';
import OrnamentalsLearningContainer from './components/OrnamentalsLearningContainer.vue';
import PhytosanitariesLearningContainer from './components/PhytosanitariesLearningContainer.vue';
import LearningContainer from './components/LearningContainer.vue';
import ContactForm from './components/ContactForm.vue';
import adventices from './assets/adventices.json';
import ornamentals from './assets/ornamentals.json';
import themes from './assets/themes.json';

export default {
  name: 'App',
  components: {
    AdventicesLearningContainer,
    OrnamentalsLearningContainer,
    PhytosanitariesLearningContainer,
    LearningContainer,
    ContactForm
  },
  data() {
    return {
      adventicesPage: true,
      ornamentalsPage: false,
      phytosanitariesPage: false,
      ornamentalIsRevision: true,
      adventiceIsRevision: true,
      phytosanitaryIsRevision: true,
      choosenTheme: 'ornamentals'
    };
  },
  mounted() {
  },
  computed: {
    theme() {
      return themes[this.choosenTheme];
    },
  },
  methods: {
    togglePage(selectedPage) {
      this.adventicesPage = false;
      this.ornamentalsPage = false;
      this.phytosanitariesPage = false;
      this[selectedPage] = true;
    },
    handleOrnamentalIsRevisionEvent(value) {
      this.ornamentalIsRevision = value;
    },
    handleAdventiceIsRevisionEvent(value) {
      this.adventiceIsRevision = value;
    },
    handlePhytosanitaryIsRevisionEvent(value) {
      this.phytosanitaryIsRevision = value;
    },
  },
  watch: {
  }
}
</script>

<style scoped>

nav {
  height: 3rem;
  padding: 0.2rem 30% 0 30%;

  button {
    width: 33%;
    height: 3rem;
    color: #e4e4e7; /* tailwind zinc-200 */
    transition: color 0.4s ease-in-out;
    font-size: 2rem;
  }

  .selected-button {
    color: #4d7c0f; /* tailwind lime-700 */
  }
}

  
#slide-container {
  .page-in {
    display: block;
    animation: fadeIn 0.6s;
  }

  .page-out {
    display: none;
  }
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

@media screen and (max-width: 768px) {
  nav {
    height: 3rem; 
    padding: 0.2rem 0;

    button {
      height: 3rem;
    }
  }
} 

</style>