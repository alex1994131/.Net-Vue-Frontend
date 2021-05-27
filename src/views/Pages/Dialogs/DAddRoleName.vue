<template>
  <v-dialog v-model="status" persistent max-width="690">
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="saveDialog = false"
    />
    <v-card class="grey lighten-3">
      <!-- {{ sections }} -->
      <form>
        <v-card-title class="headline">إدارة الصلاحيات</v-card-title>
        <!-- Content -->
        <section id="secContManage" class="my-8 pa-8">
          <v-select
            v-model="department"
            :items="GetDepartments"
            @change="sections = GetDepartments.find(dep => dep.id == department).sections"
            item-text="name"
            item-value="id"
            label="القسم"
            required
          ></v-select>
          <v-select
            v-model="role.section.id"
            :items="sections"
            item-text="name"
            item-value="id"
            label="القسم"
            required
          ></v-select>
          <v-text-field @keyup.enter="AddSection" v-model="role.name" placeholder="اسم صلاحية المستخدم" solo></v-text-field>
          <v-btn class="ma-2" color="light primary" @click="AddSection" fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <!-- load new sectors -->
          <v-chip
            :color="section.isNew ? 'gray' : 'primary'"
            class="ma-2"
            v-for="(section,i) in rolesList"
            :key="`sn${i}`"
            close
            @click:close="deleteSector(i)"
          >{{section.name}}</v-chip>
        </section>
        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>

          <v-btn color="primary darken-1" large text @click="saveNewRoles">
            <span>حفظ</span>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
          <v-btn large color="red darken-1" text @click="closeForm">
            <span>غلق</span>
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>
      </form>
    </v-card>
    <!-- Alerts  -->
    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
    >{{ alert.txt }}</v-snackbar>
  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  components: {
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  props: {
    status: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    saveDialog: false,
    responseMessage: "",
    isSuccessSave: false,
    sections: [],
    rolesList: [],
    role: {
      name: "",
      section: { id: "", name: "" },
    },
    department: null,
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000,
    },
  }),
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("employees", ["getRoles"]),
    ...mapState("employees", ["roles"]),
  },
  watch: {
    status(n) {
      if (n == true) {
        this.roles.forEach((role) =>
          this.rolesList.push({
            nid: Math.round(Math.random() * 999999),
            name: role.name,
            section: role.section,
            isNew: false,
          })
        );
      }
    },
  },
  methods: {
    ...mapActions("employees", ["saveRoles"]),

    AddSection() {
      const roleName = this.role.name;
      if (!roleName || !roleName.trim())
        return this.statAlert(true, "ادخل اسم الدور بالشكل الصحيح", "error");

      if (
        this.getRoles.some((r) => r.name == roleName) ||
        this.rolesList.some((r) => r.name == roleName)
      )
        return this.statAlert(true, "يوجد دور بهذا الإسم", "error");

      this.rolesList.push({
        nid: Math.round(Math.random() * 999999),
        name: roleName,
        isNew: true,
        section: { id: this.role.section.id },
      });
      this.roleName = null;
    },
    // Delete Sector
    deleteSector(index) {
      this.rolesList.splice(index, 1);
    },
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    // Save the new sectors to vuex
    saveNewRoles() {
      this.saveRoles(this.rolesList.filter((role) => role.isNew))
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp;
          this.saveDialog = true;
          this.resetForm();
          this.$emit("close");
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
    // Close the form and rest changes
    closeForm() {
      this.resetForm();
      this.$emit("close");
    },
    // Reset Form
    resetForm() {
      this.rolesList = [];
      this.role.name = null;
      this.role.section.id = null;
    },
  },
};
</script>
