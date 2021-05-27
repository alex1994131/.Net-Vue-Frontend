<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-container id="user-22222" fluid tag="section">
        <v-card>
          <v-container>
            <template>
              <v-row justify="center">
                <v-col cols="12" md="12">
                  <v-subheader class="ma-2" style="background-color:#F6F6F6;">
                    <h3>أسم المجموعة: </h3>
                    <v-chip class="ma-1" label><h1>{{ selectedApt.name }}</h1></v-chip>
                  </v-subheader>
                </v-col>
                <v-col cols="12" md="12">
                  <v-card class="ma-0">
                    <v-container>
                      <v-simple-table>
                        <template v-slot:default>
                          <tbody>
                          <tr>
                            <td>التاريخ:</td>
                            <td style="font-weight: 900;">
                              <v-chip class="ma-1" label><h3>{{ selectedApt.createdDate }}</h3></v-chip>
                            </td>
                            <td>أسماء اخرى:</td>
                            <td style="font-weight: 900;">
                              <v-row no-gutters>
                                <div v-for="(name, i) in selectedApt.alternativeNames" :key="i">
                                  <v-chip class="ma-1" color="#e0ebeb" label><h3>{{ name.name }}</h3></v-chip>
                                </div>
                              </v-row>
                            </td>
                          </tr>
                          <tr>
                            <td>دول المنشأ:</td>
                            <td>
                              <v-row no-gutters>
                                <div v-for="(name, i) in selectedApt.origin" :key="i">
                                  <v-chip class="ma-1" label><h3>{{ name.country.countryName }}</h3></v-chip>
                                </div>
                              </v-row>
                            </td>

                            <td>الدول المستهدفة:</td>
                            <td>
                              <v-row no-gutters>
                                <div v-for="(name, i) in selectedApt.targeted" :key="i">
                                  <v-chip class="ma-1" color="#e0ebeb" label><h3>{{ name.country.countryName }}</h3>
                                  </v-chip>
                                </div>
                              </v-row>
                            </td>
                          </tr>
                          <tr>
                            <td>الشركات المتعلقة:</td>
                            <td>
                              <v-row no-gutters>
                                <div v-for="(name, i) in selectedApt.companyNames" :key="i">
                                  <v-chip class="ma-1" label><h3>{{ name.name }}</h3></v-chip>
                                </div>
                              </v-row>
                            </td>

                            <td>القطاعات المستهدفة:</td>
                            <td>
                              <v-row no-gutters>
                                <div v-for="(name, i) in selectedApt.targetSectorNames" :key="i">
                                  <v-chip class="ma-1" color="#e0ebeb" label><h3>{{ name.sector.name }}</h3></v-chip>
                                </div>
                              </v-row>
                            </td>
                          </tr>
                          <tr>
                            <td>الأدوات المستخدمة:</td>
                            <td>
                              <v-row no-gutters>
                                <div v-for="(name, i) in selectedApt.toolsNames" :key="i">
                                  <v-chip class="ma-1" label><h3>{{ name.name }}</h3></v-chip>
                                </div>
                              </v-row>
                            </td>

                            <td>المرفقات:</td>
                            <td>
                              <v-chip class="ma-1" label>
                                <h3 v-for="(item, i) in selectedApt.attachments" :key="i">
                                  <a :href=[download(item.attachment)]
                                     :download=[item.attachment.title]>{{ item.attachment.title + "," }}</a>
                                </h3>
                              </v-chip>
                            </td>
                          </tr>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </v-container>
                  </v-card>
                </v-col>
                <v-col cols="12" md="12">
                  <v-tabs background-color="#43505D" style="border-radius:5px;">
                    <v-tab>
                      <h4 style="color:white; ">الملخص</h4>
                    </v-tab>
                    <v-tab-item>
                      <v-card>

                        <v-container>

                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                              <tr>
                                <td>
                                  <v-flex>

                                    <div v-if="selectedApt.contents">

                                    </div>

                                    <div v-else>
                                      <div class="subheading">
                                        <p>لا يوجد ملخص</p>
                                      </div>
                                    </div>
                                    <v-col cols="12" md="12">
                                      <ViewAptComments/>
                                    </v-col>

                                  </v-flex>
                                </td>
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-container>
                      </v-card>
                    </v-tab-item>

                    <v-tab>
                      <h4 style="color:white; ">البصمة</h4>
                    </v-tab>
                    <v-tab-item>
                      <v-card>
                        <v-container>
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                              <tr>
                                <td>
                                  <v-flex>
                                    <v-icon color="primary">mdi-account</v-icon>
                                    {{ selectedApt.createdBy.fullName }}
                                    <div v-if="selectedApt.threatSignatures">
                                      <v-timeline dense>

                                        <v-timeline-item
                                          v-for="index in selectedApt.threatSignatures"
                                          :key="index.name"
                                          color="red lighten-2"
                                          icon="mdi-text-box-plus-outline"
                                          small
                                        >
                                          <v-card style="width:900px">
                                            <!-- <p style="color:selver lighten-2;">تاريخ :</p> -->
                                            <v-card-text>
                                              <div class="subheading">
                                                <p v-html="index.name"></p>
                                              </div>
                                              <div class="content-view" ref="contentContainer"></div>
                                            </v-card-text>
                                          </v-card>
                                        </v-timeline-item>
                                      </v-timeline>
                                    </div>

                                    <div v-else>
                                      <div class="subheading">
                                        <p>لا يوجد بصمة</p>
                                      </div>
                                    </div>
                                    <v-col cols="12" md="12">
                                      <!-- <ViewAptSignature /> -->
                                    </v-col>
                                  </v-flex>
                                </td>
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-container>
                      </v-card>
                    </v-tab-item>
                    <v-tab>
                      <h4 style="color:white; ">منهجية الإستهداف</h4>
                    </v-tab>
                    <v-tab-item>
                      <v-card>
                        <v-container>
                          <v-simple-table>
                            <template v-slot:default>
                              <tbody>
                              <tr>
                                <td>
                                  <v-flex>
                                    <v-icon color="primary">mdi-account</v-icon>
                                    {{ selectedApt.createdBy.fullName }}
                                    <div v-if="selectedApt.attackStratigies">
                                      <v-timeline dense>
                                        <v-timeline-item
                                          v-for="index in selectedApt.attackStratigies"
                                          :key="index.description"
                                          color="red lighten-2"
                                          icon="mdi-text-box-plus-outline"
                                          small
                                        >
                                          <v-card style="width:900px">
                                            <!-- <p style="color:selver lighten-2;">تاريخ :</p> -->
                                            <v-card-text>
                                              <div class="subheading">
                                                <p v-html="index.description"></p>
                                              </div>
                                              <div class="content-view" ref="contentContainer"></div>
                                            </v-card-text>
                                          </v-card>
                                        </v-timeline-item>
                                      </v-timeline>
                                    </div>

                                    <div v-else>
                                      <div class="subheading">
                                        <p>لا يوجد منهجية إستهداف</p>
                                      </div>
                                    </div>
                                    <v-col cols="12" md="12">
                                      <!-- <ViewAptAttackStrategies /> -->
                                    </v-col>
                                  </v-flex>
                                </td>
                              </tr>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </v-container>
                      </v-card>
                    </v-tab-item>


                  </v-tabs>
                </v-col>

                <v-col cols="12" md="3">
                  <v-btn color class="mr-0" @click="close">إغلاق</v-btn>
                </v-col>
              </v-row>
            </template>
          </v-container>
        </v-card>
      </v-container>
    </v-col>
    <LoginStatus :page="name" :operation="getOperations" @input="assignPermissions"/>
  </v-row>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {PERMISSION} from '../../../helpers/constants'
import ViewAptComments from "./ViewAptComments";
import ViewAptSignature from "./ViewAptSignature";
import ViewAptAttackStrategies from "./ViewAptAttackStrategies";

export default {
  components: {
    ViewAptComments,
    ViewAptSignature,
    ViewAptAttackStrategies,
    LoginStatus: () => import('../SubComponenet/AuthorizationChacker')
  },
  data() {
    return {
      name: "APTS",
      permissions: [],
    };
  },
  computed: {
    ...mapState("apt", ["selectedApt"]),
    getOperations() {
      return PERMISSION.APT.VIEW.name
    }
  },
  methods: {
    close() {
      this.$router.push("SearchAPT");
    },
    assignPermissions() {

    },
    download(file) {
      return "data:" + file.type + ";base64," + file.content;
    }
  }
};
</script>
