<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <v-subheader>
                  <h1>تقرير إغلاق حادثة :</h1>
                  <v-chip class="ma-1" label>
                    <h1>{{ incident.subject }}</h1>
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
                              v-model="incident.closeReport.report"
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
                                      <td>التاريخ:</td>
                                      <td style="font-weight: 900">
                                        <v-chip class="ma-1" label>
                                          <h3>{{ incident.date }}</h3>
                                        </v-chip>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>الوقت:</td>
                                      <td style="font-weight: 900">
                                        <v-chip
                                          color="#e0ebeb"
                                          class="ma-1"
                                          label
                                        >
                                          <h3>{{ incident.time }}</h3>
                                        </v-chip>
                                      </td>
                                    </tr>

                                    <tr>
                                      <td>الأسبقية:</td>
                                      <td style="font-weight: 900">
                                        <v-chip class="ma-1" label>
                                          <h3>
                                            {{ incident.urgancey.label }}
                                          </h3>
                                        </v-chip>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>التصنيف:</td>
                                      <td style="font-weight: 900">
                                        <v-chip
                                          color="#e0ebeb"
                                          class="ma-1"
                                          label
                                        >
                                          <h3>
                                            {{ incident.saverity.lable }}
                                          </h3>
                                        </v-chip>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>الفئة:</td>
                                      <td style="font-weight: 900">
                                        <v-chip class="ma-1" label>
                                          <h3>
                                            {{ incident.category.label }}
                                          </h3>
                                        </v-chip>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>الجهات المتأثرة:</td>
                                      <td style="font-weight: 900">
                                        <tr
                                          v-for="item in incident.orgs"
                                          :key="item.id"
                                        >
                                          <v-chip
                                            color="#e0ebeb"
                                            class="ma-1"
                                            label
                                          >
                                            <h3>
                                              {{ item.organization.orgname }}
                                            </h3>
                                          </v-chip>
                                        </tr>
                                      </td>
                                    </tr>
                                    <tr>
                                      <td>المرفقات:</td>
                                      <td style="font-weight: 900">
                                        <v-chip class="ma-1" label>
                                          <h3
                                            v-for="(
                                              item, i
                                            ) in incident.attachments"
                                            :key="i"
                                          >
                                            <a
                                              style="text-"
                                              :href="[
                                                download(item.attachment),
                                              ]"
                                              :download="[
                                                item.attachment.title,
                                              ]"
                                              >{{
                                                item.attachment.title + ","
                                              }}</a
                                            >
                                          </h3>
                                        </v-chip>
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-container>
                          </v-col>
                        </v-card>

                        <v-card max-width="500" outlined>
                          <p>المرفقات:</p>
                          <v-chip class="ma-1" label>
                            <h3
                              v-for="(item, i) in incident.closeReport
                                .attachments"
                              :key="i"
                            >
                              <a
                                style="text-"
                                :href="[download(item.attachment)]"
                                :download="[item.attachment.title]"
                                >{{ item.attachment.title + "," }}</a
                              >
                            </h3>
                          </v-chip>
                        </v-card>
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
  props: {
    incident: { type: Object, required: true },
  },
  components: {
    quillEditor,
    FilePond,
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      dialog: false,
      report: "",
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
    add() {
      //this.$refs.attachments.sendData();
      let obj = {
        reportId: this.getSelectedTask.id,
        type: 2,
        report: this.report,
        attachment: this.attachment,
      };

      this.$store
        .dispatch("tasks/setClosingReport", obj)
        .then((resp) => {
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
    download(file) {
      return "data:" + file.type + ";base64," + file.content;
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
