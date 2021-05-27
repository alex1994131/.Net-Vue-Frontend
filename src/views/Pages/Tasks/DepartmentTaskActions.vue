<template>
  <v-row>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }">

          <v-icon v-bind="attrs" v-on="on" @click="viewDetails" color="black"
            >mdi-view-split-vertical</v-icon
          >
      </template>
      <span>عرض التفاصيل</span>
    </v-tooltip>
    <v-tooltip top>
      <template v-slot:activator="{ on, attrs }" >

          <v-icon
          :disabled="!task.isClosing"
          v-bind="attrs"
          v-on="on"
           @click="viewCloseReport" color="black"
            >mdi-file-document</v-icon
          >
      </template>
      <span>عرض تقرير الإغلاق</span>
    </v-tooltip>



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

export default {
  props: ["task"],
  components: {
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data() {
    return {
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      st: false,
      taskid: this.$props.task.taskId,
    };
  },
  computed: {
    ...mapGetters("tasks", []),
  },
  methods: {
    ...mapActions("tasks", ["deleteTask","fetchSelectedTasks","fetchTaskviews", "fetchSubTasks"]),
    ...mapActions("incidents",["fetchRelatedIncidents"]),
    viewCloseReport() {
      this.fetchSelectedTasks(this.taskid);
      this.$router.push({
        name: "تقرير الإغلاق",
        params: { owner: true },
      });
    },
    checkStatus(value) {

      return this.task.status[value];
    },
    async viewDetails() {
      await this.fetchSelectedTasks(this.taskid);
      if (this.task.parentIncidentid != 0 )
       {
        await this.fetchRelatedIncidents(this.task.parentIncidentid);
       }
      await this.fetchSubTasks(this.taskid);
      this.$router.push({
        name: "تفاصيل المهام",
        params: { owner: true },
      });
    },
    async Edit() {
      this.fetchSelectedTasks(this.taskid);
      this.$router.push({
        name: "تعديل مهمة",
        params: { owner: true },
      });
    },
    closeResponceDailog(s) {
      this.saveDialog = false;
      this.fetchTaskviews();
    },
    cancelTask() {
      this.deleteTask(this.taskid)
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp.message;
          this.saveDialog = true;
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
  },
};
</script>


