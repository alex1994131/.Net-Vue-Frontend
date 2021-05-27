<template>
  <v-row justify="center">
    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
    >{{ alert.txt }}
    </v-snackbar>
    <v-col cols="12" md="11">
      <v-simple-table>
        <template v-slot:default>
          <tbody>
          <tr>
            <td style="background-color:#F6F6F6;">
              <v-subheader>
                <h1>إضافة مجموعة تهديد</h1>
              </v-subheader>
            </td>
          </tr>
          <tr>
            <td>
              <v-card>
                <v-row justify="center">
                  <v-col cols="12" md="7">
                    <v-form v-model="valid">
                      <v-row style=" border-up: 15px solid #ffffff">
                        <v-col cols="12" md="5">
                          <v-text-field
                            v-model="apt.name"
                            label="أسم المجموعة"
                            counter="50"
                            :rules="[required('المجموعة'), minLength('المجموعة',4) , maxLength('المجموعة', 50)]"
                          />
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                          <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                          >
                            <template v-slot:activator="{ on }">
                              <v-text-field
                                v-model="apt.date"
                                prepend-icon="mdi-calendar-blank"
                                label="التاريخ"
                                readonly
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker v-model="apt.date" @input="menu2 = false"></v-date-picker>
                          </v-menu>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-tabs
                          background-color="#43505D" slider-color="#E4E8EC"

                          style=" border-radius:5px; border-left: 5px solid #F6F6F6;border-right: 5px solid #F6F6F6;border-bottom: 5px solid #F6F6F6"
                        >
                          <v-tab>
                            <h3 style="color:white; ">ملخص</h3>
                          </v-tab>
                          <v-tab-item>
                            <AptAddAbstract :contents="apt.contents"/>
                            <v-flex style="margin-left:10px; ">
                              <div v-if="team.length">
                                <v-timeline dense>
                                  <v-timeline-item
                                    v-for="index in apt.contents"
                                    :key="index.contentString"
                                    color="primary "
                                    icon="mdi-text-box-plus-outline"
                                    small
                                  >
                                    <v-card>
                                      <div style="margin-left:10px;margin-right:10px;">
                                        <v-icon color="primary">mdi-account</v-icon>
                                        {{ getUserDetails.fullName }}
                                        <p style="color:silver; float:left; ">
                                          <v-icon color="primary">mdi-calendar-range</v-icon>
                                          {{ apt.date }}
                                        </p>
                                      </div>
                                      <v-card-text>
                                        <div class="subheading">
                                          <p v-html="index.contentString"></p>
                                        </div>
                                        <div class="content-view" ref="contentContainer"></div>
                                      </v-card-text>
                                    </v-card>
                                  </v-timeline-item>
                                </v-timeline>
                              </div>
                              <div v-else>
                                <div class="subheading">
                                  <p>لا يوجد ملخص</p>
                                </div>
                              </div>
                            </v-flex>
                          </v-tab-item>
                          <v-tab>
                            <h3 style="color:white;">البصمة</h3>
                          </v-tab>
                          <v-tab-item>
                            <signature :threatSignature="apt.ThreatSignatures"/>
                            <v-flex style="margin-left:10px">
                              <div v-if="team.length">
                                <v-timeline dense>
                                  <v-timeline-item
                                    v-for="index in apt.ThreatSignatures"
                                    :key="index.name"
                                    color="red lighten-2"
                                    icon="mdi-text-box-plus-outline"
                                    small
                                  >
                                    <v-card class="elevation-2">
                                      <div style="margin-left:10px;margin-right:10px; ">
                                        <v-icon color="primary">mdi-account</v-icon>
                                        {{ getUserDetails.fullName }}
                                        <p style="color:silver; float:left; ">
                                          <v-icon color="primary">mdi-calendar-range</v-icon>
                                          {{ apt.date }}
                                        </p>
                                      </div>
                                      <v-card-text>
                                        <div class="subheading">
                                          <p v-html="index.name"></p>
                                        </div>
                                        <div class="content-view" ref="contentContainer"></div>
                                      </v-card-text>
                                    </v-card>
                                  </v-timeline-item>
                                </v-timeline>
                              </div>

                              <div v-else>
                                <div class="subheading">
                                  <p>لا يوجد بصمة</p>
                                </div>
                              </div>
                            </v-flex>
                          </v-tab-item>

                          <v-tab>
                            <h3 style="color:white;">منهجية الإستهداف</h3>
                          </v-tab>
                          <v-tab-item>
                            <stratigies :attackStratigies="apt.AttackStratigies"/>
                            <v-flex style="margin-left:10px">
                              <div v-if="team.length">
                                <v-timeline dense>
                                  <v-timeline-item
                                    v-for="index in apt.AttackStratigies"
                                    :key="index.Description"
                                    color="red lighten-2"
                                    icon="mdi-text-box-plus-outline"
                                    small
                                  >
                                    <v-card class="elevation-2">
                                      <div style="margin-left:10px;margin-right:10px; ">
                                        <v-icon color="primary">mdi-account</v-icon>
                                        {{ getUserDetails.fullName }}
                                        <p style="color:silver; float:left; ">
                                          <v-icon color="primary">mdi-calendar-range</v-icon>
                                          {{ apt.date }}
                                        </p>
                                      </div>
                                      <v-card-text>
                                        <div class="subheading">
                                          <p v-html="index.Description"></p>
                                        </div>
                                        <div class="content-view" ref="contentContainer"></div>
                                      </v-card-text>
                                    </v-card>
                                  </v-timeline-item>
                                </v-timeline>
                              </div>
                              <div v-else>
                                <div class="subheading">
                                  <p>لا يوجد منهجية إستهداف</p>
                                </div>
                              </div>
                            </v-flex>
                          </v-tab-item>
                        </v-tabs>
                      </v-row>
                    </v-form>
                  </v-col>

                  <v-col cols="12" md="4" style="float:left; ">
                    <div>
                      <div style="margin-bottom: 25px;margin-top: 25px;">
                        <v-btn class="ma-2" color="primary " small @click="all">عرض الكل</v-btn>
                        <v-btn small @click="hide">إخفاء الكل</v-btn>
                      </div>

                      <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>أسماء اخرى</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <altername :alternames="apt.AlternativeNames"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>دول المنشأ</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <OriginCountris :countriesList="apt.Origin"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>الدول المستهدفة</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <targeted :countriesList="apt.Targeted"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>الشركات المتعلقة</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <AptCompanies :companies="apt.CompanyNames"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>القطاعات المستهدفة</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <AptTargetSector :sector="apt.targetSectorNames"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>الأدوات المستخدمة</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <AptTools :tools="apt.toolsNames"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>

                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <h3>المرفقات</h3>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content>
                            <FilePond @input="addAttachment"/>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="11">
                    <template>
                      <v-btn class="ma-2" color="primary" @click="AddDetails2">
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
                        <h3>حفظ</h3>
                      </v-btn>
                    </template>
                    <v-btn class="ma-2" @click="clear">
                      <v-icon left>mdi-close-circle-outline</v-icon>
                      <h3>إلغاء</h3>
                    </v-btn>
                  </v-col>
                </v-row>
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
      @close="closeResponseDialog"
    />
    <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/>
  </v-row>
</template>

<script>
import {mapActions, mapGetters} from "vuex";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import {PERMISSION} from "../../../helpers/constants";

export default {
  components: {
    altername: () => import("./../SubComponenet/AptAlternativeNameSC"),
    OriginCountris: () => import("./../SubComponenet/CountriesPicker"),
    targeted: () => import("./../SubComponenet/CountriesPicker"),
    signature: () => import("./../SubComponenet/AptAddThreatSignatureSC"),
    stratigies: () => import("./../SubComponenet/AptAddAttackStratigiesSC"),
    FilePond: () => import("./../SubComponenet/AttachmentsSC"),
    AptAddAbstract: () => import("./../SubComponenet/AptAddAbstractSC"),
    AptCompanies: () => import("./../SubComponenet/AptAddCompaniesSC"),
    AptTools: () => import("./../SubComponenet/AptAddToolsSC"),
    AptTargetSector: () => import("./../SubComponenet/AptAddTargetedSectorSC"),
    LoginStatus: () => import("./../SubComponenet/AuthorizationChacker"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      name: "APTS",
      permissions: [],
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      dialog: false,
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 3000,
      },
      content: "",
      response: "",
      team: [
        {name: "John", role: "Developer"},
        {name: "Ali", role: "Programmer"},
      ],

      valid: false,

      required(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل اسم  ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} يجب أن تكون أكثر من ${minLength} أحرف`;
      },
      maxLength(propertyType, maxLength) {
        return (v) =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن تكون أقل من ${maxLength} أحرف`;
      },

      date: new Date().toISOString().substr(0, 10),
      menu2: false,
      apt: {
        name: "",
        id: 0,
        country: "",
        date: new Date().toISOString().substr(0, 10),
        menu2: false,
        Origin: [],
        AlternativeNames: [],
        Targeted: [],
        CompanyNames: [],
        toolsNames: [],
        targetSectorNames: [],
        contents: [],
        ThreatSignatures: [],
        AttackStratigies: [],
        attachments: [],
      },
      panel: [],
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("employees", ["getEmployees", "getUserDetails"]),
    getOperations() {
      return PERMISSION.APT.ADD.name;
    },
  },
  methods: {
    ...mapActions("apt", ["save"]),
    ...mapActions("country", ["fetchCountries"]),
    ...mapActions("organization", ["fetchOrganizations", "fetchSectors"]),

    assignPermissions(perm) {
      this.permissions = perm;
    },

    AddDetails2() {
      this.dialog = true;

      let message = "";
      let isValid = true;

      if (this.apt.Origin.length === 0) {
        isValid = false;
        message = "يجب إضافة دول المنشأ";
      }
      if (this.apt.Targeted.length === 0) {
        isValid = false;
        message = "يجب إضافة الدول المستهدفة";
      }
      if (this.apt.targetSectorNames.length === 0) {
        isValid = false;
        message = "يجب إضافة القطاعات المستهدفة";
      }
      if (this.apt.name.trim() === "") {
        isValid = false;
        message = "يجب إضافة اسم المجموعة";
      }
      if (!isValid) {
        return this.statAlert(true, message, "error");
      } else {
        this.save(this.apt)
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
    addAttachment(files) {
      this.apt.attachments = files;
    },
    closeResponseDialog(status) {
      this.saveDialog = false;
      if (status) {
        this.$router.push("./SearchAPT");
      }
    },
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    clear() {
      this.$router.push("SearchAPT");
    },
    done() {
      this.$router.push("SearchAPT");
      this.dialog = false;
    },
    all() {
      this.panel = [0, 1, 2, 3, 4, 5, 6];
    },
    hide() {
      this.panel = [];
    },
  },
  created() {
    this.fetchCountries();
    this.fetchSectors();
    this.fetchOrganizations();
  },
};
</script>
