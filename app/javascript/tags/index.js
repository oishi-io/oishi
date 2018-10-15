import Vue from 'vue/dist/vue.common';
import swal from 'sweetalert2';

const vm = new Vue({
  el: "#tags-index",
  data: {
    tags: gon.tags,
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
    destroyTag(tagId) {
      console.log(`/tags/${tagId}`)
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
            url: `/tags/${tagId}`,
            success() {
              window.location = '/tags/'
            },
          })
        }
      })
    },
  },
});

export default

window.vm = vm
