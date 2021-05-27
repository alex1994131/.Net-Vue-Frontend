<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <v-subheader>
                  <h1>تقرير إغلاق حادث :</h1>
                  <v-chip class="ma-1" label>
                    <h1>{{ getSelectedIncident.title }}</h1>
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
                          <v-container>
                            <v-simple-table>
                              <template v-slot:default>
                                <tbody>
                                  <tr>
                                    <td>التاريخ:</td>
                                    <td style="font-weight: 900">
                                      <v-chip
                                        color="#e0ebeb"
                                        class="ma-1"
                                        label
                                      >
                                        <h3>{{ getSelectedIncident.date }}</h3>
                                      </v-chip>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>الوقت:</td>
                                    <td style="font-weight: 900">
                                      <v-chip class="ma-1" label>
                                        <h3>{{ getSelectedIncident.time }}</h3>
                                      </v-chip>
                                    </td>
                                  </tr>

                                  <tr>
                                    <td>الأسبقية:</td>
                                    <td style="font-weight: 900">
                                      <v-chip class="ma-1" label>
                                        <h3>
                                          {{
                                            getSelectedIncident.urgancey.label
                                          }}
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
                                          {{
                                            getSelectedIncident.saverity.lable
                                          }}
                                        </h3>
                                      </v-chip>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>الفئة:</td>
                                    <td style="font-weight: 900">
                                      <v-chip class="ma-1" label>
                                        <h3>
                                          {{
                                            getSelectedIncident.category.label
                                          }}
                                        </h3>
                                      </v-chip>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td>الجهات المتأثرة:</td>
                                    <td style="font-weight: 900">
                                      <tr
                                        v-for="item in getSelectedIncident.orgs"
                                        :key="item.id"
                                      >
                                        <v-chip class="ma-1" label>
                                          <h3>
                                            {{ item.organization.orgname }}
                                          </h3>
                                        </v-chip>
                                      </tr>
                                    </td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-container>
                        </v-card>
                        <v-card>
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                                <tr style="background-color: #f6f6f6">
                                  <td>البصمة:</td>
                                </tr>
                                <tr>
                                  <v-card-text>
                                    <p style="background-color: #e0ebeb">
                                      {{ getSelectedIncident.signature }}
                                    </p>
                                  </v-card-text>
                                </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
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
    ...mapGetters("incidents", ["getSelectedIncident"]),
  },
  methods: {
    ...mapActions("incidents", ["closeIncident"]),
    addAttachment(files) {
      this.attachments = files;
    },
    add() {
      //this.$refs.attachments.sendData();
      let obj = {
        reportId: this.getSelectedIncident.id,
        type: 2,
        report: this.report,
        attachments: this.attachments,
      };
     this.closeIncident(obj)
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
        this.$router.push({ name: 'الحوادث الأمنية'});
      }
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
