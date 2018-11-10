import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#recipes-index",
  data: {
    recipesIndex: gon.recipes,
  },
  components: {
  },
  watch: {
  },
  computed:{
  },
  methods: {
    lettersNumber() {
      return Object.keys(this.recipesIndex).length
    },
  },
});

export default

window.vm = vm
