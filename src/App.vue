<template>
  <section class="test">

    <nav class="fixed top-0 left-0 w-full bg-zinc-100 z-50">

      <button id="adventices-button" @click="togglePage('adventices')" :class="{ 'selected-button': choosenTheme === 'adventices' }">
        <i class="lni lni-sprout"></i>
      </button>

      <button id="ornementals-button" @click="togglePage('ornamentals')" :class="{ 'selected-button': choosenTheme === 'ornamentals' }">
        <i class="lni lni-flower"></i>
      </button>

      <button id="phytosanitaries-button" @click="togglePage('phytosanitaries')" :class="{ 'selected-button': choosenTheme === 'phytosanitaries' }">
        <i class="lni lni-first-aid"></i>
      </button>

    </nav>

    <div id="body-container">
      <div id="slide-container">
        <div class="flex justify-center">
            
          <LearningContainer
            id="learning-container"
            :theme="theme"
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

    </div>

  </section>
</template>

<script>
import gsap from 'gsap';
import LearningContainer from './components/LearningContainer.vue';
import ContactForm from './components/ContactForm.vue';
import adventices from './assets/adventices.json';
import ornamentals from './assets/ornamentals.json';
import themes from './assets/themes.json';

export default {
  name: 'App',
  components: {
    LearningContainer,
    ContactForm
  },
  data() {
    return {
      choosenTheme: 'adventices'
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
      const learningContainer = document.querySelector('#body-container');

      gsap.to(learningContainer, { opacity: 0, duration: 0.2, ease: "sine.out", onComplete: () => {
        this.choosenTheme = selectedPage;

        gsap.to(learningContainer, { opacity: 1, duration: 1, ease: "sine.in" });
      }});
    }
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