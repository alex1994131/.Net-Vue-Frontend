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
                  <h1>طلبات التعرفة</h1>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-card>
                  <template>
                    <v-tabs
                      background-color="transparent"
                      slider-color="#769362"
                    >
                      <v-tab class="mr-3" v-show="waitingRequests">

                        <v-badge

                          color="#769362"
                          :content="count(getIps)"
                        ><h3>طلبات تنتظر الرد</h3></v-badge>

                      </v-tab>
                      <v-tab-item>

     
                        <Soc :permissions="permissions"/>
    
                      </v-tab-item>

                      <v-tab class="mr-3" v-show="allRequests">

                        <v-badge
                          color="#769362"
                          :content="count(getIdentifidIps)"
                        ><h3>جميع
                          الطلبات</h3></v-badge>

                      </v-tab>
                      <v-tab-item>
                        <DisplayId :permissions="permissions"/>
                      </v-tab-item>
                      <v-tab class="mr-3" v-show="allRequests">

                        <v-badge
                          color="#769362"
                          :content="count(getIncidentsWithIps)"
                        ><h3>طلبات التنبيه</h3></v-badge>

                      </v-tab>
                      <v-tab-item>
                        <DisplayNoteReq :permissions="permissions"/>
                      </v-tab-item>
                    </v-tabs>
                  </template>
                </v-card>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <LoginStatus :page="name" @input="assignPermissions"/>
  </v-container>
</template>

<script>
import {mapGetters, mapActions, mapMutations, mapState} from "vuex";
import RequestId from "./RequestId";
import DisplayId from "./DisplayId";
import DisplayNoteReq from "./DisplayNoteReq";
import Soc from "./Soc";
import {PERMISSION} from "../../../helpers/constants";
import NewIPDialog from "./NewIPDialog";

export default {
  components: {
    RequestId,
    DisplayId,
    DisplayNoteReq,
    Soc,
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
  },
  computed: {
    ...mapGetters("requsetIds", ["getIps", "getIdentifidIps"]),
    ...mapGetters("incidents", [
      "incidentsTableHeader",
      // "getIgnoredNotification",
      // "getClosedNotification",
      "getIncidentsWithIps",
      "getNotification",
    ]),
    waitingRequests() {
      let heCan = this.permissions.includes(
        PERMISSION.IP_IDENTITFICATION.VARFIY.name
      );
      return heCan;
    },
    allRequests() {
      let heCan = this.permissions.includes(
        PERMISSION.IP_IDENTITFICATION.VIEW.name
      );
      return heCan;
    },
  },
  data() {
    return {
      name: "IP_IDENTITFICATION",
      permissions: [],
      dialog: false,
    };
  },
  methods: {
    assignPermissions(pers) {
      this.permissions = pers;
    },
    count(tt) {
      if (tt == 0) return "0";
      return tt.length;
    },
  },
};
</script>
