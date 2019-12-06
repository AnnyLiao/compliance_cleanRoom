<template>
  <div class="dashboard-page">
    <div class="top-grid">
      <div>
        <h1>Setp3.選擇外部資料集</h1>
      </div>
      <div>
        <a href="#/app/datafuc/fun2d" @click="nextstep">下一步</a>
      </div>
    </div>
    <div class="instructions">
      <span>請從以下列表，選擇您想要的外部資料集，該資料集將與您在上一步驟所選擇的內部資料集進行合併</span>
    </div>
    <div class="box">
      <input type="radio" name="situation" id="situation01" value="0" v-model="valuecheck" checked />
      <label for="situation01">
        <span></span>外部資料集 1 ： 個人電商資料
      </label>
      <p>
        資料擁有者：PSM
        <br />資料狀態：
        <span class="marker-color">已合規去識別(已為合作方)</span>
        <br />資料筆數：1,000筆
        <br />資料期間：2016/01/01 - 2018/01/01
        <br />資料欄位(數值型)：LIMIT_BAL、AGE
        <br />資料欄位(類別型)：SEX、MARRIAGE、PAY_0、PAY_2、PAY_3、PAY_4、PAY_5、PAY_6
      </p>
    </div>
    <div class="box">
      <input type="radio" name="situation" id="situation02" value="1" v-model="valuecheck"/>
      <label for="situation02">
        <span></span>外部資料集 2 ： 企業物流資料
      </label>
      <p>
        資料擁有者：CFI
        <br />資料狀態：
        <span class="marker-color">已合規去識別(已為合作方)</span>
        <br />資料筆數：900筆
        <br />資料期間：2016/01/01 - 2018/01/01
        <br />資料欄位(數值型)：admin、negativeCommentAmountLast3Month、commentAmountLast3Month、sentimentScoreAvgLast3Month 、 sentimentScoreAvgLast1Year 、 negative08CommentAmountLast1Year、commentAmountLast1Year、googleCommentAmount
        <br />資料欄位(類別型)：region_1、region_2
      </p>
    </div>
    <div class="box-1">
      <input type="button" value="申請媒合" />
      <label for>外部資料集 3 ： 個人電商資料</label>
      <p>
        資料擁有者：OPP
        <br />資料狀態：
        <span class="marker-color">未合規去識別(未為合作方，請先申請媒合)</span>
        <br />資料筆數：5,000筆
        <br />資料期間：2016/01/01 - 2018/01/01
        <br />資料欄位(數值型)：消費金額、消費筆數、消費時間、退款金額、退款次數、分期期數
        <br />資料欄位(類別型)：行業別、消費店家
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
      data.step3 = this.valuecheck;
      window.localStorage.setItem("saveitem",JSON.stringify(data))
      console.log(data);
    },
  },
  computed: {}
};
</script>

<style src="./Fun2c.scss" lang="scss" />
