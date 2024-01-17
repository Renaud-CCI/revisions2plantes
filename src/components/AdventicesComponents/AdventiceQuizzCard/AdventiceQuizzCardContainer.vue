<template>
  <div class="adventice-card flex flex-col justify-center items-center py-6">

    <div class="card bg-amber-100 rounded-xl flex flex-col justify-center items-center py-4" :style="{ borderColor: borderResponseColor, borderWidth: '2px' }" >

      <div v-if="recto" class="recto grid grid-cols-1 justify-center items-center">

        <div class="img-div col-span-1 flex justify-center items-center">
          <img v-if="imgLoad" :src="imgSrc" :alt="adventices.name + '_Img'" class="adventice-image rounded-xl">
        </div>

        <div class="answers-div col-span-1 flex flex-col justify-start items-center">
          <p class="text-center">{{ displayableQuestionTitle }}</p>
          <button v-for="(answer, index) in shuffledAnswers" :key="index" @click="answer === goodAnswer ? goodTraitment() : badTraitment()">
            {{ answer }}
          </button>
        </div>
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center text-neutral-700">
        <p class="response-logo mb-8">{{ responseLogo }}</p>
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
import { useQuizzStore } from '@/stores/quizzStore';


export default {
  name: 'AdventiceQuizzCardContainer',
  props: {
    adventicesArray: {
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
    adventices() {
      return this.adventicesArray[this.index];
    },
    displayableQuestionTitle() {
      switch (this.questionTitle) {
        case 'name':
          return 'Nom commun :';
          break;
        case 'latin':
          return 'Nom latin :';
          break;
        case 'family':
          return 'Famille :';
          break;
        case 'type':
          return 'Type :';
          break;      
        default:
          break;
      }
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
    },
    getQuizzData() {
      const currentAdventice = this.adventicesArray[this.index];
      const entries = Object.entries(currentAdventice);
      const randomIndex = this.getRandomIndex(entries.length); // ne doit pas être égal à 0 (il s'agit de l'image)
      const randomEntry = entries[randomIndex];

      this.questionTitle = randomEntry[0];
      this.goodAnswer = randomEntry[1];

      this.badAnswers = randomIndex === 4 ? this.getFixedBadAnswers(randomEntry[1]) : this.getRandomBadAnswers(randomEntry[0]);

      this.shuffledAnswers = this.shuffleArray([this.goodAnswer, ...this.badAnswers]);
    },
    getRandomIndex(length) {
      return Math.floor(Math.random() * (length - 1)) + 1;
    },

    getFixedBadAnswers(goodAnswer) {
      return ['Annuelle', 'Vivace'].filter(value => value !== goodAnswer);
    },

    getRandomBadAnswers(questionTitle) {
      const otherObjects = this.adventicesArray.filter((_, i) => i !== this.index);
      const randomIndices = this.getRandomIndices(otherObjects, questionTitle);
      return randomIndices.map(i => otherObjects[i][questionTitle]);
    },

    getRandomIndices(otherObjects, questionTitle) {
      const indices = [];
      while (indices.length < 2) {
        const random = Math.floor(Math.random() * otherObjects.length);
        const potentialBadAnswer = otherObjects[random][questionTitle];
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
    const images = import.meta.glob('@/assets/images/plants/*');
    const randomImages = [`${this.adventicesArray[this.index].image}1`, `${this.adventicesArray[this.index].image}2`, `${this.adventicesArray[this.index].image}3`];
    const randomImage = randomImages[Math.floor(Math.random() * randomImages.length)];
    const module = await images[`/src/assets/images/plants/${randomImage}.jpeg`]();
    this.imgSrc = module.default;
    this.imgLoad = true;
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
