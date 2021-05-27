<template>
  <v-container>
    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
      >{{ alert.txt }}
    </v-snackbar>
    <v-row>
      <v-col cols="12" md="12">
        <v-card v-show="waitingRequests">
          <v-data-table
            dense
            v-model="selected"
            :headers="headers"
            :items="getIps"
            show-select
            :sort-by="['id']"
            :sort-desc="[true]"
          >
            <template v-slot:items="props">
              <td>
                <v-checkbox
                  v-model="props.selected"
                  primary
                  hide-details
                ></v-checkbox>
              </td>
              <td class="text-xs-right">{{ props.selected }}</td>
              <td>
                <v-edit-dialog
                  :return-value.sync="props.subsId"
                  lazy
                  @save="save"
                  @cancel="cancel"
                  @open="open"
                  @close="close"
                >
                  {{ props.subsId }}
                  <template v-slot:input>
                    <v-text-field
                      v-model="props.item.subsId"
                      label="Edit"
                      single-line
                      counter
                    ></v-text-field>
                  </template>
                </v-edit-dialog>
              </td>
            </template>

            <template #item.ip="{ item }">
              {{ getIp(item).ip }}
            </template>
            <template #item.port="{ item }">
              {{ getIp(item).port }}
            </template>

            <template #item.beginTimestamp="{ item }">
              {{ formatDate(item.beginTimestamp) }}
            </template>
            <template #item.endTimestamp="{ item }">
              {{ formatDate(item.endTimestamp) }}
            </template>

            <template #item.ownerType="{ item }">
              <v-select
                v-model="item.ownerType"
                :items="ownerTypes"
                :rules="[(v) => !!v || 'مطلوب نوع المعرف']"
                item-text="name"
                item-value="name"
                label="المعرف"
                required
              ></v-select>
            </template>
            <template #item.subsId="{ item }">
              <v-text-field v-model="item.subsId" required></v-text-field>
            </template>

            <template #item.ownerSub="{ item }">
              <v-text-field v-model="item.ownerSub" required></v-text-field>
            </template>

            <template #item.cid="{ item }">
              <v-text-field
                v-model="item.cid"
                :rules="[required(''), minLength('', 6), maxLength('', 10)]"
                type="number"
              ></v-text-field>
            </template>
            <template #item.phoneNum="{ item }">
              <v-text-field
                v-model="item.phoneNum"
                counter="8"
                :rules="[required2(''), maxLength('', 8)]"
                type="number"
              ></v-text-field>
            </template>
            <template #item.actions="{ item }">
              <v-icon
                v-if="!item.isHandeled"
                color="primary"
                small
                @click="save(item)"
                >mdi-checkbox-marked-circle
              </v-icon>
            </template>
          </v-data-table>
          <responseDialog
            :status="saveDialog"
            :success="isSuccessSave"
            :message="responseMessage"
            @close="closeResponceDailog"
          />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <!-- <LoginStatus :page="name" @input="assignPermissions"/>  -->
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import axios from "axios";
import { PERMISSION } from "../../../helpers/constants";
import moment from "moment";

export default {
  props: {
    permissions: {
      type: Array,
      default: [],
    },
  },
  components: {
    responseDialog: () => import("../Dialogs/DRespoonseDialog"),
    // LoginStatus : ()=> import('../SubComponenet/AuthorizationChacker')
  },
  data() {
    return {
      formHasErrors: false,
      isEditing: false,
      saveDialog: false,
      responseMessage: "",
      isSuccessSave: false,
      active: false,
      selected: [],
      allData: [],
      snack: false,
      snackColor: "",
      snackText: "",
      max25chars: (v) => v.length <= 25 || "Input too long!",
      pagination: {},
      subsId: "",
      ownerSub: "",
      cid: "",

      ownerTypes: [
        { id: 1, name: "شخصي" },
        { id: 2, name: "تجاري" },
        { id: 3, name: "حكومي" },
      ],

      headers: [
        {
          align: "start",
          sortable: false,
        },

        { text: "بداية الهجوم", value: "beginTimestamp" },
        { text: "نهاية الهجوم", value: "endTimestamp" },
        { text: "العنوان الإلكتروني", value: "ip" },
        { text: "المنفذ", value: "port" },
        { text: "رمز المزود", value: "subsId" },
        { text: "نوع المعرف", value: "ownerType" },
        { text: "صاحب المعرف", value: "ownerSub" },
        { text: "الرقم المدني /السجل التجاري ", value: "cid" },
        { text: " رقم الهاتف", value: "phoneNum" },
        { text: " الإجراء", value: "actions" },
      ],
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل رقم المدني ${propertyType}`;
      },
      required2(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل رقم الهاتف ${propertyType}`;
      },
      required3(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل رمز المعرف ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} يجب أن تكون أكثر من ${minLength} الرقم`;
      },
      maxLength(propertyType, maxLength) {
        return (v) =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن تكون أقل من ${maxLength} الرقم`;
      },
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 2000,
      },
    };
  },

  computed: {
    ...mapGetters("requsetIds", ["getIps", "getIdentifidIps"]),

    waitingRequests() {
      let heCan = this.permissions.includes(
        PERMISSION.IP_IDENTITFICATION.VARFIY.name
      );
      return heCan;
    },
  },

  methods: {
    ...mapActions("requsetIds", ["getAllIp"]),

    ...mapMutations("requsetIds", ["addnewId", "add"]),
    ...mapActions("requsetIds", ["newId", "VarifyIp"]),

    count(tt) {
      if (tt === 0) return "0";
      return tt.length;
    },

    save(item) {
      let message = "";
      let isValid = true;

      //  if (this.ownerType == "") {
      //   isValid = false;
      //   message = "يجب اختيار نوع المعرف";
      // }
      if (item.subsId === "") {
        isValid = false;
        message = "يجب إضافة رمز المزود";
      }
      if (!isValid) {
        return this.statAlert(true, message, "error");
      } else {
        this.active = true;
        this.snack = true;
        this.snackColor = "success";
        this.snackText = "تم الحفظ";
        let obj = {
          id: item.id,
          isKnown: item.isKnown,
          cid: item.cid,

          ownerSub: item.ownerSub,
          phoneNum: item.phoneNum,
          ownerType: item.ownerType,
          subsId: item.subsId,
          aptGroup: item.aptGroup,
        };
        this.VarifyIp(obj)
          .then((resp) => {
            item.isHandeled = true;
            this.saveDialog = true;
            this.responseMessage = resp.message;
            this.isSuccessSave = true;
          })
          .catch((err) => {
            this.saveDialog = true;
            this.responseMessage = err.message;
            this.isSuccessSave = false;
          });
      }
    },
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    closeResponceDailog(status) {
      this.saveDialog = false;
      this.responseMessage = "";
      this.isSuccessSave = false;
    },
    cancel() {
      this.snack = true;
      this.snackColor = "error";
      this.snackText = "Canceled";
    },
    open() {
      this.snack = true;
      this.snackColor = "info";
      this.snackText = "Dialog opened";
    },
    close() {},
    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },
    getIp(item) {
      let c = item.destinationCountry;
      let s = item.sourceCountry;
      return c === "OM" ||
        c === "om" ||
        c === "OMAN" ||
        c === "oman" ||
        c === "Oman"
        ? item.dest
        : item.source;
    },
  },

  created() {
    this.getAllIp();
  },
};
</script>
