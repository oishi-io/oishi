import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: '',
    typingTimer: 0,
    typingInterval: 500,
    isLoading: false,
  },
  watch: {
    query() {
      clearTimeout(this.typingTimer);
      this.typingTimer = setTimeout(() => this.searchRecipes(), this.typingInterval);
    },
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
          _this.isLoading = false;
          _this.recipes = data.recipes;
        }
      })
    },
    getScreenHeight() {
      return `${screen.availHeight - 10}px`;
    },
  },
});

export default

window.vm = vm
