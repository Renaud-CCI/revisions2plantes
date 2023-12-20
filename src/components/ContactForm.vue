<template>

<div class="mt-16 w-5/6 sm:w-full flex flex-col justify-center">
  <h3 class="text-2xl text-red-800 text-center">
    <p>Un soucis d'image ?</p>
    <p>Une erreur ?</p>
    <p>Contactez-nous !</p>
  </h3>

  <div class="flex flex-col justify-center items-center text-center">
      
    <form
      name="simple-contact-form"
      action="https://formspree.io/f/xjvnbogr"
      method="POST"
      class="flex flex-col justify-center items-center"
    >
      <div class="flex justify-center items-center grid grid-cols-1 sm:grid-cols-2 mt-4">
        <p class="col-span-1 text-sm sm:text-base">Nom complet :</p>
        <input class="col-span-1 border border-neutral-200 rounded p-1" type="text" name="name" id="full-name" placeholder="Nom Prénom" required>
      </div>

      <div class="flex justify-center items-center grid grid-cols-1 sm:grid-cols-2 mt-4">
        <p class="col-span-1 text-sm sm:text-base">Votre email :</p>
        <input class="col-span-1 border border-neutral-200 rounded p-1" type="email" name="email" placeholder="adresse@exemple.com" required>
      </div>

      <div class="flex justify-center items-center grid grid-cols-1 mt-4 w-full">
        <p class="col-span-1 text-sm sm:text-base">Votre message :</p>
        <textarea class="col-span-1 border border-neutral-200 rounded p-1" rows="5" name="message" placeholder="Votre message ici..." required></textarea>
      </div>
      <!-- your other form fields go here -->
      <button class="text-white bg-neutral-800 px-6 py-2 rounded my-4" type="submit">Envoyer</button>
    </form>
  </div>
</div>
</template>

<script>


export default {
  name: 'ContactForm',
  props: {
  },
  data() {
  }
}
</script>

<style scoped lang="scss">

</style>
