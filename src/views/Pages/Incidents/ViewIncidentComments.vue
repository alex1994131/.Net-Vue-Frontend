<template>
  <v-container >
    <v-row justify="center">
      <v-btn
        color="primary"
        @click="(isShowDialog = true), (isReply = false)"
        dark
        class="ma-3"
        small
        label
        outlined
      >
        <h3>إضافة تعليق</h3>
        <v-icon>mdi-comment-plus-outline</v-icon>
      </v-btn>
      <br />

      <v-dialog v-model="isShowDialog" persistent max-width="1000px">
        <v-card class="white">
          <v-row justify="center">
            <v-col cols="12" md="11">
              <base-subheading style="text-align-last: right"></base-subheading>
              <div>
                <quill-editor
                  v-model="commentString"
                  ref="myQuillEditor"
                  :options="editorOption"
                ></quill-editor>
              </div>
            </v-col>
          </v-row>
          <v-card-actions class="justify-center">
            <v-btn large color="blue darken-1" text @click.prevent="add">
              <span>إضافة</span>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <v-btn large color="red darken-1" text @click.prevent="hideModal">
              <span>تجاهل</span>
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-simple-table style="background-color: #fbfbfb" class="ma-4">
      <template v-slot:default>
        <tbody>
          <tr v-for="(commentObj, i) in getSelectedIncident.comments" :key="i">
            <td>
              <div class="s1">
                <v-icon color="primary">mdi-account-outline</v-icon
                >{{ commentObj.comment.createdBy.fullName }} -
                {{ formatDate(commentObj.comment.createdDate) }}
              </div>
              <div class="s2">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">

                      <v-icon
                      v-bind="attrs" v-on="on"
                        medium
                        @click="addReplay(commentObj.comment)"
                        color="primary"
                        >mdi-reply</v-icon
                      >

                  </template>
                  <span>رد</span>
                </v-tooltip>
              </div>

              <v-container>
                <v-card-text>
                  <div class="s3">
                    <p
                      style="margin-right: 10px"
                      v-html="commentObj.comment.commentString"
                    ></p>
                  </div>
                </v-card-text>
              </v-container>

              <!-- ----------------------------------------------------------------------------------------- -->

              <v-simple-table class="s5">
                <template v-slot:default>
                  <tbody>
                    <tr
                      v-for="(replayObj, i) in commentObj.comment.replaies"
                      :key="i"
                    >
                      <td>
                        <div style="margin-top:5px; font-size:12px ">
                          {{ replayObj.createdBy.fullName }} -
                          {{ formatDate(replayObj.createdDate) }}
                        </div>
                        <div class="s6" v-html="replayObj.commentString"></div>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
              <tr><td></td></tr>
            </td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <!-- <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/> -->
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
    quillEditor,
  },
  data() {
    return {
      name: "NOTIFICATIONS",
      permissions: [],
      isReply: false,
      comment: {},
      isShowDialog: false,
      commentString: "",
      postID: this.$route.query.postID,
      comments: [],

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
    getOperations() {
      return PERMISSION.INCIDENT.COMMENTS.name;
    },
  },
  methods: {
    ...mapActions("incidents", [
      "addComment",
      "fetchComments",
      "addReplayToComment",
    ]),
    addReplay(comment) {
      this.isReply = true;
      this.comment = comment;
      this.isShowDialog = true;
    },
    assignPermissions(pers) {
      this.permissions = pers;
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY , hh:mm:ss A");
    },
    hideModal() {
      this.isShowDialog = !this.isShowDialog;
    },
    add() {
      if (this.commentString.length === 0) {
        alert("please input comment string!");
        return;
      }

      if (this.isReply) {
        this.comment.replaies.push({
          commentString: this.commentString,
        });
        this.addReplayToComment(this.comment)
          .then((resp) => {
            this.fetchComments(this.getSelectedIncident.id);
            this.isShowDialog = false;
            this.commentString = "";
            this.isReply = false;
          })
          .catch();

        return;
      }
      let incident = {
        id: this.getSelectedIncident.id,
        comments: [
          {
            comment: { commentString: this.commentString },
            tags: [],
          },
        ],
      };
      //this.comments.push(incident.comments[0]);
      console.log(incident);
      this.addComment(incident)
        .then((resp) => {
          this.fetchComments(this.getSelectedIncident.id);
        })
        .catch();
      this.isShowDialog = !this.isShowDialog;
      this.commentString = "";
    },
  },

  created() {},
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
  font-weight:bold;
}
</style>
