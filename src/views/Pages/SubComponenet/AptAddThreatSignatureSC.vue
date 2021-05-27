<template>
  <v-container id="user-22222" fluid tag="section">
    <v-row>
      <v-col cols="12" md="12">
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card-title>
              <v-row>
                <v-row justify="center">
                  <v-col cols="12" md="12">
                    <base-subheading style=" text-align-last: right" ></base-subheading>
                    <div>
                      <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      ></quill-editor>
                    </div>
                  </v-col>
                </v-row>

                <v-col cols="12" md="2" class="text-center">
                  <v-btn class="ma-2" outlined color="primary" @click="sendData">
                    <v-icon left>mdi-plus-circle-outline</v-icon>
                    <h4>إضافة</h4>
                  </v-btn>
                </v-col>

              </v-row>
            </v-card-title>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import "quill/dist/quill.snow.css";
import { quillEditor } from "vue-quill-editor";
import { mapActions, mapGetters } from "vuex";

export default {
          props : {
    threatSignature :{
      type : Array,
      required : true
    },
          },
  components: {
    quillEditor
  },
  data() {
    return {
      
      content: "",

      editorOption: {
        debug: "ínfo",
        placeholder: "اكنب هنا...",
        readOnly: true,
        theme: "snow"
      },
          mounting: false
    };

  },
  computed: {
    ...mapGetters("apt", ["getGroup", "GetContent"]),
    Country() {
      return [
        { code: "1", label: "OM" },
        { code: "2", label: "UK" },
        { code: "3", label: "USA" }
      ];
    }
  },
  methods: {
        sendData() {
     // let found = this.threatSignature.some(({name}) => name == this.content);

      // if (found) {
      //   return this.statAlert(
      //     true,
      //     "( " + this.content.name + " )" + "تم إضافته مسبقا  ",
      //     "error"
      //   );
      // } else {
       this.threatSignature.push({ name :  this.content });
       this.content= "";
     // }
    },
    // get the actions from the store
    ...mapActions("apt", ["AddSignature"]),
    AddForm() {
      this.AddSignature(this.Content);
      this.Content = {};
    }
  }

  /*mounted() {
     this.mounting = true
   if(!this.content && this.GetContent){
      this.content = this.GetContent
    }
  },*/
};
</script>
<style>
.ql-editor {
  height: 50vh;
}
</style>
