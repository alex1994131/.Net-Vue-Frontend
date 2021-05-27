<template>
  <v-container>
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
    </v-row>
    <v-dialog v-model="isShowDialog" persistent max-width="1000px">
      <v-card class="white">
        <v-row justify="center">
          <v-col cols="12" md="11">
            <base-subheading style="text-align-last: right"></base-subheading>
            <div>
              <quill-editor
                v-model="ContentString"
                ref="myQuillEditor"
                :options="editorOption"
              ></quill-editor>
            </div>
          </v-col>
          <FilePond @input="addAttachment"/>
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

    <v-simple-table class="ma-4" style="background-color: #fbfbfb">
      <template v-slot:default>
        <tbody>
        <tr v-for="(commentObj, i) in getSelectedTask.taskComments" :key="i">
          <td>
            <div class="s1">
              <v-icon color="primary">mdi-account-outline
              </v-icon
              >
              {{ commentObj.comment.createdBy.fullName }} -
              {{ formatDate(commentObj.comment.createdDate) }}
            </div>
            <div class="s2">
            </div>

            <v-container>
              <v-card-text>
                <div class="s3">
                  <p
                    style="margin-right: 10px"
                    v-html="commentObj.comment.commentString"
                  ></p>
                </div>
                <v-chip
                  v-for="(att, i) in commentObj.comment.attachments"
                  :key="i"
                  class="ma-2"
                  @click="download(att)"
                >
                  {{ att.attachment.title + "," }}
                </v-chip>
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
    <tr>
      <td></td>
    </tr>
    </td>
    </tr>

    </tbody>
</template>
</v-simple-table>

</v-container>
</template>
<script>
import stringHelper from "../../../helpers/stringHelper";
import {mapActions, mapGetters} from "vuex";
import moment from "moment";
import axios from "axios";
import {PERMISSION} from "../../../helpers/constants";

import { quillEditor } from "vue-quill-editor";

export default {
  components: {
    quillEditor ,
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
    FilePond: () => import("../SubComponenet/AttachmentsSC"),
  },
  data() {
    return {
      name: "APT",
      attachments: [],
      permissions: [],
      isShowDialog: false,
      ContentString: "",
      postID: this.$route.query.postID,

      editorOption: {
        debug: "ínfo",
        placeholder: "أكتب هنا ...",
        readOnly: true,
        theme: "snow",
      },
    };
  },
  computed: {
    ...mapGetters("tasks", ["getSelectedTask"]),
    getOperations() {
      return PERMISSION.APT.COMMENTS.name;
    },
  },
  methods: {
    ...mapActions("tasks", ["addTaskComment", "fetchTaskComments"]),
    ...mapActions("attachments", ["downloadAttachment"]),
    assignPermissions(perm) {
      this.permissions = perm;
    },
    hideModal() {
      this.isShowDialog = !this.isShowDialog;
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },
    async download(item) {
      this.downloadAttachment(item);
    },
    addAttachment(items) {
      this.attachments = items;
    },
    add() {
      if (this.ContentString.length === 0) {
        alert("please input comment string!");
        return;
      }
      let comment = {
        relid: this.getSelectedTask.id,
        commentString: this.ContentString,
        attachments: this.attachments.map((x) => x.attachment),
      };
      this.addTaskComment(comment)
        .then((resp) => {
          this.fetchTaskComments(this.getSelectedTask.id);
        })
        .catch();
      this.isShowDialog = !this.isShowDialog;
      this.ContentString = "";
    },
  },
};
</script>
<style scoped>
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
