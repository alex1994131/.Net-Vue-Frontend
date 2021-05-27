<template>
  <v-container id="user-22222" fluid tag="section">
    <!-- Sector Management & Form  -->
    <v-row justify="center">
      <v-col cols="12" md="11" class="text-left">
        <v-btn color="primary" @click="RoleNameForm = true" outlined>
          <h3>إضافة صلاحيات المستخدمين</h3>
        </v-btn>
        <v-btn color="primary" style="margin-right:10px" @click="saveClaims" outlined>
          <h3>حفظ</h3>
        </v-btn>
      </v-col>
    </v-row>
    <RoleNameForm :status="RoleNameForm" @close="RoleNameForm = false"/>
    <!-- Organization  -->
    <v-row>
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
            <tr>
              <td style="background-color:#F6F6F6;">
                <v-subheader>
                  <h1>إدارة الصلاحيات</h1>
                </v-subheader>
              </td>
            </tr>
            <tr>
              <td>
                <v-card>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="3">
                        <v-list shaped two-line>
                          <v-subheader><h2>نوع صلاحية المستخدمين</h2></v-subheader>
                          <v-list-item-group v-model="role" color="primary">
                            <v-list-item v-for="role in roles" :key="role.id">
                              <v-list-item-icon>
                                <v-icon :color="true? 'primary dark' : 'grey lighten-1'">mdi-account-alert</v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title v-text="role.name"></v-list-item-title>
                                <v-list-item-subtitle v-text="role.section.name"></v-list-item-subtitle>
                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-col>
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-col cols="12" md="4">
                        <v-list shaped>
                          <v-subheader><h2>الصفحات</h2></v-subheader>
                          <v-list-item-group v-model="page" color="green lighten-1">
                            <v-list-item v-for="(page,j) in getPages" :key="page.name">
                              <v-list-item-icon>
                                <v-icon
                                  :color="roles[role].claims[j].values.length > 0 ? 'primary dark' : 'grey lighten-1'">
                                  {{ page.icon }}
                                </v-icon>
                              </v-list-item-icon>
                              <v-list-item-content>
                                <v-list-item-title v-text="page.label"></v-list-item-title>

                              </v-list-item-content>
                            </v-list-item>
                          </v-list-item-group>
                        </v-list>
                      </v-col>
                      <v-divider class="mx-4" vertical></v-divider>
                      <v-col cols="12" md="4">
                        <v-list shaped two-line>
                          <v-subheader><h2>الصلاحيات</h2></v-subheader>
                          <v-list-item-group v-model="roles[role].claims[page].values" multiple>
                            <template v-for="(item, i) in getPages[page].pers">
                              <v-divider v-if="!item" :key="`divider-${i}`"></v-divider>

                              <v-list-item
                                v-else
                                :key="`item-${i}`"
                                :value="item.name"
                                active-class="green lighten-5"

                              >
                                <template v-slot:default="{ active }">
                                  <v-list-item-content>
                                    <v-list-item-title v-text="item.label"></v-list-item-title>
                                    <v-list-item-subtitle v-text="item.desc"></v-list-item-subtitle>
                                  </v-list-item-content>

                                  <v-list-item-action>
                                    <v-checkbox
                                      :input-value="active"
                                      color="primary lighten-1"
                                    ></v-checkbox>
                                  </v-list-item-action>
                                </template>
                              </v-list-item>
                            </template>
                          </v-list-item-group>
                        </v-list>
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
    </v-row>
    <responseDialog
      :status="saveDialog"
      :success="isSuccessSave"
      :message="responseMessage"
      @close="refresh"/>

    <LoginStatus :page="name" @input="assignPermissions"/>
  </v-container>
</template>

<script>
import RoleNameForm from "../../Dialogs/DAddRoleName";
import {PERMISSION} from "../../../../helpers/constants";
import {mapActions, mapGetters} from "vuex";

export default {
  components: {
    RoleNameForm,
    LoginStatus: () => import('../../SubComponenet/AuthorizationChacker'),
    responseDialog: () => import('../../Dialogs/DRespoonseDialog'),
  },
  data: () => ({
    name: "MANAGE_ROLES",
    permissions: [],
    saveDialog: false,
    responseMessage: '',
    isSuccessSave: false,
    role: 0,
    page: 0,
    RoleNameForm: false,
    roles: [],
    alert: {
      status: false,
      color: null,
      txt: null,
      timeout: 2000,
    },
  }),
  computed: {
    ...mapGetters("employees", ["getRoles", "getPages"]),
  },
  watch: {
    getRoles: function (newState) {
      this.roles = newState.map((role) => ({
        id: role.id,
        name: role.name,
        section: role.section,
        claims: this.getPages.map((p) => {
          let cl = role.claims.find(c => c.type === p.name);
          let array = cl === undefined ? [] : cl.values;

          return {
            type: p.name,
            values: array
          }
        }),
      }));
    },
  },
  methods: {
    ...mapActions("employees", ["fetchRoles", "setRolesClaims"]),
    ...mapActions("departments", ["fetchDepartments"]),
    saveClaims() {
      this.roles.forEach((role) => {
        role.claims = role.claims.filter(c => c.values.length > 0);
        role.claims.forEach(
          (claim) => {
            claim.values = claim.values;
          }
        );
      });
      this.setRolesClaims(this.roles)
        .then((resp) => {
          this.isSuccessSave = true;
          this.responseMessage = resp;
          this.saveDialog = true;
        })
        .catch((err) => {
          this.isSuccessSave = false;
          this.responseMessage = err.message;
          this.saveDialog = true;
        });
    },
    assignPermissions(perm) {
      this.permissions = perm;
    },
    refresh(status) {
      if (status) {
        this.$router.push({name: 'لوحة التحكم'})
      }
    }
  },
  created() {
    this.fetchRoles();
    this.fetchDepartments();
  },
};
</script>
