<template>
  <div id="score-container" :class="{ 'is-revision': isRevision }" class="text-white bg-amber-500 flex justify-center items-center">
    <p class="font-bold">Score : {{ isRevision ? 'R' : 'E'}}</p>
  </div>
</template>

<script>
import { gsap } from 'gsap';


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
  computed: {
  },
  methods: {
  }
}
</script>

<style scoped lang="scss">
#score-container {
  position: fixed;
  width: 20vw;
  height: 55px;
  border-radius: 0 0 10px 0;
  opacity: 0.8;
  font-size: 2rem;
  transition: margin-top 0.3s;

  &.is-revision {
    margin-top: -55px;
  }


  @media screen and (max-width: 768px) {
    width: 35vw;
    height: 35px;
    font-size: 1.2rem;

    &.is-revision {
      margin-top: -35px;
    }
  }
}
</style>
