<template>
  <v-form ref="form" lazy-validation>
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-row>
          <v-col cols="12" md="2">
            <v-select
              v-model="statType"
              :items="GetSector"
              :rules="[v => !!v || 'نسيت اختيار نوع الحالة الجديدة']"
              item-text="statusType"
              item-value="id"
              label="نوع الحالة"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="3">
            <v-text-field
              v-model="org"
              :rules="[v => !!v || 'نسيت اختيار الحالة']"
              placeholder="الحالة"
              label="الحالة"
              required
              clearable
            />
          </v-col>

          <v-col cols="12" md="5" >
            <v-radio-group row  class="black--text" v-model="type" column>
              <v-radio label="حالة اعتيادية" color="blue" value="n"></v-radio>
              <v-radio label="حالة جديدة" color="green" value="o"></v-radio>
              <v-radio label="حالة إغلاق" color="red" value="c"></v-radio>
            </v-radio-group>
          </v-col>
          <v-col cols="12" md="1" class="text-center">
            <v-card-actions>
              <v-btn color="primary" class="mr-0" @click="sendData" outlined>
                <h3>إضافة</h3>
              </v-btn>
            </v-card-actions>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="12" md="12">
            <v-data-table
              :headers="myheaders"
              :items="modifyOrgs"
              :items-per-page="5"
              class="elevation-1"
              dense
              group-by="category"
              show-group-by
              :sort-by="['id']"
                        :sort-desc="[true]"
            >
              <template v-slot:item.actions="{ item }">
                <v-icon @click="deleteItemOrg(item)">mdi-delete</v-icon>
              </template>
            </v-data-table>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <LoginStatus :page="name" @input="assignPermissions"/>

    <!-- Alerts  -->
    <v-snackbar v-model="alert.status" :color="alert.color" :timeout="alert.timeout">{{ alert.txt }}</v-snackbar>
  </v-form>
</template>

<script>
import { mapActions, mapGetters, mapState } from "vuex";
export default {
  components : {
    LoginStatus : ()=> import('../../SubComponenet/AuthorizationChacker')
  },
  data() {
    return {
    name : "MANAGE_STATUS",
    permissions : [],
      type: "n",
      statType: null,
      org: null,
      myheaders: [
        { text: "نوع الحالة", value: "category" },
        { text: "الحالة", value: "StatusString" },
        { text: "الاجراء", value: "actions" }
      ],
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 2000
      }
    };
  },

  computed: {
    ...mapGetters("StatusStore", ["GetSector"]),
    ...mapState("StatusStore", ["status", "statusType"]),
    modifyOrgs() {
      return this.status.map(org => {
        return {
          id: org.id,
          StatusString: org.statusString,
          category: this.statusType.find(st => st.id == org.statusTypeId)
            .statusType
        };
      });
    }
  },
  methods: {
    ...mapActions("StatusStore", [
      "AddOrg",
      "changeSector",
      "removeStatus",
      "fetchstatusTypeId",
      "fetchStatuses"
    ]),
    assignPermissions(pers){
      this.permissions = pers;
    },
    sendData() {
      if (!this.org || !this.statType)
        return this.statAlert(
          true,
          "الرجاء التأكد من صحة البانات المدخلة اعلاه",
          "error"
        );
      const obiOrg = {
        id: Math.round(Math.random() * 999999),
        statusString: this.org,
        isOpen: this.type == "o",
        isClosing: this.type == "c",
        statusTypeId: this.statType
      };
      this.AddOrg(obiOrg);
      this.fetchStatuses();
    },
    // Alert
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    },
    // Delete item org in table which in vuex of course
    deleteItemOrg(item) {
      this.removeStatus(item.id);
    }
  },
  mounted() {},

  created() {
    this.fetchstatusTypeId();
    this.fetchStatuses();

    
  }
};
</script>
