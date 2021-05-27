<template>
  <v-row justify="center">
    <v-snackbar
      top
      v-model="alert.status"
      :color="alert.color"
      :timeout="alert.timeout"
    >{{ alert.txt }}</v-snackbar>
    <v-col cols="12" md="12">
      <v-form v-model="valid">
        <v-card-title color="primary lighten-1" class="px-5 py-1">
          <v-row>
            <v-col cols="12" md="10">
                <v-select
                      v-model="targetedSector"
                      :items="sectors"
                      item-text="name"
                      item-value="id"
                      label="إختر القطاع"
                    ></v-select>
            </v-col>
            <v-col cols="12" md="1">
              <v-tooltip top>
                <template v-slot:activator="{ on }">
                  <v-card-actions>
                    <v-btn
                      fab
                      x-small
                      color="primary lighten-1"
                      @click="sendData"
                      :disabled="!valid"
                      v-on="on"
                    >
                      <v-icon light>mdi-plus</v-icon>
                    </v-btn>
                  </v-card-actions>
                </template>
                <span>إضافة</span>
              </v-tooltip>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="12" style="margin-left: 200px">
              <v-simple-table dense>
                <template v-slot:default>
                  <thead>
                    <tr>
                      <th class="text-right">القطاع</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item,i) in sector" :key="item.id ">
                      <td>{{ item.sector.name }}</td>
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
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapGetters,mapState } from "vuex";
export default {
      props : {
    sector :{
      type : Array,
      required : true
    },
  },
  data() {
    return {
      valid: false,
      Id: 0,

      required(propertyType) {
        return v => (v && v.length > 0) || `ادخل اسم  ${propertyType}`;
      },
      minLength(propertyType, minLength) {
        return v =>
          (v && v.length >= minLength) ||
          `${propertyType} يجب أن تكون أكثر من ${minLength} أحرف`;
      },
      maxLength(propertyType, maxLength) {
        return v =>
          (v && v.length <= maxLength) ||
          `${propertyType} يجب أن تكون أقل من ${maxLength} أحرف`;
      },

      //alternames: [],
      targetedSector: "",
      alert: {
        status: false,
        color: null,
        txt: null,
        timeout: 3000
      },

      headers: [{ text: "الإسم", value: "name" }]
    };
  },

  computed: {
    ...mapState("organization", ["sectors"])
  },

  // get the actions from the store
  methods: {
    ...mapActions("apt", ["AddSectorName", "removeSectorName"]),
    
    sendData() {

     let found = this.sector.some(sec => sec.id == this.targetedSector)
        

      if (found) {
        return this.statAlert(
          true,
          "( " + this.targetedSector.name + " )" + "تم إضافته مسبقا  ",
          "error"
        );
      } else {
        this.sector.push( { sector : Object.assign({}, this.sectors.find(sec => sec.id == this.targetedSector))});
        this.targetedSector = 0;
      }
    },
    close(index) {
      this.sector.splice(index);
    },
    statAlert(status, txt, color) {
      const alert = this.alert;
      alert.status = status;
      alert.txt = txt;
      alert.color = color;
    }
  }
};
</script>
