<template>
  <v-dialog v-model="status" persistent max-width="600">
    <v-card class="grey lighten-3">
      <v-card-title class="headline">المؤسسات المستهدفة</v-card-title>
      <v-row  class="justify-center">
        <p v-if="found" class="red--text" >هذه المؤسسة مضافة مسبقا</p>
      </v-row>
      <v-row  class="justify-center">
            <v-col cols="12" md="5">
               <v-select
                v-model="sector"
                :items="GetSector"
                @change="orgs = getOrganizations.filter(org => org.sectorId == sector), found = false"
                :rules="[v => !!v || 'مطلوب القطاع']"
                item-text="name"
                item-value="id"
                label="القطاع"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="5">
              <v-select
                v-model="selectedOrg"
                :items="orgs"
                @change="found = false"
                :rules="[v => !!v || 'مطلوب المؤسسة']"
                item-text="orgname"
                item-value="id"
                label="المؤسسة"
                required
              ></v-select>
            </v-col>
      </v-row>
      <v-card-actions class="justify-center">

        <v-btn color="primary darken-1" large text @click="addOrg" >
                   <span>حفظ</span>
        <v-icon>mdi-checkbox-marked-circle-outline</v-icon></v-btn>
            <v-btn large color="red darken-1" text @click="closeForm"><span>غلق</span>
        <v-icon>mdi-close-circle-outline</v-icon></v-btn>

      </v-card-actions>
    </v-card>
    <!-- Alerts  -->

  </v-dialog>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  props: {
    status: {
      required: true
    },
    Organizations :{
      type : Array,
      required : true
    },
  },
  data: () => ({
    sector: null,
    orgs :[],
    found : false,
    selectedOrg : null,
    s: null,
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000
    }
  }),
  computed: {
    ...mapState("StatusStore", ["statusType"]),
    ...mapGetters("organization",['getOrganizations','GetSector'])
  },
  methods: {
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    // Save the new sectors to vuex
    addOrg() {
      this.found = this.Organizations.some(o => o.organization.id == this.selectedOrg);
      if (!this.found){
      this.Organizations.push({ organization : this.getOrganizations.find(o => o.id == this.selectedOrg)})
      this.resetForm();
      this.$emit("close");
      }

    },
    // Close the form and rest changes
    closeForm() {
      this.resetForm();
      status = false;
      this.$emit("close");
    },
    // Reset Form
    resetForm() {
      this.selectedOrg = null;
      this.sector = null;
    }
  }
};
</script>
