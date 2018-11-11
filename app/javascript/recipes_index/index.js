import Vue from 'vue/dist/vue.common'

const vm = new Vue({
  el: "#recipes-index",
  data: {
    recipesCache: gon.recipes,
    displayedRecipes: gon.recipes,
    filters: ['Toutes', 'Végétariennes', 'En moins de 30min'],
    currentFilter: [],
  },
  components: {
  },
  watch: {
  },
  computed:{
  },
  methods: {
    lettersNumber() {
      return Object.keys(this.displayedRecipes).length
    },
    addFilter(filterName) {
      const filterIndex = this.currentFilter.indexOf(filterName)
      if (filterIndex === -1) {
        this.currentFilter.push(filterName)
      }
      else {
        this.currentFilter.splice(filterIndex, 1)
      }
      console.log(this.currentFilter)
    },
  },
});

export default

window.vm = vm
