<template>
  <div class="dashboard-page">
    <div class="top-grid">
      <div>
        <h1>Setp5.檢視分析報告</h1>
      </div>
      <div>
        <a href="#/app/index">回首頁</a>
      </div>
    </div>
    <div class="body-grid1">
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>您選擇的內容</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>應用場景</td>
              <td>{{narray.os1}}</td>
            </tr>
            <tr>
              <td>內部資料</td>
              <td>{{narray.os2}}</td>
            </tr>
            <tr>
              <td>外部資料</td>
              <td>{{narray.os3}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>內部資料</th>
              <th>外部資料</th>
              <th>內部+外部資料</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>總筆數</td>
              <td>{{narray.data1[0]}}</td>
              <td>{{narray.data1[1]}}</td>
              <td>{{narray.data1[2]}}</td>
            </tr>
            <tr>
              <td>欄位數</td>
              <td>{{narray.data1[3]}}</td>
              <td>{{narray.data1[4]}}</td>
              <td>{{narray.data1[5]}}</td>
            </tr>
            <tr>
              <td>數值型欄位數</td>
              <td>{{narray.data1[6]}}</td>
              <td>{{narray.data1[7]}}</td>
              <td>{{narray.data1[8]}}</td>
            </tr>
            <tr>
              <td>類別型欄位數</td>
              <td>{{narray.data1[9]}}</td>
              <td>{{narray.data1[10]}}</td>
              <td>{{narray.data1[11]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div class="body-grid2">
      <div class="chart">
        <Chart />
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>分析模型</th>
              <th style="color:#ffffff;font-size:16px;" colspan="3">{{narray.daname}}</th>
            </tr>
            <tr>
              <th>資料集</th>
              <th>欄位數</th>
              <th>準確率</th>
              <th>
                準確率差
                <br />
                <span>(與內外+外部資料相比)</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>內部資料</td>
              <td>{{narray.data2[0]}}</td>
              <td class="marker-color">{{narray.data2[1]}}</td>
              <td>{{narray.data2[2]}}</td>
            </tr>
            <tr>
              <td>外部資料</td>
              <td>{{narray.data2[3]}}</td>
              <td class="marker-color">{{narray.data2[4]}}</td>
              <td>{{narray.data2[5]}}</td>
            </tr>
            <tr>
              <td>
                內部+外部
                <br />資料
              </td>
              <td>{{narray.data2[6]}}</td>
              <td class="marker-color">{{narray.data2[7]}}</td>
              <td>{{narray.data2[8]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="body-grid2">
      <div class="chart">
        <iframe :src="nsrc" width="100%" height="500" frameborder="0" scrolling="no"></iframe>
      </div>
      <div style="height:500px;overflow-y: scroll;">
        <table>
          <thead>
            <tr>
              <th>排序</th>
              <th>關鍵欄位</th>
              <th>係數</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item ,index) in datalist" :key="index">
              <td>{{index+1}}</td>
              <td>{{item.name}}</td>
              <td class="marker-color">{{item.value}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
import Widget from "@/components/Widget/Widget";
import Chart from "../Charts/Charts_1";
export default {
  name: "ogc",
  components: {
    Widget,
    Map,
    Chart
  },
  data() {
    return {
      checkedArr: [false, false, false],
      narray: {},
      datalist: [],
      nsrc: "http://litt.com.tw/oglabview.html"
    };
  },
  mounted() {
    var select1 = {
      os1: "個人信用徵信",
      os2: "個人信用資料.csv",
      os3: "個人電商資料.csv",
      data1: [
        "1000",
        "900",
        "900",
        "10",
        "10",
        "63",
        "8",
        "2",
        "63",
        "2",
        "8",
        "--"
      ],
      daname: "邏輯斯回歸 (Logistic Regression,LR)",
      data2: [
        "10",
        "67.33%",
        "+3.41%",
        "10",
        "70.74%",
        "6.67%",
        "63",
        "77.41%",
        "--"
      ],
      btype: 0
    };
    var select2 = {
      os1: "個人信用徵信",
      os2: "個人信用資料.csv",
      os3: "個人電商資料.csv",
      data1: [
        "1000",
        "900",
        "900",
        "10",
        "10",
        "63",
        "8",
        "2",
        "63",
        "2",
        "8",
        "--"
      ],
      daname: "支援向量機 (Support Vector Machine, SVM)",
      data2: [
        "10",
        "77.00%",
        "+9.29",
        "10",
        "86.29%",
        "--",
        "63",
        "86.29%",
        "--"
      ],
      btype: 0
    };
    var select3 = {
      os1: "企業信用徵信",
      os2: "企業營運資料.csv",
      os3: "企業物流資料.csv",
      data1: [
        "1000",
        "900",
        "900",
        "10",
        "10",
        "63",
        "8",
        "2",
        "63",
        "2",
        "8",
        "--"
      ],
      daname: "邏輯斯回歸 (Logistic Regression,LR)",
      data2: [
        "10",
        "86.29%",
        "-0.74%",
        "10",
        "85.55%",
        "1.45%",
        "41",
        "87%",
        "--"
      ],
      btype: 0
    };
    var select4 = {
      os1: "企業信用徵信",
      os2: "企業營運資料.csv",
      os3: "企業物流資料.csv",
      data1: [
        "1000",
        "900",
        "900",
        "10",
        "10",
        "63",
        "8",
        "2",
        "63",
        "2",
        "8",
        "--"
      ],
      daname: "邏輯斯回歸 (Logistic Regression,LR)",
      data2: [
        "10",
        "88.14%",
        "-1.48%",
        "10",
        "86.66%",
        "1.01%",
        "41",
        "87.67%",
        "--"
      ],
      btype: 0
    };

    var data1 = [
      { name: "	AGE.1	", value: 1.224425 },
      { name: "	BILL_AMT2	", value: 0.495637 },
      { name: "	PAY_AMT1	", value: 0.487206 },
      { name: "	AGE	", value: 0.339887 },
      { name: "	PAY_4_T_3	", value: 0.328376 },
      { name: "	PAY_2	", value: 0.31979 },
      { name: "	LIMIT_BAL.1	", value: 0.318979 },
      { name: "	PAY_0	", value: 0.318178 },
      { name: "	EDUCATION_T_2	", value: 0.29869 },
      { name: "	SEX	", value: 0.296734 },
      { name: "	PAY_3	", value: 0.291994 },
      { name: "	PAY_0_T_0	", value: 0.273222 },
      { name: "	PAY_4_T__2	", value: 0.258655 },
      { name: "	PAY_3_T_2	", value: 0.258239 },
      { name: "	PAY_3_T_3	", value: 0.238583 },
      { name: "	PAY_4_T_0	", value: 0.217824 },
      { name: "	PAY_2_T__1	", value: 0.20184 },
      { name: "	LIMIT_BAL	", value: 0.200889 },
      { name: "	PAY_2_T_2	", value: 0.199287 },
      { name: "	PAY_3_T_0	", value: 0.19903 },
      { name: "	PAY_AMT3	", value: 0.188603 },
      { name: "	PAY_4_T_4	", value: 0.188596 },
      { name: "	PAY_4_T__1	", value: 0.18435 },
      { name: "	MARRIAGE_T_other	", value: 0.180088 },
      { name: "	MARRIAGE_T_noma	", value: 0.172602 },
      { name: "	PAY_3_T__2	", value: 0.162522 },
      { name: "	PAY_2_T_3	", value: 0.155105 },
      { name: "	PAY_0_T__2	", value: 0.150733 },
      { name: "	BILL_AMT1	", value: 0.147951 },
      { name: "	MARRIAGE	", value: 0.14569 },
      { name: "	PAY_0_T_1	", value: 0.142115 },
      { name: "	PAY_0_T_4	", value: 0.124713 },
      { name: "	PAY_2_T__2	", value: 0.121746 },
      { name: "	PAY_AMT2	", value: 0.114633 },
      { name: "	PAY_2_T_0	", value: 0.105036 },
      { name: "	PAY_3_T_4	", value: 0.101772 },
      { name: "	PAY_4_T_2	", value: 0.096796 },
      { name: "	BILL_AMT3	", value: 0.088877 },
      { name: "	EDUCATION_T_3	", value: 0.088199 },
      { name: "	PAY_0_T_2	", value: 0.081116 },
      { name: "	PAY_4	", value: 0.079808 },
      { name: "	EDUCATION_T_1	", value: 0.074792 },
      { name: "	PAY_5_T__1	", value: 0.059979 },
      { name: "	PAY_5_T_2	", value: 0.058552 },
      { name: "	EDUCATION	", value: 0.057052 },
      { name: "	PAY_5_T_3	", value: 0.055039 },
      { name: "	PAY_5_T__2	", value: 0.053907 },
      { name: "	PAY_5_T_5	", value: 0.05235 },
      { name: "	PAY_0_T_3	", value: 0.049735 },
      { name: "	PAY_6	", value: 0.047763 },
      { name: "	EDUCATION_T_4	", value: 0.046376 },
      { name: "	EDUCATION_T_5	", value: 0.046246 },
      { name: "	PAY_3_T_7	", value: 0.043909 },
      { name: "	PAY_6_T_6	", value: 0.041954 },
      { name: "	PAY_3_T__1	", value: 0.040376 },
      { name: "	MARRIAGE_T_0	", value: 0.031914 },
      { name: "	PAY_4_T_7	", value: 0.03155 },
      { name: "	PAY_5_T_7	", value: 0.030293 },
      { name: "	PAY_5	", value: 0.027396 },
      { name: "	SEX.1	", value: 0.026991 },
      { name: "	PAY_5_T_0	", value: 0.018765 },
      { name: "	PAY_0_T__1	", value: 0.013649 },
      { name: "	MARRIAGE_T_ma	", value: 0.013276 }
    ];
    var data2 = [
      { name: "	PAY_0	", value: 0.205391 },
      { name: "	PAY_3_T_3	", value: 0.183289 },
      { name: "	PAY_2_T_0	", value: 0.133017 },
      { name: "	PAY_4_T_0	", value: 0.07668 },
      { name: "	PAY_4_T__1	", value: 0.074512 },
      { name: "	PAY_0_T_4	", value: 0.062441 },
      { name: "	PAY_4_T_2	", value: 0.059751 },
      { name: "	PAY_6_T_6	", value: 0.055682 },
      { name: "	MARRIAGE_T_other	", value: 0.047668 },
      { name: "	PAY_0_T_1	", value: 0.046601 },
      { name: "	PAY_4_T__2	", value: 0.04407 },
      { name: "	PAY_3_T__2	", value: 0.043276 },
      { name: "	MARRIAGE_T_ma	", value: 0.037541 },
      { name: "	SEX	", value: 0.02477 },
      { name: "	PAY_3_T_7	", value: 0.021364 },
      { name: "	PAY_0_T__2	", value: 0.020211 },
      { name: "	PAY_3_T_4	", value: 0.018709 },
      { name: "	PAY_5	", value: 0.016894 },
      { name: "	PAY_3_T__1	", value: 0.00954 },
      { name: "	PAY_5_T_3	", value: 0.006407 },
      { name: "	PAY_2_T_3	", value: 0.005243 },
      { name: "	EDUCATION_T_5	", value: 0.004311 },
      { name: "	PAY_0_T_0	", value: 0.000847 },
      { name: "	BILL_AMT2	", value: 0.000229 },
      { name: "	EDUCATION_T_1	", value: 0.000215 },
      { name: "	EDUCATION_T_2	", value: 0.00016 },
      { name: "	BILL_AMT3	", value: 0.000155 },
      { name: "	PAY_AMT1	", value: 0.00014 },
      { name: "	SEX.1	", value: 0.000068 },
      { name: "	PAY_AMT2	", value: 0.000016 }
    ];
    var data3 = [
      { name: "	negativeCommentAmountLast3Month	", value: 0.554764 },
      { name: "	business_category_T_3	", value: 0.41757 },
      { name: "	commentAmountLast3Month	", value: 0.244132 },
      { name: "	negative08CommentAmountLast1Year	", value: 0.237641 },
      { name: "	business_category	", value: 0.232726 },
      { name: "	admin	", value: 0.225387 },
      { name: "	business_category_T_8	", value: 0.225176 },
      { name: "	crim	", value: 0.21733 },
      { name: "	business_category_T_14	", value: 0.172847 },
      { name: "	business_category_T_10	", value: 0.158497 },
      { name: "	popularTimeWeekday	", value: 0.153937 },
      { name: "	popularTimeWeekend	", value: 0.143242 },
      { name: "	business_category_T_12	", value: 0.142221 },
      { name: "	business_category_T_4	", value: 0.111964 },
      { name: "	business_category_T_16	", value: 0.110764 },
      { name: "	business_category_T_1	", value: 0.101207 },
      { name: "	region_1_T_1	", value: 0.100836 },
      { name: "	region_2_T_2	", value: 0.097147 },
      { name: "	label_2.1	", value: 0.09459 },
      { name: "	civil	", value: 0.091682 },
      { name: "	orgtype	", value: 0.082325 },
      { name: "	business_category_T_0	", value: 0.079764 },
      { name: "	orgtype_T_3	", value: 0.078635 },
      { name: "	popularTimeWeekdayAvg	", value: 0.078318 },
      { name: "	business_category_T_17	", value: 0.076718 },
      { name: "	business_category_T_18	", value: 0.072326 },
      { name: "	business_category_T_5	", value: 0.068413 },
      { name: "	business_category_T_9	", value: 0.059308 },
      { name: "	sentimentScoreAvgLast1Year	", value: 0.057635 },
      { name: "	business_category_T_6	", value: 0.056909 },
      { name: "	business_category_T_11	", value: 0.048317 },
      { name: "	sentimentScoreAvgLast3Month	", value: 0.045348 },
      { name: "	region_1_T_0	", value: 0.040504 },
      { name: "	business_category_T_15	", value: 0.039381 },
      { name: "	business_category_T_13	", value: 0.037282 },
      { name: "	popularTimeWeekendAvg	", value: 0.031941 },
      { name: "	capital	", value: 0.031285 },
      { name: "	region_2	", value: 0.026605 },
      { name: "	region_1	", value: 0.026413 },
      { name: "	region_1_T_2	", value: 0.006468 },
      { name: "	setup_time	", value: 0.003623 }
    ];
    var data4 = [
      { name: "	region_1_T_2	", value: 0.057443 },
      { name: "	region_1_T_1	", value: 0.010813 },
      { name: "	region_1	", value: 0.003506 },
      { name: "	sentimentScoreAvgLast3Month	", value: 0.000067 },
      { name: "	business_category_T_6	", value: 0.000052 },
      { name: "	business_category	", value: 0.000039 },
      { name: "	popularTimeWeekdayAvg	", value: 0.000037 },
      { name: "	business_category_T_3	", value: 0.000036 },
      { name: "	business_category_T_12	", value: 0.000033 },
      { name: "	admin	", value: 0.000031 },
      { name: "	crim	", value: 0.000031 },
      { name: "	negative08CommentAmountLast1Year	", value: 0.000028 },
      { name: "	commentAmountLast3Month	", value: 0.000023 },
      { name: "	business_category_T_8	", value: 0.000019 },
      { name: "	popularTimeWeekday	", value: 0.000018 },
      { name: "	business_category_T_10	", value: 0.000018 },
      { name: "	business_category_T_9	", value: 0.000013 },
      { name: "	business_category_T_17	", value: 0.000011 },
      { name: "	business_category_T_16	", value: 0.00001 },
      { name: "	business_category_T_18	", value: 0.00001 },
      { name: "	business_category_T_13	", value: 0.000008 },
      { name: "	capital	", value: 0.000003 },
      { name: "	business_category_T_15	", value: 0.000003 },
      { name: "	orgtype	", value: 0.000003 }
    ];

    var data = JSON.parse(window.localStorage.getItem("saveitem") || "{}");
    if (data.step1 == 0) {
      if (data.step4 == 0) {
        this.datalist = data1;
        this.narray = select1;
        this.nsrc = "http://litt.com.tw/oglabview.html?type=0";
      } else {
        this.datalist = data2;
        this.narray = select2;
        this.nsrc = "http://litt.com.tw/oglabview.html?type=1";
      }
    } else {
      if (data.step4 == 0) {
        this.datalist = data3;
        this.narray = select3;
        this.nsrc = "http://litt.com.tw/oglabview.html?type=2";
      } else {
        this.datalist = data4;
        this.narray = select4;
        this.nsrc = "http://litt.com.tw/oglabview.html?type=3";
      }
    }
  },
  methods: {},
  computed: {}
};
</script>

<style src="./Fun2e.scss" lang="scss" />

