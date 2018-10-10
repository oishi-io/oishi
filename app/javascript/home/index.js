import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: '',
    typingTimer: 0,
    typingInterval: 500,
    isLoading: false,
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
      this.getLeftMargin();
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
      _this.isLoading = true;
      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: _this.query,
        },
        success: function(data) {
          console.log(data)
          _this.isLoading = false;
          _this.recipes = data.recipes;
          _this.recipesCount = data.recipes.length;
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

      this.leftMargin = margin > 0 ? `${(margin/2)}px` : 0;
      console.log(this.leftMargin)
    },
  },
});

export default

window.vm = vm
