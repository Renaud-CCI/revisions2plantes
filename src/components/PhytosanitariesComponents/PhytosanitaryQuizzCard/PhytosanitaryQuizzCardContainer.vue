<template>
  <div class="adventice-card flex flex-col justify-center items-center py-6">

    <div class="card bg-amber-100 rounded-xl flex flex-col justify-center items-center py-4" :style="{ borderColor: borderResponseColor, borderWidth: '2px' }" >

      <div v-if="recto" class="recto grid grid-cols-1 justify-center items-center">

        <div class="img-div col-span-1 flex justify-center items-center">
          <img v-if="imgLoad" :src="imgSrc" :alt="phytosanitaries.name + '_Img'" class="adventice-image rounded-xl">
        </div>

        <div class="answers-div col-span-1 flex flex-col justify-start items-center">
          <p class="text-center"> Nom :</p>
          <button v-for="(answer, index) in shuffledAnswers" :key="index" @click="answer === goodAnswer ? goodTraitment() : badTraitment()">
            {{ answer }}
          </button>
        </div>
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center">
        <p class="response-logo mb-4">{{ responseLogo }}</p>
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
import { useQuizzStore } from '@/stores/quizzStore';


export default {
  name: 'PhytosanitaryQuizzCardContainer',
  props: {
    phytosanitariesArray: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      recto: true,
      imgSrc: '',
      imgLoad: false,
      questionTitle: '',
      goodAnswer: '',
      badAnswers: [],
      shuffledAnswers: [],
      responseLogo: '',
      borderResponseColor: '#fef3c7' //amber-100
    };
  },
  mounted() {
    this.getQuizzData();
  },
  computed: {
    phytosanitaries() {
      return this.phytosanitariesArray[this.index];
    },
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
    },
    getQuizzData() {
      this.goodAnswer = this.phytosanitariesArray[this.index]['name'];

      this.badAnswers = this.getRandomBadAnswers();

      this.shuffledAnswers = this.shuffleArray([this.goodAnswer, ...this.badAnswers]);
    },
    getRandomIndex(length) {
      return Math.floor(Math.random() * (length - 1)) + 1;
    },

    getRandomBadAnswers() {
      const otherObjects = this.phytosanitariesArray.filter((_, i) => i !== this.index);
      const randomIndices = this.getRandomIndices(otherObjects);
      return randomIndices.map(i => otherObjects[i]['name']);
    },

    getRandomIndices(otherObjects) {
      const indices = [];
      while (indices.length < 2) {
        const random = Math.floor(Math.random() * otherObjects.length);
        const potentialBadAnswer = otherObjects[random]['name'];
        if (!indices.includes(random) && potentialBadAnswer !== this.goodAnswer) {
          indices.push(random);
        }
      }
      return indices;
    },
    shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    },
    incrementScore() {
      const quizzStore = useQuizzStore();
      quizzStore.incrementScore();
    },
    incrementQuestions() {
      const quizzStore = useQuizzStore();
      quizzStore.incrementQuestions();
    },
    goodTraitment() {
      this.incrementScore();
      this.incrementQuestions();
      this.flipCard();
      this.responseLogo = '✔️';
      setTimeout(() => {
        this.borderResponseColor = '#15803d'; //green-700
      }, 250);
    },
    badTraitment() {
      this.incrementQuestions();
      this.flipCard();
      this.responseLogo = '❌';
      setTimeout(() => {
        this.borderResponseColor = '#be123c'; //red-700
      }, 250);
    }
  },
  async created() {
    try {
        const images = import.meta.glob('@/assets/images/phytosanitaries/*');
        const module = await images[`/src/assets/images/phytosanitaries/${this.phytosanitariesArray[this.index].image}.jpg`]();
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
  .card {
    width: 25vw;
    height: 80vh;

    .recto {
        height: 100%;
        width: 80%;

      .img-div {
        height: 40vh;
        width: 100%;

        .adventice-image {
          height: 100%;
          width: 100%;
          object-fit: contain;
        }
      }

      .answers-div {
        height: 40vh;

        p {
          font-size: 1.6rem;
          margin: 0.5rem 0;
          color: #f59e0b; //amber-500
        }

        button {
          width: 100%;
          min-height: 2.75rem;
          font-size: 1.4rem;
          background-color: #f59e0b; //amber-500
          color: white;
          padding: 0.4rem auto;
          margin-bottom: 1rem;
          border-radius: 0.5rem;
        }
      }
    }

    .verso {
      transform: rotateY(180deg);

      .response-logo {
        font-size: 3rem;
      }
    }

  }

  @media screen and (max-width: 768px) {
    .card {
      width: 75vw;
      height: 75vh;

      .recto {
        height: 100%;
        width: 80%;

        .img-div {
          height: 40vh;
          width: 100%;

          .adventice-image {
            height: 100%;
            width: 100%;
            object-fit: contain;
          }
        }

        .answers-div {
          height: 35vh;

          button {
          min-height: 2.2rem;
          font-size: 1.2rem;
          margin-bottom: 0.8rem;
        }
        }
      }
    }
  }

}
</style>
