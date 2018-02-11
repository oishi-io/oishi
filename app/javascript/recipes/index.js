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
    measures: gon.measures,
    ingredients: gon.ingredients,
    selectedTags: gon.selectedTags,
    selectedTools: gon.selectedTools,
    newIngredient: { name: '', description: '' },
    newMeasure: { quantity: null, text1: '', ingredientId: null, text2: ''},
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
          tag: {
            name: tag.name,
          }
        },
        success: function(data){
          vm.tags.push(data.tag);
          vm.newTag = {name: ''};
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
          vm.tools.push(data.tool);
          vm.newTool = {name: ''};
        }
      })
    },
    createIngredient: function(ingredient){
      $.ajax({
        method: 'POST',
        url: '/ingredients',
        data: {
          name: ingredient.name,
          description: ingredient.description,
        },
        success: function(data){
          vm.ingredients.push(data.ingredient);
          vm.newIngredient = {name: '', description: ''};
        }
      })
    },
    createMeasure: function(measure){
      let _this = this;
      $.ajax({
        method: 'POST',
        url: '/recipes/' + _this.recipeId + '/measures',
        data: {
          measure: {
            quantity: measure.quantity,
            text_1: measure.text1,
            ingredient_id: measure.ingredientId,
            text_2: measure.text2,
          },
        },
        success: function(data){
          let id = Object.keys(data)[0];
          vm.measures[id] = data[id];
          vm.newMeasure = { quantity: null, text1: '', ingredientId: null, text2: ''};
        }
      })
    },
  },
});

window.vm = vm
