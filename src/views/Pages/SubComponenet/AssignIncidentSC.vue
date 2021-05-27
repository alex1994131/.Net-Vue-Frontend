<template>
    <v-card class="grey lighten-3">
      <v-card-title class="headline">  مشاركة و اسناد المهمة </v-card-title>
      <!-- Content -->
      <section id="AssignTask" class="my-8 pa-8">
        <v-container class="py-0">
          <v-row>
            <v-col cols="12" md="12">
              <v-card max-width="500" outlined>
                          <v-autocomplete
                            outlined
                            clearable
                            deletable-chips
                            multiple
                            label="الموظف"
                            small-chips
                            item-text="fullName"
                            item-value="id"
                            dense
                            v-model="assignedEmps"
                            :items="getEmps"
                          ></v-autocomplete>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </section>

      <v-card-actions class="justify-center">
        <v-spacer></v-spacer>

        <v-btn color="primary darken-1" large text @click="AddShareTask">
          <span>حفظ</span>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn
        >
        <v-btn large color="red darken-1" text @click="closeForm"
          ><span>غلق</span> <v-icon>mdi-close-circle-outline</v-icon></v-btn
        >
      </v-card-actions>
    </v-card>


</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
export default {
  components :{
     responseDialog: () => import("../Dialogs/DRespoonseDialog"),
  },
  data: () => ({
    name: "Tasks",
   
    employees: [],
    assignedEmps: [],

  }),
  computed: {
    ...mapGetters("departments", ["GetDepartments"]),
    getEmps(){
      this.GetDepartments.
    },
  },

  created() {
    this.fetchDepartments();
  },

  methods: {
    ...mapActions("employees", ["fetchEmployees"]),
   
    setEmps() {
      let sections = this.GetDepartments.find(
        (dep) => dep.id == this.department
      ).sections;
      this.employees = sections.find(
        (sec) => sec.id == this.defaultTask.assigned_for.id
      ).users;
      let emps = this.task.assignedEmps.map(x => x.euser.id);
      this.employees = this.employees.filter(emp => !emps.includes(emp.id))
    },

    AddShareTask() {
      console.log(this.task)
      this.defaultTask.id = this.task.taskId
      this.defaultTask.assignedEmps = this.assignedEmps.map((x) => ({
        euser: { id: x },
      }));
console.log(this.defaultTask);
      this.shareTask(this.defaultTask).then(resp =>{
        this.isSuccessSave = true;
          this.responseMessage = resp.message;
          this.saveDialog = true;
      }).catch(err => {
         this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
      })
      
    },

    closeResponceDailog(status){
      if (status)
      {
        this.$emit("close");
      }
    },

    closeForm() {
      this.$emit("close");
      this.dialog = false;
    },
  },
};
</script>
