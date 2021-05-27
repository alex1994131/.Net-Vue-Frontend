<template>
  <v-dialog v-model="status" persistent max-width="600">
    <v-card class="grey lighten-3">
      <v-card-title class="headline">المؤسسات المستهدفة</v-card-title>
      <!-- Content -->
          <v-row>
            <v-col cols="12" md="6" class="text-center">
              <div class="mb-2">عنوان الانترنت المصدر</div>
              <vue-ip
                class="ipInput"
                :ip="ipAddress.ip.source"
                :on-change="checkStatusIPsource"
                theme="material"
              ></vue-ip>
            </v-col>
            <!-- Port -->
            <v-col cols="12" md="5">
              <v-text-field v-model="ipAddress.port.source" type="number" label="المنفذ المصدر"></v-text-field>
            </v-col>
          </v-row>

                <v-row>

            <!-- IP Address -->
            <v-col cols="12" md="6" class="text-center">
              <div class="mb-2">عنوان الانترنت المستهدف</div>
              <vue-ip
                class="ipInput"
                :ip="ipAddress.ip.dest"
                :on-change="checkStatusIPdest"
                theme="material"
              ></vue-ip>
            </v-col>
            <!-- Port -->
            <v-col cols="12" md="5">
              <v-text-field type="number" label="المنفذ المستهدف" v-model="ipAddress.port.dest"></v-text-field>
            </v-col>
          </v-row>

      <v-card-actions class="justify-center">
        <v-btn color="primary darken-1" large text @click="addIp" >
          <span>حفظ</span>
          <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
        </v-btn>
        <v-btn large color="red darken-1" text @click="closeForm"><span>غلق</span>
          <v-icon>mdi-close-circle-outline</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    <!-- Alerts  -->

  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import VueIp from "vue-ip";

export default {
  props: {
    status: {
      required: true
    }
  },
  components: { VueIp },
  data: () => ({
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000
    },
    ipAddress:
    {
      nid:  Math.floor(Math.random() * 100),
      ip: { source: "...", dest: "..." },
      port: { source: "", dest: "" }
    },
  }),
  methods: {
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    // Save the new sectors to vuex
    addIp() {

      this.$emit("input",this.ipAddress);
      this.resetForm();
      this.$emit("close");
    },
    // Close the form and rest changes
    closeForm() {

      this.resetForm();
      // status = false;
      this.$emit("close");
    },
    checkStatusIPsource(ip, valid) {
      this.ipAddress.ip.source = ip;
    },
    checkStatusIPdest(ip, valid) {
      this.ipAddress.ip.dest = ip;
    },
    // Reset Form
    resetForm() {
      this.ipAddress={
        id:  Math.floor(Math.random() * 100),
        ip: { source: "...", dest: "..." },
        port: { source: "", dest: "" }
      };
    }
  }
};
</script>

<style lang="scss">
.ipInput {
  direction: ltr;
  border: 1px solid black !important;
  input {
    width: 100%;
    color: black !important;
    &:after {
      color: black !important;
    }
  }
}
</style>
