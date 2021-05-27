<template>
  <v-container id="user-22222" fluid tag="section"></v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
export default {
  props: {
    page: {
      type: String,
    },
    operation: {
      type: String,
    },
  },

  data() {
    return {};
  },

  computed: {
    ...mapGetters("employees", [
      "getResponse",
      "getLogginStatus",
      "getUserRoles",
    ]),
  },
  methods: {
    ...mapMutations("settings", ["SET_DRAWER"]),
    ...mapActions("employees", ["login", "checkAuthorizationChacker"]),
  },
  created() {
    let user = localStorage.getItem("token");
    let isValid = false;
    let ops = [];
    if (user != null) {
      this.checkAuthorizationChacker().then(code =>
      {
        this.SET_DRAWER(true);
       this.page == "LoginView" ? this.$router.push({name : "لوحة التحكم"}) : ""
      }
      ).catch((err) => this.page != "LoginView" ?  this.$router.push("/") : "");
      
      console.log("page",this.page);

      let permissions = this.getUserRoles;

      isValid = permissions.map((c) => c.type).includes(this.page);
      if (isValid) {
        ops = permissions.find((c) => c.type == this.page).values;
        this.operation != undefined
          ? (isValid = ops.includes(this.operation))
          : (isValid = true);
          }

      if (isValid) {
        this.$emit("input", ops);
      } else {
        this.$router.push({ name: "NotFoundPage" });
      }
    } else {
      this.page != "LoginView" ? this.$router.push("/") : "";
    }
  },
};
</script>
