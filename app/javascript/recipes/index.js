import Vue from 'vue/dist/vue.common';
import iView from 'iview';
import locale from 'iview/src/locale/lang/en-US';

Vue.use(iView, { locale });

var vm = new Vue({
  el: "#recipe_add_details",
  data: {
    recipeId: gon.recipeId,
    tools: gon.tools,
    tags: gon.tags,
    selectedTags: gon.selectedTags,
    selectedTools: gon.selectedTools,
    tagName: '',
    toolName: '',
  },
  mounted: function(){

  },
  computed: {

  },
  methods: {
    addTags: function(tags){
      let _this = this;
      $.ajax({
        method: 'POST',
        url: '/recipes/'+ _this.recipeId + '/add_tags',
        data: {
          tags: tags,
        },
        success: function(data) {
        }
      })
    },
    addTools: function(tools){
      let _this = this;
      console.log(tools)
      $.ajax({
        method: 'POST',
        url: '/recipes/'+ _this.recipeId + '/add_tools',
        data: {
          tools: tools,
        },
        success: function(data) {
        }
      })
    },
  },
});

window.vm = vm
