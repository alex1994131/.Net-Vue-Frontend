<template>
  <v-container id="dashboard" fluid tag="section">
    <br/>
    <v-tabs background-color="transparent" slider-color="#769362" v-if="canAdd">
      <v-tab class="mr-3">
        <v-badge color="#769362" :content="count(getNotes())">
          <h3>التنبيهات</h3>
        </v-badge>
      </v-tab>
      <v-tab-item>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                <tr>
                  <td>
                    <v-card class="mx-auto">
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-show="search"
                          append-icon="mdi-magnify"
                          label="بحث .."
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-card-text>
                        <v-data-table
                          dense
                          :loading="getLoading"
                          :items="getNotes()"
                          item-key="id"
                          :items-per-page="5"
                          :headers="Headers"
                          :sort-by="['id']"
                          :sort-desc="[true]"
                        >
                          <template #item.orgName="{ item }">
                            <v-row no-gutters>
                              <div v-for="(name, i) in getOrganizations(getNotification,item.id)" :key="i">
                                <v-chip class="ma-1" label>
                                  <h3>{{ "" + name }}</h3>
                                </v-chip>
                              </div>
                            </v-row>
                          </template>
                          <template #item.saverity="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label color="#e0ebeb">
                                <h3>{{ item.saverity }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template #item.time="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label color="#e0ebeb">
                                <h3>{{ item.time }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template #item.date="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label>
                                <h3>{{ formatDate(item.date) }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              medium
                              v-if="canShow"
                              @click="viewItem(item.id)"
                              class="mr-2"
                            >mdi-eye
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-tab-item>
      <v-tab class="mr-3">
        <v-badge color="#769362" :content="count(getIncidents())">
          <h3>الحوادث الأمنية</h3>
        </v-badge>
      </v-tab>
      <v-tab-item>
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                <tr>
                  <td>
                    <v-card class="mx-auto">
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-show="search"
                          append-icon="mdi-magnify"
                          label="بحث .."
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-card-text>
                        <v-data-table
                          dense
                          :loading="getLoading"
                          :items="getIncidents()"
                          item-key="id"
                          :items-per-page="5"
                          :headers="Headers"
                          :sort-by="['id']"
                          :sort-desc="[true]"
                        >
                          <template #item.orgName="{ item }">
                            <v-row no-gutters>
                              <div
                                v-for="(name, i) in getOrganizations(
                                    getIncident,
                                    item.id
                                  )"
                                :key="i"
                              >
                                <v-chip class="ma-1" label>
                                  <h3>{{ "" + name }}</h3>
                                </v-chip>
                              </div>
                            </v-row>
                          </template>
                          <template #item.saverity="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label color="#e0ebeb">
                                <h3>{{ item.saverity }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template #item.date="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label>
                                <h3>{{ formatDate(item.date) }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template #item.time="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label color="#e0ebeb">
                                <h3>{{ item.time }}</h3>
                              </v-chip>
                            </v-row>
                          </template>

                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              medium
                              v-if="canShow"
                              @click="viewItem(item.id)"
                              class="mr-2"
                            >mdi-eye
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-tab-item>

      <v-tab class="mr-3">
        <h3>السجل</h3>
      </v-tab>
      <v-tab-item>

        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-simple-table>
              <template v-slot:default>
                <tbody>
                <tr>
                  <td>
                    <v-row style="margin-top:15px" justify="center">
                      <v-col cols="12" md="4">
                        <v-select
                          outlined
                          dense
                          v-model="selectedItem"
                          :items="items"
                          item-text="label"
                          item-value="id"
                          label="الحالة"
                          multiple
                        ></v-select>
                      </v-col>
                      <v-col cols="12" md="1">
                        <v-menu
                          v-model="date1Dialog"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field outlined dense v-model="fromDate" label="من" readonly
                                          v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="fromDate" @input="date1Dialog = false"></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="1">
                        <v-menu
                          v-model="date2Dialog"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field outlined dense v-model="toDate" label="إلى" readonly v-on="on"></v-text-field>
                          </template>
                          <v-date-picker v-model="toDate" @input="date2Dialog = false"></v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="12" md="4">
                        <v-text-field outlined dense v-model="searchKey" counter="100" label="بحث.."/>
                      </v-col>
                      <v-btn class="ma-2" color="primary" @click="search">
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
                        <h3>بحث</h3>
                      </v-btn>
                    </v-row>
                  </td>
                </tr>
                <tr>
                  <td>
                    <v-card class="mx-auto">
                      <v-col cols="12" md="4">
                        <v-text-field
                          v-show="search"
                          append-icon="mdi-magnify"
                          label="بحث .."
                          single-line
                        ></v-text-field>
                      </v-col>
                      <v-card-text>
                        <v-data-table
                          dense
                          :loading="getLoading"
                          :items="getHandledNotes()"
                          item-key="id"
                          :items-per-page="5"
                          :headers="Headers"
                          :sort-by="['id']"
                          :sort-desc="[true]"
                        >
                          <template #item.orgName="{ item }">
                            <v-row no-gutters>
                              <div
                                v-for="(name, i) in getOrganizations(getHandledNotfication,item.id)"
                                :key="i"
                              >
                                <v-chip class="ma-1" label>
                                  <h3>{{ "" + name }}</h3>
                                </v-chip>
                              </div>
                            </v-row>
                          </template>
                          <template #item.date="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label>
                                <h3>{{ formatDate(item.date) }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template #item.time="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label color="#e0ebeb">
                                <h3>{{ item.time }}</h3>
                              </v-chip>
                            </v-row>
                          </template>
                          <template #item.saverity="{ item }">
                            <v-row no-gutters>
                              <v-chip class="ma-1" label color="#e0ebeb">
                                <h3>{{ item.saverity }}</h3>
                              </v-chip>
                            </v-row>
                          </template>

                          <template v-slot:item.actions="{ item }">
                            <v-icon
                              medium
                              v-if="canShow"
                              @click="viewItem(item.id)"
                              class="mr-2"
                            >mdi-eye
                            </v-icon>
                          </template>
                        </v-data-table>
                      </v-card-text>
                    </v-card>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-tab-item>
    </v-tabs>

    <LoginStatus :page="name" @input="assignPermissions"/>
  </v-container>
</template>

<script>
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";
import stringHelper from "../../../helpers/stringHelper";
import axios from "axios";
import {PERMISSION} from "../../../helpers/constants";
import moment from "moment";
import {STATUS} from "../../../helpers/ConstantStatus";

export default {
  components: {
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
  },
  data: function () {
    return {
      name: "NOTIFICATIONS",
      permissions: [],
      date1Dialog: false,
      date2Dialog: false,
      closed: false,
      ignored: false,
      newS: false,
      searchKey: "",
      fromDate: new Date().toISOString().substr(0, 10),
      toDate: new Date().toISOString().substr(0, 10),
      IncidentsList: [],
      loading: true,
      selectedItem: "",

      Headers: [
        {
          text: "العنوان",
          align: "start",
          sortable: false,
          value: "subject",
          select_filter: true,
          width: "320px",
        },
        {text: "الوقت", value: "time", select_filter: true},
        {text: "التاريخ", value: "date", select_filter: true},
        {text: "التصنيف", value: "saverity", select_filter: true},
        {text: "الجهة المتأثرة", value: "orgName", select_filter: true},
        {text: "الإجراء", value: "actions"},
      ],
    };
  },
  computed: {
    ...mapState(["incidents"]),
    ...mapGetters("ui", ["getLoading"]),
    ...mapGetters("incidents", [
      "getHandledNotfication",
      "getNotification",
      "getNotificationRequest",
      "getUrgancy",
      "getIncident",
      "getSver",
      "getCat",
    ]),

    items() {
      let cat = [
        {id: STATUS.NOTIFICATION.OPEN_NOTIFICATION, label: "تنبيهات جديدة"},
        {
          id: STATUS.NOTIFICATION.IGNORED_NOTIFICATION,
          label: "تنبيهات متجاهلة",
        },
        {id: STATUS.NOTIFICATION.CLOSED_NOTIFICATION, label: "تنبيهات مغلقة"},
        {id: STATUS.NOTIFICATION.INCIDENT, label: "حوادث جديدة"},
        {id: STATUS.NOTIFICATION.CLOSED_INCIDENT, label: "حوادث مغلقه"},
      ];
      return cat;
    },

    canAdd() {
      let heCan = this.permissions.includes(PERMISSION.NOTIFICATIONS.ADD.name);
      return heCan;
    },
    canShow() {
      let heCan = this.permissions.includes(PERMISSION.NOTIFICATIONS.VIEW.name);
      return heCan;
    },
    getOperation() {
      return PERMISSION.NOTIFICATIONS.VIEW.name;
    },
  },
  watch: {
    searchKey: function () {
      this.$store.dispatch("apt/setKey", this.searchKey);
    },
  },
  methods: {
    ...mapActions("incidents", [
      "fetchHandledNtifications",
      "fetchIncidentById",
      "fetchNotification",
      "SearchNotes",
      "fetchIncidents",
      "deleteIncident",
    ]),
    getHandledNotes() {
      let map = this.groupBy(this.getHandledNotfication, (rec) => rec.id);
      let array = Array.from(map.keys()).map((x) =>
        this.getHandledNotfication.find((t) => t.id == x)
      );
      return array;
    },
    getIncidents() {
      let map = this.groupBy(this.getIncident, (rec) => rec.id);
      let array = Array.from(map.keys()).map((x) => this.getIncident.find((t) => t.id == x));
      return array;
    },
    getOrganizations(list, id) {
      return list.filter((x) => x.id === id).map((x) => x.orgName);
    },

    getNotesRequest() {
      let map = this.groupBy(this.getNotificationRequest, (rec) => rec.id);
      let array = Array.from(map.keys()).map((x) =>
        this.getNotificationRequest.find((t) => t.id === x)
      );
      return array;
    },
    async search() {
      let searchObject = {
        key: this.searchKey,
        fromDate: this.fromDate,
        toDate: this.toDate,
        status: this.selectedItem.toString(),
      };
      await this.SearchNotes(searchObject);
    },
    getNotes() {
      let map = this.groupBy(this.getNotification, (rec) => rec.id);
      let array = Array.from(map.keys()).map((x) =>
        this.getNotification.find((t) => t.id == x)
      );
      return array;
    },

    groupBy(list, keyGetter) {
      const map = new Map();
      list?.forEach((item) => {
        const key = keyGetter(item);
        const collection = map.get(key);
        if (!collection) {
          map.set(key, [item]);
        } else {
          collection.push(item);
        }
      });
      return map;
    },

    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    count(tt) {
      if (tt == 0) return "0";
      return tt.length;
    },
    assignPermissions(pers) {
      this.permissions = pers;
    },
    CreateIncident() {
      var incidentLength = this.IncidentsList.length;
      this.$router.push({
        path: "AddNotification",
      });
    },
    async viewItem(item) {
      await this.fetchIncidentById(item);
      this.$router.push({
        path: "DisplaySingleNotification",
        query: {item}, //-------------------------
      });
    },
    async EditItem(item) {
      await this.fetchIncidentById(item);
      this.$router.push({
        path: "PageEditNotification",
        query: {item}, //-------------------------
      });
    },
  },
  async created() {
    await this.fetchHandledNtifications();
    await this.fetchNotification();
    await this.fetchIncidents();
  },
};
</script>

