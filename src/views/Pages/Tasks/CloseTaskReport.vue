<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <v-subheader>
                  <h1>تقرير إغلاق مهمة :</h1>
                  <v-chip class="ma-1" label>
                    <h1>{{ getSelectedTask.title }}</h1>
                  </v-chip>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-card>
                  <v-container class="py-0">
                    <v-row>
                      <v-col cols="12" md="8">
                        <v-card class="ma-0">
                          <v-col cols="12" md="12">
                            <quill-editor
                              v-model="report"
                              ref="myQuillEditor"
                              :options="editorOption"
                            ></quill-editor>
                          </v-col>
                        </v-card>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-card class="ma-0">
                          <v-col cols="12" md="12">
                            <v-container>
                              <v-simple-table>
                                <template v-slot:default>
                                  <tbody>
                                    <tr>
                                      <td>من:</td>
                                      <td>
                                        <v-chip
                                          class="ma-1"
                                          color="#e0ebeb"
                                          label
                                          ><h3>
                                            {{ getSelectedTask.date }}
                                          </h3></v-chip
                                        >
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>الى:</td>
                                      <td>
                                        <v-chip class="ma-1" label
                                          ><h3>
                                            {{ getSelectedTask.dueDate }}
                                          </h3></v-chip
                                        >
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>توكيل المهمة الى :</td>
                                      <td>
                                        <v-chip
                                          class="ma-1"
                                          color="#e0ebeb"
                                          label
                                          ><h3>
                                            {{
                                              getSelectedTask.assigned_for.name
                                            }}
                                          </h3></v-chip
                                        >
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>التصنيف:</td>
                                      <td>
                                                 <v-chip
                                      
                                      class="ma-1"
                                      label
                                    >
                                      <h3>   {{ 
                                getSelectedTask.importance == 1
                                ? 'سري للغاية'
                                       : getSelectedTask.importance == 2
                                          ? 'سري'
                                          : getSelectedTask.importance == 3
                                          ? 'مكتوم'
                                          : 'محدود'
                                          }} </h3>
                                    </v-chip>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>وزن المهمة:</td>
                                      <td>
                                        <v-chip class="ma-1" label
                                          ><h3>
                                            {{ getSelectedTask.weights }}
                                          </h3></v-chip
                                        >
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>الأولوية:</td>
                                      <td>
                                        <v-chip class="ma-1" label>
                                      <h3>{{ getSelectedTask.urgent == 1
                                          ? 'عادي'
                                          : getSelectedTask.urgent == 2 ? 'عاجل' : 'عاجل جدا' }}</h3>
                                    </v-chip>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>الحالة:</td>
                                      <td>
                                        <v-chip class="ma-1" label
                                          ><h3>
                                            {{
                                              getSelectedTask.status
                                                .statusString
                                            }}
                                          </h3></v-chip
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-container>
                          </v-col>
                        </v-card>

                        <v-card max-width="500" outlined>
                          <FilePond @input="addAttachment" ref="attachments" />
                        </v-card>
                      </v-col>
                    </v-row>

                    <v-row justify="center">
                      <v-col cols="12" md="11">
                        <v-btn class="ma-2" color="primary" @click="add">
                          <v-icon left
                            >mdi-checkbox-marked-circle-outline</v-icon
                          >
                          <h3>حفظ</h3>
                        </v-btn>
                        <v-btn class="ma-2" @click="close">
                          <v-icon left>mdi-close-circle-outline</v-icon>
                          <h3>إلغاء</h3>
                        </v-btn>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </v-col>

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
  name: "closeTask",
  attachment: [],
  components: {
    quillEditor,
    FilePond,
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      dialog: false,
      report: "",
      attachments: [],
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      editorOption: {
        debug: "ínfo",
        placeholder: "اكنب هنا...",
        readOnly: true,
        theme: "snow",
      },
    };
  },
  computed: {
    ...mapGetters("tasks", ["getSelectedTask"]),
  },
  methods: {
    ...mapActions("tasks", ["saveAttachment"]),
    addAttachment(files) {
      this.attachments = files;
    },
    add() {
      //this.$refs.attachments.sendData();
      let obj = {
        reportId: this.getSelectedTask.id,
        type: 2,
        report: this.report,
        attachments: this.attachments,
      };
      this.$store.dispatch("tasks/setClosingReport", obj).then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp.message;
          this.saveDialog = true;
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
    closeResponceDailog(status) {
      this.saveDialog = false;
      if (status) {
        this.$router.push("./EmployeeTask");
      }
    },
    goback() {
      this.$router.push("EmployeeTask");
    },
    close() {
      this.$router.push("EmployeeTask");
    },
  },
  created() {},
};
</script>
<style >
.ql-editor {
  height: 56vh;
}
</style>
