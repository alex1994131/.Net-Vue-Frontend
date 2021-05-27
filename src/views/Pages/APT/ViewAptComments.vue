<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-timeline dense>
          <v-timeline-item
            v-for="(content, i) in selectedApt.contents"
            :key="i"
            color="primary "
            icon="mdi-text-box-plus-outline"
            small
          >
            <v-card>
              <div style="margin-left: 10px; margin-right: 10px">
                <v-icon color="primary">mdi-account</v-icon
                >{{ content.createdBy.fullName }}
                <p style="color: silver; float: left">
                  <v-icon color="primary">mdi-calendar-range</v-icon>
                  {{ content.createdDate }}
                </p>
              </div>
              <v-card-text>
                <div class="subheading">
                  <p v-html="content.contentString"></p>
                </div>
                <div class="content-view" ref="contentContainer"></div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-col>
    </v-row>
        <v-row justify="center">
       <v-col cols="12" md="12">
      <v-card>
        <v-textarea
          v-model="ContentString"
          prepend-icon="mdi-comment"
          class="mx-2"
          label="أكتب محتوى جديد"
          rows="5"
        ></v-textarea>

        <v-btn color="primary" outlined @click="add">إضافة</v-btn>
      </v-card>
       </v-col>
    </v-row>

    <!-- <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/> -->
  </v-container>
</template>
<script>
import stringHelper from "../../../helpers/stringHelper";
import { mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
import { PERMISSION } from "../../../helpers/constants";

export default {
  components: {
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
  },
  data() {
    return {
      name: "APT",
      permissions: [],
      isShowDialog: false,
      ContentString: "",
      postID: this.$route.query.postID,
    };
  },
  computed: {
    ...mapGetters("apt", ["selectedApt"]),
    getOperations() {
      return PERMISSION.APT.COMMENTS.name;
    },
  },
  methods: {
    ...mapActions("apt", ["addContents", "fetchContents"]),
    assignPermissions(pers) {
      this.permissions = pers;
    },
    hideModal() {
      this.isShowDialog = !this.isShowDialog;
    },
    add() {
      if (this.ContentString.length === 0) {
        alert("plealse input comment string!");
        return;
      }
      let apt = {
        id: this.selectedApt.id,
        Contents: [
          {
            ContentString: this.ContentString,
            CreatedBy: { id: 1 },
            commentedIn: "some",
          },
        ],
      };

      this.addContents(apt)
        .then((resp) => {
          this.fetchContents(this.selectedApt.id);
        })
        .catch();
      this.isShowDialog = !this.isShowDialog;
      this.ContentString = "";
    },
  },
  created() {},
};
</script>
