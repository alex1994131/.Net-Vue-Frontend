<template>
  <v-row>
     <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
       
          <v-icon v-bind="attrs" v-on="on" @click="viewDetails" color="black">mdi-view-split-vertical</v-icon>
     
      </template>
      <span>عرض التفاصيل</span>
    </v-tooltip>







    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">
        
          <v-icon v-bind="attrs" v-on="on" @click="changeStatus()" color="black">mdi-key</v-icon>
        
      </template>
      <span>بدء</span>
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

    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeResponceDailog"
    />
  </v-row>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { STATUS } from "../../../helpers/ConstantStatus";

export default {
  props: 
  {
    task: {
      type : Object,
      required: true,
    },
  },
  components: {
    AssignTaskForm: () => import("../Dialogs/DAssignTask"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      AssignTaskForm: false,
      responseMessage: "",
      isSuccessSave: false,
      saveDialog: false,
      st: false,
      taskid: this.$props.task.id,
    };
  },
  computed: {
    ...mapGetters("tasks", ["getOwnedTasks","getAssignedTasks"]),
    ...mapGetters("StatusStore", ["getTaskStatus"]),
  },
  methods: {
    ...mapActions("tasks", ["setTaskToStarted","fetchSelectedTasks","fetchAssignedTasks","fetchSubTasks"]),
    ...mapActions("departments", ["fetchDepartments"]),
    ...mapActions("incidents",["fetchIncidentById"]),
    changeStatus() {
      this.setTaskToStarted({
        statusId : STATUS.TASK.IN_PROGRESS,
        id: this.task.taskId,
      })
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp.message;
          this.saveDialog = true;
          this.fetchAssignedTasks();
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
        });
    },
    closeResponceDailog(status) {
      this.saveDialog = false;
      if (status) {
        this.$router.push("./EmployeeTask");
      }
    },
   async viewDetails() {
      console.log(this.task);
      await this.fetchSelectedTasks(this.task.taskId);
      if (this.task.parentIncidentid != 0 )
       {
         await this.fetchIncidentById(this.task.parentIncidentid);
       }
       this.fetchSubTasks(this.task.taskId);
        this.$router.push("TaskDetails");
    },

  },
};
</script>


