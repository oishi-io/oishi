import Vue from 'vue/dist/vue.common';
import iView from 'iview';
import locale from 'iview/src/locale/lang/en-US';
import draggable from 'vuedraggable';
import swal from 'sweetalert2';


Vue.use(iView, { locale });

var vm = new Vue({
  el: "#recipes-edit",
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
    hasMoved: false,
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
    checkNewMeasure(){
      const _this = this;
      const m = _this.newMeasure
      return m.ingredient.id !== null || _this.checkEditMeasure
    },
  },
  methods: {
    displayButtons(elt, eltId, value){
      const _this = this;
      const elementToDisplay = document.getElementById(elt + '_' + eltId);
      elementToDisplay.style.display = value;
    },
    addTags(tags){
      const _this = this;
      $.ajax({
        method: 'POST',
        url: '/recipes/'+ _this.recipe.slug + '/add_tags',
        data: {
          tags: tags,
        },
        success(data) {
          _this.tagsCount = _this.selectedTags.length;
          _this.successMessage()
        }
      })
    },
    addTools(tools){
      const _this = this;
      $.ajax({
        method: 'POST',
        url: '/recipes/'+ _this.recipe.slug + '/add_tools',
        data: {
          tools: tools,
        },
        success(data){
          _this.toolsCount = _this.selectedTools.length;
          _this.successMessage()
        }
      })
    },
    createTag(tag){
      const _this = this;

      $.ajax({
        method: 'POST',
        url: '/tags',
        data: {
          tag: {
            name: tag.name,
          }
        },
        success(data){
          _this.tags.push(data.tag);
          _this.newTag = {name: ''};
          _this.successMessage()
        }
      })
    },
    createTool(tool){
      const _this = this;

      $.ajax({
        method: 'POST',
        url: '/tools',
        data: {
          tool: {
            name: tool.name,
          },
        },
        success(data){
          _this.tools.push(data.tool);
          _this.newTool = {name: ''};
          _this.successMessage()
        }
      })
    },
    createIngredient(ingredient){
      const _this = this;

      $.ajax({
        method: 'POST',
        url: '/ingredients',
        data: {
          ingredient: {
            name: ingredient.name,
            description: ingredient.description,
          },
        },
        success(data){
          _this.ingredients.push(data.ingredient);
          _this.newIngredient = {name: '', description: ''};
          _this.successMessage()
        }
      })
    },
    createMeasure(measure){
      const _this = this;
      const order = (measure.order != null) ? measure.order : _this.measures.length + 1;
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
        success(data){
          _this.measures.push(data);
          _this.newMeasure = { quantity: null, text1: '', ingredient: { id: null, name: null }, text2: '', order: null};
          _this.checkEditMeasure = false;
          _this.successMessage()
        }
      })
    },
    setEditMeasure(measure, index){
      const _this = this;
      _this.newMeasure = measure;
      _this.checkEditMeasure = true;
    },
    editMeasure(measure) {
      const _this = this;
      $.ajax({
        method: 'PUT',
        url: '/recipes/' + _this.recipe.slug + '/measures/' + measure.measure_id,
        data: {
          measure: {
            recipe_id: _this.recipeId,
            quantity: measure.quantity,
            text_1: measure.text1,
            ingredient_id: measure.ingredient.id,
            text_2: measure.text2,
            order: measure.order,
          },
        },
        success(data){
          const index = _this.measures.map(x => x.measure_id).indexOf(data.measure_id)
          _this.measures.splice(index, 1, data)
          _this.newMeasure = { quantity: null, text1: '', ingredient: { id: null, name: null }, text2: '', order: null};
          _this.checkEditMeasure = false;
          _this.successMessage()
        }
      })
    },
    destroyMeasure(measure, index){
      const _this = this;
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
            success(data){
              Vue.delete(_this.measures, index);
              _this.successMessage()
            }
          })
        }
      })
    },
    checkMove(evt){
      const _this = this;

      _this.measures[evt.draggedContext.index].order = evt.draggedContext.futureIndex;
      _this.measures[evt.draggedContext.futureIndex].order = evt.draggedContext.index;
      _this.hasMoved = true;
    },
    saveOrder(){
      const _this = this;
      $.ajax({
        method: 'POST',
        data: {
          measures: _this.measures,
        },
        url: '/measures/save_order',
        success(){
          _this.hasMoved = false;
          _this.successMessage()
        }
      })
    },
    updateStep(step, index){
      const _this = this;
      console.log('before: ', _this.steps)
      $.ajax({
        method: 'POST',
        data: {
          step_id: step.id,
          text: step.text,
          order: step.order,
          recipe_id: step.recipe_id,
        },
        url: '/recipes/' + _this.recipe.slug + '/steps',
        success(data){
          _this.stepsLength[index] = data.step.text.length;
          _this.steps.splice(index, 1, data.step)
          _this.successMessage()
        },
      })
    },
    addStep(){
      const _this = this;
      const newIndex = _this.steps.length + 1;
      _this.steps.push({ id: null, order: newIndex, text: '', recipe_id: _this.recipeId });
      _this.stepsLength.push(0);
    },
    destroyStep(step, index){
      const _this = this;
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
            success(data){
              Vue.delete(_this.steps, index);
              _this.successMessage()
            }
          })
        }
      })
    },
    editRecipe(){
      const _this = this;
      $.ajax({
        method: 'PUT',
        url: '/recipes/' + _this.recipe.slug,
        data: {
          recipe: _this.recipe,
        },
        success(){
          _this.editBasics = false
          _this.successMessage()
        },
      })
    },
    destroyRecipe() {
      const _this = this;
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
    successMessage() {
      this.$Message.success('Sauvegardé!');
    },
  },
});

export default

window.vm = vm
