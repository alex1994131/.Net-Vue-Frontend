import Vuex from 'vuex';
import Vue from 'vue';
import tasks from './modules/tasks';
import employees from './modules/employees';
import incidents from './modules/Incidents';
import settings from './modules/settings'
import apt from './modules/apt'
import organization from './modules/organization'
import country from './modules/country'
import attachments from './modules/attachments'
import StatusStore from './modules/StatusStore'
import departments from './modules/departments'
import ui from './modules/ui'
import category from './modules/category'
import requsetIds from './modules/requsetIds'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasks,
    apt,
    settings,
    country,
    employees,
    incidents,
    attachments,
    StatusStore,
    departments,
    organization,
    ui,
    requsetIds,
    category

  }
});




