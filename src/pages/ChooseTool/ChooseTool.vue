<template>
  <!-- <Widget>
    <div class="cc-selector">
      <input id="detection" type="radio" name="tool" value="detection" v-model="model.tool" />
      <div class="labelntext">
        <label class="drinkcard-cc" for="detection">
          <span class="la la-list-alt text-center"></span>
        </label>
        <h4 class="text-center">合規檢測</h4>
      </div>

      <input id="conversion" type="radio" name="tool" value="conversion" v-model="model.tool" />
      <div class="labelntext">
        <label class="drinkcard-cc" for="conversion">
          <span class="la la-archive text-center"></span>
        </label>
        <h4 class="text-center">合規轉換</h4>
      </div>
    </div>
  </Widget>-->

  <div>
    <b-row class="chooseFile_title">
      <b-col>
        <b-button class="mr-1 tableBtn" variant="secondary" size="lg" @click="next">下一步</b-button>
        <h2>
          <strong>Step2. 選擇去識別工具</strong>
        </h2>
        <hr />
        <h5>
          <b>本系統提供2種工具協助您針對資料集進行去識別化處理；請依照資料使用需求，選擇您想要的工具</b>
        </h5>
      </b-col>
    </b-row>
    <div class="Toolcard">
      <b-row>
        <b-col>
          <b-card-group deck>
            <b-card :class="m1_card_class">
              <div class="text-light">
                <div>
                  <div class="icon-card">
                    <i class="fa fa-magic"></i>
                  </div>
                  <h4>方式1：自動去識別</h4>
                  <p>本工具會針對資料集的資料欄位屬性，進行自動化去識別方法的設定與處理。使用此工具需要您為資料集的資料欄位進行「數值型」與「類別型」的設定，以取得合規去識別的資料集</p>
                </div>
              </div>
              <b-button block lg :class="m1_btn_class" @click="choose('m1')">{{ m1_btn_text }}</b-button>
            </b-card>

            <b-card :class="m2_card_class">
              <div class="text-light">
                <div>
                  <div class="icon-card">
                    <i class="fa fa-hand-pointer-o"></i>
                  </div>
                  <h4>方式2：自選去識別</h4>
                  <p>本工具會提供各類資料去識別方法選單、含上位化、區間化、遮罩、序列化等。您可以依照資料使用需求完成資料欄位屬性、去識別方法與去識別參數的設定，以取得合規去識別的資料集</p>
                </div>
              </div>
              <b-button block lg :class="m2_btn_class" @click="choose('m2')">{{ m2_btn_text }}</b-button>
            </b-card>
          </b-card-group>
        </b-col>
      </b-row>
    </div>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
export default {
  name: "chooseTool",
  components: {
    Widget
  },
  data() {
    return {
      m1_btn_text: "請選擇",
      m2_btn_text: "請選擇",
      m1_card_class: "bg-card",
      m2_card_class: "bg-card",
      m1_btn_class: "btn-card",
      m2_btn_class: "btn-card",
      select: ""
    };
  },
  methods: {
    choose(card) {
      if(card == "m1") {
        this.m1_btn_text = "已選擇";
        this.m1_card_class = "bg-card-choose";
        this.m1_btn_class = "btn-card-choose";
        this.m2_btn_text = "請選擇";
        this.m2_card_class = "bg-card";
        this.m2_btn_class = "btn-card";
        this.select = "/app/convert/autoIdentity/conversion";
      } else {
        this.m2_btn_text = "已選擇";
        this.m2_card_class = "bg-card-choose";
        this.m2_btn_class = "btn-card-choose";
        this.m1_btn_text = "請選擇";
        this.m1_card_class = "bg-card";
        this.m1_btn_class = "btn-card";
        this.select = "/app/convert/identity/conversion";
      }

    },
    next() {
      this.$router.push(this.select);
    }
  }
};
</script>
<style src="./ChooseTool.scss" lang="scss"/>