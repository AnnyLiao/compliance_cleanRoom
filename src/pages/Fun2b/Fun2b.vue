<template>
  <div class="dashboard-page">
    <div class="top-grid">
      <div>
        <h1>Setp2.選擇內部資料集</h1>
      </div>
      <div>
        <a href="#/app/datafuc/fun2c" @click="nextstep">下一步</a>
      </div>
    </div>
    <div class="instructions">
      <span>請從以下列表，選擇您想要的內部資料集，該資料集將與接下來您所選擇的外部資料集進行合併</span>
    </div>
    <div class="box">
      <input type="radio" name="situation" id="situation01" value="0" v-model="valuecheck" checked />
      <label for="situation01">
        <span></span>內部資料集 1 ： 個人信用資料
      </label>
      <p>
        資料筆數：1,000筆
        <br />資料期間：2016/01/01 - 2018/01/01
        <br />資料欄位(數值型)：LIMIT_BAL、AGE、BILL_AMT1、BILL_AMT2、BILL_AMT3、PAY_AMT1、PAY_AMT2、PAY_AMT3
        <br />資料欄位(類別型)：資料欄位(類別型)：SEX、EDUCATION
      </p>
    </div>
    <div class="box">
      <input type="radio" name="situation" id="situation02" value="1"  v-model="valuecheck" />
      <label for="situation02">
        <span></span>內部資料集 2 ： 企業營運資料
      </label>
      <p>
        資料筆數：1,000筆
        <br />資料期間：2016/01/01 - 2018/01/01
        <br />資料欄位(數值型)：capital、setup_time、popularTimeWeekday、popularTimeWeekend、crim、civilpopularTimeWeekendAvg、popularTimeWeekdayAvg
        <br />資料欄位(類別型)：orgtype、business category
      </p>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
import Widget from "@/components/Widget/Widget";


export default {
  name: "Dashboard",
  components: {
    Widget,
    Map
  },
  data() {
    return {
      checkedArr: [false, false, false],
      valuecheck:0
    };
  },
  mounted() {},
  methods: {
     nextstep:function(event){
      var data = JSON.parse(window.localStorage.getItem("saveitem")||'{}');
      data.step2 = this.valuecheck;
      window.localStorage.setItem("saveitem",JSON.stringify(data))
      console.log(data);
    },
  },
  computed: {}
};
</script>

<style src="./Fun2b.scss" lang="scss" />
