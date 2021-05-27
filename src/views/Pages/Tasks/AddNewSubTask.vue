<template>
  <v-dialog v-model="statusTask" persistent max-width="1000">
    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
      >{{ alert.txt }}</v-snackbar >

    <v-col cols="12" md="12">
      <v-progress-linear
        color="primary"
        v-show="getLoading"
        indeterminate
        rounded
        height="2"
      ></v-progress-linear>

      <v-card style="text-align: center"><v-icon @click="closeDialog" style="float:left" large>mdi-close-circle-outline</v-icon>
        <v-container class="py-0">
          <v-row justify="center">
            <v-col cols="12" md="6">
              <v-text-field
                outlined
                dense
                v-model="defaultTask.title"
                label="العنوان"
                :rules="[requiredName('')]"
              />
            </v-col>

            <v-col cols="12" md="2">
              <v-select
                outlined
                item-text="name"
                item-value="id"
                label="نوع المهمة"
                dense
                v-model="defaultTask.taskType.id"
                :items="getTaskTypes"
              ></v-select>
            </v-col>
            <v-col cols="12" md="2">
              <v-select
                outlined
                item-text="label"
                item-value="id"
                label="الأسبقية"
                dense
                v-model="defaultTask.urgent"
                :items="getUrgancy"
              ></v-select>
            </v-col>
          </v-row>
          <v-row justify="center">
              <v-row dense  justify="center">
                        <v-col cols="12" md="2">
                          <v-select
                            outlined
                            item-text="name"
                            item-value="id"
                            label="القسم"
                            dense
                            @change="
                              sections = GetDepartments.find(
                                (dep) => dep.id == department
                              ).sections
                            "
                            v-model="department"
                            :items="GetDepartments"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
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

                        <v-col cols="12" md="6">
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
          </v-row>
          <v-divider></v-divider>
          <h3>ملخص المهمة</h3>

          <v-row justify="center">
            <v-col cols="12" md="10">
              <v-textarea
                v-model="defaultTask.description"
                rows="4"
                counter
                clearable
                solo
                autoGrow
                label="اضف هنا"
                required
              ></v-textarea>

              <br
            /></v-col>
          </v-row>

          <v-row justify="center">
            <v-col cols="12" md="11">
              <v-btn color=" primary" class="ma-1" @click="add" outlined>
                <h3>حفظ</h3>
              </v-btn>
              <!-- <v-btn color=" primary" class="ma-4" @click="goback" outlined>
                <h3>إلغاء</h3>
              </v-btn> -->
            </v-col>
          </v-row>
        </v-container>
      </v-card>
    </v-col>


    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeResponceDailog"
    />
    <!-- <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/> -->
  </v-dialog>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import FilePond from "../SubComponenet/AttachmentsSC";

export default {
  props: {
    incidnet: { type: Object, required: false },
    statusTask: {
      required: true
    },
    task: { type: Number, default: 0 },
  },
  components: {
    quillEditor,
    FilePond,
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      svrColor: ["#5499C7", "#7FB3D5", "#A9CCE3", "#D4E6F1", "#EAF2F8"],
      UrgancyColor: ["#EAF2F8", "#D4E6F1", "#A9CCE3 "],
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
        taskType: { id: 0 },
        parentTask: { id: 0 },
        attachments: [],
        parentIncident: { id: 0 },
        isIncident: false,
        description: "",
        title: "",
        urgent: 0,
        importance: 0,
        status: { id: 1007, StatusString: "pending" },
        assigned_for: { id: 0, name: "" },
        assignedEmps: [],
        weights: 0,
        actions: "",
        date: new Date().toISOString().substr(0, 10),
        menu2: false,
        dueDate: new Date().toISOString().substr(0, 10),
        menu1: false,
      },
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 2000,
      },
      requiredName(propertyType) {
        return (v) => (v && v.length > 0) || ` ادخل العنوان   ${propertyType}`;
      },
      requiredEmps(propertyType) {
        return (v) => (v && v.length > 0) || ` ادخل الموظف   ${propertyType}`;
      },
    };
  },
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("employees", [, "getEmployees"]),

    ...mapGetters("ui", ["getLoading"]),
    ...mapGetters("tasks", [
      "getTaskTypes",
      "getWhight",
      "getImportance",
      "getUrgancy",
    ]),
    ...mapGetters("incidents", ["getSelectedIncident"]),
    getOperations() {
      return PERMISSION.TASKS.ADD.name;
    },
  },
  methods: {
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("employees", ["fetchEmployees"]),
    ...mapActions("tasks", ["addTask", "fetchTaskType", "fetchIncidentTasks"]),
    addAttachment(files) {
      this.defaultTask.attachments = files;
    },
    setEmps() {
      let sections = this.GetDepartments.find(
        (dep) => dep.id == this.department
      ).sections;
      this.employees = sections.find(
        (sec) => sec.id == this.defaultTask.assigned_for.id
      ).users;
    },
    change(id) {},

    assignPermissions(pers) {
      this.permissions = pers;
    },
    closeDialog(){
      this.$emit('close');
    },
    closeResponceDailog(status) {
      this.saveDialog = false;
     this.statusTask = false;
    //   if (status) {
    //     this.$router.push({name:''});
    //   }
    },

    add() {
      let message = "";
      let isValid = true;

      if (this.assignedEmps == "") {
        isValid = false;
        message = "يجب اختيار الموظف";
      }

      if (this.defaultTask.urgent == "") {
        isValid = false;
        message = "يجب اختيار الاسبقية";
      }

      if (this.defaultTask.taskType.id == "") {
        isValid = false;
        message = "يجب اختيار نوع المهمة";
      }
      if (this.defaultTask.title.trim() == "") {
        isValid = false;
        message = "يجب إضافة العنوان";
      }

      if (!isValid) {
        return this.statAlert(true, message, "error");
      } else {
        this.defaultTask.assignedEmps = this.assignedEmps.map((x) => ({
          euser: { id: x },
        }));
        this.defaultTask.parentTask.id = this.task;
        this.defaultTask.parentIncident.id = this.incidnet
          ? this.incidnet.id
          : 0;
        this.defaultTask.isIncident = this.incidnet
          ? this.incidnet.isIncident
          : false;


        this.addTask(this.defaultTask)
          .then((rep) => {
            this.saveDialog = true;
            this.isSuccessSave = true;
            this.responseMessage = rep.message;
          })
          .catch((err) => {
            this.isSuccessSave = false;
            this.responseMessage = err;
            this.saveDialog = true;
          });
      }
    },
    goback() {
      //this.$router.push("../tasks/manageTasks");
      this.dialog = false;
    },
    changeSection(id) {
      this.employess = this.GetEmployees.filter((x) => x.sectionID == id);
    },
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    close() {
      this.$router.push({name : "المهام"});
    },
  },

  async created() {
    this.fetchTaskType();
    this.fetchDepartments();
    this.fetchEmployees();
  },
};
</script>
<style >
.ql-editor {
  height: 20vh;
}
</style>
