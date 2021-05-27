<template>
  <v-dialog v-model="status" persistent max-width="690">
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="closeDialogAction"
    />
    <v-card class="grey lighten-3">
      <form>
        <v-card-title class="headline">إدارة المؤسسات</v-card-title>
        <!-- Content -->
        <section id="secContManage" class="my-8 pa-8">
          <v-select
            v-model="sector"
            :items="GetSector"
            item-text="name"
            item-value="id"
            label="القطاع"
            required
          ></v-select>

          <v-text-field
            @keyup.enter="AddOrganization"
            v-model="OrganizationName"
            placeholder="اسم المؤسسة"
            solo
          ></v-text-field>
          <v-btn class="ma-2" color="light primary" @click="AddOrganization" fab>
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <!-- load new sectors -->
          <v-chip
            :color="org.isNew ? 'gray' : 'primary'"
            class="ma-2"
            v-for="(org,i) in getOrgById()"
            :key="`sn${i}`"
            close
            @click:close="deleteSector(i)"
          >{{ org.orgname }}
          </v-chip>

        </section>


        <v-card-actions class="justify-center">
          <v-spacer></v-spacer>
          <v-btn color="primary darken-1" large text @click="saveNewOrganization">
            <span>حفظ</span>
            <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
          </v-btn>
          <v-btn large color="red darken-1" text @click="closeForm"><span>غلق</span>
            <v-icon>mdi-close-circle-outline</v-icon>
          </v-btn>
        </v-card-actions>

      </form>
    </v-card>
    <!-- Alerts  -->
    <v-snackbar top v-model="alert.status" :color="alert.color" :timeout="alert.timeout">{{ alert.txt }}</v-snackbar>
  </v-dialog>
</template>

<script>
import {mapState, mapActions, mapGetters} from "vuex";

export default {
  components: {
    responseDialog: () => import("../Dialogs/DRespoonseDialog")
  },
  props: {
    status: {
      type: Boolean,
      required: true
    }
  },
  data: () => ({
    saveDialog: false,
    responseMessage: "",
    isSuccessSave: false,
    OrganizationList: [],
    OrganizationName: null,
    sector: 0,
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000
    }
  }),
  computed: {
    ...mapGetters("organization", ["GetSector"]),
    ...mapState("organization", ["organizations"])
  },
  watch: {
    status(n) {
      if (n === true) {
        this.organizations.forEach(sec =>
          this.OrganizationList.push({
            orgname: sec.orgname, sectorId: sec.sectorId, sector: {id: sec.sectorId}, isNew: false
          })
        );
      }
    }
  },
  methods: {
    ...mapActions("organization", ["SaveOrganization", "fetchSectors", "fetchOrganizations", "fetchOrganContact"]),
    getOrgById() {
      return (this.OrganizationList.filter(x => x.sectorId === this.sector));
    },
    AddOrganization() {
      const OrganizationName = this.OrganizationName;
      if (!OrganizationName || !OrganizationName.trim())
        return this.statAlert(true, "ادخل اسم القسم بالشكل الصحيح", "error");

      if (this.GetSector.some(s => s.orgname === OrganizationName))
        return this.statAlert(true, "يوجد قسم بهذا الإسم", "error");

      this.OrganizationList.push({
        //nid: Math.round(Math.random() * 999999),
        orgname: OrganizationName,
        sectorId: this.sector,
        sector: {id: this.sector},
        isNew: true
      });
      console.log(this.OrganizationName)
      //this.OrganizationName = null;
    },
    deleteSector(index) {
      this.OrganizationList.splice(index, 1);
    },
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    closeDialogAction(status) {
      if (status) {
        this.saveDialog = false;
        this.$emit('close')
        this.fetchSectors();
        this.fetchOrganizations();
        this.fetchOrganContact();
      }
    },
    // Save the new sectors to vuex
    saveNewOrganization() {
      this.SaveOrganization(this.OrganizationList.filter(sec => sec.isNew))
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp;
          this.saveDialog = true;
          this.resetForm();
          this.$emit("close");
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
    closeForm() {
      this.resetForm();
      this.$emit("close");
    },
    resetForm() {
      this.OrganizationList = [];
      this.OrganizationName = null;
    }
  }
};
</script>
