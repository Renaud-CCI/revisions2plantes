<template>
  <section class="grid grid-cols-5 justify-center items-center mx-6">

    <div @click="clicOnInput" class="option-text revisions col-span-2 text-end pe-1 cursor-pointer">
      {{ "Révisions".toUpperCase() }}
    </div>
     
      <div class="wrap col-span-1 flex justify-center items-center">
        <div class="toggle">
          <div class="input-wrap">
            <input @click="toggleMode" id="input-1" type="checkbox">
            <label for="input-1">Select</label>
          </div>
        </div>  
      </div>

    <div @click="clicOnInput" class="option-text evaluation col-span-2 text-start ps-1 cursor-pointer">
      {{ "évaluation".toUpperCase() }}
    </div>

  </section>

 
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'ToggleSwitch',
  data() {
    return {
      isOn: false
    };
  },
  mounted () {
    this.toggleColor();
  },
  methods: {
    toggleMode() {
      this.isOn = !this.isOn;
      console.log(this.isOn);
      this.$emit('toggle-mode', this.isOn);
      this.toggleColor();
    },
    toggleColor() {
      switch (this.isOn) {
        case true:
          gsap.to('.evaluation', { color: '#f59e0b', duration: 0.3 });
          gsap.to('.revisions', { color: '#d4d4d4', duration: 0.3 });
          break;
        case false:
          gsap.to('.evaluation', { color: '#d4d4d4', duration: 0.3 });
          gsap.to('.revisions', { color: '#0284c7', duration: 0.3 });
          break;
      }
    },
    clicOnInput() {
      document.getElementById('input-1').click();
    }
  }
};
</script>

<style scoped lang="scss">

// Toggle Button
.toggle {
  label {
    display: inline-block;
    position: relative;
    height: 34px;
    width: 80px;
    background-color: #e0f2fe; //sky-100
    cursor: pointer;
    font-size: 0;
    color: transparent;
    border-radius: 22px;
    transition: background-color 500ms ease;

    &:after {
      transition: right 500ms ease, 
      background-color 500ms ease, 
      box-shadow 500ms ease;
      content: '';
      display: block;
      height: 30px;
      width: 30px;
      position: absolute;
      top: 2px;
      right: 48px;
      border-radius: 50%;
      background-color: #0284c7; //sky-600
      box-shadow: 2px 0px 0px rgba(0,0,0,0.15);
    }
  }
  input:checked + label {
    background: #fef3c7; //amber-100
  }
  input:checked + label:after {
    right: 2px;
    background-color: #f59e0b; //amber-500
    box-shadow: -2px 0px 0px rgba(0,0,0,0.1);
  }
  input {
    position: absolute !important;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    bottom: 0;
  }
}


// Presentation styles
.wrap {
  display: flex;
  flex-wrap: wrap;
}

.toggle {
  flex: 1;
  text-align: center;
  
}
.input-wrap {
  position: relative;
  min-width: 80px;
}

label {
  line-height: 44px;
  vertical-align: middle;
}
// END Toggle Button


// Option Text
.option-text {
  font-size: 1.4rem;
  font-family: sans-serif;
  font-weight: bold;
  color: #d4d4d4; //neutral-300

  .revisions{
    color: #0284c7; //sky-600
  }
}

@media screen and (max-width: 768px) {
  .toggle {
    label {
      width: 60px;
      height: 30px;

      &:after {
        right: 32px;
        height: 26px;
        width: 26px;
      }
    }
  }
}


</style>
