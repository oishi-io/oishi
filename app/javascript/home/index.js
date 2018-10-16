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
      const recipesIds = _this.recipes.map(x => x.id)
      // _this.isLoading = true;
      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: _this.query,
          recipesIds: recipesIds,
        },
        success: function(data) {
          console.log(data)
          _this.isLoading = false;
          if(data.text === 'update') {
            _this.recipes = data.recipes;
            _this.recipesCount = data.recipes.length;
            _this.getLeftMargin();
          }
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
