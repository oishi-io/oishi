import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: '',
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
      const recipeIds = _this.recipes.map(x => x.id)
      // _this.isLoading = true;
      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: _this.query,
          recipeIds: recipeIds,
        },
        success: function(data) {
          console.log(data)
          _this.isLoading = false;

          if (data.to_remove.length > 0) {
            data.to_remove.forEach( (id) => {
              const index = _this.recipes.map(x => x.id).indexOf(id)
              _this.recipes.splice(index, 1)
            })
          }

          if (data.to_add.length > 0) {
            _this.recipes = _this.recipes.concat(data.to_add)
          }

          _this.recipesCount = _this.recipes.length;
          _this.getLeftMargin();
        }
      })
    },
    getScreenHeight() {
      return `${screen.availHeight}px`;
    },
    getLeftMargin() {
      const scrollContainerWidth = (this.recipesCount * 250) + ((this.recipesCount - 1) * 20);
      const margin = this.windowWidth - scrollContainerWidth;

      this.leftMargin = margin > 0 ? `${(margin/2) - 5}px` : 0;
      console.log(this.leftMargin)
    },
  },
});

export default

window.vm = vm
