<template>
  <v-container id="user-22222" fluid tag="section">
    <!-- Sector Management & Form  -->

    <v-row justify="center">
      <v-col cols="12" md="11" class="text-left">
        <v-btn color="primary" @click="sectorForm = true" outlined>
          <h3>إضافة الأقسام</h3>
        </v-btn>
        <v-btn color="primary" style="margin-right:10px" @click="sectionFormDialog = true" outlined>
          <h3>إضافة الشعب</h3>
        </v-btn>
      </v-col>
    </v-row>
    <SectorForm :status="sectorForm" @close="sectorForm = false"/>
    <SectionsForm :status="sectionFormDialog" @close="sectionFormDialog = false"/>
    <!-- Organization  -->
    <v-row justify="center">
      <v-col cols="12" md="11">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr>
              <td style="background-color:#F6F6F6;">
                <v-subheader>
                  <h1>إدارة الأقسام</h1>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-col cols="12" md="12">
                  <v-card>
                    <v-container>
                      <ManageEmployees />
                    </v-container>
                  </v-card>
                </v-col>
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <LoginStatus :page="name" @input="assignPermissions"/>
  </v-container>
</template>

<script>
import ManageEmployees from "./SubPageManageEmployees";
import SectorForm from "../../Dialogs/DManageDepartments";
import SectionsForm from "../../Dialogs/DManageSections";
import {mapActions} from "vuex";

export default {
  components: {
    ManageEmployees,
    SectorForm,
    SectionsForm,
    LoginStatus: () => import('../../SubComponenet/AuthorizationChacker')
  },
  data: () => ({
    name: "MANAGE_USERS",
    permissions: [],
    sectorForm: false,
    sectionFormDialog: false
  }),
  methods: {
    ...mapActions("employees", ["fetchRoles"]),
    ...mapActions("departments", ["fetchDepartments"]),
    assignPermissions(perm) {
      this.permissions = perm;
    }
  },
  created() {
    this.fetchRoles();
    this.fetchDepartments();
  }
};
</script>
