<template>
  <v-row justify="center">
    {{ matchSelectedIncedent }}

    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
      >{{ alert.txt }}</v-snackbar
    >

    <orgDialogBox
      :status="orgDialog"
      :Organizations="incident.orgs"
      @close="orgDialog = false"
    />
    <ips :status="ipDialog" @input="addIp" @close="ipDialog = false" />
    <v-col cols="12" md="10">
      <v-alert
        text
        prominent
        dense
        border="left"
        type="error"
        icon="mdi-alert-box-outline"
      >
        {{ incident.extraNote1 }}
      </v-alert>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <v-subheader>
                  <h1>تعديل التنبيه</h1>
                </v-subheader>
              </td>
            </tr>

            <tr>
              <td>
                <v-form>
                  <v-container
                    ><v-card outlined class="ma-1">
                      <v-row justify="center">
                        <v-col cols="12" md="11">
                          <v-text-field
                            outlined
                            dense
                            v-model="incident.subject"
                            counter="50"
                            :rules="[
                              required('العنوان'),
                              minLength('العنوان', 4),
                              maxLength('العنوان', 50),
                            ]"
                            label="العنوان"
                          />
                        </v-col>
                      </v-row>
                      <v-row justify="center">
                        <v-col cols="12" md="2">
                          <v-menu
                            v-model="menue1"
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
                                v-model="incident.Date"
                                label="تاريخ الحادثة"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="incident.Date"
                              @input="menue1 = false"
                            ></v-date-picker>
                          </v-menu>
                        </v-col>

                        <v-col cols="12" md="2">
                          <v-menu
                            ref="menu"
                            v-model="time2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            :return-value.sync="time"
                            transition="scale-transition"
                            offset-y
                            max-width="290px"
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                outlined
                                dense
                                v-model="incident.Time"
                                label="الوقت"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-time-picker
                              v-if="time2"
                              v-model="incident.Time"
                              use-seconds
                              full-width
                              @click:second="$refs.menu.save(incident.Date)"
                            ></v-time-picker>
                          </v-menu>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-select
                            outlined
                            dense
                            v-model="incident.saverity.id"
                            :items="getSver"
                            item-text="lable"
                            item-value="id"
                            label="التصنيف"
                            :rules="[(v) => !!v || 'الرجاء إختيار التصنيف']"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="2">
                          <v-select
                            outlined
                            dense
                            v-model="incident.Urgancey.id"
                            :items="getUrgancy"
                            item-text="label"
                            item-value="id"
                            label=" الأولوية"
                            :rules="[(v) => !!v || 'الرجاء إختيار الأولوية']"
                            required
                          ></v-select>
                        </v-col>
                        <v-col cols="12" md="3">
                          <v-select
                            outlined
                            dense
                            v-model="incident.Category.id"
                            :items="getCat"
                            item-text="label"
                            item-value="id"
                            label=" الفئة"
                            :rules="[(v) => !!v || 'الرجاء إختيار فئة']"
                            required
                          ></v-select>
                        </v-col>
                      </v-row>

                      <v-row justify="center">
                        <v-col cols="12" md="11">
                          <v-text-field
                            outlined
                            dense
                            v-model="incident.signature"
                            counter="100"
                            :rules="[
                              required('البصمة'),
                              minLength('البصمة', 4),
                              maxLength('البصمة', 300),
                            ]"
                            label="البصمة"
                          />
                        </v-col>
                      </v-row> </v-card
                    ><v-card outlined class="ma-1">
                      <v-row justify="center">
                        <v-col cols="12" md="4">
                          <h4>العلامات (Tags)</h4>
                          <v-divider> </v-divider>
                          <v-container>
                            <Tags @handler="tagsHandler" />
                          </v-container>
                        </v-col>

                        <v-divider vertical> </v-divider>
                        <v-col cols="12" md="4">
                          <h4>المؤسسة مستهدفة</h4>
                          <v-divider> </v-divider>
                          <v-container>
                            <v-btn
                              class="ma-1"
                              color="primary"
                              @click="orgDialog = true"
                              small
                              label
                              outlined
                              dense
                            >
                              <h4>إضافة مؤسسة مستهدفة</h4>
                              <v-icon light>mdi-plus</v-icon>
                            </v-btn>
                            <v-card v-if="incident.orgs.length > 0">
                              <v-simple-table dense>
                                <template v-slot:default>
                                  <thead>
                                    <tr>
                                      <th class="text-right">المؤسسة</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr
                                      v-for="(item, i) in incident.orgs"
                                      :key="item.id"
                                    >
                                      <td>
                                        {{ item.organization.orgname }}
                                      </td>
                                      <td>
                                        <v-icon small @click="removeOrg(i)"
                                          >mdi-delete</v-icon
                                        >
                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>
                            </v-card>
                          </v-container>
                        </v-col>
                        <v-divider vertical> </v-divider>
                        <v-col cols="12" md="3">
                          <h4>المرفقات</h4>
                          <v-divider> </v-divider>
                          <v-container>
                            <v-chip
                              v-for="(item, i) in incident.attachments"
                              :key="i"
                              class="ma-1"
                              label
                            >
                              <a
                                style="text-"
                                :href="[download(item.attachment)]"
                                :download="[item.attachment.title]"
                              >
                                <h3>
                                  {{ item.attachment.title + "," }}
                                </h3></a
                              ></v-chip
                            >
                            <FilePond @input="addAttachment" />
                          </v-container>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-card outlined class="ma-1">
                      <v-row justify="center">
                        <v-col cols="12" md="11">
                          <h4>الملخص</h4>
                          <v-divider></v-divider>

                          <quill-editor
                            v-model="incident.description"
                            ref="myQuillEditor"
                            :options="editorOption"
                          >
                          </quill-editor> </v-col
                      ></v-row>
                    </v-card>
                    <v-divider></v-divider>
                    <v-row justify="center">
                      <v-btn class="ma-2" color="primary" @click="add">
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
                        <h3>حفظ</h3>
                      </v-btn>
                      <v-btn class="ma-2" @click="close">
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
import stringHelper from "../../../helpers/stringHelper";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import FilePond from "../SubComponenet/AttachmentsSC";
import orgDialogBox from "../Dialogs/DSelectOrganization";
import ips from "../Dialogs/DAddIP";
import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";
export default {
  components: {
    quillEditor,
    FilePond,
    orgDialogBox,
    ips,
    UploadExal: () => import("../Dialogs/DUplodeIPsDialog"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
    Tags: () => import("../SubComponenet/TagsSC"),
  },
  data() {
    return {
      name: "NOTIFICATIONS",
      permissions: [],
      dialog: false,
      category: "",
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 3000,
      },

      errors: [],

      name: "NOTIFICATIONS",
      permissions: [],
      dialog: false,
      UploadDialog: false,
      tagName: "",
      ipDialog: false,
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
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

      incident: {
        subject: "",
        Date: new Date().toISOString().substr(0, 10),
        Time: null,
        signature: "",
        Urgancey: { id: -1, label: "" },
        saverity: { id: -1, lable: "" },
        Category: { id: -1, label: "" },
        orgs: [],
        isIpsIdentificationRequested: false,
        tags: [],
        ipAddresses: [],
        attachments: [],
        Description: "",
        createdBy: { id: 0 },
        Status: { id: 0 },
      },
      panel: [],
      viwe: false,
      disabled: false,

      svrColor: ["#5499C7", "#7FB3D5", "#A9CCE3", "#D4E6F1", "#EAF2F8"],
      UrgancyColor: ["#EAF2F8", "#D4E6F1", "#A9CCE3 "],

      required(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل اسم  ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} يجب أن يكون أكثر من ${minLength} أحرف`;
      },
      maxLength(propertyType, maxLength) {
        return (v) =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن يكون أقل من ${maxLength} أحرف`;
      },
    };
  },
  computed: {
    ...mapGetters("incidents", [
      "getUrgancy",
      "getSver",
      "getCat",
      "getfile",
      "getSelectedIncident",
    ]),
    getOperations() {
      return PERMISSION.NOTIFICATIONS.ADD.name;
    },
    matchSelectedIncedent() {
      this.incident.id = this.getSelectedIncident.id;
      this.incident.subject = this.getSelectedIncident.subject;
      this.incident.orgs = this.getSelectedIncident.orgs;
      this.incident.subject = this.getSelectedIncident.subject;
      this.incident.Date = this.getSelectedIncident.date;
      this.incident.Time = this.getSelectedIncident.time;
      this.incident.saverity.id = this.getSelectedIncident.saverity.id;
      this.incident.Urgancey.id = this.getSelectedIncident.urgancey.id;
      this.incident.Category.id = this.getSelectedIncident.category.id;
      this.incident.signature = this.getSelectedIncident.signature;
      this.incident.orgs.length = this.getSelectedIncident.orgs.length;
      this.incident.description = this.getSelectedIncident.description;
      this.incident.ipAddresses = this.getSelectedIncident.ipAddresses;
      this.incident.tags = this.getSelectedIncident.tags;
      this.incident.attachments = this.getSelectedIncident.attachments;
      this.incident.extraNote1 = this.getSelectedIncident.extraNote1;
    },
  },

  methods: {
    ...mapActions("organization", ["fetchSectors", "fetchOrganizations"]),
    ...mapActions("incidents", ["EditIncident", "fetchData", "addCategories"]),

    tagsHandler(tags) {
      console.log(tags);
      this.incident.tags = tags.map((tag) => ({
        name: tag,
      }));
    },

    download(file) {
      return "data:" + file.type + ";base64," + file.content;
      // window.open(filedata.content, "_blank");
    },

    add() {
      this.dialog = true;
      let file = this.getfile;

      let message = "";
      let isValid = true;

      if (this.incident.subject.trim() == "") {
        isValid = false;
        message = "يجب إضافة العنوان";
      }
      if (this.incident.Time == null) {
        isValid = false;
        message = "يجب إضافة الوقت";
      }

      if (this.incident.Urgancey.id == -1) {
        isValid = false;
        message = "يجب إضافة الأسبقية";
      }
      if (this.incident.saverity.id == -1) {
        isValid = false;
        message = "يجب إضافة التصنيف";
      }
      if (this.incident.Category.id == -1) {
        isValid = false;
        message = "يجب إضافة الفئة";
      }

      if (this.incident.orgs.length == 0) {
        isValid = false;
        message = "يجب إضافة القطاعات";
      }

      if (!isValid) {
        return this.statAlert(true, message, "error");
      } else {
        this.EditIncident(this.incident)
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
      }
    },

    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },

    GetCategory() {
      return this.getCat;
    },

    AddCategory() {
      let Cat = this.getCat;
      if (Cat.some(({ label }) => label === this.category)) {
        return this.statAlert(
          true,
          "( " + this.category + " )" + "تم إضافته مسبقا  ",
          "error"
        );
      } else {
        this.addCategories({
          label: this.category,
          code: this.category,
        }).then((resp) => {});
        this.category = "";
      }
    },

    assignPermissions(pers) {
      this.permissions = pers;
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },
    saveIps(ips) {
      this.incident.documentId = ips[0]["document Id"];
      this.incident.IpAddresses = ips.map((ip) => ({
        source: { ip: ip["Source IP"], port: ip["From Port"] },
        dest: { ip: ip["Dist IP"], port: ip["To Port"] },
        beginTimestamp: new Date(
          Math.round((ip["Event Begin Timestamp"] - 25569) * 86400 * 1000)
        ),
        endTimestamp: new Date(
          Math.round((ip["Event End Timestamp"] - 25569) * 86400 * 1000)
        ),
        sourceCountry: ip["Source Country"],
        destinationCountry: ip["Destination Country"],
        dataLength: ip["Data Length"],
        signatureTitle: ip["Signature Title"],
        signatureContent: ip["Signature Content"],
        signatureClassification: ip["Signature Classification"],
        totalHits: ip["Total Hits"],
        intrusionSet: ip["Intrusion Set"],
        isRequestVarify: false,
        isHandeled: false,
        isKnown: false,
      }));
    },
    addAttachment(files) {
      this.incident.attachments = files;
    },

    AddTag() {
      this.incident.tagList.push({
        tagName: this.tagName,
      });
      this.tagName = "";
    },

    closeResponceDailog(status) {
      this.saveDialog = false;
      if (status) {
        this.$router.push({ name : "الحوادث الأمنية"});
      }
    },

    // Delete Tag
    deleteTag(index) {
      this.tagList.splice(index, 1);
    },
    addIp(ip) {
      this.incident.IpAddresses.push(ip);
    },

    goback() {
      this.$router.push({ name : "الحوادث الأمنية"});
    },
    close() {
      this.$router.push({ name : "الحوادث الأمنية"});
    },
    all() {
      this.panel = [0, 1, 2, 3, 4, 5];
    },
    hide() {
      this.panel = [];
    },
    removeOrg(index) {
      this.incident.orgs.splice(index, 1);
    },
    removeIp(e, ip) {
      e.preventDefault();
      this.incident.IpAddresses = this.incident.IpAddresses.filter((x) => {
        if (ip == x) return false;
        return true;
      });
    },
  },
  created() {
    this.fetchSectors();
    this.fetchData();
    this.fetchOrganizations();
  },
};
</script>
<style >
.ql-editor {
  height: 59vh;
}
</style>
