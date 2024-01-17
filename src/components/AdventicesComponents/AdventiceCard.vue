<template>
  <div class="adventice-card flex flex-col justify-center items-center">

    <div class="card bg-sky-100 rounded-xl flex flex-col justify-center items-center" @click="flipCard">

      <div v-if="recto" class="recto flex flex-col justify-center items-center">
        <img v-if="imgLoad" :src="imgSrc" :alt="adventices.name + '_Img'" class="adventice-image rounded-xl">
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center text-neutral-700">
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
      recto: true,
      imgSrc: '',
      imgLoad: false
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
  },
  async created() {
    const images = import.meta.glob('@/assets/images/plants/*');
    const randomImages = [`${this.adventice.image}1`, `${this.adventice.image}2`, `${this.adventice.image}3`];
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    const module = await images[`/src/assets/images/plants/${randomImage}.jpeg`]();
    this.imgSrc = module.default;
    this.imgLoad = true;
  },
}
</script>

<style scoped lang="scss">
.adventice-card {
  padding: 2vh 0;

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
      width: 75vw;
      height: 75vh;
    }
  }

}
</style>
