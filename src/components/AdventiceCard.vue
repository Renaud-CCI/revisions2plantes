<template>
  <div class="adventice-card flex flex-col justify-center items-center py-6">

    <div class="card bg-neutral-100 border border-neutral-300 rounded-xl flex flex-col justify-center items-center" @click="flipCard">

      <div v-if="recto" class="recto flex flex-col justify-center items-center">
        <img :src="adventices.image" :alt="adventices.name + '_Img'" class="adventice-image rounded-xl">
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center">
        <h1 class="text-4xl mb-8 text-center">{{ adventices.name }}</h1>
        <h2 class="text-2xl italic text-center">{{ adventices.latin }}</h2>
        <p class="text-lg mt-16 text-neutral-500 text-center">famille :</p>
        <p class="text-xl text-center">{{ adventices.family }}</p>
        <p class="text-lg mt-4 text-neutral-500 text-center">type :</p>
        <p class="text-xl text-center">{{ adventices.type }}</p>
      </div>

    </div>

  </div>
</template>

<script>
import { gsap } from 'gsap';


export default {
  name: 'AdventiceCard',
  props: {
  adventice: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      recto: true
    };
  },
  computed: {
    adventices() {
      return this.adventice;
    }
  },
  methods: {
    flipCard() {
      let tl = gsap.timeline();
      if (this.recto){
        tl.to(this.$el, { rotationY: 90, duration: 0.3 })
          .add(() => {
            this.recto = !this.recto;
          })
          .to(this.$el, { rotationY: 180, duration: 0.3 });
      } else {
        tl.to(this.$el, { rotationY: 90, duration: 0.3 })
          .add(() => {
            this.recto = !this.recto;
          })
          .to(this.$el, { rotationY: 0, duration: 0.3 });
      }
    }
  }
}
</script>

<style scoped lang="scss">
.adventice-card {
  .card {
    width: 25vw;
    height: 80vh;

    .recto {
        height: 80%;
        width: 80%;

      .adventice-image {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    .verso {
      transform: rotateY(180deg);
    }

  }

  @media screen and (max-width: 768px) {
    .card {
      width: 80vw;
      height: 80vh;
    }
  }

}
</style>
