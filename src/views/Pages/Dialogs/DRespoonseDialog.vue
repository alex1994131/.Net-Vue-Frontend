<template>
  <v-dialog v-model="status" persistent max-width="300px">
    <v-card>
      <v-icon v-if="!success" x-large style="width:50%; margin-top:30px; margin-right:80px " color="red">mdi-cancel
      </v-icon>
      <v-img v-if="success" src="./success.gif" style="width:50%; margin-right:80px "></v-img>
      <h3 v-if="!success" style="text-align: center;">حدثت مشكلة</h3>
      <h3 v-if="success" style="text-align: center;">{{ message }}</h3>

      <v-btn v-if="!success" text color="error" v-on:click="isHidden = !isHidden">تفاصيل</v-btn>
      <v-container><p v-if="!isHidden" style="text-align: left;"></p></v-container>
      <v-btn color="primary" text @click="closeForm">تم</v-btn>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions} from "vuex";

export default {

  props: {
    status: {
      type: Boolean,
      required: true,
    },
    success: {
      type: Boolean,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    isHidden: true
  }),
  methods: {
    ...mapActions("ui", ["fetchCount"]),
    closeForm() {
      this.fetchCount()
      this.$emit("close", this.success);
    },
  },
  async created() {

  },
};
</script>
