<template>
  <div class="adventice-card flex flex-col justify-center items-center">

    <div class="card bg-sky-100 rounded-xl flex flex-col justify-center items-center" @click="flipCard">

      <div v-if="recto" class="recto flex flex-col justify-center items-center">
        <img v-if="imgLoad" :src="imgSrc" :alt="phytosanitaries.name + '_Img'" class="adventice-image rounded-xl">
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center">
        <h1 class="text-3xl mb-4 text-center" v-if="phytosanitaries.name">{{ phytosanitaries.name }}</h1>
        <p class="text-lg text-center" v-if="phytosanitaries.nickname">{{ phytosanitaries.nickname }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.family">famille :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.family">{{ phytosanitaries.family }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.action">mode d'action :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.action">{{ phytosanitaries.action }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.target">cible :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.target">{{ phytosanitaries.target }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.climate">climat :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.climate">{{ phytosanitaries.climate }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.conditions">conditions :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.conditions">{{ phytosanitaries.conditions }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.observation">observations :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.observation">{{ phytosanitaries.observation }}</p>
        <p class="text-base mt-4 text-neutral-500 text-center" v-if="phytosanitaries.prevention">prévention :</p>
        <p class="text-lg text-center" v-if="phytosanitaries.prevention">{{ phytosanitaries.prevention }}</p>
      </div>

    </div>

  </div>
</template>

<script>
import { gsap } from 'gsap';


export default {
  name: 'PhytosanitarylCard',
  props: {
  phytosanitary: {
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
    phytosanitaries() {
      return this.phytosanitary;
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
        const images = import.meta.glob('@/assets/images/phytosanitaries/*');
        const module = await images[`/src/assets/images/phytosanitaries/${this.phytosanitary.image}.jpg`]();
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
