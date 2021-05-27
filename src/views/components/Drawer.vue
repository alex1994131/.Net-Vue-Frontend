<template>
  <v-navigation-drawer
    id="core-navigation-drawer"
    v-model="drawer"
    :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
    :expand-on-hover="expandOnHover"
    :right="$vuetify.rtl"
    :src="barImage"
    mobile-break-point="960"
    app
    width="260"
    v-bind="$attrs"
    color="primary"
  >
    <template v-slot:img="props">
      <v-img />
      <p></p>
    </template>

    <v-divider class="mb-1" />

    <v-list dense nav>
      <v-list-item>
        <v-list-item-avatar class="align-self-center"  contain>
          <v-icon large dark>mdi-account-circle</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="display-1" />
          {{ getUserDetails.fullName }}

        </v-list-item-content>
      </v-list-item>

      <v-divider class="mb-2" />

      <v-list-item link :to="item.to" v-for="(item, i) in computedItems" :key="i">
        <v-list-item-avatar>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="display-1" />
          {{ item.title }}

        </v-list-item-content>

        <v-list-item-action>

          <v-chip color="#466B83" v-show="inboxCount(item.name)!=null" v-if="item.isCount">{{ inboxCount(item.name) }}</v-chip>

        </v-list-item-action>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>

  

</template>

<script>
// Utilities
import { mapActions, mapState, mapGetters } from "vuex";

export default {
  name: "DashboardCoreDrawer",
  props: {
    expandOnHover: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({


    count: [
      { name: "INCIDENTS", count: 0 },
      { name: "NOTIFICATIONS", count: 0},
      { name: "IP_IDENTITFICATION", count: 0 },
      { name: "INBOX", count: 0 },
    ],
    items: [
      {
        name: "DASHBOARD",
        icon: "mdi-view-dashboard",
        title: "لوحة التحكم",
        to: "/Dashboard",
      },
      {
        name: "NOTIFICATIONS",
        icon: "mdi-alert",
        title: "التنبيهات",
        to: "/dashboard/pages/Incidents/DisplayIncidents",
        isCount: true,
      },
      {
        name: "INCIDENTS",
        icon: "mdi-shield",
        title: "التنبيهات الواردة",
        to: "/dashboard/pages/Incidents/DisplayIsIncidents",
        isCount: true,
      },
      
      {
        name: "IP_IDENTITFICATION",
        icon: "mdi-plus-network",
        title: "إدارة طلبات التعريف",
        to: "/dashboard/pages/RequsetId/viewMain",
        isCount: true,
      },
      {
        name: "INBOX",
        icon: "mdi-bell-ring",
        title: "الوارد",
        to: "/dashboard/pages/tasks/EmployeeTask",
        isCount: true,
      },
      {
        name: "APTS",
        icon: "mdi-archive",
        title: "استعراض (APT)",
        to: "/dashboard/pages/APT/SearchAPT",
      },
      {
        name: "TASKS",
        icon: "mdi-text-box-check",
        title: "إدارة المهام",
        to: "/dashboard/pages/tasks/manageTasks",

      },
      {
        name: "ALL_TASKS",
        icon: "mdi-shape",
        title: "متابعة سير العمل",
        to: "/dashboard/pages/tasks/AllTasksPage",
      },
      {
        isShowToAll: true,
        name: "DEPARTMENT_TASKS",
        icon: "mdi-text-box",
        title: "مهام القسم",
        to: "/dashboard/pages/Tasks/DepartmentTasks",
      },
      {
        name: "MANAGE_SECTORS",
        icon: "mdi-server",
        title: " إدارة المؤسسات",
        to: "/dashboard/pages/Constants/Sectors",
      },
      // {
      //   name: "MANAGE_STATUS",
      //   icon: "mdi-clock",
      //   title: "إدارة الحالة",
      //   to: "/dashboard/pages/Constants/Status",
      // },
      {
        name: "MANAGE_USERS",
        icon: "mdi-account-multiple-plus-outline",
        title: "إدارة الأقسام",
        to: "/dashboard/pages/ManageDepartments",
      },
      {
        name: "MANAGE_ROLES",
        icon: "mdi-account-edit",
        title: "إدارة الصلاحيات",
        to: "/dashboard/pages/ManageRoles",
      },
      
      {
        name: "DASHBOARD",
        icon: " mdi-rocket",
        title: "الأفكار الابداعية",
        to: "/dashboard/pages/Ideas",
      },
      {
        name: "RESET_PASSWORD",
        icon: " mdi-account-key",
        title: "إعادة تعيين كلمة المرور",
        to: "/dashboard/Pages/ResetPassword",
      },
      {
        name: "ADMIN_RESET_PASSWORD",
        icon: "  mdi-key",
        title: "إدارة تغيير كلمات المرور",
        to: "/dashboard/Pages/AdminResetPassword",
      },
      //  {
      //   name: "DASHBOARD",
      //   icon: "  mdi-key",
      //   title: "الاعدادت",
      //   to: "/dashboard/Pages/settings",
      // },
      {
        isShowToAll: true,
        name: "LOGOUT",
        icon: "mdi-logout",
        title: "تسجيل الخروج",
        to: "/dashboard/pages/Logout",
      },
    ],
  }),

  computed: {
    ...mapState(["barColor", "barImage"]),
    ...mapGetters("employees", ["getRoles", "getUserRoles", "getUserDetails"]),
    ...mapGetters("ui", ["getCounts"]),
    drawer: {
      get() {
        return this.$store.state.settings.drawer;
      },
      set(val) {
        this.$store.commit("settings/SET_DRAWER", val);
      },
    },
    getPending() {
      return this.getAssignedTasks.filter((task) => task.isOpen);
    },
    computedItems() {
      let roles = this.getUserRoles;
      let r = roles.map((e) => e.type);
      return this.items
        .filter((item) => r.includes(item.name) || item.isShowToAll)
        .map(this.mapItem);
    },
    profile() {
      return {
        avatar: true,
        title: this.$t("avatar"),
      };
    },
  },
  created() {
    this.fetchRoles();
  },

  methods: {
    ...mapActions("ui", ["fetchCount"]),

    counts(tt) {
      if (tt == 0) return "0";
      return tt.length;
    },

    inboxCount(Name) {
      let n = this.count.find((c) => c.name == Name);
      if(n.name == "NOTIFICATIONS")
      return this.getCounts.notifications;
      if(n.name == "INCIDENTS")
      return this.getCounts.incidents;
      if(n.name == "INBOX")
      return this.getCounts.inbox
      if(n.name == "IP_IDENTITFICATION")
      return this.getCounts.ips;
    },

    mapItem(item) {
      return {
        ...item,
        children: item.children ? item.children.map(this.mapItem) : undefined,
        title: this.$t(item.title),
      };
    },
  },

  async created() {
    await this.fetchCount()
  },
};
</script>

<style lang="sass">
@import '~vuetify/src/styles/tools/_rtl.sass'

#core-navigation-drawer
  .v-list-group__header.v-list-item--active:before
    opacity: .24

    .v-list-item
      &__icon--text,
      &__icon:first-child
        justify-content: center
        text-align: center
        width: 20px


        +ltr()
        margin-right: 24px
        margin-left: 12px !important

        +rtl()
        margin-left: 24px
        margin-right: 12px !important

    .v-list--dense
      .v-list-item
        &__icon--text,
        &__icon:first-child
          margin-top: 10px

    .v-list-group--sub-group
      .v-list-item
        +ltr()
        padding-left: 8px

        +rtl()
        padding-right: 8px

      .v-list-group__header
        +ltr()
        padding-right: 0

        +rtl()
        padding-right: 0

        .v-list-item__icon--text
          margin-top: 19px
          order: 0

        .v-list-group__header__prepend-icon
          order: 2

          +ltr()
          margin-right: 8px

          +rtl()
          margin-left: 8px
</style>
