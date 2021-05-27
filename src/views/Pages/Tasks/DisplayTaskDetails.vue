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
                      @click="assignTask"
                      small
                      label
                      outlined
                    >
                      <h3>اسناد مهمة فرعية</h3>
                      <v-icon light>mdi-plus</v-icon>
                    </v-btn>
                  </v-subheader>
                  <v-subheader class="ma-2" style="background-color: #606060">
                    <h3 style="color: white">عنوان المهمة :</h3>
                    <v-chip class="ma-1" label>
                      <h1>{{ getSelectedTask.title }}</h1>
                    </v-chip>
                  </v-subheader>

                  <v-subheader style="background-color: #f6f6f6">
                    <h3>طلب من :</h3>
                    <v-chip class="ma-1" label>
                      <h1>{{ getSelectedTask.createdBy.fullName }}</h1>
                    </v-chip>
                  </v-subheader>
                </v-col>

                <v-col cols="12" md="9">
                  <v-slider
                    v-show="!isProgreesChnagbale"
                    label="نسبة الإنجاز:"
                    v-model="getSelectedTask.progress"
                    min="0"
                    max="100"
                    thumb-label
                  ></v-slider>

                  <v-card class="ma-0">
                    <v-container>
                      <v-simple-table dense>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td style="text-align: right">من:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    <h3>{{ getSelectedTask.date }}</h3>
                                  </h3>
                                </v-chip>
                              </td>
                              <td style="text-align: right">الى:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    <h3>{{ getSelectedTask.dueDate }}</h3>
                                  </h3>
                                </v-chip>
                              </td>

                              <td>التصنيف:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    {{
                                      getSelectedTask.importance == 1
                                        ? "سري للغاية"
                                        : getSelectedTask.importance == 2
                                        ? "سري"
                                        : getSelectedTask.importance == 3
                                        ? "مكتوم"
                                        : "محدود"
                                    }}
                                  </h3>
                                </v-chip>
                              </td>

                              <td>الأولوية:</td>
                              <td style="font-weight: 900">
                                <v-chip class="ma-1" label>
                                  <h3>
                                    {{
                                      getSelectedTask.urgent == 1
                                        ? "عادي"
                                        : getSelectedTask.urgent == 2
                                        ? "عاجل"
                                        : "عاجل جدا"
                                    }}
                                  </h3>
                                </v-chip>
                              </td>
                            </tr>

                            <tr></tr>
                          </tbody>
                        </template>
                      </v-simple-table>

                      <v-simple-table>
                        <tbody>
                          <tr>
                            <td>المرفقات:</td>
                            <td style="font-weight: 900">

                             <v-chip
                              v-for="(att, i) in getSelectedTask.attachments"
                              :key="i"
                              class="ma-2"
                              @click="downloadAttachment(att)"
                            >
                              {{ att.attachment.title + "," }}
                            </v-chip>


                            </td>
                          </tr>
                          <tr></tr>
                        </tbody>
                      </v-simple-table>
                      <v-simple-table>
                        <tbody>
                          <tr>
                            <td>توكيل المهمة إلى:</td>
                            <td>
                              <h3>
                                <v-chip-group
                                  active-class="primary--text"
                                  column
                                >
                                  <v-chip
                                    v-for="(
                                      item, i
                                    ) in getSelectedTask.assignedEmps"
                                    :key="i"
                                    class="ma-1"
                                    label
                                  >
                                    {{ item.eUser.fullName }}
                                  </v-chip></v-chip-group
                                >
                              </h3>
                            </td>
                          </tr>
                        </tbody>
                      </v-simple-table>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="12" md="3">
                  <v-card class="ma-0">
                    <v-container>
                      <v-simple-table dense>
                        <template v-slot:default>
                          <tbody>
                            <tr>
                              <td>
                                <v-row justify="center">
                                  <v-progress-circular
                                    :rotate="-90"
                                    :size="106"
                                    :value="getSelectedTask.progress"
                                    :width="18"
                                    color="primary"
                                    >{{
                                      getSelectedTask.progress
                                    }}%</v-progress-circular
                                  >
                                </v-row>
                              </td>
                            </tr>
                            <tr v-show="!isProgreesChnagbale">
                              <td>
                                <v-row justify="center">
                                  <v-btn
                                    v-show="!isProgreesChnagbale"
                                    color=" primary"
                                    class="ma-1"
                                    @click="update"
                                    outlined
                                  >
                                    <h3>تحديث</h3>
                                  </v-btn></v-row
                                >
                              </td>
                            </tr>
                          </tbody></template
                        ></v-simple-table
                      ></v-container
                    ></v-card
                  >
                </v-col>

                <v-col cols="12" md="12">
                  <v-card>
                    <div>
                      <h4 style="margin-right: 15px">ملخص المهمة:</h4>
                      <v-card-text>
                        <h3 v-html="getSelectedTask.description"></h3>
                      </v-card-text>
                    </div>
                  </v-card>
                </v-col>
                <v-col cols="12" md="12">
                  <v-card class="ma-0">
                    <v-tabs background-color="#606060" slider-color="#E4E8EC">
                      <v-tab
                        v-show="getSelectedTask.parentIncident != null"
                        class="mr-3"
                      >
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: white">الحادثة المرتبطة</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-row justify="center">
                          <v-col cols="12" md="12">
                            <v-card
                              height="600px"
                              class="scroll"
                              v-show="getSelectedTask.parentIncident != null"
                            >
                              <RelatedIncident
                                :incident="getIncident"
                              /> </v-card
                          ></v-col>
                        </v-row>
                      </v-tab-item>

                      <v-tab class="mr-3">
                        <h4 style="color: white">تعليقات المهمة</h4>
                      </v-tab>
                      <v-tab-item>
                        <v-card height="600px" class="scroll">
                          <v-row justify="center">
                            <v-col cols="12" md="12">
                              <ViewTaskComments />
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
                              <history :history="getSelectedTask.changes" />
                            </v-col>
                          </v-row>
                        </v-card>
                      </v-tab-item>

                      <v-tab class="mr-3" v-show="getSubTasks != null">
                        <v-icon class="mr-2"></v-icon>
                        <h4 style="color: white">المهام الفرعية</h4>
                      </v-tab>
                      <v-tab-item v-show="getSubTasks != 0">
                        <tasks :tasks="getSubTasks"></tasks>
                      </v-tab-item>
                    </v-tabs>
                  </v-card>
                </v-col>

                <v-col cols="12" md="3"></v-col>
              </v-row>
            </template>
          </v-container>
         
        </v-card>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import card from "./TaskComment";
import tasks from "../SubComponenet/SubTasksSC";
import RelatedIncident from "../SubComponenet/RelatedIncidentSC";
import ViewTaskComments from "../Tasks/ViewTaskComments";
import { STATUS } from "../../../helpers/ConstantStatus";

export default {
  props: ["owner"],
  components: {
    history: () => import("../SubComponenet/ShowHistorySC"),
    card,
    tasks,
    RelatedIncident,
    ViewTaskComments,
  },
  data() {
    return {
      alert: true,
      newstatus: 0,
      comment: {},
      value: 0,
    };
  },
  computed: {
    ...mapGetters("employees", ["getEmployees"]),
    ...mapGetters("tasks", ["getSubTasks", "getSelectedTask"]),
    ...mapGetters("incidents", ["getIncidentByTask"]),
    isClosable(status) {
      status != STATUS.TASK.IN_PROGRESS && !this.owner;
    },
    isProgreesChnagbale() {
      return !this.owner && STATUS.TASK.IN_PROGRESS;
    },
  },
  methods: {
    ...mapActions("tasks", ["addCommentToTask", "updateProgress"]),
    ...mapActions("attachments", ["downloadAttachment"]),
    getUsers(inc) {
      console.log(inc);
    },
    async download(item) {
     this.downloadAttachment(item);
    },
    getIncident() {
      return getSelectedTask.parentIncident != null
        ? getSelectedTask.parentIncident
        : {
            urgancey: { label: "" },
          };
    },

    checkIfIncident() {
      let valid = this.getIncidentByTask.isIncident
        ? this.getSelectedTask.isIncident
        : true;

      return valid;
    },
    addComment() {
      let submit = Object.assign({}, this.comment);
      this.comment.commentString = "";
      this.addCommentToTask({ id: this.id, message: submit.commentString });
    },
    download(file) {
      return "data:" + file.type + ";base64," + file.content;
      // window.open(filedata.content, "_blank");
    },

    assignTask() {
      this.$router.push({
        name: "إضافة مهمة",
        params: { task: this.getSelectedTask.id },
      });
    },

    update() {
      this.updateProgress({
        id: this.getSelectedTask.id,
        prog: this.getSelectedTask.progress,
      });
    },
    redo() {
      this.$router.push("EmployeeTask");
    },
  },
  created: function () {},
};
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
