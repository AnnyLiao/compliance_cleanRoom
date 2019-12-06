<template>
  <div>
    <!-- <b-row>
      <b-col sm="3">
        <h5>標註外部資料集</h5>
        <label for="external-dataset">將預一起做分析之外部資料集</label>
        <b-form-input
          id="external-dataset"
          v-model="model.EdataSet"
          placeholder="請輸入外部資料集之相關名稱"
          aria-describedby="input-lazy-help"
          lazy-formatter
        ></b-form-input>
      </b-col>
    </b-row>
    <br>-->
    <h5>上傳資料集</h5>
    <Widget>
      <div class="drop">
        <label for="file-upload" class="custom-file-upload" id="upload_label" ref="upload_label">
          <img :src="imageSrc" v-show="showProgress" />
          <i class="glyphicon glyphicon-upload" v-show="showIcon"></i>
          <p ref="fileName" v-show="showProgress"></p>
          <p ref="uploadText">檔案上傳</p>
        </label>

        <input type="file" id="file-upload" ref="file" @change="submitFile()" />
      </div>
      <b-progress :value="uploadPercentage" show-progress animated v-show="showProgress"></b-progress>
    </Widget>
    <router-link :to="`/app/`+ currentSection +`/conversion`" class="changePage">Step 2. 自選去識別工具 <i class="fa fa-arrow-right"></i></router-link>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
// import { fileUpload } from "@/api.js";
import { request } from "http";

export default {
  name: "fileUpload",
  components: {
    Widget
  },
  data() {
    return {
      file: "",
      uploadPercentage: 0,
      showProgress: false,
      showIcon: true,
      imageSrc: require("../../assets/csv.png"),
      model: {
        fileDir: "",
        // EdataSet: ""
      }
    };
  },
  computed: {
    currentSection: function() {
      return (this.$route.path).split("/")[2];
    }
  },
  methods: {
    submitFile() {
      this.showProgress = true;
      this.showIcon = false;

      this.file = this.$refs.file.files[0];
      this.$refs.fileName.innerText = this.file.name;
      this.$refs.uploadText.innerText = "上傳中．．．";
      console.log(">>>> 1st element in files array >>>> ", this.file.name);
      let formData = new FormData();
      formData.append("file", this.file);
      console.log(">> formData >> ", formData);

      // You should have a server side REST API
      axios
        .post(
          "http://localhost:8800/FintechAnonymization/api/file/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data; charset=UTF-8”;"
            },
            onUploadProgress: function(progressEvent) {
              this.uploadPercentage = parseInt(
                Math.round((progressEvent.loaded * 100) / progressEvent.total)
              );
            }.bind(this)
          }
        )
        .then(response => {
          this.imageSrc = require("../../assets/csv_done.png");
          this.$refs.uploadText.innerText = "上傳完成";
          this.model.fileDir = response.data.fileDir;
          this.model.zipDir = response.data.zipDir;
          console.log("SUCCESS!!");
          localStorage.setItem("fileDir", response.data.fileDir);
          localStorage.setItem("zipDir", response.data.zipDir);
          
        })
        .catch(error => {
          console.log(error);
        });

      // fileUpload(formData, {
      //   onUploadProgress(a) {
      //     console.log(a);
      //   }
      // })
      //   .then(response => {
      //     this.imageSrc = require("../../assets/csv_done.png");
      //     this.$refs.uploadText.innerText = "上傳完成";
      //     this.model.fileDir = response.data;
      //     console.log("SUCCESS!!");
      //   })
      //   .catch(error => {
      //     console.log(error);
      //   });
    },
    validate() {
      return new Promise((resolve, reject) => {
        // this.$refs.form.validate(valid => {
        //   this.$emit("on-validate", valid, this.model);
        //   resolve(valid);
        // });

        if (this.model.fileDir !== "") {
          //this.model.EdataSet !== "" &&
          this.$emit("on-validate", true, this.model);
          resolve(true);
        } else {
          this.$emit("on-validate", false, this.model);
          resolve(false);
        }
      });
    }
  },
  mounted() {
    
  }
};
</script>
<style src="./FileUpload.scss" lang="scss" />