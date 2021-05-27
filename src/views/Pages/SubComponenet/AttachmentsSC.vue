<template>
  <v-row justify="center">
    <v-col cols="12" md="11">
      <v-card-title>
        <v-col>
          <div id="file">
          <file-pond
            name="test"
            ref="pond"
            label-idle="إسحب اللف هنا أو  <span class='filepond--label-action'>تصفح </span>"
            allow-multiple="true"
            allowReplace="true"
            @input="saveAttachment"
            fileValidateTypeDetectType
            v-bind:files="myFiles"
            v-on:init="handleFilePondInit"
            class="primary"
        />
      </div>
        </v-col>
      </v-card-title>
    </v-col>
  </v-row>
</template>

<script>
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileEncode from "filepond-plugin-file-encode";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileEncode
);

export default {
  name: "app",
  components: {
    FilePond
  },
  data() {
    return {
      myFiles : [],
    }
  },
  methods: {
    handleFilePondInit: function() {
      this.$refs.pond.getFiles();
    },
    saveAttachment() {
    let isLoading = this.$refs.pond.getFiles().every(x=> x.status == 2);
      if (isLoading){
      let myFiles = this.$refs.pond.getFiles();
      myFiles = myFiles.map(file =>{
          let jsonFile = { attachment : { title : file.filename ,
                            extension : file.fileExtension,
                            filename : file.filenameWithoutExtension,
                            type : file.fileType,
                              content : file.getFileEncodeBase64String()
                          } }
          return jsonFile;
        });
        this.$emit('input',myFiles)
      }
      
    },
    handleFilesUpload() {
      this.myFiles = this.$refs.myFiles.myFiles;
    }
  }
};
</script>

<style>
#file {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.filepond--item {
  width: 11;
  height: 3em;
}

.scroll {
  overflow-y: scroll;
  overflow-x: hidden;
}
</style>

