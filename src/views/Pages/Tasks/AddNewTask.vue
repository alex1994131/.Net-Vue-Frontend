<template>
  <v-row justify="center">
    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
      >{{ alert.txt }}</v-snackbar
    >

    <v-col cols="12" md="10">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <v-subheader>
                  <h1>مهمة جديد</h1>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-form>
                  <v-container>
                    <v-card outlined class="ma-1">
                      <v-row justify="center">
                        <v-col cols="12" md="9">
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
                      </v-row>
                      <v-row dense justify="center"
                        ><v-col cols="12" md="3">
                          <v-select
                            outlined
                            item-text="label"
                            item-value="id"
                            label="التصنيف"
                            dense
                            v-model="defaultTask.importance"
                            :items="getImportance"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-select
                            outlined
                            item-text="label"
                            item-value="id"
                            label="وزن المهمة"
                            dense
                            v-model="defaultTask.weights"
                            :items="getWhight"
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
                        <v-col cols="12" md="2">
                          <v-menu
                            v-model="defaultTask.menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                outlined
                                dense
                                v-model="defaultTask.date"
                                label="من"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="defaultTask.date"
                              @input="defaultTask.menu1 = false"
                            ></v-date-picker>
                            <v-spacer></v-spacer>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" md="2">
                          <v-menu
                            v-model="defaultTask.menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                outlined
                                dense
                                v-model="defaultTask.dueDate"
                                label="الى"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="defaultTask.dueDate"
                              @input="defaultTask.menu2 = false"
                            ></v-date-picker>
                            <v-spacer></v-spacer>
                          </v-menu>
                        </v-col>
                      </v-row>
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

                        <v-col cols="12" md="11">
                          <v-autocomplete
                            disabled
                            deletable-chips
                            multiple
                            label="الموظف"
                            small-chips
                            item-text="name"
                            item-value="id"
                            dense
                            v-model="assignedEmps"
                            :items="getEmployees"
                          ></v-autocomplete>
                        </v-col>

                      </v-row>
                      <v-divider></v-divider>

                      <v-row justify="center">
                        <v-col cols="12" md="11">
                          <h4>الملخص</h4>
                          <v-divider></v-divider>

                          <quill-editor
                            v-model="defaultTask.description"
                            ref="myQuillEditor"
                            :options="editorOption"
                          ></quill-editor> </v-col
                      ></v-row>
                      <v-divider></v-divider>
                      <v-row justify="center">

                        <v-col cols="12" md="11">
                          <h4>المرفقات</h4>
                          <v-card outlined class="ma-1">
                            <v-container>
                              <FilePond @input="addAttachment" />
                            </v-container>
                          </v-card>
                        </v-col>
                      </v-row>
                    </v-card>

                    <v-divider></v-divider>

                    <v-row justify="center">
                      <v-btn class="ma-2" color="primary" @click="add">
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
                        <h3>حفظ</h3>
                      </v-btn>
                      <v-btn class="ma-2" @click="goback">
                        <v-icon left>mdi-close-circle-outline</v-icon>
                        <h3>إلغاء</h3>
                      </v-btn>
                    </v-row>
                  </v-container>
                </v-form>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>
    <!-- <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions" /> -->
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeResponceDailog"
    />
  </v-row>
</template>
<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import FilePond from "../SubComponenet/AttachmentsSC";

export default {
  props: {
    incidnet: { type: Object, required: false },
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
    };
  },
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("ui", ["getLoading"]),
    ...mapGetters("employees", ["getEmployees"]),
    ...mapGetters("tasks", ["getTaskTypes","getWhight","getImportance","getUrgancy",]),
    ...mapGetters("incidents", ["getSelectedIncident"]),
    getOperations() {
      return PERMISSION.TASKS.ADD.name;
    },
  },
  methods: {
    ...mapActions("employees", ["fetchEmployees"]),
    ...mapActions("departments", ["fetchDepartments"]),
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
    closeResponceDailog(status) {
      this.saveDialog = false;
      if (status) {
        this.$router.push({ name : "المهام" });
      }
    },

    add() {
      let message = "";
      let isValid = true;

      if (this.assignedEmps == "") {
        isValid = false;
        message = "يجب اختيار الموظف";
      }
      if (this.defaultTask.assigned_for.id == "") {
        isValid = false;
        message = "يجب اختيار الشعبة";
      }
      if (this.department == "") {
        isValid = false;
        message = "يجب اختيار القسم";
      }
      if (this.defaultTask.urgent == "") {
        isValid = false;
        message = "يجب اختيار الاسبقية";
      }
      if (this.defaultTask.importance == "") {
        isValid = false;
        message = "يجب اختيار الاهمية";
      }

      if (this.defaultTask.weights == "") {
        isValid = false;
        message = "يجب اختيار وزن المهمة";
      }
       if (this.defaultTask.importance == "") {
        isValid = false;
        message = "يجب اختيار تصنيف المهمة";
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
      this.$router.push("manageTasks");
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
      this.$router.push("manageTasks");
    },
  },

  created() {
    this.fetchTaskType();
    this.fetchDepartments();
    this.fetchEmployees();
  },
};
</script>
<style >
.ql-editor {
  height: 35vh;
}
</style>
