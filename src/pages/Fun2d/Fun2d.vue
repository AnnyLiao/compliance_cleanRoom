<template>
  <div class="dashboard-page">
    <div class="top-grid">
      <div>
        <h1>Setp4.選擇分析模型</h1>
      </div>
      <div>
        <a href="#/app/datafuc/fun2e" @click="nextstep">下一步</a>
      </div>
    </div>
    <div class="instructions">
      <span>請選擇其中1種分析模型，數據無塵室將依該分析模型進行資料賦能與融合後的分析</span>
    </div>
    <div class="box">
      <input type="radio" name="situation" id="situation01" checked value="0" v-model="valuecheck" />
      <label for="situation01">
        <span></span>分析模型 1 ： 支援向量機(Support Vector Machine,SVM)
      </label>
      <p>分析模型特性描述：SVM主要透過在高維或無限維空間中構造超平面或超平面集合，確保分類邊界距離最近的訓練資料點越遠越好，以縮小分類器的泛化誤差，為處理分類、回歸或其他相關任務的一項學習演算法</p>
    </div>
    <div class="box">
      <input type="radio" name="situation" id="situation02" value="1" v-model="valuecheck"  />
      <label for="situation02">
        <span></span>分析模型 2 ： 邏輯斯回歸(Logistic Regression,LR)
      </label>
      <p>分析模型特性描述：LR主要透過對數函數進行資料對二分類的影響分析，產生符合最大概似估算的分類模型，可透過勝算值(Odds)了解二分類機率的比值，為處理分類、回歸或其他相關任務的一項學習演算法</p>
    </div>
    <div class="box-1">
      <input type="button" value="聯繫管理員" />
      <label for>分析模型 3 ： 自行上架模型(即將上線)</label>
      <p>若您需要自行上架已開發的分析模型進行資料賦能分析，請聯繫管理員</p>
    </div>
    <!-- <div id="myModal" class="modal">

      <div class="modal-content">
        <span class="close" @click="close">&times;</span>
        <p class="marker-color">資料賦能與融合分析中，請勿關閉視窗</p>
      </div>
    </div> -->
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
      data.step4 = this.valuecheck;
      window.localStorage.setItem("saveitem",JSON.stringify(data))
      console.log(data);
    },
  },
  computed: {}
};
</script>

<style src="./Fun2d.scss" lang="scss" />
