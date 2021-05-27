<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td style="background-color: #f6f6f6">
                  <v-subheader>
                    <h1>المهام الواردة</h1>
                  </v-subheader>
                </td>
              </tr>
              <tr>
                <td>
                  <v-col cols="12" md="12">
                    <v-card>
                      <template>
                        <v-tabs
                          background-color="transparent"
                          slider-color="#769362"
                        >
                          <v-tab class="mr-3">
                            <v-badge
                              color="#769362"
                              :content="count(getPending)"
                            >
                              <h3>المهام الجديدة</h3>
                            </v-badge>
                          </v-tab>
                          <v-tab-item>
                            <v-col cols="12" md="4">
                              <v-text-field
                                v-model="search1"
                                append-icon="mdi-magnify"
                                label="بحث .."
                                single-line
                              ></v-text-field>
                            </v-col>
                            <v-card-text>
                              <v-data-table
                                dense
                                :loading="getLoading"
                                :headers="headers"
                                :items="getPending"
                                :items-per-page="5"
                                class="elevation-1"
                                :search="search1"
                                :sort-by="['taskId']"
                                :sort-desc="[true]"
                              >
                                <template #item.actions="{ item }">
                                  <PendingActions :task="item" />
                                </template>
                                <template #item.importance="{ item }">
                                  <v-icon
                                    small
                                    v-bind:color="
                                      item.importance == 1
                                        ? 'red'
                                        : item.importance == 2
                                        ? 'red'
                                        : item.importance == 3
                                        ? '#5499C7'
                                        : ''
                                    "
                                    >mdi-checkbox-blank-circle</v-icon
                                  >
                                  {{
                                    item.importance === 1
                                      ? "سري للغاية"
                                      : item.importance === 2
                                      ? "سري"
                                      : item.importance === 3
                                      ? "مكتوم"
                                      : "محدود"
                                  }}
                                  /
                                  <v-icon
                                    small
                                    v-bind:color="
                                      item.urgent == 1
                                        ? ''
                                        : item.urgent == 2
                                        ? '#5499C7'
                                        : 'red'
                                    "
                                    >mdi-checkbox-blank-circle</v-icon
                                  >
                                  {{
                                    item.urgent == 1
                                      ? "عادي"
                                      : item.urgent == 2
                                      ? "عاجل"
                                      : "عاجل جدا"
                                  }}
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-tab-item>
                          <v-tab class="mr-3">
                            <v-badge
                              color="#769362"
                              :content="count(getOnProgress)"
                            >
                              <h3>مهام قيد الإجراء</h3>
                            </v-badge>
                          </v-tab>
                          <v-tab-item>
                            <v-col cols="12" md="4">
                              <v-text-field
                                v-model="search2"
                                append-icon="mdi-magnify"
                                label="بحث .."
                                single-line
                              ></v-text-field>
                            </v-col>
                            <v-card-text>
                              <v-data-table
                                dense
                                :headers="headers"
                                :items="getOnProgress"
                                :items-per-page="5"
                                class="elevation-1"
                                :search="search2"
                                :sort-by="['taskId']"
                                :sort-desc="[true]"
                              >
                                <template #item.actions="{ item }">
                                  <InProgressActions :task="item" />
                                </template>
                                <template #item.importance="{ item }">
                                  <v-icon
                                    small
                                    v-bind:color="
                                      item.importance == 1
                                        ? 'red'
                                        : item.importance == 2
                                        ? 'red'
                                        : item.importance == 3
                                        ? '#5499C7'
                                        : ''
                                    "
                                    >mdi-checkbox-blank-circle</v-icon
                                  >
                                  {{
                                    item.importance === 1
                                      ? "سري للغاية"
                                      : item.importance === 2
                                      ? "سري"
                                      : item.importance === 3
                                      ? "مكتوم"
                                      : "محدود"
                                  }}
                                  /
                                  <v-icon
                                    small
                                    v-bind:color="
                                      item.urgent == 1
                                        ? ''
                                        : item.urgent == 2
                                        ? '#5499C7'
                                        : 'red'
                                    "
                                    >mdi-checkbox-blank-circle</v-icon
                                  >
                                  {{
                                    item.urgent == 1
                                      ? "عادي"
                                      : item.urgent == 2
                                      ? "عاجل"
                                      : "عاجل جدا"
                                  }}
                                </template>
                                <template #item.urgent="{ item }">
                                  <v-chip
                                    label
                                    small
                                    v-bind:color="
                                      item.urgent == 1 ? 'red' : 'blue'
                                    "
                                    text-color="white"
                                  >
                                    {{ item.urgent == 1 ? "عاجل" : "غير عاجل" }}
                                  </v-chip>
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-tab-item>
                          <v-tab>
                            <h3>السجل</h3>
                          </v-tab>
                          <v-tab-item>
                            <v-simple-table>
                              <template v-slot:default>
                                <tbody>
                                  <tr> <td> <br/> <v-row justify="center">
                              <v-col cols="12" md="2">
                                <v-select
                                  outlined
                                  dense
                                  v-model="status"
                                  :items="items"
                                  item-text="label"
                                  item-value="id"
                                  label="الحالة"
                                  multiple
                                ></v-select>
                              </v-col>

                              <v-col cols="12" md="2">
                                <v-menu
                                  v-model="date1Dialog"
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
                                      v-model="fromDate"
                                      label="من"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="fromDate"
                                    @input="date1Dialog = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>

                              <v-col cols="12" md="2">
                                <v-menu
                                  v-model="date2Dialog"
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
                                      v-model="toDate"
                                      label="إلى"
                                      readonly
                                      v-on="on"
                                    ></v-text-field>
                                  </template>
                                  <v-date-picker
                                    v-model="toDate"
                                    @input="date2Dialog = false"
                                  ></v-date-picker>
                                </v-menu>
                              </v-col>

                              <v-col cols="12" md="3">
                                <v-text-field
                                  outlined
                                  dense
                                  v-model="searchKey"
                                  counter="100"
                                  label="مفتاح البحث.."
                                />
                              </v-col>
                              <v-btn
                                class="ma-2"
                                color="primary"
                                @click="applaySearch"
                              >
                                <v-icon left
                                  >mdi-checkbox-marked-circle-outline</v-icon
                                >
                                <h3>بحث</h3>
                              </v-btn>
                            </v-row></td></tr></tbody></template
                            ></v-simple-table>

                            <v-col cols="12" md="4">
                              <v-text-field
                                v-model="search3"
                                append-icon="mdi-magnify"
                                label="بحث .."
                                single-line
                              ></v-text-field>
                            </v-col>
                         
                            <v-card-text>
                              <v-data-table
                                dense
                                :headers="headers"
                                :items="getDone"
                                :items-per-page="5"
                                class="elevation-1"
                                :search="search3"
                                :sort-by="['taskId']"
                                :sort-desc="[true]"
                              >
                                <template #item.actions="{ item }">
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="viewDetails(item.taskId)"
                                        color="black"
                                        >mdi-view-split-vertical</v-icon
                                      >
                                    </template>
                                    <span>عرض التفاصيل</span>
                                  </v-tooltip>
                                  <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                      <v-icon
                                        v-if="item.closingReportid"
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="viewCloseReport(item.taskId)"
                                        color="black"
                                        >mdi-file-document</v-icon
                                      >
                                    </template>
                                    <span>عرض تقرير الإغلاق</span>
                                  </v-tooltip>
                                </template>
                                <template #item.importance="{ item }">
                                  <v-icon
                                    small
                                    v-bind:color="
                                      item.importance == 1
                                        ? 'red'
                                        : item.importance == 2
                                        ? 'red'
                                        : item.importance == 3
                                        ? '#5499C7'
                                        : ''
                                    "
                                    >mdi-checkbox-blank-circle</v-icon
                                  >
                                  {{
                                    item.importance === 1
                                      ? "سري للغاية"
                                      : item.importance === 2
                                      ? "سري"
                                      : item.importance === 3
                                      ? "مكتوم"
                                      : "محدود"
                                  }}
                                  /
                                  <v-icon
                                    small
                                    v-bind:color="
                                      item.urgent == 1
                                        ? ''
                                        : item.urgent == 2
                                        ? '#5499C7'
                                        : 'red'
                                    "
                                    >mdi-checkbox-blank-circle</v-icon
                                  >
                                  {{
                                    item.urgent == 1
                                      ? "عادي"
                                      : item.urgent == 2
                                      ? "عاجل"
                                      : "عاجل جدا"
                                  }}
                                </template>
                              </v-data-table>
                            </v-card-text>
                          </v-tab-item>
                        </v-tabs>
                      </template>
                    </v-card>
                  </v-col>
                  
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InProgressActions from "./InProgressActions";
import PendingActions from "./NewTaskActions";
import { STATUS } from "../../../helpers/ConstantStatus";

export default {
  name: "DashboardDashboard",
  components: {
    InProgressActions,
    PendingActions,
  },
  data() {
    return {
      searchKey: "",
      search: "",
      selectedEmps: [],
      date1Dialog: false,
      date2Dialog: false,
      status: [],
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      search1: "",
      search2: "",
      search3: "",
      Pending: [],
      OnProgress: [],
      Done: [],
      headers: [
        { text: "العنوان", value: "title" },
        { text: "التصنيف", value: "importance" },
        { text: "مُنشأ المهمة", value: "createdBy" },
        { text: "من", value: "date" },
        { text: "إلى", value: "dueDate" },
        { text: "الإجراء", value: "actions" },
      ],
    };
  },
  watch: {
    searchKey: function () {
      this.$store.dispatch("apt/setKey", this.searchKey);
    },
  },
  methods: {
    ...mapActions("tasks", [
      "fetchAssignedTasks",
      "SearchAssignedTasks",
      "fetchSelectedTasks",
      "fetchAssignedClosedTasks",
    ]),
    ...mapActions("departments", [
      "fetchSections",
      "fetchEmployees",
      "fetchDepartments",
    ]),
    ...mapActions("StatusStore", ["fetchStatuses", "fetchstatusTypeId"]),
    ...mapActions("apt", ["fetchApts"]),
    ...mapActions("employees", ["checkAuthorizationChacker"]),

    getEmps(id) {},
    count(tt) {
      if (tt == 0) return "0";
      return tt.length;
    },

    async viewCloseReport(id) {
      //console.log(id);
      await this.fetchSelectedTasks(id);
      this.$router.push({
        name: "تقرير الإغلاق",
        params: { owner: true },
      });
    },
    async applaySearch() {
      let searchObject = {
        key: this.searchKey,
        fromDate: this.fromDate,
        toDate: this.toDate,
        status: this.status.toString(),
      };
      await this.SearchAssignedTasks(searchObject);
    },
    async viewDetails(item) {
      await this.fetchSelectedTasks(item);
      this.$router.push({
        name: "تفاصيل المهام",
        params: { owner: false },
      });
    },
  },
  computed: {
    ...mapGetters("tasks", ["getAssignedTasks", "getClosedTasks"]),
    ...mapGetters("ui", ["getLoading"]),
    getPending() {
      return this.getAssignedTasks.filter(
        (task) => task.statusId == STATUS.TASK.OPEN
      );
    },

    getOnProgress() {
      return this.getAssignedTasks.filter(
        (task) => task.statusId == STATUS.TASK.IN_PROGRESS
      );
    },
    getDone() {
      return this.getClosedTasks;
    },
    importance(id) {
      return "red";
    },
    items() {
      let cat = [
        { id: STATUS.TASK.OPEN, label: "جديدة" },
        { id: STATUS.TASK.IN_PROGRESS, label: "قيد الإجراء" },
        { id: STATUS.TASK.CLOSED, label: "مغلقة" },
      ];
      return cat;
    },
  },
  created() {
    this.fetchAssignedTasks();
    this.fetchAssignedClosedTasks();
    this.fetchDepartments();
  },
};
</script>
