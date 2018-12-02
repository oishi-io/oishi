import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: gon.query,
    queryCached: gon.query,
    typingTimer: 0,
    resizingTimer: 0,
    typingInterval: 500,
    resizingInterval: 200,
    isLoading: false,
    firstRender: true,
    windowWidth: 0,
    leftMargin: 0,
    recipesCount: 0,
  },
  watch: {
    query() {
      if (this.query && this.query !== this.queryCached) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.searchRecipes(), this.typingInterval);
      }
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
    this.recipesCount = this.recipes.length;
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.windowWidth = window.innerWidth;
      });
    })
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
          console.log(data)
          _this.isLoading = false;
          _this.recipesCount = data.recipes_count
          _this.recipes = data.recipes
          _this.queryCached = data.query
          _this.query = data.query
          _this.getLeftMargin()
          window.history.pushState("object or string", "Title", `/?query=${_this.query}`)
        }
      })
    },
    getLeftMargin() {
      const cardLength = (this.windowWidth > 480) ? 280 : 230
      const scrollContainerWidth = (this.recipesCount * cardLength) + ((this.recipesCount - 1) * 10);
      const margin = this.windowWidth - scrollContainerWidth;

      this.leftMargin = margin > 0 ? `${(margin/2) - 10}px` : 0;
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
