<template>
  <v-row>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">

          <v-icon  v-bind="attrs" v-on="on" @click="viewDetails" color="black">mdi-view-split-vertical</v-icon>

      </template>
      <span>عرض التفاصيل</span>
    </v-tooltip>

        <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">

          <v-icon v-bind="attrs" v-on="on" @click="AssignTaskForm = true" outlined color="black"
            >mdi-share</v-icon
          >
      </template>
      <span>مشاركة المهمة</span>
    </v-tooltip>
    <AssignTaskForm :task="task" :status="AssignTaskForm" @close="AssignTaskForm = false" />


    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">

          <!-- <v-icon @click="st = true" color="black">mdi-power</v-icon> -->
          <v-icon v-bind="attrs" v-on="on" @click="closeTask" color="black">mdi-power</v-icon>

      </template>
      <span>إنهاء المهمة</span>
    </v-tooltip>
  </v-row>
</template>
<script>

import { mapGetters,mapActions } from "vuex";

export default {
  props: ["task"],
  components : {
    AssignTaskForm: () => import("../Dialogs/DAssignTask"),
  },
  data() {
    return {
      st: false,
      AssignTaskForm: false,
      taskid: this.$props.task.id,
      Pending: [],
    };
  },
  computed: {
    ...mapGetters("tasks", ["getOwnedTasks","getAssignedTasks"]),
  },
  methods: {
          ...mapActions("tasks", ["fetchSelectedTasks"]),
    ...mapActions("incidents",["fetchRelatedIncidents"]),

    closeTask() {
      this.fetchSelectedTasks(this.task.taskId)
      this.$router.push("closeTask");
    },

    viewDetails() {

      this.fetchSelectedTasks(this.task.taskId)
       if (this.task.parentIncidentid != 0 )
       {
         this.fetchRelatedIncidents(this.task.parentIncidentid );
       }
      this.$router.push({
        name: "تفاصيل المهام",
        params: {owner: true},
      });

    },
  },
};
</script>


