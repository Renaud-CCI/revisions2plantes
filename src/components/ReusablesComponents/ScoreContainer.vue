<template>
  <div id="score-container" :class="{ 'is-revision': isRevision }" class="text-white bg-amber-500 flex justify-center items-center">
    <p class="font-bold">Score : {{ score }} / {{ questions }} </p>
  </div>
</template>

<script>
import { useQuizzStore } from '@/stores/quizzStore';
import { computed } from 'vue';


export default {
  name: 'ScoreContainer',
  props: {
    isRevision: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
    };
  },
  setup() {
    const quizzStore = useQuizzStore();
    const score = computed(() => quizzStore.score);
    const questions = computed(() => quizzStore.questions);

    return {
      score,
      questions
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
#score-container {
  position: fixed;
  z-index: 5;
  width: 38vw;
  height: 35px;
  border-radius: 0 0 10px 0;
  opacity: 0.8;
  font-size: 1.2rem;
  transition: margin-top 0.3s;

  &.is-revision {
    margin-top: -35px;
  }


  @media screen and (min-width: 768px) {
    width: 20vw;
    height: 55px;
    font-size: 2rem;
    border-radius: 0 0 10px 10px;

    &.is-revision {
      margin-top: -55px;
    }
  }
}
</style>
