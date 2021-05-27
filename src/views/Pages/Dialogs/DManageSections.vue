<template>
  <v-dialog v-model="status" persistent max-width="690">
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeDialogAction"
    />
    <v-card class="grey lighten-3">
      <form>
        <v-card-title class="headline">إدارة الشُعب</v-card-title>
        <!-- Content -->
        <section id="secContManage" class="my-8 pa-8">
          <v-select
            v-model="department"
            :items="GetDepartments"
            item-text="name"
            item-value="id"
            label="القسم"
            required
          ></v-select>
          <v-text-field
            @keyup.enter="AddSection"
            v-model="sectionName"
            placeholder="اسم الشعبة"
            solo
          ></v-text-field>
          <v-btn class="ma-2" color="light primary" @click="AddSection" fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <!-- load new sectors -->
          <v-chip
            :color="section.isNew ? 'gray' : 'primary'"
            class="ma-2"
            v-for="(section,i) in sectionsList"
            :key="`sn${i}`"
            close
            @click:close="deleteSector(i)"
          >{{ section.name }}
          </v-chip>
        </section>
        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>

          <v-btn color="primary darken-1" large text @click="saveNewSections">
            <span>حفظ</span>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
          <v-btn large color="red darken-1" text @click="closeForm"><span>غلق</span>
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>

        </v-card-actions>
      </form>
    </v-card>
    <!-- Alerts  -->
    <v-snackbar top v-model="alert.status" :color="alert.color" :timeout="alert.timeout">{{ alert.txt }}</v-snackbar>
  </v-dialog>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";

export default {
  components: {
    responseDialog: () => import("../Dialogs/DRespoonseDialog")
  },
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    saveDialog: false,
    responseMessage: "",
    isSuccessSave: false,
    sectionsList: [],
    sectionName: null,
    department: null,
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000
    }
  }),
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapState("departments", ["sections"])
  },
  watch: {
    status(n) {
      if (n === true) {
        this.sections.forEach(sec =>
          this.sectionsList.push({
            // nid: Math.round(Math.random() * 999999),
            name: sec.name, department: sec.department, isNew: false
          })
        );
      }
    }
  },
  methods: {
    ...mapActions("departments", ["SaveSections", "fetchDepartments"]),

    AddSection() {
      const sectionName = this.sectionName;
      if (!sectionName || !sectionName.trim())
        return this.statAlert(true, "ادخل اسم القسم بالشكل الصحيح", "error");

      if (this.GetDepartments.some(s => s.name === sectionName))
        return this.statAlert(true, "يوجد قسم بهذا الإسم", "error");

      this.sectionsList.push({
        nid: Math.round(Math.random() * 999999),
        name: sectionName,
        isNew: true,
        department: {id: this.department}
      });
      this.sectionName = null;
    },
    // Delete Sector
    deleteSector(index) {
      this.sectionsList.splice(index, 1);
    },
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    closeDialogAction(status) {
      if (status) {
        this.fetchDepartments();
        this.saveDialog = false;
        this.$emit('close')
      }
    },
    // Save the new sectors to vuex
    saveNewSections() {
      this.SaveSections(this.sectionsList.filter(sec => sec.isNew))
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
      this.sectionsList = [];
      this.sectionName = null;
    }
  }
};
</script>
