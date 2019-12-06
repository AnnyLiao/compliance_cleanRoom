<template>
  <div>
    <b-row class="chooseFile_title">
      <b-col>
        <b-button class="mr-1 tableBtn" variant="secondary" size="lg" @click="next">下一步</b-button>
        <h2>
          <strong>Step1. 選擇資料集</strong>
        </h2>
        <hr />
        <h5>
          <b>請選擇其中1個資料集進行「合規去識別」處理</b>
        </h5>
      </b-col>
    </b-row>
    <!-- <b-form-group>
      <b-form-radio-group
        id="radio-slots"
        v-model="selected"
        name="data"
        plain
        @input="chooseFile"
    >-->
    <!-- Radios in this slot will appear first -->
    <!-- <template> -->
    <Widget class="radio">
      <h4>
        <!-- <b-form-radio
                value="/Users/liaoliting/WebServer/www/Fintech/jetty/resources/file/UCI_in_dataset_A.csv"
        ></b-form-radio>個人信用卡資料_20191102.csv-->
        <input
          type="radio"
          name="file"
          id="file1"
          v-model="selected"
          value="/Users/liaoliting/WebServer/www/Fintech/jetty/resources/file/UCI_in_dataset_A.csv"
          checked
        />
        <label for="file1">
          <span></span>個人信用卡資料_20191102.csv
        </label>
      </h4>
      <b-row class="data_select">
        <b-col>
          <h5>資料筆數: 1000筆</h5>
          <h5>資料欄位: 10</h5>
          <h5>欄位名稱:</h5>
          <h5>ID、LIMIT_BAL、AGE、BILL_AMT1、BILL_AMT2、BILL_AMT3、PAY_AMT1、PAY_AMT2、PAY_AMT3、SEX、EDUCATION、default payment next month</h5>
          <!-- <b-button v-b-toggle.collapse-1 variant="outline-light" size="lg">欄位名稱</b-button>
          <b-collapse id="collapse-1" class="mt-2">
            <b-card>
              <b-table :items="firstData" thead-class="hidden_header"></b-table>
              
            </b-card>
          </b-collapse> -->
        </b-col>
      </b-row>
    </Widget>
    <!-- </template> -->

    <!-- <template> -->
    <Widget class="radio">
      <h4>
        <!-- <b-form-radio
          value="/Users/liaoliting/WebServer/www/Fintech/jetty/resources/file/enterprise_data_in.csv"
        ></b-form-radio>企業營銷資料_20190122.csv-->
        <input
          type="radio"
          name="file"
          id="file2"
          v-model="selected"
          value="/Users/liaoliting/WebServer/www/Fintech/jetty/resources/file/enterprise_data_in.csv"
        />
        <label for="file2">
          <span></span>企業營銷資料_20190122.csv
        </label>
      </h4>
      <b-row class="data_select">
        <b-col>
          <h5>資料筆數: 1000筆</h5>
          <h5>資料欄位: 10</h5>
          <h5>欄位名稱:</h5>
          <h5>ID、shop_address、capital、setup_time、popularTimeWeekday、popularTimeWeekend、crim、sentimentScoreAvgLast1Year、negativeCommentAmountLast1Year、commentAmountLast1Year、longitude_0、latitude_0、label_2</h5>
          <!-- <b-button v-b-toggle.collapse-2 variant="outline-light" size="lg">欄位名稱</b-button>
          <b-collapse id="collapse-2" class="mt-2">
            <b-card>
              <b-table :items="secondData" thead-class="hidden_header"></b-table>
              
            </b-card>
          </b-collapse> -->
        </b-col>
      </b-row>
    </Widget>
    <!-- </template> -->
    <!-- </b-form-radio-group>
    </b-form-group>-->
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
export default {
  name: "chooseFile",
  components: {
    Widget
  },
  data() {
    return {
      firstData: [
        { "0": "ID" },
        { "0": "LIMIT_BAL" },
        { "0": "AGE" },
        { "0": "BILL_AMT1" },
        { "0": "BILL_AMT2" },
        { "0": "BILL_AMT3" },
        { "0": "PAY_AMT1" },
        { "0": "PAY_AMT2" },
        { "0": "PAY_AMT3" },
        { "0": "SEX" },
        { "0": "EDUCATION" },
        { "0": "default payment next month" }
      ],
      secondData: [
        { "0": "ID" },
        { "0": "shop_address" },
        { "0": "capital" },
        { "0": "setup_time" },
        { "0": "popularTimeWeekday" },
        { "0": "popularTimeWeekend" },
        { "0": "crim" },
        { "0": "sentimentScoreAvgLast1Year" },
        { "0": "negativeCommentAmountLast1Year" },
        { "0": "commentAmountLast1Year" },
        { "0": "longitude_0" },
        { "0": "latitude_0" },
        { "0": "label_2" }
      ],
      selected:
        "/Users/liaoliting/WebServer/www/Fintech/jetty/resources/file/UCI_in_dataset_A.csv"
    };
  },
  computed: {
    currentSection: function() {
      return this.$route.path.split("/")[
        this.$route.path.split("/").length - 2
      ];
    }
  },
  methods: {
    // chooseFile() {
    //   localStorage.setItem("fileDir", this.selected);
    // },
    next() {
      console.log(this.selected);
      localStorage.setItem("fileDir", this.selected);
      this.$router.push("/app/convert/chooseTool");
    }
  },
  mounted: function() {}
};
</script>

<style src="./FileUpload.scss" lang="scss" />