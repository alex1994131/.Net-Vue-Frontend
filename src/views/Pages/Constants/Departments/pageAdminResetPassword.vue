

<template>
  <v-container id="user-22222" fluid tag="section">
    <!-- Sector Management & Form  -->

    <!-- Organization  -->
    <v-row justify="center">
      <v-col cols="12" md="11">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td style="background-color:#F6F6F6;">
                  <v-subheader>
                    <h1>إعادة تعيين كلمة المرور</h1>
                  </v-subheader>
                </td>
              </tr>

              <tr>
                <td>
                  <v-col cols="12" md="12">
                    <v-card>
                      <v-container>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="employee.username"
                            placeholder="إسم المستخدم"
                            label="إسم المستخدم"
                            :rules="[requiredName('')]"
                            clearable
                          />
                        </v-col>


                           <p v-if="!valid" style="color:red; font-size:20px; ">كلمات المرور غير متطابقة</p>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="employee.password"
                            placeholder="كلمة المرور"
                            label="كلمة المرور"
                            type="password"
                            clearable
                          />
                        </v-col>
                        <v-col cols="12" md="4">
                          <v-text-field
                            v-model="employee.password2"
                            placeholder="إعادة كلمة المرور"
                            label="إعادة كلمة المرور"
                            type="password"
                            clearable
                          />
                        </v-col>

                        <v-col cols="12" md="4">
                          <v-btn
                            color="primary"
                            style="margin-right:10px"
                            @click="resetPassword"
                            outlined
                          >
                            <h3>حفظ</h3>
                          </v-btn>
                        </v-col>
                      </v-container>
                    </v-card>
                  </v-col>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <LoginStatus :page="name" @input="assignPermissions" />
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeResponceDailog"
    />
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components: {
    responseDialog: () => import("../../Dialogs/DRespoonseDialog"),
    LoginStatus: () => import("../../SubComponenet/AuthorizationChacker"),
  },
  data() {
    return {
      name : "RESET_PASSWORD",
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      valid  : true,
      employee: {
        password: "",
        password2: "",
        username: "",
      },
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 2000,
      },
      requiredName(propertyType) {
        return (v) => (v && v.length > 0) || ` ادخل اسم المستخدم  ${propertyType}`;
      },
    };
  },

  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("employees", ["getRoles", "getEmployees"]),
  },

  methods: {
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("employees", [ "updatePasswordByAdmin"]
    ),
    closeResponceDailog(status){
        this.saveDialog = false;
    },
    assignPermissions(){},
    resetPassword() {

        if (this.employee.password != this.employee.password2)
        {
            this.valid = false;
            return;
        }

      this.updatePasswordByAdmin( { NewPassword : this.employee.password,username : this.employee.username })
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp;
          this.saveDialog = true;
          this.employee =  {
                password: "",
                password2: "",
                username: "",
          };
          
      
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },


    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },

  
}

  }
</script>
