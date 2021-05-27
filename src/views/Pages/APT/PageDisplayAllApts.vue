<template>
  <v-container id="user-22222" fluid tag="section">
    <v-row justify="center">
      <v-col cols="12" md="12">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr>
                <td style="background-color: #f6f6f6">
                  <v-subheader>
                    <h1>مجموعات التهديد المستمرة</h1>
                  </v-subheader>
                </td>
              </tr>
              <tr>
                <td>
                  <v-card class="mx-auto">
                    <v-card-actions v-show="canAdd" style="float: left">
                      <v-btn
                        class="ma-3"
                        color="primary"
                        @click="moveToNewApt"
                        small
                        label
                        outlined
                      >
                        <h3>إضافة Apt</h3>
                        <v-icon light>mdi-plus</v-icon>
                      </v-btn>
                    </v-card-actions>
                    <v-col cols="12" md="4">
                      <v-text-field
                        v-show="newSearch"
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="بحث .."
                        single-line
                      ></v-text-field>
                    </v-col>
                    <v-card-text>
                      <v-data-table
                      dense
                        :loading="getLoading"
                        :headers="headers"
                        :items="allApts"
                        class="LightGrey"
                        :search="search"
                        :sort-by="['id']"
                        :sort-desc="[true]"
                      >
                        <template #item.name="{ item }">
                          <p
                            v-on:click="viewDetails(item)"
                            style="color: black"
                          >
                            {{ item.name }}
                          </p>
                        </template>

                        <template #item.originCountries="{ item }">
                          <v-row no-gutters>
                            <div v-for="(name, i) in item.origin" :key="i">
                              <v-chip class="ma-1" label>
                                <h3>{{ name.country.countryName }}</h3>
                              </v-chip>
                            </div>
                          </v-row>
                        </template>

                        <template #item.targetedCountries="{ item }">
                          <v-row no-gutters>
                            <div v-for="(name, i) in item.targeted" :key="i">
                              <v-chip class="ma-1" color="#e0ebeb" label>
                                <h3>{{ name.country.countryName }}</h3>
                              </v-chip>
                            </div>
                          </v-row>
                        </template>

                        <template #item.Actions="{ item }">
                          <v-icon
                            medium
                            v-if="canShow"
                            @click="viewDetails(item)"
                            class="mr-2"
                            >mdi-eye</v-icon
                          >
                        </template>
                      </v-data-table>
                    </v-card-text>
                  </v-card>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>
    </v-row>
    <LoginStatus :page="name" @input="assignPermissions" />
  </v-container>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import { PERMISSION } from "../../../helpers/constants";
export default {
  components: {
    LoginStatus: () => import("../SubComponenet/AuthorizationChacker"),
  },
  data() {
    return {
      name: "APTS",
      permissions: [],
      search: "",
      headers: [
        {
          text: "إسم االمجموعة",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "دول المنشأ", value: "originCountries" },
        { text: "الدول المستهدفة", value: "targetedCountries" },
        { text: "الإجراء", value: "Actions" },
      ],
    };
  },
  watch: {
    searchKey: function () {
      this.$store.dispatch("apt/setKey", this.searchKey);
    },
  },
  computed: {
    ...mapGetters("apt", ["allApts"]),
    ...mapGetters("ui",["getLoading"]),
    canAdd() {
      let heCan = this.permissions.includes(PERMISSION.APT.ADD.name);
      return heCan;
    },
    newSearch() {
      let heCan = this.permissions.includes(PERMISSION.APT.SEARCH.name);
      return heCan;
    },

    canShow() {
      let heCan = this.permissions.includes(PERMISSION.APT.VIEW.name);
      return heCan;
    },
  },
  mounted() {},
  methods: {
    ...mapMutations("apt", ["setEditApt"]),
    ...mapActions("apt", ["fetchApts", "setKey"]),
    ...mapActions("employees", ["checkAuthorizationChacker"]),
    assignPermissions(perm) {
      this.permissions = perm;
    },
    handleClick(value) {},
    viewDetails(item) {
      this.$store.dispatch("apt/selectedApt", item),
        this.$router.push("DisplayAPT");
    },
    moveToNewApt() {
      this.$router.push("AddApt");
    },
  },
  created() {
    this.checkAuthorizationChacker();
    this.fetchApts();
  },
};
</script>
