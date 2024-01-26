<template>
  <div class="adventice-card flex flex-col justify-center items-center">

    <div class="card bg-sky-100 rounded-xl flex flex-col justify-center items-center" @click="flipCard">

      <div v-if="recto" class="recto flex flex-col justify-center items-center">
        <img v-if="imgLoad" :src="imgSrc" :alt="itemInfos.name + '_Img'" class="adventice-image rounded-xl">
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center">
        <div v-if="componentName === 'phytosanitaries'">
          <h2 class="text-3xl md:text-4xl mb-4 text-center" v-if="itemInfos.name">{{ itemInfos.name }}</h2>
          <p class="text-lg md:text-2xl text-center" v-if="itemInfos.nickname">{{ itemInfos.nickname }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.family">famille :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.family">{{ itemInfos.family }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.action">mode d'action :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.action">{{ itemInfos.action }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.target">cible :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.target">{{ itemInfos.target }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.climate">climat :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.climate">{{ itemInfos.climate }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.conditions">conditions :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.conditions">{{ itemInfos.conditions }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.observation">observations :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.observation">{{ itemInfos.observation }}</p>
          <p class="text-base md:text-lg mt-1 md:mt-4 text-neutral-500 text-center" v-if="itemInfos.prevention">prévention :</p>
          <p class="text-base md:text-xl text-center" v-if="itemInfos.prevention">{{ itemInfos.prevention }}</p>
        </div>

        <div v-if="componentName === 'ornamentals'">
          <h2 class="text-3xl md:text-6xl mb-4 text-center" v-if="itemInfos.name">{{ itemInfos.name }}</h2>
          <p class="text-base md:text-2xl mt-4 text-neutral-500 text-center" v-if="itemInfos.gender">genre :</p>
          <p class="text-lg md:text-3xl text-center" v-if="itemInfos.gender">{{ itemInfos.gender }}</p>
          <p class="text-base md:text-2xl mt-4 text-neutral-500 text-center" v-if="itemInfos.species">espèce :</p>
          <p class="text-lg md:text-3xl text-center" v-if="itemInfos.species">{{ itemInfos.species }}</p>
          <p class="text-base md:text-2xl mt-4 text-neutral-500 text-center" v-if="itemInfos.variety">variété :</p>
          <p class="text-lg md:text-3xl text-center" v-if="itemInfos.variety">{{ itemInfos.variety }}</p>
          <p class="text-base md:text-2xl mt-4 text-neutral-500 text-center" v-if="itemInfos.family">famille :</p>
          <p class="text-lg md:text-3xl text-center" v-if="itemInfos.family">{{ itemInfos.family }}</p>
          <p class="text-base md:text-2xl mt-4 text-neutral-500 text-center" v-if="itemInfos.type">type :</p>
          <p class="text-lg md:text-3xl text-center" v-if="itemInfos.type">{{ itemInfos.type }}</p>
          <p class="text-base md:text-2xl mt-4 text-neutral-500 text-center" v-if="itemInfos.comments">caractéristiques :</p>
          <p class="text-lg md:text-3xl text-center" v-if="itemInfos.comments">{{ itemInfos.comments }}</p>
        </div>

        <div v-if="componentName === 'adventices'">
          <h2 class="text-4xl md:text-6xl mb-8 text-center">{{ itemInfos.name }}</h2>
          <h3 class="text-2xl md:text-4xl italic text-center">{{ itemInfos.latin }}</h3>
          <p class="text-lg md:text-3xl mt-16 text-neutral-500 text-center">famille :</p>
          <p class="text-xl md:text-3xl text-center">{{ itemInfos.family }}</p>
          <p class="text-lg md:text-3xl mt-4 text-neutral-500 text-center">type :</p>
          <p class="text-xl md:text-3xl text-center">{{ itemInfos.type }}</p>
        </div>


      </div>

    </div>

  </div>
</template>

<script>
import { gsap } from 'gsap';


export default {
  name: 'Card',
  props: {
  componentItemInfos: {
    type: Object,
    required: true
  },
  componentName: {
    type: String,
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
  async created() {
    await this.loadImage();
  },
  watch: {
    async componentName() {
      await this.loadImage();
    }
  },
  computed: {
    itemInfos() {
      return this.componentItemInfos;
    }
  },
  methods: {
    async loadImage() {
      try {
        let imageName = this.componentItemInfos.image;
        let images;

        switch (this.componentName) {
          case 'adventices':
            const possibleImages = [`${imageName}1`, `${imageName}2`, `${imageName}3`];
            const randomIndex = Math.floor(Math.random() * possibleImages.length);
            imageName = possibleImages[randomIndex];
            images = import.meta.glob('@/assets/images/adventices/*');
            break;
          case 'phytosanitaries':
            images = import.meta.glob('@/assets/images/phytosanitaries/*');
            break;
          case 'ornamentals':
            images = import.meta.glob('@/assets/images/ornamentals/*');
            break;
        } 

        const module = await images[`/src/assets/images/${this.componentName}/${imageName}.jpg`]();
        this.imgSrc = module.default;
      } catch (error) {
        this.imgSrc = null;
      } finally {
        this.imgLoad = true;
      }
    },
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
}
</script>

<style scoped lang="scss">
.adventice-card {
  padding: 2vh 0;

  .card {
    width: 75vw;
    height: 75vh;

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

  @media screen and (min-width: 768px) {
    .card {
      width: 25vw;
      height: 72vh;
    }
  }

}
</style>
