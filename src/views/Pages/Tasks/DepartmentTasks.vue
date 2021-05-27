<template>
  <v-container id="user-22222" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td style="background-color: #f6f6f6">
                  <v-subheader>
                    <h1>مهام القسم</h1>
                  </v-subheader>
                </td>
              </tr>
              <tr>
                <td>
                  <v-card class="mx-auto">
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="بحث .."
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-row justify="center">
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
                        <v-autocomplete
                          outlined
                          clearable
                          deletable-chips
                          multiple
                          label="الموكل إليهم"
                          small-chips
                          item-text="name"
                          item-value="id"
                          dense
                          v-model="selectedEmps"
                          :items="getEmployees"
                        ></v-autocomplete>
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
                      <v-btn class="ma-2" color="primary" @click="applaySearch">
                        <v-icon left>mdi-checkbox-marked-circle-outline</v-icon>
                        <h3>بحث</h3>
                      </v-btn>
                    </v-row>
                    <v-col cols="12" md="12">
                      <v-card>
                        <v-data-table
                          dense
                          :loading="getLoading"
                          :headers="headers"
                          :items="getTasks()"
                          :items-per-page="5"
                          class="elevation-1"
                          :search="search"
                          :sort-by="['taskId']"
                                :sort-desc="[true]"
                        >
                          <template #item.actions="{ item }">
                            <DepartmentTaskActions :task="item" />
                          </template>

                          <template #item.assignedForName="{ item }">
                            <v-chip
                            outlined
                            
                              v-for="c in getAssignfor(item)"
                              v-if="c != undefined"
                              ><h4>{{ c }}</h4></v-chip
                            >
                          </template>
                          <template #item.importance="{ item }">
                            <v-icon
                              small
                              v-bind:color="
                                item.importance == 1
                                  ? 'red'
                                  : item.importance == 2
                                  ? '#7FB3D5'
                                  : item.importance == 3
                                  ? 'red'
                                  : '#7FB3D5'
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
                                item.urgent == 1 || item.urgent == 2
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
                          <template #item.progress="{ item }">
                            <v-progress-circular
                              :size="24"
                              :rotate="-90"
                              :width="12"
                              class="ma-1"
                              v-bind:color="
                                item.progress == 0
                                  ? 'success lighten-1'
                                  : item.progress == 100
                                  ? 'red lighten-1'
                                  : 'primary lighten-1'
                              "
                              :value="item.progress"
                            ></v-progress-circular
                            >{{ item.progress }}%
                          </template>
                        </v-data-table>
                      </v-card>
                    </v-col>
                  </v-card>
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
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import DepartmentTaskActions from "./DepartmentTaskActions";
import { STATUS } from "../../../helpers/ConstantStatus";

export default {
  components: {
    DepartmentTaskActions,
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
      dialog: false,
      statusByUser: "",
      AddStatus: false,
      status: "",
      headers: [
        { text: "العنوان", value: "title", width: "320px" },
        { text: "التصنيف/الأوليلة", value: "importance" },
        { text: "توكيل المهمة الى", value: "assignedForName" },
        { text: "الحالة", value: "statusString" },
        { text: "النسبة", value: "progress" },
        { text: "الإجراء", value: "actions" },
      ],
    };
  },

  computed: {
    ...mapState("tasks", ["tasks"]),
    ...mapGetters("employees", ["getEmployees"]),
    ...mapGetters("tasks", ["getOwnedTasks", "taskById", "getDepartmentTasks"]),
    ...mapGetters("tasks", [
      "getWhight",
      "getImportance",
      "getUrgancy",
      "getSelectedTask",
      "GetTaskView",
    ]),
    ...mapGetters("ui", ["getLoading"]),
    items() {
      let cat = [
        { id: STATUS.TASK.OPEN, label: "جديدة" },
        { id: STATUS.TASK.IN_PROGRESS, label: "قيد الإجراء" },
        { id: STATUS.TASK.CLOSED, label: "مغلقة" },
      ];
      return cat;
    },
  },
  methods: {
    ...mapActions("tasks", [
      "addTask",
      "SearchDepTasks",
      "SearchOwnedTasks",
      "changStatus",
      "editstatus",
      "fetchDepartmentTasks",
    ]),
    ...mapActions("incidents", ["fetchRelatedIncidents"]),
    ...mapActions("employees", ["fetchEmployees"]),
    ...mapMutations("tasks", ["setAddTaskDialog", "setSelectedTask"]),

    assignforTask(item) {
      return this.item.forEach((x) => x.assignedForName);
    },
    getTasks() {
      let map = this.groupBy(this.getDepartmentTasks, (rec) => rec.taskId);
      let array = Array.from(map.keys()).map((x) =>
        this.getDepartmentTasks.find((t) => t.taskId == x)
      );
      return array;
    },
    async applaySearch() {
      let searchObject = {
        key: this.searchKey,
        fromDate: this.fromDate,
        toDate: this.toDate,
        status: this.status.toString(),
        employees: this.selectedEmps.toString(),
      };
      await this.SearchDepTasks(searchObject);
    },

    getAssignfor(item) {
      let arr = [];
      let emp = this.getDepartmentTasks;
      for (const k in emp) {
        if (emp[k].taskId == item.taskId) {
          arr[k] = emp[k].assignedForName;
        }
      }
      return arr;
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

    sendData() {
      this.addTask(this.task);
    },
    onAddTask() {
      this.$router.push({ name: "إضافة مهمة" });
    },

    addStatus(item_id) {
      this.dialog = false;
    },
  },
  created() {
    this.fetchDepartmentTasks();
    this.fetchEmployees();
  },
};
</script>
