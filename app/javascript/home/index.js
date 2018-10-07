import Vue from 'vue/dist/vue.common';

const vm = new Vue({
  el: "#home",
  data: {
    recipes: gon.recipes,
    query: null,
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
        url: `/?query=${_this.query}`,
        data: {
          query: _this.query,
        },
        success: function(data) {
          console.log('return')
          _this.recipes = data.recipes;
        }
      })
    }
  },
});

export default

window.vm = vm
