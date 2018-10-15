import Vue from 'vue/dist/vue.common';
import swal from 'sweetalert2';

const vm = new Vue({
  el: "#ingredients-index",
  data: {
    ingredients: gon.ingredients,
  },
  watch: {
  },
  mounted() {
  },
  components: {
  },
  computed:{
  },
  methods: {
    destroyIngredient(ingredientId) {
      console.log(`/ingredients/${ingredientId}`)
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
        console.log(result)
        if (result.value) {
          console.log('go')
          $.ajax({
            method: 'DELETE',
            url: `/ingredients/${ingredientId}`,
            success() {
              window.location = '/ingredients/'
            },
          })
        }
      })
    },
  },
});

export default

window.vm = vm
