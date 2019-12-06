<template>
  <div class="dashboard-page">
    <div class="top-grid">
      <div>
        <h1>Setp1.選擇應用情境</h1>
      </div>
      <div>
        <a href="#/app/datafuc/fun2b" @click="nextstep">下一步</a>
      </div>
    </div>
    <div class="instructions">
      <span>請從以下列表，選擇您想要的資料應用情境</span>
    </div>
    <div class="box" id="situation">
        <input type="radio" name="situation" id="situation01" v-model="valuecheck" value="0"  checked>
        <label for="situation01"><span></span>應用情境 1 ： 個人信用徵信</label>
        <p>情境描述：此應用情境主要為透過您接下來選擇的資料庫，進行個人信用違約機率的預測，可作為信用卡、借貸等金融服務發展之用</p>
    </div>
    <div class="box" id="situation">
        <input type="radio" name="situation" id="situation02"  v-model="valuecheck" value="1" >
        <label for="situation02"><span></span>應用情境 2 ： 企業信用徵信</label>
        <p>情境描述：此應用情境主要為透過您接下來選擇的資料集進行企業倒閉機率的預測，可作為借貸、融資、投資等金融服務發展之用</p>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue';
import Widget from "@/components/Widget/Widget";
import Vue from 'vue';


export default {
  name: "Fun2a",
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
  mounted() {
    

  },
  methods: {
    nextstep:function(event){
      var data = JSON.parse(window.localStorage.getItem("saveitem")||'{}');
      data.step1 = this.valuecheck;
      window.localStorage.setItem("saveitem",JSON.stringify(data))
      console.log(data);
    },
  },
  computed: {}
};




</script>

<style src="./Fun2a.scss" lang="scss" />
