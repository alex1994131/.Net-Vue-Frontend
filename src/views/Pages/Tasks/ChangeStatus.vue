<template>

  <v-dialog v-model="st" persistent max-width="690">
    <v-container id="user-22222" fluid tag="section">

      <v-card>
        <template>

        </template>
        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>
          <v-row>
            <v-col class="md3">

              <v-select
                v-model="newStatus"
                :items="getStatus"
                item-text="statusString"
                item-value="id"
                label="القارة"
                required
              ></v-select>

            </v-col>
          </v-row>

          <v-btn color="green darken-1" large text @click="chngStatus" >
            <span>حفظ</span>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
          <v-btn large color="red darken-1" text @click="closeForm"><span>غلق</span>
            <v-icon>mdi-close-circle-outline</v-icon></v-btn>

        </v-card-actions>
      </v-card>
    </v-container>
  </v-dialog>







</template>

<script>
  import {mapActions, mapGetters, mapState} from "vuex";

    export default {
        name: "ChangeStatus",

      props : {
          st : "",
          id : 0,
      },
      data () { return {
        newStatus : "",
        myid :  this.$props.id,
      };
      }, computed : {
          ...mapGetters("StatusStore", ["getStatus"])
      },methods :{
          ...mapActions("tasks",["updateStatus"]),
        chngStatus() {
          this.updateStatus({ statusId : this.newStatus, taskid : this.myid})
          this.$emit("close");
        },
        closeForm() {
          this.$props.st = false;
          this.$emit("close");
        },
      }

    }
</script>

<style scoped>

</style>
