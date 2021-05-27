<template>
  <v-container id="user-22222" fluid tag="section">
    <v-row justify="center">
    </v-row>

    <v-row>
      <v-col cols="12" md="12">
        <v-row justify="center">
          <v-col cols="12" md="12">
            <v-card-title >
              <v-row>
                
                <v-row justify="center">
                  <v-col cols="12" md="11.1">
                    <base-subheading style=" text-align-last: right" ></base-subheading>
                    <div>
                      <quill-editor
                        v-model="Content"
                        ref="myQuillEditor"
                        :options="editorOption"
                      ></quill-editor>
                    </div>
                  </v-col>
                </v-row>

                <v-row>
                  <v-col cols="12" md="2" class="text-center">
                  <v-btn class="ma-2" outlined color="primary" @click="AddForm">
                    <v-icon left>mdi-plus-circle-outline</v-icon>
                    <h4>إضافة</h4>
                  </v-btn>
                </v-col>
                </v-row>
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
  components: {
    quillEditor
  },
  props : {
    contents : {
      type : Array, 
      required : true
    }
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      menu2: false,
       editorOption: {
        debug: "ínfo",
        placeholder: "أكتب هنا ...",
        readOnly: true,
        theme: "snow"
      },
      Content : "",
      mounting: false
    };

  },
  computed: {
    ...mapGetters("apt", ["getGroup"])
  },
  methods: {
    ...mapActions("apt", ["AddContent"]),
    AddForm() {
     this.contents.push({contentString : this.Content })
    },

  }

};
</script>
<style>
.ql-editor {
  height: 50vh;
}
</style>