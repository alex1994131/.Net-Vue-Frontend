<template>
  <v-container id="user-22222" fluid tag="section">
    <SectorForm :status="sectorForm" @close="sectorForm = false"/>
    <OrganizationForm :status="organizationForm" @close="organizationForm = false"/>
    <v-row>
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr>
              <td style="background-color:#F6F6F6;">
                <v-subheader>
                  <h1>إدارة المؤسسات</h1>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-card>
                  <v-container>
                    <v-row dense>
                      <v-col dense cols="12" md="3">
                        <v-list shaped>
                          <v-subheader
                          ><h2>القطاعات</h2>
                            <v-icon
                              style="margin-right: 20px"
                              color="primary"
                              @click="sectorForm = true"
                            >
                              mdi-plus-circle-outline
                            </v-icon>
                          </v-subheader>
                          <v-divider class="mx-4"></v-divider>
                          <v-list-item-group color="primary">
                            <v-list-item v-for="sct in sectors" :key="sct.id" @click="selectedSector = sct.id">
                              <v-list-item-content

                              >
                                <v-list-item-title
                                  style="font-size: 15px"
                                  v-text="sct.name"
                                ></v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-col>
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-col cols="12" md="4">

                        <v-list shaped>
                          <v-subheader
                          ><h2>المؤسسات</h2>

                            <v-icon
                              style="margin-right: 20px"
                              color="primary"
                              @click="organizationForm = true"
                            >
                              mdi-plus-circle-outline
                            </v-icon>
                          </v-subheader>
                          <v-divider class="mx-4"></v-divider>

                          <v-list-item-group color="primary">
                            <v-list-item
                              v-for="org in getOrgById()"
                              :key="org.id"
                              @click="selectedOrg = org.id"
                            >
                              <v-list-item-icon>
                                <v-icon
                                  :color="OrgById(org.id) != null? 'primary dark': 'grey lighten-1'">
                                  mdi-information
                                </v-icon
                                >
                              </v-list-item-icon>

                              <v-list-item-content>
                                <v-list-item-title
                                  style="font-size: 15px"
                                  v-text="org.orgname"
                                >
                                </v-list-item-title>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-icon
                                  v-if="false"
                                  @click="EditDetail"
                                  color="primary"
                                >
                                  mdi-pencil
                                </v-icon
                                >
                                <v-icon
                                  v-if="!OrgById(org.id)"

                                  @click="AddDetail"
                                  color="primary"
                                >
                                  mdi-plus-circle
                                </v-icon
                                >
                              </v-list-item-action>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-col>
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-col cols="12" md="4">
                        <v-subheader><h2>التفاصيل:</h2>
                          <h2 style="margin-right: 10px; color: #333333" v-if="OrgById(selectedOrg)">
                            {{ getOrgName().orgname }}</h2></v-subheader>
                        <v-divider class="mx-4"></v-divider>
                        <br/>
                        <h4 v-if="!OrgById(selectedOrg)">لا يوجد تفاصيل</h4>

                        <v-simple-table v-if="OrgById(selectedOrg)">
                          <template v-slot:default>
            <tbody>
            <tr>
              <td style="background-color: #f6f6f6">
                <h4>الإسم:</h4>
              </td>
              <td>
                {{ OrgContact.name }}
              </td>
            </tr>
            <tr>
              <td style="background-color: #f6f6f6">
                <h4>رقم الهاتف:</h4>
              </td>
              <td>
                {{ OrgContact.phoneNumber }}
              </td>
            </tr>
            <tr>
              <td style="background-color: #f6f6f6">
                <h4>الايميل:</h4>
              </td>
              <td>
                {{ OrgContact.email }}
              </td>
            </tr>
            <tr>
              <td style="background-color: #f6f6f6">
                <h4>الموقع الإلكتروني:</h4>
              </td>
              <td>
                {{ OrgContact.url }}
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
  </v-container>
  </v-card>
  </td>
  </tr>
  </tbody>
</template>
</v-simple-table>
</v-col>
<v-col cols="12" md="12">
<v-dialog v-model="AddOrgDetail" width="500">
  <v-card class="elevation-2">
    <v-container>
      <v-row justify="center">
        <v-col class="align-center" cols="12" md="12">
          <h2 style="margin-right: 10px; color: #333333;" v-if="OrgById(selectedOrg)">{{ getOrgName().orgname }}</h2>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="Cname"
            label="الإسم"/>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="phoneNumber"
            label="رقم الهاتف"/>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="email"
            label="الايميل"/>
        </v-col>
        <v-col cols="12" md="12">
          <v-text-field
            v-model="url"
            label="الموقع الإلكتروني"/>
        </v-col>
        <br/>
        <v-btn
          small
          v-show="save1"
          style="margin-left: 10px"
          color="primary"
          @click="saveDetail">حفظ
        </v-btn>
        <v-btn
          small
          v-show="save"
          style="margin-left: 10px"
          color="primary"
          @click="SaveChanges">حفظ التغير
        </v-btn>
      </v-row>
    </v-container>
  </v-card>
</v-dialog>
</v-col>
<LoginStatus :page="name" @input="assignPermissions"/>
<v-snackbar top v-model="alert.status" :color="alert.color" :timeout="alert.timeout">
{{ alert.txt }}
</v-snackbar>
<responseDialog
  :status="saveDialog"
  :success="isSuccessSave"
  :message="responseMessage"
  @close="closeResponseDialog"
/>
</v-row>
</v-container>
</template>


<script>
import SectorForm from "../../Dialogs/DManageSectors";
import OrganizationForm from "../../Dialogs/DManageOrganization";
import {mapActions, mapGetters, mapState} from "vuex";

export default {
  components: {
    SectorForm,
    OrganizationForm,
    LoginStatus: () => import("../../SubComponenet/AuthorizationChacker"),
    responseDialog: () => import("../../Dialogs/DRespoonseDialog"),

  },

  data: () => ({
    name: "MANAGE_SECTORS",
    permissions: [],
    saveDialog: false,
    sectorForm: false,
    organizationForm: false,
    selectedSector: null,
    selectedOrg: 0,
    OrganizationList: [],
    responseMessage: "",
    isSuccessSave: false,
    OrganizationName: '',
    hasDetail: false,
    save: false,
    save1: false,
    AddOrgDetail: false,
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000,
    },
    email: '',
    Cname: '',
    phoneNumber: '',
    url: '',
    org: null,
    Contact: {
      email: '',
      Cname: '',
      phoneNumber: '',
      url: '',
      org: null
    },
    OrgContact: {
      email: '',
      name: '',
      phoneNumber: '',
      url: '',
      org: null
    },
  }),
  computed: {
    ...mapGetters("organization", ["GetSector", "GetOrgContact"]),
    ...mapGetters("ui", ["getLoading"]),
    ...mapState("organization", ["sectors", "organizations"]),
  },
  watch: {
    status(n) {
      if (n === true) {
        this.organizations.forEach((sec) =>
          this.OrganizationList.push({
            name: sec.name,
            sector: this.selectedSector,
            isNew: false,
          })
        );
      }
    },
  },
  methods: {
    ...mapActions("organization", [
      "fetchOrganizations",
      "fetchSectors",
      "AddOrgContact",
      "fetchOrganContact",
      "SaveOrganization",
      "fetchSectors",
      "fetchOrganizations",
      "AddOrgContact",
      "UpdateOrgDetails"
    ]),

    assignPermissions(perm) {
      this.permissions = perm;
    },
    OrgById(OrgId) {
      return this.GetOrgContact.find(x => x.orgId === OrgId)
    },
    getOrgName() {
      let org = this.organizations.find(
        x => x.id === this.selectedOrg
      );
      return org
    },

    getOrgById() {
      this.getOrgContactById();
      let org = this.organizations.filter(
        x => x.sectorId === this.selectedSector
      );
      return org;
    },
    getOrgContactById() {
      this.getOrgName();
      let OrgContact = this.GetOrgContact.find((x) => {
        if (x.orgId === this.selectedOrg) {
          this.OrgContact = x;
          this.hasDetail = true;
        }
      });
      return OrgContact;
    },
    EditDetail() {
      this.AddOrgDetail = true;
      this.save1 = false;
      this.save = true;
      this.email = this.OrgContact.email ,
        this.Cname = this.OrgContact.name ,
        this.phoneNumber = this.OrgContact.phoneNumber ,
        this.url = this.OrgContact.url
    },
    SaveChanges() {
      this.UpdateOrgDetails({
        Id: this.selectedOrg,
        email: this.email,
        name: this.Cname,
        phoneNumber: this.phoneNumber,
        url: this.url,
        orgId: this.selectedOrg,
      })
    },

    AddDetail() {
      this.AddOrgDetail = true;
      this.save1 = true;
      this.save = false;
      this.email = '',
        this.Cname = '',
        this.phoneNumber = '',
        this.url = ''
    },
    saveDetail() {
      console.log(this.selectedOrg)
      this.AddOrgContact({
        email: this.email,
        name: this.Cname,
        phoneNumber: this.phoneNumber,
        url: this.url,
        orgId: this.selectedOrg,

      }, this.selectedOrg).then((resp) => {
        this.isSuccessSave = true;
        this.responseMessage = resp;
        this.saveDialog = true;

      })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
      this.AddOrgDetail = false;

    },

    AddOrganization() {
      const OrganizationName = this.OrganizationName;
      if (!OrganizationName || !OrganizationName.trim())
        return this.statAlert(true, "ادخل اسم القسم بالشكل الصحيح", "error");

      if (this.GetSector.some((s) => s.name === OrganizationName))
        return this.statAlert(true, "يوجد قسم بهذا الإسم", "error");

      this.OrganizationList.push({
        nid: Math.round(Math.random() * 999999),
        name: OrganizationName,
        sectorId: this.sector,
        isNew: true,
      });
      console.log(this.sector);
      this.OrganizationName = null;
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
    closeResponseDialog(status) {
      this.saveDialog = false;
      if (status) {
        this.$router.push({name: "المؤسسات"});
        this.fetchOrganizations();
        this.fetchOrganContact();
        this.fetchSectors();
      }
    },
    // Save the new sectors to vuex
    saveNewOrganization() {
      this.SaveOrganization(this.OrganizationList.filter((sec) => sec.isNew))
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
    },
  },
  created() {
    this.fetchSectors();
    this.fetchOrganizations();
    this.fetchOrganContact();
  },
};
</script>
