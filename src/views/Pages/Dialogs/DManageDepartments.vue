<template>
  <v-dialog v-model="status" persistent max-width="690">
    <v-card class="grey lighten-3">
      <v-card-title class="headline">إدارة الأقسام</v-card-title>
      <!-- Content -->
      <section id="secContManage" class="my-8 pa-8">
        <v-text-field
          @keyup.enter="AddNewDepartment"
          v-model="departmentName"
          placeholder="ادخل اسم القسم هنا مباشرة"
          solo
        ></v-text-field>
        <v-btn class="ma-2" color="light primary" @click="AddNewDepartment" fab>
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <!-- load new sectors -->
        <v-chip
          :color="sector.store ? 'primary' : ''"
          class="ma-2"
          v-for="(sector,i) in departmentsList"
          :key="`sn${i}`"
          close
          @click:close="deleteSector(i)"
        >{{ sector.name }}
        </v-chip>
      </section>
      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>

        <v-btn color="primary darken-1" large text @click="saveNewSectors">
          <span>حفظ</span>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
        <v-btn large color="red darken-1" text @click="closeForm"><span>غلق</span>
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>

      </v-card-actions>
    </v-card>
    <!-- Alerts  -->
    <v-snackbar top v-model="alert.status" :color="alert.color" :timeout="alert.timeout">{{ alert.txt }}</v-snackbar>
  </v-dialog>
</template>

<script>
import {mapState, mapActions} from "vuex";

export default {
  props: {
    status: {
      required: true
    }
  },
  data: () => ({
    departmentsList: [],
    departmentName: null,
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000
    }
  }),
  computed: {
    ...mapState("departments", ["departments"])
  },
  watch: {
    status(n) {
      if (n == true) {
        this.departments.forEach(sector =>
          this.departmentsList.push({...sector, store: true})
        );
      }
    }
  },
  methods: {
    ...mapActions("departments", ["saveDepartments", "fetchDepartments"]),
    // Add a new Sector
    AddNewDepartment() {
      const departmentName = this.departmentName;
      if (!departmentName || !departmentName.trim())
        return this.statAlert(true, "ادخل اسم القسم بالشكل الصحيح", "error");
      this.departmentsList.push({
        nid: Math.round(Math.random() * 999999),
        name: departmentName,
      });
      this.departmentName = null;
    },
    // Delete Sector
    deleteSector(index) {
      this.departmentsList.splice(index, 1);
    },
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },

    saveNewSectors() {
      this.saveDepartments(this.departmentsList)
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp;
          this.saveDialog = true;
          this.fetchDepartments();
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
      this.departmentsList = [];
      this.departmentName = null;
    }
  }
};
</script>
