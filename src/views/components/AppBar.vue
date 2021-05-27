<template>
  <v-app-bar id="app-bar" absolute app color="transparent" flat height="75">
    <v-btn class="mr-3" elevation="1" fab small @click="setDrawer(!drawer)">
      <v-icon v-if="!drawer"> mdi-view-quilt </v-icon>

      <v-icon v-else> mdi-dots-vertical </v-icon>
    </v-btn>

    <v-toolbar-title
      class="font-weight-bold"
      style="margin-right: 10px; font-size: 15px; margin-left:400px"
      v-text="$route.name"
    />

    <!-- <div class="row">
      <div class="column1">
        <v-img style="margin-top: 35px" src="./4.png"> </v-img>
      </div>
      <div class="column">
        <v-img src="./5.png"> </v-img>
      </div>
    </div> -->

    <v-spacer />

    <div class="mx-3" />

    <v-menu
      bottom
      left
      offset-y
      origin="top right"
      transition="scale-transition"
    >
      <v-list :tile="false" nav>
        <div class="center">
          <app-bar-item v-for="(n, i) in notifications" :key="`item-${i}`">
            <v-list-item-title v-text="n" />
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>
  </v-app-bar>
</template>

<script>
// Components
import { VHover, VListItem } from "vuetify/lib";

// Utilities
import { mapState, mapMutations } from "vuex";

export default {
  name: "DashboardCoreAppBar",

  components: {
    AppBarItem: {
      render(h) {
        return h(VHover, {
          scopedSlots: {
            default: ({ hover }) => {
              return h(
                VListItem,
                {
                  attrs: this.$attrs,
                  class: {
                    "black--text": !hover,
                    "white--text secondary elevation-12": hover,
                  },
                  props: {
                    activeClass: "",
                    dark: hover,
                    link: true,
                    ...this.$attrs,
                  },
                },
                this.$slots.default
              );
            },
          },
        });
      },
    },
  },

  props: {
    value: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    notifications: [
      "Mike John Responded to your email",
      "You have 5 new tasks",
      "You're now friends with Andrew",
      "Another Notification",
      "Another one",
    ],
  }),

  computed: {
    ...mapState("settings", ["drawer"]),
  },

  methods: {
    ...mapMutations("settings", { setDrawer: "SET_DRAWER" }),
  },
};
</script>
<style scoped>
.column {
  float: left;
  margin-top: 15px;
  width: 9%;
  padding: 5px;
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-delay: -2s;
}
.column1 {
  float: left;
  width: 20.33%;
  padding: 5px;
}

/* Clearfix (clear floats) */
.row {
  float: left;
  align-content: left;
  display: table;
   overflow: auto;
  
 
}

@keyframes example {
  50% {
    right: 600px;
    top: 0px;
  }
  75% {
    right: 0px;
    top: 0px;
  }
}
</style>
