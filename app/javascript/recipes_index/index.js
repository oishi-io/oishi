import Vue from 'vue/dist/vue.common'

const vm = new Vue({
  el: "#recipes-index",
  data: {
    recipesCache: gon.recipes,
    displayedRecipes: gon.recipes,
    filters: [
      { name: 'Toutes',
        state: true,
      },
      { name: 'Végétariennes',
        state: false,
      },
      { name: 'En moins de 30min',
        state: false,
      },
    ],
    filtersCache: [
      { name: 'Toutes',
        state: true,
      },
      { name: 'Végétariennes',
        state: false,
      },
      { name: 'En moins de 30min',
        state: false,
      },
    ],
    currentFilter: [],
  },
  components: {
  },
  watch: {
    currentFilter() {
      const _this = this
      if (this.currentFilter.length > 0) {
        let filteredRecipes = {}
        Object.keys(this.displayedRecipes).forEach(letter => {
          _this.displayedRecipes[letter].forEach( recipe => {
            console.log('Tags: ', recipe.tags)
            console.log('Filters: ', _this.currentFilter)
            if (recipe.tags.some(tag => _this.currentFilter.indexOf(tag) >= 0)) {
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
        _this.displayedRecipes = _this.recipesCache
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
      const filterIndex = this.currentFilter.indexOf(filterName)
      if (filterName === 'Toutes') {
        this.currentFilter = []
        this.filters = this.filtersCache
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
