<template>
  <v-container >
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-card class="ma-0">
          <v-simple-table dense>
            <template v-slot:default>
              <tbody v-for="(his, i) in history" :key="i">
                <tr style="background-color: #BBCACA">
                  <td>
                    <v-subheader class="ma-0" style="background-color: #BBCACA">
                      <h4 >تم الإجراء بواسطة:</h4>
                      <v-chip class="ma-1" label>
                        <h4>{{ his.changedBy.fullName }}</h4>
                      </v-chip>
                      <h4 style="margin-right: 20px;">التاريخ:</h4>
                      <v-chip class="ma-1" label>
                        <h4>{{ formatDate(his.changeDate) }}</h4>
                      </v-chip>
                    </v-subheader>
                  </td>
                </tr>
                <tr>
                  <v-simple-table dense>
                    <template v-slot:default>
                      <tbody>
                        <tr style="height: 19px; background-color:#e0ebeb ">
                          <th>نوع الإجراء</th>
                          <th>الإجراء السابق</th>
                          <th>الإجراء الجديد</th>
                        </tr>

                        <tr style="background-color: #e0ebeb" v-for="i in his.fields" :key="i.id">
                          <td>{{ i.fieldName }}</td>
                          <td>{{ i.oldValue }}</td>
                          <td>{{ i.newValue }}</td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </tr>
                
              </tbody>
              
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
    <!-- <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/> -->
  </v-container>
</template>
<script>
import stringHelper from "../../../helpers/stringHelper";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import moment from "moment";
import { PERMISSION } from "../../../helpers/constants";

export default {
  props: {
    history: { type: Array, required: true },
  },
  data() {
    return {
      name: "NOTIFICATIONS",
      permissions: [],
      Headers: [
        {
          text: "الحقل",
          align: "start",
          sortable: false,
          value: "fieldName",
          select_filter: true,
        },
        { text: "القيمة القديمة", value: "oldValue", select_filter: true },
        { text: "الجديدة", value: "newValue", select_filter: true },
      ],
    };
  },
  computed: {
    getOperations() {
      return PERMISSION.INCIDENT.COMMENTS.name;
    },
    ...mapGetters("ui", ["getLoading"]),
  },
  methods: {
    hideModal() {
      this.isShowDialog = !this.isShowDialog;
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY , hh:mm:ss A");
    },
  },

  created() {},
};
</script>