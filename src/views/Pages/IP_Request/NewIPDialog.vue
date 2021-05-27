<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn class="ma-3" color="primary" label outlined dark v-bind="attrs" v-on="on">
          انشاء طلب جديد
          <v-icon light>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-col cols="12" md="12">
        <v-card>
          <v-form v-model="valid">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-text-field
                      v-model="ip.docmentId"
                      counter="10"
                      :rules="[requiredNum('الوثيقة'), minLength('الوثيقة',0) , maxLengthNum('الوثيقة', 10)]"
                      label="رقم الوثيقة"
                    />
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-text-field
                      v-model="ip.aptGroup"
                      counter="40"
                      :rules="[required('مجموعةالاختراق'), minLength('مجموعةالاختراق',4) , maxLength('مجموعةالاختراق', 40)]"
                      label="مجموعةالاختراق"
                    />
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" md="5">
                    <v-menu
                      v-model="menu2"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="100px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="ip.date"
                          label="التاريخ"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker v-model="ip.date" @input="menu2 = false"></v-date-picker>
                    </v-menu>
                  </v-col>

                  <v-col cols="12" sm="7">
                    <v-menu
                      ref="menu"
                      v-model="menu22"
                      :close-on-content-click="false"
                      :nudge-right="40"
                      :return-value.sync="ip.time"
                      transition="scale-transition"
                      offset-y
                      max-width="290px"
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="ip.time"
                          label="الوقت"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-if="menu22"
                        v-model="ip.time"
                        use-seconds
                        full-width
                        @click:second="$refs.menu.save(ip.time)"
                      ></v-time-picker>
                    </v-menu>
                  </v-col>
                </v-row>
                <v-row>
                  <div class="mb-2">العنوان الإلكتروني الداخلي</div>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <vue-ip
                      :ip="ip.dist"
                      :on-change="checkDistIP"
                      class="ipInput"
                      theme="material"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="ip.toPort"
                      label="Outlined"
                      dense
                      placeholder="المنفذ"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row>
                  <div class="mb-2">العنوان الإلكتروني الخارجي</div>
                </v-row>
                <v-row>
                  <v-col cols="12" md="6">
                    <vue-ip
                      :ip="ip.source"
                      :on-change="checkSourceIP"
                      class="ipInput"
                      theme="material"
                    />
                  </v-col>
                  <v-col cols="12" md="3">
                    <v-text-field
                      v-model="ip.fromPort"
                      label="Outlined"
                      dense
                      placeholder="المنفذ"
                      outlined
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-row>
              <v-btn color="green darken-1" :disabled="!valid" large text @click="saveip">
                <span>حفظ</span>
                <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
              </v-btn>

              <v-btn large style="flout:left" color="red darken-1" text @click="closeForm">
                <span>غلق</span>
                <v-icon>mdi-close-circle-outline</v-icon>
              </v-btn>
            </v-row>
          </v-form>
        </v-card>
      </v-col>
    </v-dialog>
  </v-row>
</template>

<script>
import VueIp from "vue-ip";
import { mapGetters, mapActions, mapMutations, mapState } from "vuex";
import axios from "axios";
export default {
  components: { VueIp },
  name: "NewIPDialog",
  props: ["dialog"],
  data() {
    return {
      menu22: false,
      menu2: false,
      ip: {
        docmentId: "",
        date: "",
        time: "",
        source: "",
        dist: "",
        fromPort: "",
        ownerType: "",
        toPort: "",
        aptGroup: "",
        subsId: "",
        ownerSub: "",
        cid: "",
        phoneNum: "",
      },

      valid: false,
      required(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل اسم  ${propertyType}`;
      },
      requiredNum(propertyType) {
        return (v) => (v && v.length > 0) || `ادخل رقم  ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return (v) =>
          (v && v.length >= minLength) ||
          `${propertyType} يجب أن تكون أكثر من ${minLength} أحرف`;
      },
      maxLength(propertyType, maxLength) {
        return (v) =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن تكون أقل من ${maxLength} أحرف`;
      },
      maxLengthNum(propertyType, maxLength) {
        return (v) =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن تكون أقل من ${maxLength} أرقام`;
      },
    };
  },
  computed: {
    ...mapState(["requsetIds"]),
  },
  methods: {
    ...mapActions("requsetIds", ["add"]),

    checkDistIP(ip, valid) {
      this.ip.dist = ip;
    },
    checkSourceIP(ip, valid) {
      this.ip.source = ip;
    },
    closeForm() {
      this.dialog = false;
    },
    saveip() {
      this.$emit("input", this.ip);
      this.add(this.ip);
      this.ip = {};
    },
  },
};
</script>

<style scoped>
</style>
