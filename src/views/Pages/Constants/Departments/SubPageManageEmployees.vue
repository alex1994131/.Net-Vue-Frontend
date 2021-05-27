<template>
  <v-form ref="form" lazy-validation>
    <v-row justify="center">
      <v-snackbar
        top
        v-model="alert.status"
        :color="alert.color"
        :timeout="alert.timeout"
      >{{ alert.txt }}
      </v-snackbar>
      <v-container>
        <v-row>
          <v-col cols="12" md="4">
            <v-select
              v-model="department"
              :items="GetDepartments"
              @change="sections = GetDepartments.find(dep => dep.id === department).sections,employee.role = '', roles = []"
              item-text="name"
              item-value="id"
              label="القسم"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="employee.section"
              :items="sections"
              @change="roles = getRoles.filter(role => role.section.id === employee.section),employee.role = ''"
              item-text="name"
              item-value="id"
              label="الشعبة"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field v-model="employee.name" placeholder="الموظف" label="الموظف" clearable/>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="employee.username"
              placeholder="إسم المستخدم"
              :rules="[requiredName('')]"
              label="إسم المستخدم"
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="employee.password"
              placeholder="كلمة المرور"
              label="كلمة المرور"
              type="password"
              :disabled="isEdit"
              :rules="[required('كلمة السر'), minLength('كلمة السر',6) , maxLength('كلمة السر', 20)]"
              clearable
            />
          </v-col>
          <v-col cols="12" md="4">
            <v-select
              v-model="employee.role"
              :items="roles"
              item-text="name"
              item-value="name"
              label="نوع الصلاحية"
              required
            ></v-select>
          </v-col>
          <v-row justify="center">
            <v-col cols="12" md="2">
              <v-card-actions v-if="!isEdit">
                <v-btn color=" primary" class="ma-1" @click="sendData" outlined>
                  <h3>إضافة</h3>
                </v-btn>
                <v-btn color=" primary" class="ma-4" @click="resetForm" outlined>
                  <h3>إخلاء</h3>
                </v-btn>
              </v-card-actions>
              <v-card-actions v-if="isEdit">
                <v-btn color=" primary" class="ma-1" @click="updateEmployeeDetails" outlined>
                  <h3>تحديث</h3>
                </v-btn>
                <v-btn color=" primary" class="ma-4" @click="resetForm" outlined>
                  <h3>إلغاء</h3>
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-data-table
              background-color="red"
              :headers="Header"
              :items="getEmployees"
              :items-per-page="5"
              class="elevation-1"
              dense
              :sort-by="['id']"
              :sort-desc="[true]">

              <template v-slot:item.actions="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon class="ma-2" v-on="on" @click="selectEmp(item)">mdi-pencil</v-icon>
                  </template>
                  <span>تعديل</span>
                </v-tooltip>

                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon
                      class="ma-2"
                      v-on="on"
                      :color="item.isEnabled ? 'green' : 'red'"
                      @click="handleUserStatus(item, !item.isEnabled)">mdi-account-key</v-icon>
                  </template>
                  <span>{{ item.isEnabled ? "تعطيل" : "تفعيل" }}</span>
                </v-tooltip>


                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-icon class="ma-2" v-on="on" :color="item.isHead ? 'green' : 'red'"
                      @click="handleUserPosition(item, !item.isHead)">mdi-account-switch</v-icon>
                  </template>
                  <span>{{ item.isHead ? "ليس رئيس مسؤول" : " رئيس قسم" }}</span>
                </v-tooltip>

              </template>
              <template v-slot:item.role="{ item }">{{ getRoleName(item.roleId) }}</template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="saveDialog = false"/>
  </v-form>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
export default {
  components: {
    responseDialog: () => import("../../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      isEdit: false,
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      department: null,
      roles: [],
      employee: {
        id: 0,
        name: "",
        role: "",
        username: "",
        password: "",
        section: "",
        enabled: "",
        head: "",
      },
      sections: [],
      Header: [
        {text: "القسم", value: "department"},
        {text: "الشعبة", value: "section"},
        {text: "الموظف", value: "name"},
        {text: "إسم المستخدم", value: "username"},
        {text: "الصلاحيات", value: "role"},
        {text: "الاجراء", value: "actions"},
      ],
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 2000,
      },

      requiredName(propertyType) {
        return (v) => (v && v.length > 0) || ` ادخل اسم المستخدم  ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} يجب أن تكون أكثر من ${minLength} `;
      },
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل   ${propertyType}`;
      }, maxLength(propertyType, maxLength) {
        return (v) =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن تكون أقل من ${maxLength} `;
      },
    };
  },
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("employees", ["getRoles", "getEmployees"]),
  },
  created() {
    this.fetchEmployees();
  },
  methods: {
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("employees", [
      "fetchRoles",
      "changeUserStatus",
      "changeUserPosition",
      "registerEmployee",
      "fetchEmployees",
      "updateEmployee",
    ]),

    sendData() {
      let message = "";
      let isValid = true;
      if (this.employee.role === "") {
        isValid = false;
        message = "يجب إضافة الصلاحية";
      }
      if (this.employee.password.trim() === "") {
        isValid = false;
        message = "يجب إضافة كلمة السر";
      }
      if (this.employee.username.trim() === "") {
        isValid = false;
        message = "يجب إضافة اسم المستخدم";
      }
      if (this.employee.name.trim() === "") {
        isValid = false;
        message = "يجب إضافة اسم الموظف";
      }
      if (!isValid) {
        return this.statAlert(true, message, "error");
      }
      else {
        let emp = {
          nid: Math.round(Math.random() * 999999),
          name: this.employee.name,
          username: this.employee.username,
          email: "email@gmail.com",
          password: this.employee.password,
          sectionId: this.employee.section,
          roleId: this.employee.role,
        };
        this.registerEmployee(emp)
          .then((resp) => {
            this.isSuccessSave = true;
            this.responseMessage = resp.message;
            this.saveDialog = true;
            this.resetForm();
            this.fetchEmployees();
          })
          .catch((err) => {
            this.isSuccessSave = false;
            this.responseMessage = err.message;
            this.saveDialog = true;
          });
      }
    },
    updateEmployeeDetails() {
      let emp = {
        Id: this.employee.id,
        Username: this.employee.username,
        Fullname: this.employee.name,
        sectionId: this.employee.section,
        RoleId: this.employee.role,
        isEnabled: true,
        isHead: false
      };
      console.log(emp);
      this.updateEmployee(emp)
        .then((resp) => {
          this.isEdit = false;
          this.isSuccessSave = true;
          this.fetchEmployees();
          this.responseMessage = resp.message;
          this.saveDialog = true;
          this.employee = {
            username: "",
            name: "",
            section: "",
            role: ""
          };
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
    getRoleName(id) {
      let role = this.getRoles.find((r) => r.id === id);
      return role !== undefined ? role.name : "";
    },
    resetForm() {
      this.employee.name = "";
      this.employee.username = "";
      this.department = "";
      this.employee.section = "";
      this.employee.password = "";
      this.sections = [];
      this.employee.role = "";
    },
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    selectEmp(item) {
      console.log(item.isEnabled)
      console.log(item.isHead)
      this.isEdit = true;
      this.employee.id = item.id;
      this.employee.username = item.username;
      this.employee.name = item.name;
      this.department = item.departmentId;
      this.sections = this.GetDepartments.find(
        (dep) => dep.id === this.department
      ).sections;
      this.employee.section = item.sectionId;
      this.roles = this.getRoles.filter(
        (role) => role.section.id === this.employee.section
      );
      this.employee.role = this.getRoleName(item.roleId);
    },

    handleUserStatus(user, status) {
      let emp = {
        Id: user.id,
        isEnabled: status,
        Username: user.username,
        Fullname: user.name,
        sectionId: user.sectionId,
        RoleId: this.getRoleName(user.roleId)
      };
      this.updateEmployee(emp)
        .then((resp) => {
          this.fetchEmployees();
          this.isSuccessSave = true;
          this.responseMessage = status ? 'تم تفعيل المستخدم' : 'تم تعطيل المستخدم';
          this.saveDialog = true;
          this.employee = {
            username: "",
            name: "",
            section: "",
            role: ""
          };
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },

    handleUserPosition(user, status) {
      let emp = {
        Id: user.id,
        isHead: status,
        isEnabled: status,
        Username: user.username,
        Fullname: user.name,
        sectionId: user.sectionId,
        RoleId: this.getRoleName(user.roleId)
      };
      this.updateEmployee(emp)
        .then((resp) => {
          this.fetchEmployees();
          this.isSuccessSave = true;
          this.responseMessage = status ? 'المستخدم رئيس قسم  ' : 'المستخدم ليس رئيس قسم';
          this.saveDialog = true;
          this.employee = {
            username: "",
            name: "",
            section: "",
            role: ""
          };
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
  },
};
</script>
