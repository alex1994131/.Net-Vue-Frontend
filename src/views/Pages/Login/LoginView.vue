<template>
  <v-container id="user-22222" fluid tag="section">
    {{ isLoggedOut() }}
    <v-row justify="center">
      <!-- <v-col cols="12" md="2">
        <v-img :aspect-ratio="16/9" src="./3.png"></v-img>
      </v-col> -->
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="4">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td style="background-color: #f6f6f6; text-align: center">
                  <v-row justify="center">
                    <v-subheader>
                      <h1>تسجيل الدخول</h1>
                    </v-subheader>
                  </v-row>
                  <v-card>
                    <v-row justify="center">
                      <v-col cols="12" md="5">
                        <v-text-field v-model="Employee.username" label="إسم المستخدم" />
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" md="5">
                        <v-text-field
                          v-model="Employee.password"
                          class="purple-input"
                          label="كلمة المرور"
                          type="password"
                          @keyup.enter="log"
                        />
                      </v-col>
                    </v-row>
                    <v-row justify="center">
                      <v-col cols="12" md="5" class="text-center">
                        <v-btn color="primary" class="mr-0" @click="log">دخول</v-btn>
                      </v-col>
                    </v-row>
                  </v-card>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>

    <LoginStatus :page="name" @input="assignPermissions" />

    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="headline">تنبيه</v-card-title>

        <v-card-text>{{ text }}</v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">حسنا</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  

    <v-footer><v-row justify="center">
        <h4 style="color:#294d68">فريق التطوير البرمجي 2021</h4>
      </v-row>
      <v-row justify="center">
        <h4 style="color:#37474F">النسخة الأولى :2021</h4>
      </v-row>
      <v-row justify="center">
        <h4 style="color:#294d68">الدعم الفني : 66752 - 68127</h4>
      </v-row>
    </v-footer>
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import vue from "vue";

export default {
  components: {
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
  },

  props: ["overlay"],
  data() {
    return {
      name: "LoginView",
      dialog: false,
      text: "",
      isHidden: true,
      Employee: {
        username: "",
        password: "",
      },
    };
  },

  methods: {
    ...mapMutations("settings", ["SET_DRAWER"]),
    ...mapActions("employees", ["login"]),
    ...mapActions("ui", ["fetchCount"]),
    isLoggedOut() {
      let st = localStorage.getItem("isLoggedOut");
      console.log(st);
      if (st) {
        localStorage.removeItem("isLoggedOut");
        window.location.reload();
      }
    },
    assignPermissions() {},
    methodThatForcesUpdate() {
      // ...
      //this. $forceUpdate ();
      // ...
    },
    async log() {
      //vue.forceUpdate();
      await this.login(this.Employee)
        .then(
          (resp) => {
            this.fetchCount();
            this.SET_DRAWER(true);
            this.overlay = false;
            this.$router.push("/dashboard");
          },
          (err) => {
            this.text = err;
            this.dialog = true;
          }
        )
        .catch((err) => {});
    },
  },

  created() {
    this.SET_DRAWER(false);
  },
};
</script>
