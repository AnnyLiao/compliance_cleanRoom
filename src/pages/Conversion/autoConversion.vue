<template>
  <div>
    <b-row class="chooseFile_title">
      <b-col>
        <b-button class="mr-1 tableBtn" variant="secondary" size="lg" v-b-modal.autoCheckSet>下一步</b-button>
        <h2>
          <strong>Step3. 設定處理方式</strong>
        </h2>
        <hr />
        <h5>
          <b>＊請確實選擇資料欄位屬性，系統將依此進行去識別化方法的設定</b>
        </h5>
        <h5 style="color: #f1d12e">
          <b>＊系統偵測到您的資料集中有{{ diNumber }}個值接識別資料欄位(以 * 標示)，您可以選擇以此進行加密設定</b>
        </h5>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Widget v-if="showTable" class="WidTable">
          <b-table ref="autoTable" :items="tableData" :fields="fields" striped>
            <!-- <template slot="action" slot-scope="row">
              <b-button
                size="sm"
                @click="info(row.item, row.index, $event.target)"
                class="mr-1"
                variant="outline-secondary"
              >
                <span class="fa fa-tag"></span>
              </b-button>
            </template>-->

            <template v-slot:cell(index)="data">
              <div v-if="data.item.di">
                <span style="color:#f1d12e;">{{ data.index + 1 }}*</span>
              </div>
              <div v-else>{{ data.index + 1 }}</div>
            </template>
            <template v-slot:cell(column)="data">
              <div v-if="data.item.di">
                <span style="color:#f1d12e;">{{ data.value }}</span>
              </div>
              <div v-else>{{ data.value }}</div>
            </template>

            <template v-slot:cell(type)="row">
              <b-form-group>
                <b-form-select
                  v-model="row.item.type"
                  :options="type_options"
                  disabled-field="disable"
                  @change="setHashText(row.item.type, row.index, $event.target)"
                >
                  <template v-slot:first>
                    <option value disabled>選擇欄位屬性</option>
                  </template>

                  <option value="hashing" v-if="row.item.di == true">加密</option>
                </b-form-select>
              </b-form-group>
            </template>

            <template v-slot:cell(clear)="row">
              <b-button size="sm" @click="clear(row.index)" class="mr-1 tableClearBtn">重填</b-button>
            </template>
          </b-table>

          <!---- hashText modal section--->

          <b-modal
            id="hashText"
            title="請填入要 hash 之文字規則 (請輸入5~10個數字或文字)"
            ok-only
            @hide="resetInputModal"
            ref="hashTextModel"
            centered
            :no-close-on-backdrop="true"
            header-text-variant="warning"
            body-text-variant="dark"
            hide-header-close
          >
            <b-form-input v-model="hashTextModel.hashText"></b-form-input>
            <span style="color: red;">{{ alertText }}</span>
            <template v-slot:modal-footer="{ ok }">
              <b-button
                size="lg"
                style="background-color: #f1d12e; color: white; font-size: small;"
                @click="hashTextHandleOK"
              >確定</b-button>
            </template>
          </b-modal>
          <!-- check modal section -->
          <b-modal
            id="autoCheckSet"
            title="您確定要開始去識別處理了嗎"
            header-text-variant="warning"
            body-text-variant="dark"
            centered
          >
            <h5>數據無塵室將依您的設定開始處理資料</h5>
            <template v-slot:modal-footer="{ cance, ok }">
              <b-button
                size="lg"
                style="background-color: #c3c1db; font-size: small;"
                @click="cancel()"
              >取消</b-button>
              <b-button
                size="lg"
                style="background-color: #f1d12e; color: white; font-size: small;"
                @click="Reconstruct()"
              >開始去識別</b-button>
            </template>
          </b-modal>
        </Widget>
        <!-- <b-row v-if="showResult">
          <b-col>
            <Widget>
              <b-card-group
                deck
                class="checkSection"
                v-for="i in Math.ceil(converData.length / 4)"
                :key="i.id"
              >
                <b-card
                  :header="value.columnName"
                  border-variant="primary"
                  header-tag="header"
                  v-for="(value, key) in converData.slice((i - 1) * 4, i * 4)"
                  :key="key.id"
                >
                  <b-card-text>
                    <span class="fa fa-check"></span>
                    欄位屬性: {{value.type}}
                  </b-card-text>
                  <b-card-text v-for="(v, k) in value.set" :key="k.id">
                    <h6>
                      <span class="fa fa-check"></span>
                      去識別化工具: {{ v.method }}
                    </h6>
                    <pre>
                <li><b>工具設定:</b></li>
                <li>{{ v.target }}</li>
                <li v-for="(item, key) in v.tool_set" :key="key.id">{{ key }}: {{ item }}</li>
              </pre>
                  </b-card-text>
                </b-card>
              </b-card-group>

              <b-button
                pill
                class="mr-1 tableBtn"
                variant="outline-primary"
                style="margin-top: 2%;"
                @click="showTables()"
              >修改</b-button>
            </Widget>
          
            <b-button
              variant="link"
              class="changePage"
              style="color: black;"
              @click="deidentifyFun"
            >
              Step 3. 去識別結果
              <i class="fa fa-arrow-right"></i>
            </b-button>
          </b-col>
        </b-row>-->
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import { getColumn, diCheckSync, deidentify } from "@/api.js";
import Widget from "@/components/Widget/Widget";
import demoJson from "@/assets/demo.json";
import typeSample from "@/assets/UCI_typeSample.json";
import enter_typeSample from "@/assets/enter_typeSample.json";

export default {
  name: "autoConversion",
  components: {
    Widget
  },
  props: ["dir", "zip"],
  data() {
    return {
      // lawJson: LawJson,
      showTable: true,
      showResult: false,
      converData: [],
      model: {
        file_info: {},
        hash_info: [],
        field_info: [],
        finish: {}
      },
      fields: [
        {
          key: "index",
          label: "編號"
        },
        {
          key: "column",
          label: "欄位"
        },
        {
          key: "type",
          label: "欄位屬性"
        },
        {
          key: "clear",
          lable: ""
        }
      ],
      tableData: [],
      conversion_options: [
        { value: "pca", text: "主成分分析(PCA)" },
        { value: "mca", text: "多因子分析(MCA)" }
      ],
      type_options: [
        { value: "integer", text: "整數" },
        { value: "real", text: "小數點" },
        { value: "string", text: "文字" }
      ],
      labeledSelectOptions: [],
      labeledSelect: null,
      labeledRadioOptions: {},
      labeledRadio: null,
      labeledModal: {
        id: "info-modal",
        title: "請選擇標註類別及項目 (沒有選擇即取消)",
        // content: "",
        rowId: ""
      },
      hashTextModel: {
        hashText: "",
        rowId: ""
      },
      uploadPercentage: 0,
      diNumber: 0,
      alertText: "",
    };
  },
  created() {},
  computed: {
    currentSection: function() {
      return this.$route.path.split("/")[2];
    }
  },
  methods: {
    getAllCol() {
      getColumn(localStorage.getItem("fileDir"))
        .then(response => {
          var vm = this;
          var conversion = "";
          var filename = localStorage.getItem("fileDir").split("/")[
            localStorage.getItem("fileDir").split("/").length - 1
          ];
          response.data.forEach(function(item, i) {
            if (filename == "UCI_in_dataset_A.csv") {
              if (typeSample[i] == "string") {
                conversion = "mca";
              } else {
                conversion = "pca";
              }
            } else {
              if (enter_typeSample[i] == "string") {
                conversion = "mca";
              } else {
                conversion = "pca";
              }
            }

            vm.tableData.push({
              // labeled: "",
              column: item.replace(/"/g, ""),
              type: typeSample[i],
              conversion: conversion,
              target_info: {},
              hashText: "",
              di: false
            });
          });
        })
        .catch(error => {
          console.log(error);
        });

      diCheckSync(localStorage.getItem("fileDir"))
        .then(response => {
          var vm = this;
          response.data.result.forEach(function(item, i) {
            if (item.length != 0) {
              vm.tableData[i].di = true;
              vm.tableData[i].type = "";
              vm.tableData[i].conversion = "";
              vm.diNumber += 1;
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    info(item, index, button) {
      let vm = this;
      vm.labeledSelectOptions = [];
      vm.lawJson.forEach(function(item, i) {
        vm.labeledSelectOptions.push({ text: item.code, value: i });
      });

      this.labeledModal.rowId = index;
      this.$root.$emit("bv::show::modal", this.labeledModal.id, button);
    },
    resetInfoModal() {
      this.labeledModal.name = "";
      this.labeledModal.rowId = "";
      this.labeledSelect = null;
      this.labeledRadio = null;
      this.labeledRadioOptions = {};
    },
    resetInputModal() {
      this.hashTextModel.hashText = "";
      this.hashTextModel.rowId = "";
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Hide the modal manually
      this.tableData[this.labeledModal.rowId].label_info = {
        method: "transformation",
        target: this.labeledRadio
      };
      this.tableData[this.labeledModal.rowId].labeled = this.labeledRadio;
      this.$nextTick(() => {
        this.$refs.modal.hide();
      });
    },
    hashTextHandleOK(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleHashTextSubmitOK();
    },
    handleHashTextSubmitOK() {
      // Hide the modal manually
      if (this.hashTextModel.hashText != "") {
        this.alertText="";
        this.tableData[
          this.hashTextModel.rowId
        ].hashText = this.hashTextModel.hashText;
        this.$nextTick(() => {
          this.$refs.hashTextModel.hide();
        });
      }else{
        this.alertText="請填 hash 之文字規則";
      }
    },
    onChange() {
      let vm = this;
      vm.labeledRadioOptions = {};
      for (let items of vm.lawJson[vm.labeledSelect].second_lev) {
        vm.labeledRadioOptions[items.name] = items.item;
      }
    },
    openModal(index, button) {
      this.$root.$emit("bv::show::modal", "converSetM_" + index, button);
    },
    conversionChnage(item, index) {
      item.target_info = {};
      item.conver_set = "";
    },
    setHashText(type, index, button) {
      if (type == "hashing") {
        this.hashTextModel.rowId = index;
        this.$root.$emit("bv::show::modal", "hashText", button);
      } else if (type == "string") {
        this.tableData[index].conversion = "mca";
      } else {
        this.tableData[index].conversion = "pca";
      }
    },
    clear(index) {
      this.tableData[index].labeled = "";
      this.tableData[index].type = "";
      this.tableData[index].conversion = "";
      this.tableData[index].conver_set = "";
      this.tableData[index].label_info = {};
      this.tableData[index].target_info = {};
      this.tableData[index].hashText = "";
    },
    showTables() {
      this.showTable = true;
      this.showResult = false;
    },
    Reconstruct() {
      let vm = this;
      vm.model = {
        file_info: {},
        hash_info: [],
        field_info: [],
        finish: {}
      };
      vm.model.file_info = {
        src_type: 0,
        path: "C:/Users/R16026/Git/DataAnonymization/data/input/",
        file_name: localStorage.getItem("fileDir").split("/")[
          localStorage.getItem("fileDir").split("/").length - 1
        ],
        encoding: "UTF-8",
        header: "true"
      };
      vm.tableData.forEach(function(item, i) {
        if (item.type != "") {
          if (item.hashText != "") {
            vm.model.hash_info.push({
              column_name: item.column,
              hash_key: item.hashText
            });
          } else {
            let de_id_info = [];

            if (
              Object.entries(item.target_info).length !== 0 &&
              item.target_info.constructor === Object
            ) {
              de_id_info.push({
                method: item.conversion,
                target: item.conver_set,
                target_info: item.target_info
              });
            } else if (item.conversion == "pca" || item.conversion == "mca") {
              de_id_info.push({
                method: "multivariateAnalysis",
                target: item.conversion,
                target_info: item.target_info
              });
            }

            vm.model.field_info.push({
              column_name: item.column,
              column_type: item.type,
              de_id_info: de_id_info
            });
          }
        }
      });

      vm.model.finish = {
        callback: "ftp",
        URL: "http://frontend/callback?file=ftp://ssss.ssss"
      };
      // console.log(vm.model);
      vm.showTable = false;
      vm.showResult = true;
      vm.deidentifyFun();
    },
    // converDataText() {
    //   let vm = this;
    //   vm.converData = [];

    //   if (vm.model.hash_info.length != 0) {
    //     vm.model.hash_info.forEach(function(item, i) {
    //       vm.converData.push({
    //         columnName: item.column_name,
    //         type: "加密欄位",
    //         set: [{ method: "加密", tool_set: { 加密文字: item.hash_key } }]
    //       });
    //     });
    //   }

    //   if (vm.model.field_info.length != 0) {
    //     vm.model.field_info.forEach(function(item, i) {
    //       let field_type = vm.type_options.find(
    //         option => option.value === item.column_type
    //       ).text;

    //       vm.converData.push({
    //         columnName: item.column_name,
    //         type: field_type
    //       });
    //     });
    //   }

    //   console.log(this.converData);
    // },
    deidentifyFun() {
      let loader = this.$loading.show();
      deidentify({
        ip: "140.92.142.221", //140.92.142.221
        jsonData: this.model
      })
        .then(response => {
          loader.hide();
          localStorage.clear();
          if (response.data.message == "666") {
            localStorage.setItem("resData", JSON.stringify(demoJson.message));
          } else {
            localStorage.setItem(
              "resData",
              JSON.stringify(response.data.message)
            );
          }

          this.$router.push("/app/convert/autoIdentity/conversionResult");
        })
        .catch(error => {
          loader.hide();
          localStorage.setItem("resData", JSON.stringify(demoJson.message));
          console.log(error);
        });
    },
    doubleCheck() {}
  },
  mounted() {
    this.getAllCol();
  }
};
</script>
<style src="./Conversion.scss" lang="scss" />


