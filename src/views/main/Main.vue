<template>
  <v-app>
    <login-core-view/>
  </v-app>
</template>

<script>
  export default {
    name: 'DashboardIndex',

    components: {
      LoginCoreView: () => import('../Pages/Login/LoginView'),
    },

    data: () => ({
      expandOnHover: false,
    }),
  }
</script>
