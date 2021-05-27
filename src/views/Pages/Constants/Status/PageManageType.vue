<template>
  <v-container id="user-22222" fluid tag="section">
    <!-- Sector Management & Form  -->
    <v-row justify="center">
      <v-col cols="12" md="11" class="text-left">
        <v-btn color="primary" @click="sectorForm = true" outlined>
          <h3>إضافة الحالات</h3>
        </v-btn>
      </v-col>
    </v-row>
    <SectorForm :status="sectorForm" @close="sectorForm = false" />
    <!-- Organization  -->
    <v-row justify="center">
      <v-col cols="12" md="11">
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
                  <v-col cols="12" md="12">
                    <v-card>
                      <v-container>
                        <Orgs />
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
  </v-container>
</template>

<script>
import Orgs from "./PageManageStatus";
import SectorForm from "../../Dialogs/DManageStatus";
import { mapActions, mapGetters } from "vuex";

export default {
  components: {
    Orgs,
    SectorForm
  },
  data: () => ({
    sectorForm: false
  }),
  computed: {
    ...mapGetters("StatusStore", ["GetSector"])
  },
  methods: {
    ...mapActions("StatusStore", ["AddSector"])
  }
};
</script>
