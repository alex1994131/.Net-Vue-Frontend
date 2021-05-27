<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <br/>
      <v-simple-table>
        <template v-slot:default>
          <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <v-subheader>
                  <h1>المهام الواردة</h1>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-data-table
                dense
                :loading="getLoading"
              
                :headers="headers"
                :items="geIpaddress"
                :sort-by="['id']"
                :sort-desc="[true]"
              >
                <template #item.ip="{item}">{{ item.source.ip}}</template>
                <template #item.port="{item}">{{ item.source.port}}</template>

                <template #item.ipDest="{item}">{{ item.dest.ip}}</template>
                <template #item.portDest="{item}">{{ item.dest.port}}</template>

                <!-- <template #item.beginTimestamp="{item}">{{ formatDate(item)}}</template>
                <template #item.endTimestamp="{item}">{{ formatDate(item)}}</template>-->
              </v-data-table></td>
              
            </tr>
          </tbody>
        </template>
      </v-simple-table>

      <LoginStatus :page="name" @input="assignPermissions" />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";

import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";
export default {
  components: {
    quillEditor,

    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
    IgnoreReasonDialog: () => import("../Dialogs/IgnoreReasonDialog"),
    closeeReasonDialog: () => import("../Dialogs/CloseeReasonDialog"),
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),

    history: () => import("../SubComponenet/ShowHistorySC"),
  },
  data() {
    return {
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
          select_filter: true,
        },

        { text: "بداية الهجوم", value: "beginTimestamp", select_filter: true },
        { text: "نهاية الهجوم", value: "endTimestamp", select_filter: true },
        { text: " الدولةالمصدر", value: "sourceCountry", select_filter: true },
        {
          text: " الدولة المستهدفة",
          value: "destinationCountry",
          select_filter: true,
        },
        { text: "حجم البيانات", value: "dataLength", select_filter: true },
        { text: "عنوان البصمة", value: "signatureTitle", select_filter: true },
        { text: "عدد الهجمات", value: "totalHits", select_filter: true },
        { text: "العنوان الإلكتروني المصدر", value: "ip", select_filter: true },
        {
          text: "العنوان الإلكتروني المستهدف",
          value: "ipDest",
          select_filter: true,
        },
        { text: "المنفذ المصدر", value: "port", select_filter: true },
        { text: "المنفذ المستهدف", value: "portDest", select_filter: true },
        {
          text: "نوع المعرف",
          value: "ownerDetail.ownerType",
          select_filter: true,
        },
        {
          text: "رمز المزود",
          value: "ownerDetail.subsId",
          select_filter: true,
        },
        {
          text: "صاحب المعرف",
          value: "ownerDetail.ownerSub",
          select_filter: true,
        },
        {
          text: "الرقم المدني /السجل التجاري ",
          value: "ownerDetail.cid",
          select_filter: true,
        },
        {
          text: " رقم الهاتف",
          value: "ownerDetail.phoneNum",
          select_filter: true,
        },
        { text: "مجموعة الإختراق", value: "aptGroup", select_filter: true },
      ],
      name: "NOTIFICATIONS",
    };
  },
  computed: {
    ...mapGetters("incidents", ["getSelectedIncident"]),
    ...mapGetters("requsetIds", ["getIdentifidIps", "geIpaddress"]),
    ...mapGetters("ui", ["getLoading"]),
    canAdd() {
      let heCan =
        this.permissions.includes(PERMISSION.NOTIFICATIONS.COMMENTS.name) &&
        !this.getSelectedIncident.isIncident;
      return heCan;
    },
    canAassign() {
      let heCan = this.permissions.includes(
        PERMISSION.NOTIFICATIONS.ASSIGN_TASK.name
      );
      return heCan;
    },

    getOperations() {
      return PERMISSION.NOTIFICATIONS.DETAILS.name;
    },
  },
  methods: {
    ...mapActions("incidents", [
      "changeIncidnet",
      "requestIpsIdentification",
      "setParentIncident",
    ]),
    ...mapActions("requsetIds", ["getIdsByIncident"]),
    assignPermissions(pers) {
      this.permissions = pers;
    },

    formatD(date) {
      let changes = this.getSelectedIncident.changes;
      if (((changes == null) == changes) == undefined) return "";
      changes.forEach((change) => {
        this.user = change.fields.some(
          (fld) => fld.newValue == "تحويل إلى حادث"
        )
          ? change.changedBy.fullName
          : "";
      });
      return moment(date).format("DD-MM-YYYY");
    },

    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },
  },
  created() {},
};
</script>
<style >
.ql-editor {
  height: 56vh;
}
.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>
