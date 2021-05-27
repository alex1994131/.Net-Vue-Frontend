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
              <v-text-field
                v-model="altername"
                label="الإسم"
                counter="50"
                :rules="[required('المجموعة'), minLength('المجموعة',3) , maxLength('المجموعة', 50)]"
              />
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
                      <v-icon  light>mdi-plus</v-icon>
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
                      <th class="text-right">الإسم</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, i) in alternames" :key="item.name">
                      <td>{{ item.name }}</td>
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
import { mapActions, mapGetters } from "vuex";
export default {
    props : {
    alternames :{
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
      altername:"",
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
    ...mapGetters("apt", ["getAptAlterName"])
  },

  // get the actions from the store
  methods: {
    ...mapActions("apt", ["AddAlternativeName", "removeAlternativeName"]),
    sendData() {
      let found = this.alternames.some(({name}) => name === this.altername);

      if (found) {
        return this.statAlert(
          true,
          "( " + this.altername.name + " )" + "تم إضافته مسبقا  ",
          "error"
        );
      } else {
        this.alternames.push({ name :  this.altername });
        this.altername ="";
      }
    },

    close(index) {
      this.alternames.splice(index,1)
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
