<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row justify="center">
      <!-- <v-col cols="12" md="1">
        <div class="ss">
          <v-img src="./5.png"> </v-img>
        </div>
      </v-col>
      <v-col cols="12" md="2">
        <v-img style="margin-top: 20px" src="./4.png"> </v-img>
      </v-col> -->
    </v-row>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-text-field
          color="#294D68"
          :loading="getLoading"
          dense
          disabled
        ></v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <div class="scroll" style="text-align: center; height: 120px">
          <v-icon x-small color="red">mdi-checkbox-blank-circle</v-icon
          >{{ "(" + countOpen(getNotification) + ")" + "جديدة" }}
          <v-simple-table dense class="transparent" style="text-align: right">
            <template v-slot:default>
              <tbody>
                <tr
                  v-for="(f, i) in getNotification"
                  @click="viewItem(f)"
                  :key="i"
                >
                  <td>
                    <v-icon
                      x-small
                      v-bind:color="!f.notificationStatus ? 'gray' : 'red'"
                      >mdi-checkbox-blank-circle
                    </v-icon>
                  </td>
                  <td>
                    <v-tooltip top>
                      <template v-slot:activator="{ on, attrs }">
                        <span v-bind="attrs" v-on="on"
                          ><h5>{{ f.title }}</h5></span
                        >
                      </template>
                      <p>{{ formatDate(f.dateTime) + ". " + f.fullName }}</p>
                    </v-tooltip>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </div>
      </v-col>
      <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="2">
        <div style="text-align: center">
          <v-hover v-slot="{ hover }" close-delay="90">
            <v-icon
              @click="
                $router.push('dashboard/pages/Incidents/DisplayIncidents')
              "
              color="#769362"
              :size="hover ? 55 : 42"
              >mdi-alert</v-icon
            >
          </v-hover>
          <h3>التنبيهات</h3>
          <h4 style="color: #769362">{{ getCounts.notifications }}</h4>
        </div>
      </v-col>
      <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="2">
        <div style="text-align: center">
          <v-hover v-slot="{ hover }" close-delay="90">
            <v-icon
              @click="$router.push('dashboard/pages/tasks/EmployeeTask')"
              color="primary lighten-1"
              :size="hover ? 55 : 42"
              >mdi-bell-ring</v-icon
            >
          </v-hover>
          <h3>صندوق الوارد</h3>
          <h4 style="color: #294d68">الجديدة: {{ getCounts.inbox }}</h4>
          <h4 style="color: #294d68">
            قيد الإجراء: {{ getCounts.inboxOnProgress }}
          </h4>
        </div>
      </v-col>
      <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="2">
        <div style="text-align: center">
          <v-hover v-slot="{ hover }" close-delay="90">
            <v-icon
              @click="
                $router.push('dashboard/pages/Incidents/DisplayIsIncidents')
              "
              color="#769362"
              :size="hover ? 55 : 42"
              >mdi-shield</v-icon
            >
          </v-hover>
          <h3>الحوادث الأمنية</h3>
          <h4 style="color: #769362">{{ getCounts.incidents }}</h4>
        </div>
      </v-col>
      <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="2">
        <div style="text-align: center">
          <v-hover v-slot="{ hover }" close-delay="90">
            <v-icon
              @click="$router.push('dashboard/pages/RequsetId/viewMain')"
              color="primary lighten-1"
              :size="hover ? 55 : 42"
              >mdi-plus-network</v-icon
            >
          </v-hover>
          <h3>طلبات غير معرفة</h3>
          <h4 style="color: #294d68">{{ getCounts.ips }}</h4>
        </div>
      </v-col>
      <!-- <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="2">
        <div style="text-align: center">
          <v-hover v-slot="{ hover }" close-delay="90">
            <v-icon
              @click="$router.push('dashboard/pages/APT/SearchAPT')"
              color="primary lighten-1"
              :size="hover ? 55 : 42"
              >mdi-archive</v-icon
            >
          </v-hover>
          <h3>APT</h3>
          <h4 style="color: #294d68">{{ count(allApts) }}</h4>
        </div>
      </v-col> -->

      <v-col cols="12" md="12">
        <v-divider class="ma-2"></v-divider>
      </v-col>

      <v-col cols="12" md="4">
        <div style="text-align: center">
          <v-tooltip color="#BFBFC0" right>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-circular
                v-bind="attrs"
                @click="$router.push('dashboard/pages/tasks/manageTasks')"
                v-on="on"
                :rotate="-90"
                :size="100"
                :width="15"
                :value="progressCount(getOnProgress(), 1)"
                v-bind:color="
                  progressCount(getOnProgress(), 1) <= 25
                    ? '#982701'
                    : progressCount(getOnProgress(), 1) <= 75
                    ? '#769362'
                    : progressCount(getOnProgress(), 1) >= 76
                    ? 'primary lighten-1'
                    : value
                "
              >
                <div v-if="progressCount(getOnProgress(), 1) != 0">
                  {{ progressCount(getOnProgress(), 1) }}%
                </div>
                <div v-if="progressCount(getOnProgress(), 1) == 0">0%</div>
              </v-progress-circular>
              <h4>نسبة إنجاز المهام الواردة</h4>
            </template>
            <p style="color: #294d68">العادية: {{ myUrgent.u1 }}</p>
            <p style="color: #294d68">العاجلة: {{ myUrgent.u2 }}</p>
            <p style="color: #294d68">العاجلة جدا: {{ myUrgent.u3 }}</p>
          </v-tooltip>
        </div>
      </v-col>
      <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="3">
        <div style="text-align: center">
          <v-tooltip color="#BFBFC0" right>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-circular
                v-bind="attrs"
                @click="$router.push('dashboard/pages/tasks/manageTasks')"
                v-on="on"
                :rotate="-90"
                :size="100"
                :width="15"
                :value="progressCount(getAssignedEmpsTasks(), 2)"
                v-bind:color="
                  progressCount(getAssignedEmpsTasks(), 2) <= 25
                    ? '#982701'
                    : progressCount(getAssignedEmpsTasks(), 2) <= 75
                    ? '#769362'
                    : progressCount(getAssignedEmpsTasks(), 2) >= 76
                    ? 'primary lighten-1'
                    : value
                "
              >
                <div v-if="progressCount(getAssignedEmpsTasks(), 2) != 0">
                  {{ progressCount(getAssignedEmpsTasks(), 2) }}%
                </div>
                <div v-if="progressCount(getAssignedEmpsTasks(), 2) == 0">
                  0%
                </div>
              </v-progress-circular>
              <h4>نسبة إنجاز المهام الصادرة</h4>
            </template>
            <p style="color: #294d68">العادية: {{ onerUrgent.u1 }}</p>
            <p style="color: #294d68">العاجلة: {{ onerUrgent.u2 }}</p>
            <p style="color: #294d68">العاجلة جدا: {{ onerUrgent.u3 }}</p>
          </v-tooltip>
        </div>
      </v-col>
      <v-divider vertical class="ma-2"></v-divider>
      <v-col cols="12" md="4">
        <div style="text-align: center">
          <v-tooltip color="#BFBFC0" left>
            <template v-slot:activator="{ on, attrs }">
              <v-progress-circular
                v-bind="attrs"
                @click="$router.push('dashboard/pages/tasks/manageTasks')"
                v-on="on"
                :rotate="-90"
                :size="100"
                :width="15"
                :value="progressCount(getAllsTasks(), 3)"
                v-bind:color="
                  progressCount(getAllsTasks(), 3) <= 25
                    ? '#982701'
                    : progressCount(getAllsTasks(), 3) <= 75
                    ? '#769362'
                    : progressCount(getAllsTasks(), 3) >= 76
                    ? 'primary lighten-1'
                    : value
                "
              >
                <div v-if="progressCount(getAllsTasks(), 3) != 0">
                  {{ progressCount(getAllsTasks(), 3) }}%
                </div>
                <div v-if="progressCount(getAllsTasks(), 3) == 0">0%</div>
              </v-progress-circular>
              <h4>نسبة إنجاز كل المهام</h4>
            </template>
            <p style="color: #294d68">العادية: {{ forAllUrgent.u1 }}</p>
            <p style="color: #294d68">العاجلة: {{ forAllUrgent.u2 }}</p>
            <p style="color: #294d68">العاجلة جدا: {{ forAllUrgent.u3 }}</p>
          </v-tooltip>
        </div>
      </v-col>

      <v-col cols="12" md="12">
        <v-divider class="px-0"></v-divider>
      </v-col>

      <v-col cols="12" md="12">
        <div style="text-align: center">
          <StaticalChart />
        </div>
      </v-col>
      <v-col cols="12" md="12">
        <v-divider class="px-0"></v-divider>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import { PERMISSION } from "../../helpers/constants";
import { STATUS, ENTITY_TYPE } from "../../helpers/ConstantStatus";

import moment from "moment";
export default {
  name: "Dashboard",
  components: {
    LoginStatus: () => import("../Pages/SubComponenet/AuthorizationChacker"),
    StaticalChart: () => import("./StaticalChart"),
  },

  data() {
    return {
      countK: 1,
      ShowAllTasks: false,
      name: "DASHBOARD",
      overlay: false,
      loadingP: true,
      permissions: [],
      myUrgent: { u1: 0, u2: 0, u3: 0 },
      onerUrgent: { u1: 0, u2: 0, u3: 0 },
      forAllUrgent: { u1: 0, u2: 0, u3: 0 },

      interval: {},
      value: 0,
    };
  },
  computed: {
    ...mapGetters("ui", ["getCounts", "getLoading", "getNotification"]),
    ...mapGetters("tasks", [
      "getAssignedTasks",
      "getOwnedTasks",
      "getAllTasks",
      "GetTaskView",
    ]),
    ...mapGetters("apt", ["allApts"]),
  },

  watch: {
    permissions: function (value) {
      this.ShowAllTasks = value.includes(
        PERMISSION.DASHBOARD.SHOW_ALL_Tasks.name
      );
      if (this.ShowAllTasks) {
      }
    },
    overlay(val) {
      val &&
        setTimeout(() => {
          this.overlay = false;
        }, 3000);
    },
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },

  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 0) {
        return (this.value = 100);
      }
      this.value -= 20;
    }, 600);
  },

  methods: {
    ...mapActions("ui", ["fetchCount", "fetchNotifications", "updateStatus"]),
    ...mapActions("incidents", ["fetchIncidentById"]),
    ...mapActions("tasks", [
      "fetchAssignedTasks",
      "fetchSelectedTasks",
      "fetchTaskviews",
      "fetchAllTasks",
    ]),
    ...mapActions("apt", ["fetchApts"]),
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY (hh:mm:ss A)");
    },
    async viewItem(item) {
      let obj = {
        Id: item.notificationId,
        NotificationOwners: [{ Id: item.notificationOwnerId }],
      };
      await this.updateStatus(obj);
      console.log(ENTITY_TYPE.INCIDENT);
      if (item.entityType == ENTITY_TYPE.INCIDENT) {
        await this.fetchIncidentById(item.entityId);
        this.$router.push({ name: "التفاصيل" });
      }
      if (item.entityType == ENTITY_TYPE.TASK) {
        await this.fetchSelectedTasks(item.entityId);
        this.$router.push({ name: "تفاصيل المهام" });
      }
    },
    countOpen(tt) {
      let n = 0;
      for (const k in tt) {
        if (tt[k].notificationStatus == true) n += 1;
      }
      return n;
    },
    count(tt) {
      if (tt === 0) return 0;
      else return tt.length;
    },
    assignPermissions(perm) {
      this.permissions = perm;
    },
    getPending() {
      return this.getAssignedTasks.filter((task) => STATUS.TASK.OPEN);
    },
    getOnProgress() {
      return this.getAssignedTasks.filter((task) => STATUS.TASK.OPEN);
    },

    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
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

    getAssignedEmpsTasks() {
      let map = this.groupBy(this.GetTaskView, (rec) => rec.taskId);
      let array = Array.from(map.keys()).map((x) =>
        this.GetTaskView.find((t) => t.taskId == x)
      );
      let arr = array.filter(function (x) {
        return x.asignedforid != x.createdById;
      });
      return arr;
    },

    getAllsTasks() {
      let map = this.groupBy(this.GetTaskView, (rec) => rec.taskId);
      let array = Array.from(map.keys()).map((x) =>
        this.GetTaskView.find((t) => t.taskId == x)
      );
      return array;
    },

    getDone() {
      return this.getAssignedTasks.filter((task) => STATUS.TASK.CLOSED);
    },

    groupBy(list, keyGetter) {
      const map = new Map();
      list.forEach((item) => {
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

    progressCount(item, tpye) {
      this.loadingP = true;
      let sum = 0;
      let number = this.count(item);
      let n = item.forEach((x) => {
        sum += x.progress;
      });

      this.urgentCount(item, tpye);
      if (number == 0) return 0;
      else return parseFloat((sum / number).toFixed(2));
    },

    urgentCount(item, tpye) {
      let u1 = 0;
      let u2 = 0;
      let u3 = 0;
      item.forEach((x) => (u1 += x.urgent == 1));
      item.forEach((x) => (u2 += x.urgent == 2));
      item.forEach((x) => (u3 += x.urgent == 3));

      if (tpye == 1) {
        this.myUrgent.u1 = u1;
        this.myUrgent.u2 = u2;
        this.myUrgent.u3 = u3;
        return this.myUrgent;
      } else if (tpye == 2) {
        this.onerUrgent.u1 = u1;
        this.onerUrgent.u2 = u2;
        this.onerUrgent.u3 = u3;
        return this.onerUrgent;
      } else if (tpye == 3) {
        this.forAllUrgent.u1 = u1;
        this.forAllUrgent.u2 = u2;
        this.forAllUrgent.u3 = u3;
        return this.forAllUrgent;
      }
    },
  },
  async created() {
    await this.fetchCount();
    await this.fetchNotifications();
    await this.fetchAssignedTasks();
    await this.fetchTaskviews();
    this.fetchApts();
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
.ss {
  position: relative;
  animation-name: example;
  animation-duration: 4s;
  animation-delay: -2s;
}
@keyframes example {
  50% {
    right: 600px;
    top: 0px;
  }
  75% {
    right: 0px;
    top: 0px;
  }
}
</style>

