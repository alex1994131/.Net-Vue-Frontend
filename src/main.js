
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/base'
import './plugins/chartist'
import './plugins/vee-validate'
import vuetify from './plugins/vuetify'
import i18n from './i18n'
import UploadButton from 'vuetify-upload-button';
import 'babel-polyfill'

import VueSimpleAlert from "vue-simple-alert";
import VuetifyTable from "vuetify-datatable-extended";
import enLang from 'element-ui/lib/locale/lang/en'
import './sass/elemnt.scss'
import '@progress/kendo-ui'
import '@progress/kendo-theme-default/dist/all.css'
import { Chart,
  ChartSeriesItem,
  Sparkline,
  SparklineSeriesItem,
  StockChart,
  ChartInstaller } from '@progress/kendo-charts-vue-wrapper'
import Cookies from 'js-cookie'
import Element from 'element-ui'
Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  locale: enLang
});


Vue.use(VuetifyTable);
Vue.use(VueSimpleAlert);

Vue.use(UploadButton);
import Vueditor from 'vueditor'

import 'vueditor/dist/style/vueditor.min.css'

Vue.config.productionTip = false

let config = {
  toolbar: [
    'removeFormat', 'undo', '|', 'elements', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider',
    'bold', 'italic', 'underline', 'strikeThrough', 'links', 'divider', 'subscript', 'superscript',
    'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull', '|', 'indent', 'outdent',
    'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'tables', '|', 'switchView','emoji'
  ],
  fontName: [
    {val: 'arial black'},
    {val: 'times new roman'},
    {val: 'Courier New'}
  ],
  emoji: ["1f600", "1f601", "1f602", "1f923", "1f603"],
  fontSize: ['12px', '14px', '16px', '18px', '0.8rem', '1.0rem', '1.2rem', '1.5rem', '2.0rem'],
  uploadUrl: ''


};

Vue.use(Vueditor, config);

new Vue({
  router,
  store,
  vuetify,
  i18n,
  render: h => h(App),
}).$mount('#app')


