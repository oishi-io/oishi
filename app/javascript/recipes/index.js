import Vue from 'vue/dist/vue.common';
import iView from 'iview';
import localeIview from 'iview/src/locale/lang/en-US';
Vue.use(iView, {
  localeIview
});

var vm = new Vue({
  el: "#recipe_add_details",
  data: {
    tools: gon.tools,
    tags: gon.tags,
    selectedTags: [],
    selectedTools: [],
  },
  mounted: function(){

  },
  computed: {

  },
  methods: {

  },
});

window.vm = vm
