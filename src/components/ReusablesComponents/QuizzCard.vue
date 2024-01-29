<template>
  <div class="adventice-card flex flex-col justify-center items-center py-6">

    <div class="card bg-amber-100 rounded-xl flex flex-col justify-center items-center py-4" :style="{ borderColor: borderResponseColor }" >

      <div v-if="recto" class="recto grid grid-cols-1 justify-center items-center">

        <div class="img-div col-span-1 flex justify-center items-center">
          <img v-if="imgLoad" :src="imgSrc" :alt="itemInfos.name + '_Img'" class="adventice-image rounded-xl">
        </div>

        <div class="answers-div col-span-1 flex flex-col justify-start items-center">
          <p v-if="componentName === 'phytosanitaries'" class="text-center"> Nom :</p>
          <p v-if="componentName === 'ornamentals' || componentName === 'adventices'" class="text-center">{{ displayableQuestionTitle }}</p>
          <button v-for="(answer, index) in shuffledAnswers" :key="index" @click="answer === goodAnswer ? goodTraitment() : badTraitment()">
            {{ answer }}
          </button>
        </div>
      </div>

      <div v-if="!recto" class="verso flex flex-col items-center justify-center">
        <div v-if="componentName === 'phytosanitaries'">
          <p class="response-logo mb-2 text-center">{{ responseLogo }}</p>
          <h2 class="mb-2 text-neutral-900 text-center" v-if="itemInfos.name">{{ itemInfos.name }}</h2>
          <p class="phytosanitaries-response-p text-center" v-if="itemInfos.nickname">{{ itemInfos.nickname }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.family">famille :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.family">{{ itemInfos.family }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.action">mode d'action :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.action">{{ itemInfos.action }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.target">cible :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.target">{{ itemInfos.target }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.climate">climat :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.climate">{{ itemInfos.climate }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.conditions">conditions :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.conditions">{{ itemInfos.conditions }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.observation">observations :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.observation">{{ itemInfos.observation }}</p>
          <p class="phytosanitaries-title-p mt-1 text-neutral-500 text-center" v-if="itemInfos.prevention">prévention :</p>
          <p class="phytosanitaries-response-p text-neutral-700 text-center" v-if="itemInfos.prevention">{{ itemInfos.prevention }}</p>
        </div>

        <div v-if="componentName === 'ornamentals'">
          <p class="response-logo mb-4 text-center">{{ responseLogo }}</p>
          <h2 class="mb-2 md:mb-4 text-neutral-900 text-center" v-if="itemInfos.name">{{ itemInfos.name }}</h2>
          <p class="ornamentals-title-p mt-4 text-neutral-500 text-center" v-if="itemInfos.gender">genre :</p>
          <p class="ornamentals-response-p text-neutral-700 text-center" v-if="itemInfos.gender">{{ itemInfos.gender }}</p>
          <p class="ornamentals-title-p mt-2 text-neutral-500 text-center" v-if="itemInfos.species">espèce :</p>
          <p class="ornamentals-response-p text-neutral-700 text-center" v-if="itemInfos.species">{{ itemInfos.species }}</p>
          <p class="ornamentals-title-p mt-2 text-neutral-500 text-center" v-if="itemInfos.variety">variété :</p>
          <p class="ornamentals-response-p text-neutral-700 text-center" v-if="itemInfos.variety">{{ itemInfos.variety }}</p>
          <p class="ornamentals-title-p mt-2 text-neutral-500 text-center" v-if="itemInfos.family">famille :</p>
          <p class="ornamentals-response-p text-neutral-700 text-center" v-if="itemInfos.family">{{ itemInfos.family }}</p>
          <p class="ornamentals-title-p mt-2 text-neutral-500 text-center" v-if="itemInfos.type">type :</p>
          <p class="ornamentals-response-p text-neutral-700 text-center" v-if="itemInfos.type">{{ itemInfos.type }}</p>
          <p class="ornamentals-title-p mt-2 text-neutral-500 text-center" v-if="itemInfos.comments">caractéristiques :</p>
          <p class="ornamentals-response-p text-neutral-700 text-center" v-if="itemInfos.comments">{{ itemInfos.comments }}</p>
        </div>

        <div v-if="componentName === 'adventices'">
          <p class="response-logo mb-8 text-center">{{ responseLogo }}</p>
          <h2 class="adventices-title mb-4 text-neutral-900 text-center">{{ itemInfos.name }}</h2>
          <h3 class="italic text-neutral-700 text-center">{{ itemInfos.latin }}</h3>
          <p class="adventices-title-p mt-8 text-neutral-500 text-center">famille :</p>
          <p class="adventices-response-p text-neutral-700 text-center">{{ itemInfos.family }}</p>
          <p class="adventices-title-p mt-4 text-neutral-500 text-center">type :</p>
          <p class="adventices-response-p text-neutral-700 text-center">{{ itemInfos.type }}</p>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import { gsap } from 'gsap';
import { useQuizzStore } from '@/stores/quizzStore';


export default {
  name: 'QuizzCard',
  props: {
    componentArray: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
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
  async created() {
    try {
      let imageName = this.componentArray[this.index]['image'];
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
      console.log(error);
      this.imgSrc = null;
    } finally {
      this.imgLoad = true;
    }
  },
  watch: {
    componentArray() {
      this.getQuizzData();
    },
  },
  computed: {
    itemInfos() {
      return this.componentArray[this.index];
    },
    displayableQuestionTitle() {
      switch (this.questionTitle) {
        case 'name':
          return 'Nom commun :';
        case 'gender':
          return 'Genre :';
        case 'species':
          return 'Espèce :';
        case 'family':
          return 'Famille :';
        case 'type':
          return 'Type :';
        case 'latin':
          return 'Nom latin :';
        default:
          return '';
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
      switch (this.componentName) {
        case 'phytosanitaries':
          this.goodAnswer = this.componentArray[this.index]['name'];
          this.badAnswers = this.getRandomPhytosanitariesBadAnswers();
          this.shuffledAnswers = this.shuffleArray([this.goodAnswer, ...this.badAnswers]);
          break;
        case 'ornamentals':
          const currentOrnamental = this.componentArray[this.index];
          let entries = Object.entries(currentOrnamental);
          let randomIndex;
          let randomEntry;
          do {
            randomIndex = this.getRandomIndex(entries.length);
            randomEntry = entries[randomIndex];
          } while (randomIndex === 0 || randomIndex === 4 || randomIndex === 7 || randomEntry === null);

          this.questionTitle = randomEntry[0];
          this.goodAnswer = randomEntry[1];

          this.badAnswers = randomIndex === 6 ? this.getFixedBadAnswers(randomEntry[1]) : this.getRandomOrnamentalsBadAnswers(randomEntry[0]);

          this.shuffledAnswers = this.shuffleArray([this.goodAnswer, ...this.badAnswers]);
          break;      
        case 'adventices':
          const currentAdventice = this.componentArray[this.index];
          const adventiceEntries = Object.entries(currentAdventice);
          const adventiceRandomIndex = this.getRandomIndex(adventiceEntries.length); // ne doit pas être égal à 0 (il s'agit de l'image)
          const adventiceRandomEntry = adventiceEntries[adventiceRandomIndex];

          this.questionTitle = adventiceRandomEntry[0];
          this.goodAnswer = adventiceRandomEntry[1];

          this.badAnswers = adventiceRandomIndex === 4 ? this.getFixedBadAnswers(adventiceRandomEntry[1]) : this.getRandomOrnamentalsBadAnswers(adventiceRandomEntry[0]);

          this.shuffledAnswers = this.shuffleArray([this.goodAnswer, ...this.badAnswers]);
          }
      
    },
    getRandomPhytosanitariesBadAnswers() {
      const otherObjects = this.componentArray.filter((_, i) => i !== this.index);
      const randomIndices = this.getRandomPhytosanitariesIndices(otherObjects);
      return randomIndices.map(i => otherObjects[i]['name']);
    },

    getRandomOrnamentalsBadAnswers(questionTitle) {
      const otherObjects = this.componentArray.filter((_, i) => i !== this.index);
      const randomIndices = this.getOrnamentalsRandomIndices(otherObjects, questionTitle);
      return randomIndices.map(i => otherObjects[i][questionTitle]);
    },

    getFixedBadAnswers(goodAnswer) {
      return ['Annuelle', 'Vivace'].filter(value => value !== goodAnswer);
    },

    getRandomPhytosanitariesIndices(otherObjects) {
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

    getOrnamentalsRandomIndices(otherObjects, questionTitle) {
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

    getRandomIndex(length) {
      return Math.floor(Math.random() * (length - 1)) + 1;
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
  }
}
</script>

<style scoped lang="scss">
.adventice-card {
  .card {
    width: 75vw;
    height: 75vh;
    border-width: 2px;

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

        p {
          font-size: 1.6rem;
          margin: 0.5rem 0;
          color: #f59e0b; //amber-500
        }

        button {
          width: 100%;
          min-height: 2.2rem;
          font-size: 1.2rem;
          background-color: #f59e0b; //amber-500
          color: white;
          padding: 0.4rem auto;
          margin-bottom: 0.8rem;
          border-radius: 0.5rem;
        }
      }
    }

    .verso {
      transform: rotateY(180deg);

      .response-logo {
        font-size: 2.5rem;
      }

      h2,
      h3 {
        font-size: 1.5rem;
      }

      .adventices-title {
        font-size: 2rem;
      }

      .phytosanitaries-title-p {
        font-size: 0.875rem;
      }

      .phytosanitaries-response-p {
        font-size: 1rem;
      }

      .ornamentals-response-p {
        font-size: 1.125rem;
      }

      .ornamentals-title-p {
        font-size: 1rem;
      }

      .adventices-title-p {
        font-size: 1.125rem;
      }

      .adventices-response-p {
        font-size: 1.25rem;
      }

    }

  }

  @media screen and (min-width: 768px) {
    .card {
      width: 25vw;
      border-width: 3px;

      .recto {

        .answers-div {
          height: 40vh;

          button {
          min-height: 2.6rem;
          font-size: 1.4rem;
          margin-bottom: 1rem;
          }
        }
      }

      .verso {
        .response-logo {
          font-size: 2.7rem;
        }

        h2,
        h3 {
          font-size: 1.775rem;
        }

        .adventices-title {
          font-size: 2.4rem;
        }

        .phytosanitaries-title-p {
          font-size: 0.9rem;
        }

        .phytosanitaries-response-p {
          font-size: 1.025rem;
        }

        .ornamentals-response-p {
          font-size: 1.2rem;
        }

        .ornamentals-title-p {
          font-size: 1rem;
        }

        .adventices-title-p {
          font-size: 1.4rem;
        }

        .adventices-response-p {
          font-size: 1.775rem;
        }

        
      }
    }
  }
  

  @media screen and (min-width: 1700px) {
    .card {
      height: 62vh;

      .recto {
        .answers-div {

          button {
          min-height: 2.75rem;
          font-size: 1.8rem;
          }
        }
      }

            .verso {
        .response-logo {
          font-size: 2.8rem;
        }

        h2,
        h3 {
          font-size: 3rem;
        }

        .adventices-title {
          font-size: 3.8rem;
        }

        .phytosanitaries-title-p {
          font-size: 1.2rem;
        }

        .phytosanitaries-response-p {
          font-size: 1.6rem;
        }

        .ornamentals-response-p {
          font-size: 1.6rem;
        }

        .ornamentals-title-p {
          font-size: 1.2rem;
        }

        .adventices-title-p {
          font-size: 1.5rem;
        }

        .adventices-response-p {
          font-size: 1.875rem;
        }

        
      }
      
    }
  }
}

</style>
