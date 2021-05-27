<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-row justify="center">
      <v-col cols="12" md="11">
        <v-card-title color="primary lighten-1" class="px-5 py-1">

          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="contenant"
                :items="getContenants"
                :rules="[v => !!v || 'Contenant is required']"
                item-text="label"
                item-value="code"
                label="القارة"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="6">
              <v-select
                v-model="country"
                :items="getCountries"
                :rules="[v => !!v || 'Country is required']"
                item-text="countryName"
                item-value="id"
                label="الدولة"
                required
              ></v-select>
            </v-col>

            <v-col cols="12" md="2" class="text-center">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-card-actions>

                    <v-btn fab x-small color="primary lighten-1" @click="sendData" :disabled="!valid" v-on="on" >
                      <v-icon light>mdi-plus</v-icon>
                    </v-btn>
                    
                  </v-card-actions>
                </template>
                <span>إضافة</span>
             </v-tooltip>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12">
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-right">القارة</th>
                      <th class="text-right">الدولة</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in countriesList" :key="item.id">
                      <td>{{ item.country.contenant }}</td>
                      <td>{{ item.country.countryName }}</td>
                      <td>
                        <v-icon small @click="close(i)">mdi-delete</v-icon>
                      </td>
                    </tr>
                  </tbody>
                </template>
              </v-simple-table>
            </v-col>
          </v-row>
        </v-card-title>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
    props : {
    countriesList :{
      type : Array,
      required : true
    },
  },
  components: {},
  data() {
    return {
      valid: true,
      select: null,
      contenant: "",
      country : 0,
       alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 3000
      },
      myheaders: [
        { text: "القارة", value: "contenant" },
        { text: "الدولة", value: "countryName" },
        { text: "", value: "Actions" }
      ]
    };

  },

  computed: {
    ...mapGetters("country", ["getCountries", "getContenants"]),
    ...mapGetters("apt", ["getAptCountries"])
  },
watch: {
    contenant: function() {
      this.changeContenant(this.contenant);
    },
    id: function() {
      this.country = this.getCountries.find(con => con.id == this.id);
    }
  },
  methods: {
    ...mapActions("apt", ["removeCountry", "AddCountry"]),
    ...mapActions("country", ["changeContenant"]),
    close(index) {
      this.countriesList.splice(index,1)
    },
      

    sendData() {
       let found = this.countriesList.some(con => con.id == this.country)

      if (found) {
        return this.statAlert(
          true,
          "( " + this.country + " )" + "تم إضافته مسبقا  ",
          "error"
        );
      } else {
        this.countriesList.push({ country : Object.assign({}, this.getCountries.find(con => con.id == this.country))});
        this.country = 0;
        this.contenant = 0;
      }
    },
      statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    }
  },
  mounted() {}
};
</script>
