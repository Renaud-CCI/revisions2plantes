<template>
  <div class="adventice-card flex flex-col justify-center items-center">

    <div class="card bg-sky-100 rounded-xl flex flex-col justify-center items-center" @click="flipCard">

      <div v-if="recto" class="recto flex flex-col justify-center items-center">
        <img v-if="imgLoad" :src="imgSrc" :alt="ornamentals.name + '_Img'" class="adventice-image rounded-xl">
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center text-neutral-700">
        <h1 class="text-3xl mb-4 text-center" v-if="ornamentals.name">{{ ornamentals.name }}</h1>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="ornamentals.gender">genre :</p>
        <p class="text-lg text-center" v-if="ornamentals.gender">{{ ornamentals.gender }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="ornamentals.species">espèce :</p>
        <p class="text-lg text-center" v-if="ornamentals.species">{{ ornamentals.species }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="ornamentals.variety">variété :</p>
        <p class="text-lg text-center" v-if="ornamentals.variety">{{ ornamentals.variety }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="ornamentals.family">famille :</p>
        <p class="text-lg text-center" v-if="ornamentals.family">{{ ornamentals.family }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="ornamentals.type">type :</p>
        <p class="text-lg text-center" v-if="ornamentals.type">{{ ornamentals.type }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="ornamentals.comments">caractéristiques :</p>
        <p class="text-lg text-center" v-if="ornamentals.comments">{{ ornamentals.comments }}</p>
      </div>

    </div>

  </div>
</template>

<script>
import { gsap } from 'gsap';


export default {
  name: 'OrnamentalCard',
  props: {
  ornamental: {
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
    ornamentals() {
      return this.ornamental;
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
    try {
        const images = import.meta.glob('@/assets/images/ornamentals/*');
        const module = await images[`/src/assets/images/ornamentals/${this.ornamental.image}.jpg`]();
        this.imgSrc = module.default;
    } catch (error) {
        this.imgSrc = null;
    } finally {
        this.imgLoad = true;
    }
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
