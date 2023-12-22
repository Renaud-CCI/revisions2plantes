import { defineStore } from 'pinia';

export const useQuizzStore = defineStore({
  id: 'score',
  state: () => ({
    score: 0,
    questions: 0
  }),
  actions: {
    incrementScore() {
      this.score++;
    },
    decrementScore() {
      this.score--;
    },
    setScore(value) {
      this.score = value;
    },
    incrementQuestions() {
      this.questions++;
    },
    decrementQuestions() {
      this.questions--;
    },
    setQuestions(value) {
      this.questions = value;
    }
  }
});