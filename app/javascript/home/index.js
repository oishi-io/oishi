import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: '',
    typingTimer: 0,
    typingInterval: 500,
  },
  watch: {
    query() {
      // const _this = this;
      // if (_this.query.length > 2) {
        clearTimeout(this.typingTimer);
        this.typingTimer = setTimeout(() => this.searchRecipes(), this.typingInterval);
      // }
    },
  },
  components: {
  },
  computed:{
  },
  methods: {
    searchRecipes() {
      const _this = this;
      $.ajax({
        method: 'GET',
        url: `/`,
        data: {
          query: _this.query,
        },
        success: function(data) {
          _this.recipes = data.recipes;
        }
      })
    }
  },
});

export default

window.vm = vm
