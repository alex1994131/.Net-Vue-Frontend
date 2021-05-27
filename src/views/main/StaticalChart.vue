<template>
  <v-row justify="center">
    <v-col cols="12" md="12">
      <chart
        :title-text="'سير المهام في الأقسام'"
        :legend-position="'bottom'"
        :series="series"
        :category-axis-categories="departmentCat()"
        :value-axis="axis"
        :theme="'sass'"
        :tooltip="tooltip"
        @axislabelclick="onAxisLabelClick"
      >
      </chart>
      <v-tooltip color="#BFBFC0" left>
        <template v-slot:activator="{ on, attrs }">
          <v-progress-linear
            v-on="on"
            v-bind="attrs"
            :buffer-value="NewCount + 40"
            color="success"
            :value="NewCount + 40"
          ></v-progress-linear>

          <v-progress-linear
            v-on="on"
            v-bind="attrs"
            :buffer-value="DoneCount"
            color="#a74343b2"
            :value="DoneCount"
          ></v-progress-linear
          ><v-progress-linear
            v-on="on"
            v-bind="attrs"
            :buffer-value="InProgressCount"
            color="primary lighten-1"
            :value="InProgressCount"
          ></v-progress-linear>

          <v-progress-linear
            :buffer-value="AllTasksProgress"
            :value="AllTasksProgress"
            v-on="on"
            v-bind="attrs"
            height="13"
            :size="100"
            color="primary"
            stream
          >
            <strong>{{ AllTasksProgress }}%</strong>
          </v-progress-linear>
        </template>
        <p style="color: #294d68">الجديدة: %{{ NewCount }}</p>
        <p style="color: #294d68">قيد الإجراء: %{{ InProgressCount }}</p>
        <p style="color: #294d68">المنتهية: %{{ DoneCount }}</p>
      </v-tooltip>
      <strong>نسبة إنجاز جميع مهام المركز</strong>
    </v-col>
   
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import { Chart } from "@progress/kendo-charts-vue-wrapper";
import moment from "moment";
import Icons from '../component/Icons.vue';
import { PERMISSION } from "../../helpers/constants";

export default {
  name: "STATICALCHART",
  components: {
    LoginStatus: () => import("../Pages/SubComponenet/AuthorizationChacker"),
    chart: Chart,
    Icons
  },
  beforeDestroy() {
    clearInterval(this.interval);
  },
  mounted() {
    this.interval = setInterval(() => {
      if (this.value === 0) {
        return (this.value = 100);
      }
      this.value -= 10;
    }, 200);
  },
  data: function () {
    return {
      departmentCount: 0,

      AllTasksProgress: 0,
      value: 0,

      done: [],
      inProgress: [],
      news: [],

      InProgressCount: 0,
      DoneCount: 0,
      NewCount: 0,

      series: [
        {
          sid: 1,
          name: "مغلقة",
          data: [],
          axis: "numTasks",
        },
        {
          sid: 2,
          name: "قيد الإجراء",
          data: [],
          axis: "numTasks",
        },
        {
          sid: 3,
          name: "الجديدة",
          data: [],
          axis: "numTasks",
        },
      ],

      axis: [
        {
          name: "numTasks",
          labels: {
            format: "{0}",
          },
        },
      ],
      tooltip: {
        visible: true,
        template: "#= series.name #: #= value #",
      },
    };
  },
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    ...mapGetters("tasks", ["getDepartmentBar"]),
  },
  methods: {
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("tasks", ["fetchTaskEmpsRel"]),

    onAxisLabelClick: function (e) {
      console.log("Event :: axisLabelClick");
    },
    departmentCat() {
      let categories = [];
      let n = 0;
      for (const k in this.getDepartmentBar) {
        categories[k] = this.getDepartmentBar[k].name;
        n = n + 1;
      }
      this.departmentCount = n;
      this.taskStatusCount();
      return categories;
    },

    formatDate(date) {
      return moment(date).format("DD-MM-YYYY (hh:mm:ss A)");
    },

    taskStatusCount() {
      let dept = this.getDepartmentBar;

      let InProgress = [];
      let Done = [];
      let New = [];

      let InProgressCount = 0;
      let DoneCount = 0;
      let NewCount = 0;

      let tasksCount = 0;
      let tasksProgCount = 0;

      for (const k in dept) {
        let val3 = 0; //status.id == 3 "قيد الإجراء"
        let val4 = 0; //status.id == 4 "المنتهية"
        let val5 = 0; //status.id == 5 "جديدة"

        dept[k].sections.forEach((d) => {
          d.tasks.forEach((h) => {
            tasksCount += 1;
            tasksProgCount += h.progress;
            if (h.status.id == "3") {
              val3 += 1;
              InProgressCount += h.progress;
            } else if (h.status.id == "4") {
              val4 += 1;
              DoneCount += h.progress;
            } else if (h.status.id == "5") {
              val5 += 1;
              NewCount += h.progress;
            }
          });
        });
        InProgress[k] = val3;
        Done[k] = val4;
        New[k] = val5;
      }

      let s = this.series;
      s.forEach((x) => {
        if (x.sid == 1) {
          x.data = Done;
        } else if (x.sid == 2) {
          x.data = InProgress;
        } else if (x.sid == 3) {
          x.data = New;
        }
      });
      this.AllTasksProgress = parseFloat(tasksProgCount / tasksCount).toFixed(
        2
      );

      this.InProgressCount = parseFloat(InProgressCount / tasksCount).toFixed(
        2
      );
      this.DoneCount = parseFloat(DoneCount / tasksCount).toFixed(2);
      this.NewCount = parseFloat(NewCount / tasksCount).toFixed(2);
    },
  },
  async created() {
    await this.fetchDepartments();
    await this.fetchTaskEmpsRel();
  },
};
</script>
<style scoped>
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
  background: rgba(65, 82, 104, 0.205); 
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgb(219, 219, 223); 
}
</style>
