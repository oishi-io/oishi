import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: gon.query,
    typingTimer: 0,
    resizingTimer: 0,
    typingInterval: 500,
    resizingInterval: 200,
    isLoading: false,
    firstRender: true,
    windowWidth: 0,
    leftMargin: 0,
    recipesCount: 0,
    show: true,
    fadeInDuration: 1000,
    fadeOutDuration: 1000,
    maxFadeDuration: 1500,
    stop: true,
    screenHeight: 0,
    searchIsFocused: false,
    searchText: 'Recettes du moment',
  },
  watch: {
    query() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.searchRecipes(), this.typingInterval);
    },
    windowWidth() {
      if(this.firstRender){
        this.getLeftMargin()
        this.firstRender = false;
      } else {
        clearTimeout(this.resizingTimer);
        this.resizingTimer = setTimeout(() => this.getLeftMargin(), this.resizingInterval);
      }
    },
  },
  mounted() {
    this.windowWidth = window.innerWidth;
    this.screenHeight = screen.height;
    this.recipesCount = this.recipes.length;
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
        this.screenHeight = screen.height;
      });
    })
  },
  components: {
  },
  computed:{
  },
  methods: {
    searchFocus() {
      this.searchIsFocused = true
    },
    searchBlur() {
      this.searchIsFocused = false
      if(this.query.length > 0) {
        this.query = ''
      }
    },
    searchRecipes() {
      const _this = this;
      const recipeIds = _this.recipes.map(x => x.id)
      _this.isLoading = true;
      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: _this.query,
          recipeIds: recipeIds,
        },
        success(data) {
          console.log(data)
          _this.isLoading = false;
          _this.recipesCount = data.recipes_count
          _this.addRecipesFromData(data.to_add)
          _this.removeRecipesFromData(data.to_remove)
          window.history.pushState("object or string", "Title", `/?query=${_this.query}`);        }
      })
    },
    addRecipesFromData(recipeToAdd) {
      if (recipeToAdd.length > 0) {
        this.recipes = this.recipes.concat(recipeToAdd)
      }
    },
    removeRecipesFromData(recipeToRemove) {
      if (recipeToRemove.length > 0) {
        recipeToRemove.forEach((id) => {
          const index = this.recipes.map(x => x.id).indexOf(id)
          this.recipes.splice(index, 1)
        })
      }
    },
    getLeftMargin() {
      const cardLength = (this.windowWidth > 480) ? 270 : 230
      const scrollContainerWidth = (this.recipesCount * cardLength) + ((this.recipesCount - 1) * 10);
      const margin = this.windowWidth - scrollContainerWidth;

      this.leftMargin = margin > 0 ? `${(margin/2) - 5}px` : 0;
    },
    recipeUrl(slug) {
      return `/recipes/${slug}`
    },
    clearQuery() {
      this.query = ''
    },
    getQueryFromParams() {
      const _this = this
      const query = new URLSearchParams(window.location.search).get('query')

      if (query && query.length > 0) {
        _this.query = query
      }
    },
  },
});

window.onpopstate = () => {
  // const query = new URLSearchParams(window.location.search).get('query')
  window.location.reload()
}

export default

window.vm = vm
