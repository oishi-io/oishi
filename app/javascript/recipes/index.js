import Vue from 'vue/dist/vue.common';
import iView from 'iview';
import locale from 'iview/src/locale/lang/en-US';
import draggable from 'vuedraggable';
import swal from 'sweetalert2';


Vue.use(iView, { locale });

var vm = new Vue({
  el: "#recipe-add-details",
  data: {
    recipeId: gon.recipeId,
    recipe: gon.recipe,
    tools: gon.tools,
    tags: gon.tags,
    measures: gon.measures,
    ingredients: gon.ingredients,
    steps: gon.steps,
    selectedTags: gon.selectedTags,
    selectedTools: gon.selectedTools,
    newIngredient: { name: '', description: '' },
    newMeasure: { measure_id: null, quantity: null, text1: '', ingredient: { id: null, name: null }, text2: '', order: null},
    newTag: {name: ''},
    newTool: {name: ''},
    checkEditMeasure: false,
    hasmoved: false,
    tagsCount: gon.selectedTags.length,
    toolsCount: gon.selectedTools.length,
    stepsLength: gon.stepsLength,
    editBasics: false,
    selectedRecipeSlug: gon.recipe.slug,
    recipes: gon.recipes,
  },
  components: {
    draggable
  },
  watch: {
    selectedRecipeSlug() {
      this.changeRecipe();
    }
  },
  computed:{
    checkNewMeasure: function(){
      let _this = this;
      let m = _this.newMeasure
      return m.text1 !== '' && m.ingredient.id !== null || _this.checkEditMeasure == true
    },
  },
  methods: {
    displayButtons: function(elt, eltId, value){
      let _this = this;
      let elementToDisplay = document.getElementById(elt + '_' + eltId);
      elementToDisplay.style.display = value;
    },
    addTags: function(tags){
      let _this = this;
      $.ajax({
        method: 'POST',
        url: '/recipes/'+ _this.recipe.slug + '/add_tags',
        data: {
          tags: tags,
        },
        success: function(data) {
          _this.tagsCount = _this.selectedTags.length;
        }
      })
    },
    addTools: function(tools){
      let _this = this;
      $.ajax({
        method: 'POST',
        url: '/recipes/'+ _this.recipe.slug + '/add_tools',
        data: {
          tools: tools,
        },
        success: function(data){
          _this.toolsCount = _this.selectedTools.length;
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
          tool: {
            name: tool.name,
          },
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
          ingredient: {
            name: ingredient.name,
            description: ingredient.description,
          },
        },
        success: function(data){
          vm.ingredients.push(data.ingredient);
          vm.newIngredient = {name: '', description: ''};
        }
      })
    },
    createMeasure: function(measure){
      let _this = this;
      let order = (measure.order != null) ? measure.order : _this.measures.length + 1;
      $.ajax({
        method: 'POST',
        url: '/recipes/' + _this.recipe.slug + '/measures',
        data: {
          measure: {
            measure_id: measure.measure_id,
            recipe_id: _this.recipeId,
            quantity: measure.quantity,
            text_1: measure.text1,
            ingredient_id: measure.ingredient.id,
            text_2: measure.text2,
            order: order,
          },
        },
        success: function(data){
          _this.measures.push(data);
          _this.newMeasure = { quantity: null, text1: '', ingredient: { id: null, name: null }, text2: '', order: null};
          _this.checkEditMeasure = false;
        }
      })
    },
    setEditMeasure: function(measure, index){
      let _this = this;
      _this.newMeasure = measure;
      _this.checkEditMeasure = true;
    },
    editMeasure(measure) {
      let _this = this;
      $.ajax({
        method: 'PUT',
        url: '/recipes/' + _this.recipe.slug + '/measures/' + measure.measure_id,
        data: {
          measure: {
            measure_id: measure.measure_id,
            recipe_id: _this.recipeId,
            quantity: measure.quantity,
            text_1: measure.text1,
            ingredient_id: measure.ingredient.id,
            text_2: measure.text2,
            order: measure.order,
          },
        },
        success: function(data){
          const index = _this.measures.map(x => x.measure_id).indexOf(data.measure_id)
          _this.measures.splice(index, 1, data)
          _this.newMeasure = { quantity: null, text1: '', ingredient: { id: null, name: null }, text2: '', order: null};
          _this.checkEditMeasure = false;
        }
      })
    },
    destroyMeasure(measure, index){
      let _this = this;
      swal({
        title: 'T\'es sûr?',
        text: "La suppression est définitive",
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) {
          $.ajax({
            method: 'DELETE',
            url: '/recipes/' + _this.recipe.slug + '/measures/' + measure.measure_id,
            success: function(data){
              Vue.delete(_this.measures, index);
            }
          })
        }
      })
    },
    checkMove: function(evt){
      let _this = this;
      _this.measures[evt.draggedContext.index].order = evt.draggedContext.futureIndex;
      _this.measures[evt.draggedContext.futureIndex].order = evt.draggedContext.index;
      _this.hasmoved = true;
    },
    saveOrder: function(){
      let _this = this;
      $.ajax({
        method: 'POST',
        data: {
          measures: _this.measures,
        },
        url: '/measures/save_order',
        success: function(){
          _this.hasmoved = false;
        }
      })
    },
    updateStep: function(step, index){
      let _this = this;
      $.ajax({
        method: 'POST',
        data: {
          step_id: step.id,
          text: step.text,
          order: step.order,
          recipe_id: step.recipe_id,
        },
        url: '/recipes/' + _this.recipe.slug + '/steps',
        success: function(){
          _this.stepsLength[index] = step.text.length;
          vm.$forceUpdate();
        },
      })
    },
    addStep: function(){
      let _this = this;
      let newIndex = _this.steps.length + 1;
      _this.steps.push({ id: null, order: newIndex, text: '', recipe_id: _this.recipeId });
      _this.stepsLength.push(0);
    },
    destroyStep: function(step, index){
      let _this = this;
      swal({
        title: 'T\'es sûr?',
        text: "La suppression est définitive",
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) {
          $.ajax({
            method: 'DELETE',
            url: '/recipes/' + _this.recipe.slug + '/steps/' + step.id,
            success: function(data){
              Vue.delete(_this.steps, index);
            }
          })
        }
      })
    },
    editRecipe: function(){
      let _this = this;
      $.ajax({
        method: 'PUT',
        url: '/recipes/' + _this.recipe.slug,
        data: {
          recipe: _this.recipe,
        },
        success: function(){
          _this.editBasics = false
        },
      })
    },
    destroyRecipe() {
      let _this = this;
      swal({
        title: 'T\'es sûr?',
        text: "La suppression est définitive",
        type: 'error',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Supprimer',
        cancelButtonText: 'Annuler',
      }).then((result) => {
        if (result.value) {
          $.ajax({
            method: 'DELETE',
            url: '/recipes/' + _this.recipe.slug,
            success() {
              window.location = '/recipes/'
            },
          })
        }
      })
    },
    addRecipe() {
      window.location = '/recipes/new'
    },
    changeRecipe() {
      window.location = `/recipes/${this.selectedRecipeSlug}/edit`
    },
  },
});

export default

window.vm = vm
