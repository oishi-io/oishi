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
    newIngredient: {name: '', description: ''},
    newTag: {name: ''},
    newTool: {name: ''},
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
        success: function(data){
        }
      })
    },
    createTag: function(tag){
      $.ajax({
        method: 'POST',
        url: '/tags',
        data: {
          name: tag.name,
        },
        success: function(data){
          vm.tags.push(data.tag)
        }
      })
    },
    createTool: function(tool){
      $.ajax({
        method: 'POST',
        url: '/tools',
        data: {
          name: tool.name,
        },
        success: function(data){
          vm.tools.push(data.tool)
        }
      })
    },
    createIngredient: function(name){
      $.ajax({
        method: 'POST',
        url: '/ingredients',
        data: {
          name: name,
        },
        success: function(data){
          vm.ingredients.push(data.ingredient)
        }
      })
    },
  },
});

window.vm = vm
