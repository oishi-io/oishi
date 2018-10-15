import Vue from 'vue/dist/vue.common';
import swal from 'sweetalert2';

const vm = new Vue({
  el: "#tools-index",
  data: {
    tools: gon.tools,
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
    destroyTool(toolId) {
      console.log(`/tools/${toolId}`)
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
            url: `/tools/${toolId}`,
            success() {
              window.location = '/tools/'
            },
          })
        }
      })
    },
  },
});

export default

window.vm = vm
