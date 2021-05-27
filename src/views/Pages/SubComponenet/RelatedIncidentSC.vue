<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-container id="user-22222" fluid tag="section">
        <v-card>
          <v-container>
            <template>
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-subheader class="ma-2" style="float: left">

                  </v-subheader>
                  <v-subheader class="ma-2" style="background-color: #f6f6f6">
                    <h3>العنوان:</h3>
                    <v-chip class="ma-1" label>
                      <h1>{{ getSelectedIncident.subject }}</h1>
                    </v-chip>
                  </v-subheader>

                  <v-subheader
                    v-show="!getSelectedIncident.isIncident"
                    class="ma-2"
                    style="background-color: #f6f6f6"
                  >
                    <h3>مقدم البلاغ:</h3>
                    <v-chip class="ma-1" label>
                      <h1>{{ getSelectedIncident.createdBy.fullName }}</h1>
                    </v-chip>
                  </v-subheader>

                  <v-subheader
                    v-show="getSelectedIncident.isIncident"
                    class="ma-2"
                    style="background-color: #f6f6f6"
                  >
                    <h3>مقدم البلاغ:</h3>
                    <v-chip class="ma-1" label>
                      <h1>{{ getSelectedIncident.createdBy.fullName }}</h1>
                    </v-chip>

                    <h3
                      v-if="getSelectedIncident.isIncident"
                      style="margin-right: 20px"
                    ></h3>
                    <h3 style="margin-right: 20px">قام بالترميز الى حادث :</h3>
                    <v-chip class="ma-1" label>
                      <h1>{{ getUser() }}</h1>
                    </v-chip>
                  </v-subheader>
                </v-col>
                <v-col cols="12" md="12">
                  <v-card class="ma-0">
                    <v-container>
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td style="text-align: right">التاريخ:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    {{ formatD(getSelectedIncident.date) }}
                                  </h3>
                                </v-chip>
                              </td>

                              <td>الوقت:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>{{ getSelectedIncident.time }}</h3>
                                </v-chip>
                              </td>

                              <td>الأسبقية:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    {{ getSelectedIncident.urgancey.label }}
                                  </h3>
                                </v-chip>
                              </td>

                              <td>التصنيف:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    {{ getSelectedIncident.saverity.lable }}
                                  </h3>
                                </v-chip>
                              </td>
                            </tr>
                            <tr>
                              <td>الفئة:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    {{ getSelectedIncident.category.label }}
                                  </h3>
                                </v-chip>
                              </td>


                              <td>المرفقات:</td>
                              <td style="font-weight: 900">
                                <v-chip
                                  v-for="(att, i) in getSelectedIncident.attachments"
                                  :key="i"
                                  class="ma-2"
                                  @click="downloadAttachment(att)"
                                >
                                  {{ att.attachment.title + "," }}
                                </v-chip>
                              </td>
                              <td></td>
                              <td></td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr></tr>

                          </tbody>
                        </template>
                      </v-simple-table>
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                                <td>الجهات المتأثرة:</td>
                              <td colspan="4" style="font-weight: 900">
                                <tr>
                                  <v-chip v-for="item in getSelectedIncident.orgs"
                                  :key="item.id" class="ma-1" label>
                                    <h3>{{ item.organization.orgname }}</h3>
                                  </v-chip>
                                </tr>
                              </td>
                            </tr>
                            <tr><td>البصمة:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label
                                  >
                                    <h3>
                                      {{ getSelectedIncident.signature }}
                                    </h3></v-chip
                                >
                              </td>
                            </tr>

                          </tbody>
                        </template>
                      </v-simple-table>


                    </v-container>
                  </v-card>
                  <v-card>

                    <div v-show="getSelectedIncident.isIncident">
                      <h4 style="margin-right: 15px">ملخص الحادثة:</h4>
                      <v-card-text>
                        <p v-html="getSelectedIncident.description"></p>
                      </v-card-text>
                    </div>
                    <div v-show="!getSelectedIncident.isIncident">
                      <h4 style="margin-right: 15px">ملخص التنبيه:</h4>
                      <v-card-text>
                        <p v-html="getSelectedIncident.description"></p>
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>

                <v-col cols="12" md="12">
                  <v-card class="ma-0">
                    <v-tabs background-color="#E2E2E2" slider-color="primary">
                      <v-tab class="mr-3">
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: black">التعليقات</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-card height="600px" class="scroll">
                          <v-row justify="center">
                            <v-col cols="12" md="12">
                              <ViewIncidentComments />
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>


                      <v-tab class="mr-3">
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: black">عناوين الإنترنت</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-row justify="center">
                          <v-col cols="12" md="12">
                            <v-card>
                              <v-simple-table dense>
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th class="text-right">الآيبي المصدر</th>
                                      <th class="text-right">المنفذ المصدر</th>
                                      <th class="text-right">الدولة المصدر</th>
                                      <th class="text-right">الآيبي المستهدف</th>
                                      <th class="text-right">المنفذ المستهدف</th>
                                      <th class="text-right">الدولة المستهدفة</th>
                                      <th class="text-right">البداية</th>
                                      <th class="text-right">النهاية</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="ip in getSelectedIncident.ipAddresses"
                                      :key="ip.id"
                                    >
                                      <td>{{ ip.source.ip }}</td>
                                      <td>{{ ip.source.port }}</td>
                                      <td>{{ ip.sourceCountry }}</td>
                                      <td>{{ ip.dest.ip }}</td>
                                      <td>{{ ip.dest.port }}</td>
                                      <td>{{ ip.destinationCountry }}</td>
                                      <td>
                                        {{ formatDate(ip.beginTimestamp) }}
                                      </td>
                                      <td>
                                        {{ formatDate(ip.endTimestamp) }}
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-card>
                          </v-col>
                        </v-row>
                      </v-tab-item>


                    </v-tabs>
                  </v-card>
                </v-col>

                <v-col cols="12" md="3"> </v-col>
              </v-row>
            </template>
          </v-container>
        </v-card>

        <LoginStatus
          :page="name"
          :operation="getOperations"
          @input="assignPermissions"
        />
        <IgnoreReasonDialog :isOpen="ignoreDialog" @close="ignoreDialog = false" :id="notificationId" />
        <closeeReasonDialog :isOpen="closeeDialog" @close="closeeDialog = false" :id="notificationId2" />

        <responseDialog
          :status="saveDialog"
          :success="isSuccessSave"
          :message="responseMessage"
          @close="closeResponceDailog"
        />
      </v-container>
    </v-col>
    <v-col cols="12" md="12">


      <AddNewSubTask :incidnet="getSelectedIncident" @close="dialogSubTask = false" :statusTask="dialogSubTask" />


    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import FilePond from "./AttachmentsSC";
import ViewIncidentComments from "./../Incidents/ViewIncidentComments";
import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";
export default {
  components: {
    quillEditor,
    FilePond,
    ViewIncidentComments,
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
    IgnoreReasonDialog: () => import("../Dialogs/IgnoreReasonDialog"),
    closeeReasonDialog: () => import("../Dialogs/CloseeReasonDialog"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
    tasks: () => import("../SubComponenet/SubTasksSC"),
    history: () => import("../SubComponenet/ShowHistorySC"),
    AddNewSubTask: () => import("../Tasks/AddNewSubTask"),
  },
  data() {
    return {
      name: "NOTIFICATIONS",
      closeeDialog : false,
      ignoreDialog: false,
      dialogSubTask: false,
      user: "",
      notificationId: 0,
      notificationId2: 0,
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      permissions: [],
      ipDialog: false,
      dialog: false,
      panel: false,
      orgDialog: false,
      time: "",
      time2: "",
      menue1: false,
      menue2: false,
      editorOption: {
        debug: "ínfo",
        placeholder: "اكنب هنا...",
        readOnly: true,
        theme: "snow",
      },
      assignIP: false,

      IncedentTrasfertedBy: this.$route.query.postID,
    };
  },
  computed: {
    ...mapGetters("incidents", ["getSelectedIncident"]),
    ...mapGetters("tasks", ["getIncidentRelatedTasks"]),
    canAdd() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.COMMENTS.name) &&
        !this.getSelectedIncident.isIncident;
      return heCan;
    },
    canAassign() {
      let heCan = this.permissions.includes(
        PERMISSION.NOTIFICATIONS.ASSIGN_TASK.name
      );
      return heCan;
    },
    newIncident() {
      let heCan =
        this.permissions.includes(
          PERMISSION.NOTIFICATIONS.SIGN_AS_INCIDENT.name
        ) &&
        !this.getSelectedIncident.isIncident &&
        !this.getSelectedIncident.isHandled;
      return heCan;
    },
    ignore() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.IGNORE.name) &&
        !this.getSelectedIncident.isIncident &&
        !this.getSelectedIncident.isHandled;
      return heCan;
    },
    ArchiveIncident() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.CLOSE.name) &&
        this.getSelectedIncident.isIncident &&
        !this.getSelectedIncident.status.isClosing;
      return heCan;
    },
    canAassignIP() {
      let heCan =
        this.permissions.includes(
          PERMISSION.NOTIFICATIONS.ASSIGN_NEW_REQUEST.name
        ) &&
        !this.getSelectedIncident.isIncident &&
        !this.getSelectedIncident.isHandled;
      return heCan;
    },
    getOperations() {
      return PERMISSION.NOTIFICATIONS.DETAILS.name;
    },
  },
  methods: {
    ...mapActions("attachments", ["downloadAttachment"]),
    ...mapActions("incidents", [
      "changeIncidnet",
      "requestIpsIdentification",
    ]),
    ...mapActions("tasks", ["fetchIncidentTasks"]),
    assignPermissions(pers) {
      this.permissions = pers;
    },

    formatD(date) {
      return moment(date).format("DD-MM-YYYY");
    },

    requestIdentification() {
      this.requestIpsIdentification({ id: this.getSelectedIncident.id })
        .then((resp) => {
          this.saveDialog = true;
          this.getSelectedIncident.isIpsIdentificationRequested = true;
          this.responseMessage = resp.message;
          this.isSuccessSave = true;
        })
        .catch((err) => {
          this.saveDialog = true;
          this.responseMessage = err.message;
          this.isSuccessSave = false;
        });
    },
    getUser(){
      let user = "fffffff";
       let changes = this.getSelectedIncident.changes;
      if (((changes == null) == changes) == undefined) return "";
      changes.forEach((change) => {
        user = change.fields.some(
          (fld) => fld.newValue == "تحويل إلى حادث"
        )
          ? change.changedBy.fullName
          : "";
      });

      return user;
    },
    assignTask() {
      this.dialogSubTask = true;
    },
    CreateIncident() {
      this.changeIncidnet({ changeType: 1, id: this.getSelectedIncident.id })
        .then((resp) => {
          this.$router.push("DisplayIncidents");
        })
        .catch((err) => {
          this.saveDialog = true;
          this.responseMessage = err.message;
          this.isSuccessSave = false;
        });
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },

    closeResponceDailog(status) {
      this.saveDialog = false;
      this.responseMessage = "";
      this.isSuccessSave = false;
    },
    ignoreNotification() {
      this.ignoreDialog = true;
      this.notificationId = this.getSelectedIncident.id;
    },
    closeNotification() {
        this.notificationId2 = this.getSelectedIncident.id;
      this.closeeDialog = true;
    },
    closeIncident() {
      this.$router.push({ name: "إغلاق حادثة" });
    },
    addOrg(org) {
      this.getSelectedIncident.org.push(org);
    },
    addIp(ip) {
      this.getSelectedIncident.IpAddresses.push(ip);
    },
    close() {
      if (this.getSelectedIncident.isIncident) {
        this.$router.push("DisplayIsIncidents");
      }

      if (!this.getSelectedIncident.isIncident) {
        this.$router.push("DisplayIncidents");
      }
    },
  },
  created() {
    if (this.getSelectedIncident.id != undefined)
    {this.fetchIncidentTasks(this.getSelectedIncident.id);}
  },
};
</script>
<style >
.ql-editor {
  height: 56vh;
}
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #f1f1f1;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(1, 51, 112, 0.24);
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(219, 219, 223);
}
</style>
