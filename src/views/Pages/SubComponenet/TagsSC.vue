<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="10">
        <v-text-field
        outlined
        dense
          @keyup.enter="addTag"
          v-model="tagName"
          placeholder="Tags"
        ></v-text-field>
        
      </v-col>
    </v-row>
      <v-row>
      <v-col  cols="12" md="12">
        <v-chip
          color="gray"
          v-for="(tag, i) in tagList"
          :key="`sn${i}`"
          close
          @click:close="deleteTag(i)"
          ><h3>{{ tag }}</h3></v-chip
        ></v-col
      ><p style="color: red; font-size: 12px">
          *أضف رقم الوثيقة إذا كان التنبيه مرتبط بنظام المراسيل
        </p>
    </v-row>
  </v-container>
</template>

<script>
export default {

  data: () => ({
    tagList: [],
    tagName: "",
  }),
  methods: {
    addTag() {
      if (
        this.tagName === "" ||
        this.tagList.indexOf(this.tagName.trim()) !== -1
      ) {
        this.tagName = "";
        return;
      }
      this.tagList.push(this.tagName.trim());
      this.$emit("handler", this.tagList);
      this.tagName = "";
    },
    deleteTag(i) {
      this.tagList.splice(i, 1);
      this.$emit("handler", this.tagList);
    },
  },
};
</script>
<style >
.ql-editor {
  height: 56vh;
}
</style>
