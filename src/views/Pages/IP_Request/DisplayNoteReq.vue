<template>

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
                            
                            :items="getIncidentsWithIps"
                            item-key="id"
                            :items-per-page="5"
                            :headers="Headers"
                            :sort-by="['id']"
                            :sort-desc="[true]"
                          >


                            <template v-slot:item.actions="{ item }">
                              <v-icon
                                medium
                                v-if="canShow"
                                @click="viewItem(item)"
                                class="mr-2"
                                >mdi-eye</v-icon
                              >
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
                          </v-data-table>
                        </v-card-text>
                      </v-card>
                    </td>
                  </tr>
                </tbody>
                <LoginStatus :page="name" @input="assignPermissions" />
              </template>
                
            </v-simple-table>
            
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import stringHelper from "../../../helpers/stringHelper";
import axios from "axios";
import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";
export default {
  components: {
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),

  },
  data : function () {
    return {
      name: "NOTIFICATIONS",
      permissions: [],
      searchKey: " ",
      IncidentsList: [],
      loading : true,
      Headers: [
      
        { text: "العنوان", align: "start", sortable: false, value: "subject", select_filter: true},
        { text: "الوقت", value: "time", select_filter: true },
        { text: "التاريخ", value: "date", select_filter: true },
        { text: "الإجراء", value: "actions" },
      ],
    };
  },
  computed: {
    ...mapState(["incidents"]),
    ...mapGetters("ui",["getLoading"]),
    ...mapGetters("incidents", [
      "incidentsTableHeader",
      "getIncidentsWithIps",
      "getUrgancy",
      "getSver",
      "getCat",
    ]),
    canAdd() {
      let heCan = this.permissions.includes(PERMISSION.NOTIFICATIONS.ADD.name);
      return heCan;
    },
    canShow() {
      let heCan = this.permissions.includes(PERMISSION.NOTIFICATIONS.VIEW.name);
      return heCan;
    },
    search() {
      let heCan = this.permissions.includes(
        PERMISSION.NOTIFICATIONS.SEARCH.name
      );
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
    ...mapActions("incidents", ["getIncidentsWithIdRequests","fetchNotification"]),
    ...mapActions("requsetIds", ["fetchIpsOfIncident"]),
    ...mapMutations("incidents", ["setSelectedIncident"]),
    count(tt) {
      if (tt == 0) return "0";
      return tt.length;
    },
    assignPermissions(pers) {
      this.permissions = pers;
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    CreateIncident() {
      var incidentLength = this.IncidentsList.length;
      this.$router.push({
        path: "AddNotification",
      });
    },
    async viewItem(item) {
      this.fetchIpsOfIncident(item.id);
      this.setSelectedIncident(item);
      this.$router.push({
        path: "DisplayAddress",
        query: { item }, //-------------------------
      });
    },
 
  },
   created() {
     this.getIncidentsWithIdRequests();
    
    
  },
};
</script>

