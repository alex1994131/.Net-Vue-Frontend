<template>
  <v-row justify="center">
    <v-simple-table>
      <template v-slot:default>
        <thead>
        <tr>
          <th>عنوان المهمة</th>
          <th>إسناد إلى</th>
          <th>النسبة</th>
          <th></th>
          <th></th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="task in tasks" :key="task.taskId">
          <td>{{ task.title }}</td>
          <td>
            <v-chip color="primary">{{ task.assignedForDepartment }}</v-chip>

            <v-chip v-for="emp in tasks" :key="emp.taskId">
              {{ emp.assignedForName }}
            </v-chip>

          </td>
          <td>
            <v-progress-circular
              :rotate="-90"
              :size="30"
              :value="task.progress"
              :width="15"
              v-bind:color="
                  task.progress < 50
                    ? 'red'
                    : task.progress < 80
                    ? 'indigo darken-2'
                    : 'primary'
                "
            >
            </v-progress-circular>
            {{ task.progress }}%
          </td>
          <td>
            <v-btn @click="openDetails(task)" color="primary" text>
              تفاصيل
            </v-btn>
          </td>
          <td>
            <v-btn
              :disabled="!task.isClosing"
              @click="openCloseReport(task)"
              color="primary"
              text
            >
              تقرير الإغلاق
            </v-btn>
          </td>
        </tr>
        </tbody>
      </template
      >
    </v-simple-table
    >
  </v-row>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  name: "subTasks",
  props: {
    tasks: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    status1: 0,
    value: 77,
  }),

  computed: {
    ...mapGetters("tasks", ["getSubTasks", "getIncidentRelatedTasks"]),
    ...mapState("StatusStore", ["status"]),

    uniqueTask: function () {
      var existingIds = {};
      return this.tasks.filter(function (task) {
        if (existingIds[task.taskId]) return false;
        return (existingIds[task.taskId] = true);
      });
    },
  },
  methods: {
    ...mapActions("tasks", [
      "fetchSubTasks",
      "fetchSelectedTasks",
      "fetchTaskviews",
    ]),

    openDetails(task) {
      this.$store.dispatch("tasks/setSelectedTask", task);
      this.fetchSubTasks(task.taskId);
      this.$router.push({
        name: "تفاصيل المهام",
        params: {owner: true, task: task},
      });
    },
    async openCloseReport() {
      await this.fetchSelectedTasks(this.taskid);
      this.$router.push({
        name: "تقرير الإغلاق",
        params: {owner: true},
      });
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

    // getSubTasks() {
    //   let map = this.groupBy(this.tasks, (rec) => rec.taskId);
    //   let array = Array.from(map.keys()).map((x) =>
    //     this.GetTaskView.find((t) => t.taskId == x)
    //   );
    //   return array;
    // },
  },

  created() {
  },
};
</script>

<style scoped>
</style>
