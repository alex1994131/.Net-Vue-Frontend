<template>
  <v-container id="dashboard" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <!-- <v-row>
            <v-card-title >
              <v-text-field
              class="mx-4"
                v-model="search"
                append-icon="mdi-magnify"
                label="البحث.."
                single-line
                hide-details
              ></v-text-field>
            </v-card-title>
        </v-row>-->
        <v-col cols="12" md="4">
          <v-text-field
            v-model="search1"
            append-icon="mdi-magnify"
            label="بحث .."
            single-line
          ></v-text-field>
        </v-col>

        <v-data-table
        dense
          v-show="search"
          :search="search1"
          class="elevation-10"
          csv-filename="التعرفة"
          :headers="headers"
          :items="getIdentifidIps"
          multi-sort
          :sort-by="['id']"
          :sort-desc="[true]"
        >

          <!-- <template #item.beginTimestamp="{ item }">{{
            formatDate(item)
          }}</template>
          <template #item.endTimestamp="{ item }">{{
            formatDate(item)
          }}</template> -->
        </v-data-table>

        <v-data-table
        dense
          :loading="getLoading"
          v-show="!search"
          class="elevation-10"
          csv-filename="التعرفة"
          :headers="headers"
          :items="getIdentifidIps"
          multi-sort
          :sort-by="['id']"
          :sort-desc="[true]"
        >

          <!-- <template #item.beginTimestamp="{ item }">{{
            formatDate(item)
          }}</template>
          <template #item.endTimestamp="{ item }">{{
            formatDate(item)
          }}</template> -->
        </v-data-table>
      </v-col>
    </v-row>

    <v-dialog v-model="dailog">
      <Notification />
    </v-dialog>
  </v-container>
</template>
<script>
import Notification from "./Notification";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
import table from "../../../plugins/plugin";
import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";

export default {
  install(Vue) {
    Vue.component("v-data-table-extended", table);
  },
  props: {
    permissions: {
      type: Array,
      default: [],
    },
  },

  components: { Notification },
  data() {
    return {
      search1: "",
      dailog: false,
      data: [],
      headers: [
        {
          align: "start",
          sortable: false,
          value: "name",
          select_filter: true,
        },

        { text: "بداية الهجوم", value: "beginTimestamp", select_filter: true },
        { text: "نهاية الهجوم", value: "endTimestamp", select_filter: true },
        { text: "الدولة المصدر", value: "sourceCountry", select_filter: true },
        { text: " الدولة المستهدفة", value: "destinationCountry", select_filter: true },
        { text: "حجم البيانات", value: "dataLength", select_filter: true },
        { text: "عنوان البصمة", value: "signatureTitle", select_filter: true },
        { text: "عدد الهجمات", value: "totalHits", select_filter: true },
        { text: " العنوان الإلكتروني المصدر", value: "source.ip", select_filter: true },
        { text: "المنفذ المصدر", value: "source.port", select_filter: true },
        { text: "نوع المعرف", value: "ownerDetail.ownerType", select_filter: true },
        { text: "رمز المزود", value: "ownerDetail.subsId", select_filter: true },
        { text: "صاحب المعرف", value: "ownerDetail.ownerSub", select_filter: true },
        {
          text: "الرقم المدني /السجل التجاري ",
          value: "ownerDetail.cid",
          select_filter: true,
        },
        { text: " رقم الهاتف", value: "ownerDetail.phoneNum", select_filter: true },
        { text: "مجموعة الإختراق", value: "aptGroup", select_filter: true },
      ],
    };
  },
  computed: {
    ...mapGetters("requsetIds", ["getIdentifidIps"]),
    ...mapGetters("ui", ["getLoading"]),
    search() {
      let heCan = this.permissions.includes(
        PERMISSION.IP_IDENTITFICATION.SEARCH.name
      );
      return heCan;
    },
  },
  methods: {
    ...mapActions("requsetIds", ["getAllIp"]),
    addComments() {
      this.dailog = true;
      //this.$router.push("Notification")
      //this.$router.push("Notification")
    },
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },
  },
  created() {
    this.getAllIp();
  },
};
</script>
