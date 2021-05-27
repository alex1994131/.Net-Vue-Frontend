<template>
  <v-dialog v-model="isOpen" persistent max-width="600">
    
        <v-card class="white">
          <v-card-title>
            <span class="headline"></span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-textarea
                    rows="4"
                    counter
                    clearable
                    solo
                    autoGrow
                    label="سبب غلق التنبيه"
                    v-model="reasonString"
                    required
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn large color="blue darken-1" text @click.prevent="add">
              <span>حفظ</span>
              <v-icon>mdi-checkbox-marked-circle-outline</v-icon>
            </v-btn>
            <v-btn large color="red darken-1" text @click.prevent="close">
              <span>غلق</span>
              <v-icon>mdi-close-circle-outline</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>    
  </v-dialog>

</template>
<script>
import stringHelper from "../../../helpers/stringHelper";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import moment from "moment";
import axios from "axios";
import { PERMISSION } from '../../../helpers/constants'
import { STATUS } from "../../../helpers/ConstantStatus";

export default {
  props : {
    id : {
      type : Number,
      required : true
    },
    isOpen : {
      type : Boolean,
      required : true
    }
  },
  data() {
    return {
      name : "NOTIFICATIONS",
      reasonString : "",
    };
  },
  methods: {
    ...mapActions("incidents", ["changeIncidnet"]),
    close(){
      this.$emit('close');
    },
    add(){
      this.changeIncidnet({ reasonString : this.reasonString, changeType: STATUS.NOTIFICATION.CLOSED_NOTIFICATION, id: this.id })
        .then((resp) => {
          this.$router.push("DisplayIncidents");
        })
        .catch((err) => {});
    }
  },
  created() {
  
  },
};
</script>