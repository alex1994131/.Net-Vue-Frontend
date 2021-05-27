<template>
  <div>
    <input
      ref="excel-upload-input"
      class="excel-upload-input"
      type="file"
      accept=".xlsx, .xls"
      @change="handleClick"
    />

    <div
      class="drop"
      @drop="handleDrop"
      @dragover="handleDragover"
      @dragenter="handleDragover"
    >
      إسحب الملف هنا
      <v-btn :loading="loading" type="primary" @click="handleUpload">
        تصفح
      </v-btn>
      <a style="margin-right: 20px" @click="download" download
        >تنزيل ملف التعرفة</a
      >
      <!-- <v-img src="./info_IP_date.PNG"></v-img> -->
    </div>
    <div class="d-flex flex-column justify-space-between align-center">
      <v-img max-width="1100" src="./info_IP_date.png"></v-img>
    </div>
  </div>
</template>

<script>
import XLSX from "xlsx";
import axios from "axios";
import { mapState, mapMutations, mapActions, mapGetters } from "vuex";
import moment from "moment";

export default {
  props: {
    beforeUpload: Function, // eslint-disable-
    onSuccess: Function, // eslint-disable-line
  },

  data() {
    return {
      loading: false,
      excelData: {
        header: null,
        results: null,
      },
      items: [
        {
          "document Id": "1111",
          "Event Begin Timestamp": "DD-MM-YYYY hh:mm:ss",
          "Event End Timestamp": "DD-MM-YYYY hh:mm:ss",
          "Source IP": "11.123.22.32",
          "Dist IP": "33.124.231.12",
          "From Port": "11",
          "To Port": "11",
          "To IP": "22",
          "Source Country": "uae",
          "Destination Country": "OM",
          "Data Length": "255",
          "Signature Title": "title",
          "Signature Content": "signature title",
          "Signature Classification": "signature classification",
          "Total Hits": "25",
          "Intrusion Set": "set",
        },
      ],
    };
  },
  computed: {},
  methods: {
    download: function () {
      const data = XLSX.utils.json_to_sheet(this.items);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, data, "data");
      XLSX.writeFile(wb, "نموذج ملف التعرفة.xlsx");
    },
    generateData({ header, results }) {
      this.excelData.header = header;
      this.excelData.results = results;
      this.onSuccess && this.onSuccess(this.excelData);
    },
    handleDrop(e) {
      e.stopPropagation();
      e.preventDefault();
      if (this.loading) return;
      const files = e.dataTransfer.files;
      if (files.length !== 1) {
        this.$message.error("Only support uploading one file!");
        return;
      }
      const rawFile = files[0]; // only use files[0]
      if (!this.isExcel(rawFile)) {
        this.$message.error(
          "Only supports upload .xlsx, .xls, .csv suffix files"
        );
        return false;
      }
      this.upload(rawFile);
      e.stopPropagation();
      e.preventDefault();
    },
    handleDragover(e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    },
    handleUpload() {
      this.$refs["excel-upload-input"].click();
    },
    handleClick(e) {
      const files = e.target.files;
      const rawFile = files[0]; // only use files[0]
      if (!rawFile) return;
      this.upload(rawFile);
    },
    upload(rawFile) {
      this.$refs["excel-upload-input"].value = null; // fix can't select the same excel
      if (!this.beforeUpload) {
        this.readerData(rawFile);
        return;
      }
      const before = this.beforeUpload(rawFile);
      if (before) {
        this.readerData(rawFile);
      }
    },
    readerData(rawFile) {
      this.loading = true;
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = e.target.result;
          const workbook = XLSX.read(data, { type: "array" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const header = this.getHeaderRow(worksheet);
          const results = XLSX.utils.sheet_to_json(worksheet);
          this.generateData({ header, results });
          this.loading = false;
          resolve();
        };
        reader.readAsArrayBuffer(rawFile);
      });
    },
    getHeaderRow(sheet) {
      const headers = [];
      const range = XLSX.utils.decode_range(sheet["!ref"]);
      let C;
      const R = range.s.r;
      /* start in the first row */
      for (C = range.s.c; C <= range.e.c; ++C) {
        /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })];
        /* find the cell in the first row */
        let hdr = "UNKNOWN " + C; // <-- replace with your desired default
        if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
        headers.push(hdr);
      }
      return headers;
    },
    isExcel(file) {
      return /\.(xlsx|xls|csv)$/.test(file.name);
    },

    formatDate(date) {
      return moment(date).format("DD-MM-YYYY hh:mm:ss A");
    },
  },
};
</script>

<style scoped>
.excel-upload-input {
  display: none;
  z-index: -9999;
}
.drop {
  border: 2px dashed #bbb;
  width: 600px;
  height: 60px;
  line-height: 50px;
  margin: 0 auto;
  font-size: 24px;
  border-radius: 5px;
  text-align: center;
  color: #bbb;
  position: relative;
  margin-bottom: 10px;
}
.file {
}
</style>