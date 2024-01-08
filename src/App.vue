<template>
  <section class="">

    <AdventicesLearningContainer />

    <div class="flex justify-center items-center">
      <ContactForm />
    </div>

  </section>

  

</template>

<script>
import AdventicesLearningContainer from './components/AdventicesLearningContainer.vue';
import ContactForm from './components/ContactForm.vue';

export default {
  name: 'App',
  components: {
    AdventicesLearningContainer,
    ContactForm
  },
   data() {
  },
  methods: {}
    
}

</script>

<style scoped>

</style>
