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
                    <v-btn
                      class="ma-3"
                      color="primary"
                      @click="pdfShowing"
                      small
                      label
                      outlined
                    >
                      <h3>pdf Showing</h3>
                      <v-icon light>mdi-file</v-icon>
                    </v-btn>
                    <v-btn
                      class="ma-3"
                      v-if="canAassign"
                      color="primary"
                      @click="assignTask"
                      small
                      label
                      outlined
                    >
                      <h3>اسناد مهمة</h3>
                      <v-icon light>mdi-plus</v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-3"
                      v-if="canAassignIP"
                      color="primary"
                      @click="requestIdentification"
                      :disabled="
                        getSelectedIncident.isIpsIdentificationRequested ||
                        getSelectedIncident.ipAddresses.length == 0
                      "
                      small
                      label
                      outlined
                    >
                      <h3>طلب تعريف</h3>
                      <v-icon light>mdi-plus-network</v-icon>
                    </v-btn>


                    <v-btn
                      class="ma-3"
                      color="primary"
                      v-if="newIncident"
                      :disabled="getSelectedIncident.isIncident"
                      @click="CreateIncident"
                      small
                      label
                      outlined
                    >
                      <h3>تغيير إلى حادث</h3>
                      <v-icon light>mdi-alert</v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-3"
                      color="primary"
                      v-if="ignore"
                      @click="ignoreNotification"
                      small
                      label
                      outlined
                    >
                      <h3>تجاهل</h3>
                      <v-icon light>mdi-eye-off</v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-3"
                      color="primary"
                      v-if="ignore"
                      @click="closeNotification"
                      small
                      label
                      outlined
                    >
                      <h3> اغلاق التنبيه </h3>
                      <v-icon light>mdi-eye-off</v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-3"
                      color="primary"
                      v-if="ArchiveIncident"
                      @click="closeIncident"
                      small
                      label
                      outlined
                    >
                      <h3> إغلاق الحادثة</h3>
                      <v-icon light>mdi-check</v-icon>
                    </v-btn>

                    <v-btn
                      class="ma-3"
                      v-if="canAassign"
                      color="primary"
                      @click="fixTask"
                      small
                      label
                      outlined
                    >
                      <h3>طلب تعديل</h3>
                      <v-icon light>mdi-pencil</v-icon>
                    </v-btn>

                  </v-subheader>
                  <v-subheader class="ma-2" style="background-color: #606060">
                    <h3 style="color:white">العنوان:</h3>
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

                            <td>الأولوية:</td>
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
                          <tr>
                            <td>البصمة:</td>
                            <td style="font-weight: 900">
                              <v-chip class="ma-1" label>
                                <h3>
                                  {{ getSelectedIncident.signature }}
                                </h3>
                                </v-chip
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
                    <v-tabs background-color="#606060" slider-color="primary">
                      <v-tab class="mr-3">
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: white">قسيمة الإجراء</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-card height="600px" class="scroll">
                          <v-row justify="center">
                            <v-col cols="12" md="12">
                              <ProcedureProchure/>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>
                      <v-tab class="mr-3">
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: white">التعليقات</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-card height="600px" class="scroll">
                          <v-row justify="center">
                            <v-col cols="12" md="12">
                              <ViewIncidentComments/>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>

                      <v-tab class="mr-3">
                        <h4 style="color: white">سير الإجراء</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-card height="600px" class="scroll">
                          <v-row justify="center">
                            <v-col cols="12" md="12">
                              <history :history="getSelectedIncident.changes"/>
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>

                      <v-tab class="mr-3">
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: white">عناوين الإنترنت</h4>
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

                      <v-tab class="mr-3">
                        <v-icon color="black"></v-icon>
                        <h4 style="color: white">المهام المرتبطة</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-row>
                          <v-col cols="12" md="11">
                            <v-container>
                              <tasks :tasks="getIncidentRelatedTasks"></tasks>
                            </v-container>
                          </v-col>
                        </v-row>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-col>

                <v-col cols="12" md="3"></v-col>
              </v-row>
            </template>
          </v-container>
        </v-card>

        <LoginStatus
          :page="name"
          :operation="getOperations"
          @input="assignPermissions"
        />
        <IgnoreReasonDialog :isOpen="ignoreDialog" @close="ignoreDialog = false" :id="notificationId"/>
        <closeeReasonDialog :isOpen="closeeDialog" @close="closeeDialog = false" :id="notificationId2"/>
        <DEditIncedent :isOpen="dialogFixTask" @close="dialogFixTask = false" :id="notificationId"/>

        <responseDialog
          :status="saveDialog"
          :success="isSuccessSave"
          :message="responseMessage"
          @close="closeResponceDailog"
        />
      </v-container>
    </v-col>
    <v-col cols="12" md="12">
      <AddNewSubTask :incidnet="getSelectedIncident" @close="dialogSubTask = false" :statusTask="dialogSubTask"/>
    </v-col>

    <vue-html2pdf 
      ref="html2PdfMine"
      :show-layout="controlValue.showLayout"
      :float-layout="controlValue.floatLayout"
      :enable-download="controlValue.enableDownload"
      :preview-modal="controlValue.previewModal"
      :filename="controlValue.filename"
      :paginate-elements-by-height="controlValue.paginateElementsByHeight"
      :pdf-quality="controlValue.pdfQuality"
      :pdf-format="controlValue.pdfFormat"
      :pdf-orientation="controlValue.pdfOrientation"
      :pdf-content-width="controlValue.pdfContentWidth"
      :manual-pagination="controlValue.manualPagination"
    >
      
    <section style="text-align: right" slot="pdf-content">
          <section class="report-info" ref = "pdfContent">
            <section class="section-container">
              <div class="case-logo" style="text-align:center; margin-bottom: 20px;">
                <img width="200" src="./logo.png">
              </div>
              <h2 class="case-title" style="padding: 0px 80px; ">
                <p>
                  {{ getSelectedIncident.subject }} 
                  :العنوان
                </p>
              </h2>
              <div class="case-information" style="padding: 0px 40px;">
                <v-container>
                  <v-simple-table style="background-color: #fbfbfb">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <td colspan="4">
                            <h4 style="padding-right: 10px;">المعلومات الاولية   للحادثة </h4>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr >
                          <td style="font-weight: 200">
                            <p class="padding-right: 10px;">
                              {{ formatD(getSelectedIncident.date) }}
                              :التاريخ
                            </p>
                          </td>
                          <td>
                            <p class="padding-right: 10px;">
                              {{ getSelectedIncident.time }}
                              :الوقت
                            </p>
                          </td>
                          <td>
                            <p class="padding-right: 10px;">
                              {{ getSelectedIncident.urgancey.label }}
                              :الأولوية
                            </p>
                          </td>
                          <td>
                            <p class="padding-right: 10px;">
                              {{ getSelectedIncident.category.label }}
                              :الفئة
                            </p>
                          </td>
                        </tr>
                        <tr>
                          <td style="font-weight: 900" colspan="3">
                            <v-chip
                                v-for="item in getSelectedIncident.orgs"
                                :key="item.id"
                                class="ma-2"
                              >
                              {{ item.organization.orgname + "," }}
                            </v-chip>
                          </td>
                          <td colspan="1">: الجهةالمتاثرة</td>
                        </tr>
                        <tr>
                          <td colspan="3">
                            <p>
                               {{ getSelectedIncident.signature }} 
                            </p>
                          </td>
                          <td colspan="1">
                          :البصمة   
                          </td>
                        </tr>
                        <tr>
                          <td style="font-weight: 900" colspan="3">
                            <v-chip
                              v-for="(att, i) in getSelectedIncident.attachments"
                              :key="i"
                              class="ma-2"
                              @click="downloadAttachment(att)"
                            >
                              {{ att.attachment.title + "," }}
                            </v-chip>
                          </td>
                          <td colspan="1">: المرفقات</td>
                        </tr>
                        <tr>
                          <td colspan="3">
                            <p>
                              {{ ToText(getSelectedIncident.description) }}
                            </p>
                          </td>
                          <td colspan="1">
                            : ملخص التنبيه 
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-container>
              </div>
              <hr />
              <div class="case-task" style="padding: 0px 40px;">
                <v-container>
                  <v-simple-table style="background-color: #fbfbfb" class="ma-4">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <td colspan="4">
                            <h4 style="padding-right: 10px;">قسيمة الاجراء للحادثة </h4>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr
                          v-for="(assignment, i) in getSelectedIncident.assignments"
                          :key="i"
                        >
                          <td colspan="1">
                            <div class="s1">
                              <v-icon color="primary">mdi-account-outline</v-icon>
                              {{ assignment.createdBy.fullName }} -
                              {{ formatDate(assignment.createdDate) }}
                            </div>
                            <v-container>
                              <v-card-text>
                                <div class="s3">
                                  <p
                                    style="padding-right: 10px;"
                                    v-html="assignment.request"
                                  ></p>
                                </div>
                              </v-card-text>
                            </v-container>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-container>
              </div>
              <hr />
              <div class="case-comment" style="padding: 0px 40px;">
                <v-container >
                  <v-simple-table style="background-color: #fbfbfb" class="ma-4">
                    <template v-slot:default>
                      <thead>
                        <tr>
                          <td colspan="1">
                            <h4 style="padding-right: 10px;">  تعلقات فريق العمل</h4>
                          </td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(commentObj, i) in getSelectedIncident.comments" :key="i">
                          <td>
                            <div class="s1">
                              <v-icon color="primary">mdi-account-outline</v-icon
                              >{{ commentObj.comment.createdBy.fullName }} -
                              {{ formatDate(commentObj.comment.createdDate) }}
                            </div>
                            
                            <v-container>
                              <v-card-text>
                                <div class="s3">
                                  <p
                                    style="padding-right: 10px;"
                                    v-html="commentObj.comment.commentString"
                                  ></p>
                                </div>
                              </v-card-text>
                            </v-container>
                            <tr><td></td></tr>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-container>
              </div>
            </section>
          </section>
        </section>

    </vue-html2pdf>

  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
// import jsPDF from 'jspdf';
import VueHtml2pdf from 'vue-html2pdf';
import html2pdf from 'html2pdf.js'
import "quill/dist/quill.snow.css";
import {quillEditor} from "vue-quill-editor";
import FilePond from "./../SubComponenet/AttachmentsSC";
import ViewIncidentComments from "./ViewIncidentComments";
import {PERMISSION} from "../../../helpers/constants";
import {STATUS} from "../../../helpers/ConstantStatus";
import moment from "moment";

export default {
  components: {
    quillEditor,
    FilePond,
    ViewIncidentComments,
    VueHtml2pdf,
    ProcedureProchure: () => import("./ProcedureProchure"),
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
    IgnoreReasonDialog: () => import("../Dialogs/IgnoreReasonDialog"),
    closeeReasonDialog: () => import("../Dialogs/CloseeReasonDialog"),
    DEditIncedent: () => import("../Dialogs/DEditIncedent"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
    tasks: () => import("../SubComponenet/SubTasksSC"),
    history: () => import("../SubComponenet/ShowHistorySC"),
    AddNewSubTask: () => import("../Tasks/AddNewSubTask"),
  },
  data() {
    return {
      
      controlValue: {
          control: false,
          floatLayout: true,
          enableDownload: true,
          previewModal: true,
          paginateElementsByHeight: 1100,
          manualPagination: false,
          filename: 'Hee Hee',
          pdfQuality: 2,
          pdfFormat: 'a4',
          pdfOrientation: 'portrait',
          pdfContentWidth: '800px'
      },

      name: "NOTIFICATIONS",
      closeeDialog: false,
      ignoreDialog: false,
      dialogSubTask: false,
      dialogFixTask: false,
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

    canAassign() {
      let heCan = this.permissions.includes(
        PERMISSION.NOTIFICATIONS.ASSIGN_TASK.name
      );
      return heCan;
    },
    newIncident() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.SIGN_AS_INCIDENT.name)
        && this.getSelectedIncident.status.status.id == STATUS.NOTIFICATION.OPEN_NOTIFICATION;
      return heCan;
    },
    ignore() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.IGNORE.name) &&
        this.getSelectedIncident.status.status.id == STATUS.NOTIFICATION.OPEN_NOTIFICATION;
      return heCan;
    },
    ArchiveIncident() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.CLOSE.name) &&
        this.getSelectedIncident.status.status.id == STATUS.NOTIFICATION.INCIDENT;
      return heCan;
    },
    canAassignIP() {
      let heCan =
        this.permissions.includes(
          PERMISSION.NOTIFICATIONS.ASSIGN_NEW_REQUEST.name
        )
      return heCan;
    },
    getOperations() {
      return PERMISSION.NOTIFICATIONS.DETAILS.name;
    },
  },
  methods: {
    ...mapActions("incidents", ["changeIncidnet", "requestIpsIdentification", "setParentIncident",]),
    ...mapActions("attachments", ["downloadAttachment"]),
    ...mapActions("tasks", ["fetchIncidentTasks"]),
    assignPermissions(pers) {
      this.permissions = pers;
    },

    ToText(HTML)
    {
      var input = HTML;
      return input.replace(/<(style|script|iframe)[^>]*?>[\s\S]+?<\/\1\s*>/gi,'').replace(/<[^>]+?>/g,'').replace(/\s+/g,' ').replace(/ /g,' ').replace(/>/g,' ');  
    },

    formatD(date) {
      return moment(date).format("DD-MM-YYYY");
    },

    requestIdentification() {
      this.requestIpsIdentification({id: this.getSelectedIncident.id})
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
    getUser() {
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

    
		setOptions () {
			return {
				
        margin: [0.5, 0.2, 0.5, 0.2], 
        pageBreak: { mode: 'css', before:'#nextpage1'},
				filename: `incient.pdf`,  
				image: { type: 'png', quality: 0.98},
				enableLinks: false,
				html2canvas: { dpi: 192, letterRendering: true },
				jsPDF: {unit: 'in', format: "a4",orientation: "portrait"}
			}
		},
    
    async pdfShowing() {
      console.log(this.getSelectedIncident)
      let options = this.setOptions()
      const pdfContent = this.$refs.html2PdfMine.$refs.pdfContent

      await html2pdf().set(options).from(pdfContent).toPdf().get('pdf').then((pdf) => {
          const totalPages = pdf.internal.getNumberOfPages()
          for (let i = 1; i <= totalPages; i++) {
              pdf.setPage(i)
              pdf.setFontSize(10)
              pdf.setTextColor(150)
              pdf.text('Page ' + i + ' of ' + totalPages, (pdf.internal.pageSize.getWidth() * 0.88), (pdf.internal.pageSize.getHeight() - 0.3))
          } 
      }).save()
    },

    // pdfShowing() {
    //   // console.log(this.getSelectedIncident);
    //   // let pdfName = 'SingleIncient'; 
    //   // var doc = new jsPDF();
    //   // doc.text(this.getSelectedIncident.subject, 10, 10);
    //   // doc.save(pdfName + '.pdf');
    // },

    assignTask() {
      this.dialogSubTask = true;
    },

    CreateIncident() {
      this.changeIncidnet({changeType: STATUS.NOTIFICATION.INCIDENT, id: this.getSelectedIncident.id})
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
    fixTask() {
      this.notificationId = this.getSelectedIncident.id;
      this.dialogFixTask = true;
    },
    closeIncident() {
      this.$router.push({name: "إغلاق حادثة"});
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
    this.fetchIncidentTasks(this.getSelectedIncident.id);
  },
};
</script>
<style>
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

.report-info {
  margin: 0 auto;
  padding: 20px 0;
}
</style>