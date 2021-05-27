<template>
  <v-container>
    <v-simple-table dense style="background-color: #fbfbfb">
      <template v-slot:default>
        <tbody>
          <tr
            v-for="(assignment, i) in getSelectedIncident.assignments"
            :key="i"
          >
            <td colspan="1">
              <div class="s1">
                <v-icon color="primary">mdi-account-outline</v-icon>
                {{ assignment.createdBy.fullName }} -
                {{ formatDate(assignment.createdDate) }}
              </div>
              <v-container>
                <v-card-text>
                  <div class="s3">
                    <p
                      style="margin-right: 10px"
                      v-html="assignment.request"
                    ></p>
                  </div>
                </v-card-text>
              </v-container>

              <!-- ----------------------------------------------------------------------------------------- -->
            </td>
            <td v-if="isCurrentUser(assignment.user.id) && !assignment.isHandeled">
              <v-container style="margin-left: 20px">
                <v-row>
                  <v-col cols="12" md="10">
                    <v-textarea
                      background-color="white"
                      v-model="responseString"
                      outlined
                      prepend-icon="mdi-comment"
                      class="mx-2"
                      label="أضف تعليقك"
                      rows="3"
                    ></v-textarea>
                  </v-col>
                  <v-col cols="12" md="2">
                    <v-btn color="primary" outlined @click="add(assignment.id)"
                      >إضافة</v-btn
                    >
                  </v-col>
                </v-row>
              </v-container>
            </td>

            <td v-else>
              <v-container style="margin-left: 20px">
                 {{ assignment.response ? 'التعليق' : 'قيد الإنتظار'}}
                <p>
                  {{ assignment.response }}
                </p>
              </v-container>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <v-card background-color="#606060" >
                <v-card-title class="headline">
                  إضافة موظف
                </v-card-title>
                <v-row justify="center">
                  <v-col cols="12" md="11">
                    <v-autocomplete
                       background-color="white"
                      outlined
                      clearable
                      deletable-chips
                      multiple
                      label="الموظف"
                      small-chips
                      item-text="name"
                      item-value="id"
                      dense
                      v-model="assignedEmps"
                      :items="getEmployees"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" md="11">
                    <v-textarea
                      outlined
                      v-model="request"
                      background-color="white"
                      prepend-icon="mdi-comment"
                      class="mx-2"
                      label="الاجراء المطلوب"
                      rows="5"
                    ></v-textarea>
                  </v-col>
                </v-row>

                <v-card-actions class="justify-center">
                  <v-spacer></v-spacer>

                  <v-btn
                    color="primary darken-1"
                    large
                    text
                    @click="addUsersToIncident"
                  >
                    <span>حفظ</span>
                    <v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn
                  >
                </v-card-actions>
              </v-card>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="saveDialog = false"
    />
  </v-container>
</template>
<script>
import stringHelper from "../../../helpers/stringHelper";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
import { PERMISSION } from "../../../helpers/constants";
import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
    quillEditor,
  },
  data() {
    return {
      name: "ProcedureProchure",
      saveDialog : false,
      isSuccessSave : false,
      responseMessage : "",
      assignedEmps: [],
      responseString: "",
      request: "",
      editorOption: {
        debug: "ínfo",
        placeholder: "أكتب هنا ...",
        readOnly: true,
        theme: "snow",
      },
    };
  },
  computed: {
    ...mapGetters("incidents", ["getSelectedIncident"]),
    ...mapGetters("employees", ["getEmployees","getUserDetails"]),
  },
  methods: {
    ...mapActions("incidents", ["addUserForToIncident", "sendResponse"]),
    ...mapActions("employees", ["fetchEmployees"]),
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY , hh:mm:ss A");
    },
    isCurrentUser(userid){
      return this.getUserDetails.id == userid;
    },

    add(id) {
      this.sendResponse({
        Incident: this.getSelectedIncident.id,
        assignmentId: id,
        response: this.responseString,
      }).then(resp => {
        this.request = ""
        this.assignedEmps = []
        this.saveDialog = true;
        this.isSuccessSave = true;
        this.responseMessage = "تم الحفظ بنجاح"
      }).catch(err => {
        this.saveDialog = true;
        this.isSuccessSave = false;
        this.responseMessage = err
      });
    },
    addUsersToIncident() {
      this.addUserForToIncident({
        users: this.assignedEmps,
        incident: this.getSelectedIncident.id,
        request: this.request,
      }).then(resp => {
        this.request = ""
        this.assignedEmps = []
        this.saveDialog = true;
        this.isSuccessSave = true;
        this.responseMessage = "تم الحفظ بنجاح"
      }).catch(err => {
        this.saveDialog = true;
        this.isSuccessSave = false;
        this.responseMessage = err
      });
    },
  },

  created() {
    this.fetchEmployees();
  },
};
</script>
<style scoped>
.s1 {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 15px;
}
.s2 {
  margin-top: -5x;
  float: left;
  font-size: 12px;
}
.s3 {
  border-right-style: solid;
  border-right-color: #cacaca;
}
.s4 {
  color: selver lighten-2;
  float: left;
  font-size: 12px;
}
.s5 {
  margin-right: 50px;
  margin-left: 50px;
  background-color: #f4f6f6;
  width: auto;
}
.s6 {
  margin-right: 30px;
  margin-left: 50px;
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
}
</style>
