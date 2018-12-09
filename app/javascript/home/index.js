import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: '',
    queryCached: '',
    typingTimer: 0,
    typingInterval: 500,
    isLoading: false,
    recipesCount: gon.recipes.length,
    tags: gon.tags,
    filters: [
      {
        name: 'Recettes du moment',
        state: true,
      },
      {
        name: 'Faciles',
        state: false,
      },
      {
        name: 'Végétariennes',
        state: false,
      },
      {
        name: 'Moins de 30min',
        state: false,
      },
    ],
    fromFilter: false,
    queryParams: '',
  },
  mounted() {
    this.fromFilter = new URLSearchParams(window.location.search).get('filter') == 'true'
    this.queryParams = new URLSearchParams(window.location.search).get('query')
    this.setQueryOnLoad()
    this.setFilterOnLoad()
  },
  watch: {
    query() {
      if (this.query &&
          this.query !== this.queryCached &&
          window.innerWidth >= 768) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.searchRecipes(), this.typingInterval);
      }
    },
  },
  methods: {
    searchRecipes() {
      const _this = this;
      if(_this.query.length === 0) {
        return;
      }
      _this.isLoading = true;
      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: _this.query,
        },
        success(data) {
          _this.isLoading = false;
          _this.recipesCount = data.recipes_count
          _this.recipes = data.recipes
          _this.queryCached = data.query
          _this.query = data.query
          _this.removeFilter()
          window
            .history
            .pushState(
              "object or string",
              "Title",
              `/?query=${_this.query}&filter=false`
            )
        }
      })
    },
    searchRecipesFromFilter(filterName) {
      const _this = this;
      _this.isLoading = true;

      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: filterName,
        },
        success(data) {
          _this.isLoading = false;
          _this.recipesCount = data.recipes_count
          _this.recipes = data.recipes
          _this.query = ''
          _this.queryCached = ''
          window
            .history
            .pushState(
              "object or string",
              "Title",
              `/?query=${filterName}&filter=true`
            )
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
    toggleFilter(filterName) {
      this.filters.forEach(filter => {
        if (filter.name === filterName){
          filter.state = true
          this.searchRecipesFromFilter(filterName)
        } else {
          filter.state = false
        }
      })
    },
    removeFilter() {
      this.filters.forEach(filter => filter.state = false)
    },
    setQueryOnLoad() {
      if (!this.fromFilter) {
        this.query = gon.query
        this.queryCached = gon.query
      }
    },
    setFilterOnLoad() {
      if (this.fromFilter) {
        this.filters.forEach(filter => {
          if (filter.name === this.queryParams){
            filter.state = true
          } else {
            filter.state = false
          }
        })
      }
    }
  },
});

window.onpopstate = () => {
  // const query = new URLSearchParams(window.location.search).get('query')
  window.location.reload()
}

export default

window.vm = vm
