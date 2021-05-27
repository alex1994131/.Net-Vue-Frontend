<template>
  <v-container>
    <v-row justify="center">
      <v-dialog v-model="isShowDialog" persistent max-width="1000px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on" class="ma-3" small label outlined>
            <h3>إضافة</h3>
            <v-icon>mdi-comment-plus-outline</v-icon>
          </v-btn>
        </template>
        <v-card class="white">
          <v-card-title>
            <span class="headline">أضف هنا</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    rows="4"
                    counter
                    clearable
                    solo
                    autoGrow
                    label="اضف هنا"
                    v-model="ContentString"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn large color="blue darken-1" text @click.prevent="add">
              <span>حفظ</span>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <v-btn large color="red darken-1" text @click.prevent="hideModal">
              <span>غلق</span>
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-timeline dense>
          <v-timeline-item
            v-for="(comment, i) in selectedApt.attackStratigies"
            :key="i"
            color="primary "
            icon="mdi-text-box-plus-outline"
            small
          >
            <v-card>
              <div style="margin-left:10px;margin-right:10px;">
                <v-icon color="primary">mdi-account</v-icon>
                {{ Contents.CreatedBy.fullName }}
                <p style="color:silver; float:left; ">
                  <v-icon color="primary">mdi-calendar-range</v-icon>
                  {{ Contents.createdDate }}
                </p>

              </div>
              <v-card-text>
                <div class="subheading">
                  <p v-html="Content.ContentString"></p>
                </div>
                <div class="content-view" ref="contentContainer"></div>
              </v-card-text>
            </v-card>
          </v-timeline-item>
        </v-timeline>

        <!-- <v-card
            v-for="(comment, i) in getComments"
            :key="i"
          >
            <v-card>
              <div style="margin-left:10px;margin-right:10px;">
               <v-icon color="primary">mdi-account</v-icon>{{comment.commentedBy.fullName}}
                <p style="color:selver lighten-2; float:left; ">
                  <v-icon color="primary">mdi-calendar-range</v-icon>
                  {{ comment.createdDate }}
                </p>
              </div>
              <v-card-text>
                  <p v-html="comment.commentString"></p>
              </v-card-text>
            </v-card>
          </v-card> -->


      </v-col>
    </v-row>
    <!-- <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/> -->
  </v-container>
</template>
<script>
import stringHelper from "../../../helpers/stringHelper";
import {mapState, mapMutations, mapActions, mapGetters} from "vuex";
import moment from "moment";
import axios from "axios";
import {PERMISSION} from '../../../helpers/constants'

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
      Contents: [],
    };
  },
  computed: {
    ...mapGetters("apt", ["selectedApt"]),
    getOperations() {
      return PERMISSION.APT.COMMENTS.name
    }
  },
  methods: {
    ...mapActions("apt", ["addContents"]),
    assignPermissions(perm) {
      this.permissions = perm;
    },
    hideModal() {
      this.isShowDialog = !this.isShowDialog;
    },
    add() {
      if (this.ContentString.length === 0) {
        alert("Please input comment string!");
        return;
      }
      let apt = {
        id: this.selectedApt.id,
        Contents: [
          {
            ContentString: this.ContentString,
            CreatedBy: {id: 1},
            commentedIn: "some",
          },
        ],
      };
      this.Contents.push(apt.Contents[0]);
      this.addContents(apt).then(resp => {
        this.fetchContents(this.selectedApt.id);
      }).catch();
      this.isShowDialog = !this.isShowDialog;
      this.ContentString = "";
    },
  },
  created() {
  },
};
</script>
