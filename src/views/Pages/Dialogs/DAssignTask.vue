<template>
  <v-dialog v-model="status" persistent max-width="690">
    <v-card class="grey lighten-3">
      <v-card-title class="headline">  مشاركة و اسناد المهمة </v-card-title>
      <!-- Content -->
      <section id="AssignTask" class="my-8 pa-8">
        <v-container>
          <v-row justify="center">

                <v-col cols="12" md="12">
                  <v-select
                    outlined
                    item-text="name"
                    item-value="id"
                    label="القسم"
                    dense
                    @change="
                sections = GetDepartments.find((dep) => dep.id == department).sections"
                    v-model="department"
                    :items="GetDepartments"
                  ></v-select>
                </v-col>
                <v-col cols="12" md="12">
                  <v-select
                    outlined
                    item-text="name"
                    item-value="id"
                    label="الشعبة"
                    dense
                    @change="setEmps"
                    v-model="defaultTask.assigned_for.id"
                    :items="sections"
                  ></v-select>
                </v-col>

                <v-col cols="12" md="12">
                  <v-autocomplete
                    outlined
                    clearable
                    deletable-chips
                    multiple
                    label="الموظف"
                    small-chips
                    item-text="fullName"
                    item-value="id"
                    dense
                    v-model="assignedEmps"
                    :items="employees"
                  ></v-autocomplete>
                </v-col>

          </v-row>
        </v-container>
      </section>

      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>

        <v-btn color="primary darken-1" large text @click="AddShareTask">
          <span>حفظ</span>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn
        >
        <v-btn large color="red darken-1" text @click="closeForm"
          ><span>غلق</span> <v-icon>mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>

        <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeResponceDailog"
    />

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
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components :{
     responseDialog: () => import("./DRespoonseDialog"),
  },
  props: {
    task: {
      type : Object,
      required: true,
    },
    status: {
      required: true,
    },
  },
  data: () => ({
    name: "Tasks",
    permissions: [],
    saveDialog: false,
    responseMessage: "",
    isSuccessSave: false,

    dialog: false,
    employees: [],
    sections: [],
    department: [],
    editorOption: {
      debug: "ínfo",
      placeholder: "اكنب هنا...",
      readOnly: true,
      theme: "snow",
    },
    assignedEmps: [],
    defaultTask: {
      id : 0,
      assignedEmps: [],
      assigned_for : {id : 0}

    },

    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000,
    },
  }),
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("tasks", ["getSelectedTask"]),
    getOperations() {
      return PERMISSION.TASKS.ADD.name;
    },
  },

  created() {
    this.fetchDepartments();
  },

  methods: {
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("tasks", ["addTask","shareTask"]),
    setEmps() {
      let sections = this.GetDepartments.find(
        (dep) => dep.id == this.department
      ).sections;
      this.employees = sections.find(
        (sec) => sec.id == this.defaultTask.assigned_for.id
      ).users;
      let emps = this.task.assignedEmps.map(x => x.euser.id);
      this.employees = this.employees.filter(emp => !emps.includes(emp.id))
    },

    AddShareTask() {
      console.log(this.task)
      this.defaultTask.id = this.task.taskId
      this.defaultTask.assignedEmps = this.assignedEmps.map((x) => ({
        euser: { id: x },
      }));
console.log(this.defaultTask);
      this.shareTask(this.defaultTask).then(resp =>{
        this.isSuccessSave = true;
          this.responseMessage = resp.message;
          this.saveDialog = true;
      }).catch(err => {
         this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
      })

    },

    closeResponceDailog(status){
      if (status)
      {
        this.$emit("close");
      }
    },

    closeForm() {
      this.$emit("close");
      this.dialog = false;
    },
  },
};
</script>
