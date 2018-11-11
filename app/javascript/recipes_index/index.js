import Vue from 'vue/dist/vue.common'

const vm = new Vue({
  el: "#recipes-index",
  data: {
    cachedRecipes: gon.recipes,
    displayedRecipes: gon.recipes,
    filters: [
      {
        name: 'Toutes',
        state: true,
      },
      {
        name: 'Végétariennes',
        state: false,
      },
      {
        name: 'En moins de 30min',
        state: false,
      },
      {
        name: 'Faciles',
        state: false,
      },
    ],
    currentFilter: [],
  },
  components: {
  },
  mounted() {
  },
  watch: {
    currentFilter() {
      const _this = this
      if (this.currentFilter.length > 0) {
        let filteredRecipes = {}
        Object.keys(this.cachedRecipes).forEach(letter => {
          _this.cachedRecipes[letter].forEach( recipe => {
            if (_this.currentFilter.every(filter => recipe.tags.indexOf(filter) > -1)) {
              if (filteredRecipes[letter]) {
                filteredRecipes[letter].push(recipe)
              } else {
                filteredRecipes[letter] = [recipe]
              }
            }
          })
        });
        _this.displayedRecipes = filteredRecipes
      } else {
        _this.displayedRecipes = _this.cachedRecipes
      }
    },
  },
  computed:{
  },
  methods: {
    lettersNumber() {
      return Object.keys(this.displayedRecipes).length
    },
    toggleFilter(filterName) {
      const _this = this
      const filterIndex = this.currentFilter.indexOf(filterName)
      if (filterName === 'Toutes') {
        if (this.currentFilter.length > 0) {
          _this.filters.forEach(filter => {
            filter.state = (filter.name === 'Toutes') ?  true : false
          })
        }
        _this.currentFilter = []
      } else if (filterIndex === -1) {
        this.currentFilter.push(filterName)
        this.filters.find(x => x.name === 'Toutes').state = false
        this.filters.find(x => x.name === filterName).state = true
      }
      else {
        this.currentFilter.splice(filterIndex, 1)
        this.filters.find(x => x.name === filterName).state = false
        if (this.currentFilter.length === 0){
          this.filters.find(x => x.name === 'Toutes').state = true
        }
      }
    },
  },
});

export default

window.vm = vm
