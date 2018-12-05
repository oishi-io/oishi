import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: gon.query,
    queryCached: gon.query,
    typingTimer: 0,
    typingInterval: 500,
    isLoading: false,
    recipesCount: gon.recipes.length,
  },
  watch: {
    query() {
      if (this.query && this.query !== this.queryCached) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.searchRecipes(), this.typingInterval);
      }
    },
  },
  mounted() {
  },
  components: {
  },
  computed:{
  },
  methods: {
    searchRecipes() {
      const _this = this;
      if(_this.query.length === 0) {
        return;
      }
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
          _this.isLoading = false;
          _this.recipesCount = data.recipes_count
          _this.recipes = data.recipes
          _this.queryCached = data.query
          _this.query = data.query
          window.history.pushState("object or string", "Title", `/?query=${_this.query}`)
        }
      })
    },
    recipeUrl(slug) {
      return `/recipes/${slug}`
    },
    clearQuery() {
      this.query = ''
      document.getElementById('landing-search').focus()
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
