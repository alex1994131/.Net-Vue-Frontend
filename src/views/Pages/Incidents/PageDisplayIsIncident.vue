<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row justify="center">
      <v-card-actions style="float: left">
        <v-btn class="ma-3" color="primary" @click="CreateIncident" meduim label outlined>
          <h3>تنبيه جديد</h3>
          <v-icon light>mdi-plus</v-icon>
        </v-btn>
      </v-card-actions>
    </v-row>
    <v-tabs background-color="transparent" slider-color="#769362" v-if="canAdd">
      <v-tab class="mr-3">
        <v-badge color="#769362" :content="count(getNotesRequest())">
          <h3>التنبيهات الواردة</h3>
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
                      <v-card-text>
                        <v-data-table
                          dense
                          :loading="getLoading"
                          :items="getNotesRequest()"
                          item-key="id"
                          :items-per-page="5"
                          :headers="Headers"
                          :sort-by="'id'"
                          :sort-desc="[true]"
                        >
                          <template #item.orgName="{ item }">
                            <v-row no-gutters>
                              <div v-for="(name, i) in getOrganizations(getNotesRequest(),item.id)" :key="i">
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
                              v-if="isEdit(item.id)"
                              @click="EditItem(item.id)"
                              class="mr-2"
                            >mdi-pencil
                            </v-icon>
                            <v-icon
                              medium
                              v-if="!isEdit(item.id)"
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
import {STATUS} from "../../../helpers/ConstantStatus";
import moment from "moment";

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
      "getNotificationRequest",
      "getUrgancy",
      "getIncident",

      "getCat",
    ]),

    canAdd() {
      let heCan = this.permissions.includes(PERMISSION.NOTIFICATIONS.ADD.name);
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
      "fetchNotificationRequests", "fetchIncidentById"]),

    getOrganizations(list, id) {
      return list.filter((x) => x.id === id).map((x) => x.orgName);
    },

    isEdit(id) {
      let notification = this.getNotesRequest().find(x => x.id === id);
      return notification.statusId === STATUS.NOTIFICATION.EDIT_INCIDENT;
    },

    getNotesRequest() {
      let map = this.groupBy(this.getNotificationRequest, (rec) => rec.id);
      let array = Array.from(map.keys()).map((x) =>
        this.getNotificationRequest.find((t) => t.id == x)
      );
      return array;
    },
    CreateIncident() {
      var incidentLength = this.IncidentsList.length;
      this.$router.push({
        path: "AddNotification",
      });
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
    async viewItem(item) {
      await this.fetchIncidentById(item);
      this.$router.push({
        path: "DisplaySingleNotification",
        query: { item }, //-------------------------
      });
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

    async EditItem(item) {
      await this.fetchIncidentById(item);
      this.$router.push({
        path: "PageEditNotification",
        query: {item}, //-------------------------
      });
    },
  },
  async created() {
    await this.fetchNotificationRequests();
  },
};
</script>

