<template>
  <div>
    <b-row class="chooseFile_title">
      <b-col>
        <b-button class="mr-1 tableBtn" variant="secondary" size="lg" v-b-modal.checkSet>下一步</b-button>
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
          <b-table ref="table" :items="tableData" :fields="fields" striped>
            <!-- template for index -->
            <template v-slot:cell(index)="data">
              <div v-if="data.item.di">
                <span style="color:#f1d12e;">{{ data.index + 1 }}*</span>
              </div>
              <div v-else>{{ data.index + 1 }}</div>
            </template>
            <!-- template for column -->
            <template v-slot:cell(column)="data">
              <div v-if="data.item.di">
                <span style="color:#f1d12e;">{{ data.value }}</span>
              </div>
              <div v-else>{{ data.value }}</div>
            </template>
            <!-- template for type -->
            <template v-slot:cell(type)="row">
              <b-form-group>
                <b-form-select
                  v-model="row.item.type"
                  :options="type_options"
                  @change="setHashText(row.item.type, row.index, $event.target)"
                >
                  <template v-slot:first>
                    <option value disabled>選擇欄位屬性</option>
                  </template>

                  <option value="hashing" v-if="row.item.di == true">加密</option>
                </b-form-select>
              </b-form-group>
            </template>
            <!-- template for conversion -->
            <template v-slot:cell(conversion)="row">
              <b-form-group>
                <b-form-select
                  v-model="row.item.conversion"
                  :options="conversion_options"
                  ref="conversion"
                  @change="conversionChnage(row.item, row.index)"
                  :disabled="row.item.hashText !== ''"
                >
                  <template v-slot:first>
                    <option value="null" disabled>選擇一項工具</option>
                  </template>
                </b-form-select>
              </b-form-group>
            </template>
            <!-- template for conver_set button-->
            <template v-slot:cell(conver_set)="row">
              <b-button
                @click="$bvModal.show('converSetM_'+row.index)"
                :ref="'converSetBtn_'+row.index"
                :disabled="row.item.hashText !== ''"
              >設定參數</b-button>
              <b-modal
                :id="'converSetM_'+row.index"
                centered
                header-text-variant="warning"
                body-text-variant="dark"
                ref="converset"
              >
                <form>
                  <b-form-group>
                    <label>方法類型</label>
                    <b-form-select
                      v-model="row.item.conver_set"
                      :options="converSet[row.item.conversion]"
                    ></b-form-select>
                  </b-form-group>
                  <b-form-group
                    :description="value.description"
                    :label="value.label"
                    :label-for="value.name+'_'+row.index"
                    v-for="(value, key) in converInput[row.item.conversion][row.item.conver_set]"
                    :key="key.id"
                  >
                    <b-form-input
                      :id="value.name+'_'+row.index"
                      :placeholder="value.placeholder"
                      v-model="row.item.target_info[value.name]"
                    ></b-form-input>
                  </b-form-group>
                </form>
                <template v-slot:modal-footer="{ ok }">
                  <b-button
                    size="lg"
                    style="background-color: #f1d12e; color: white; font-size: small;"
                    @click="handleSubmit(row.index)"
                  >確定</b-button>
                </template>
              </b-modal>
            </template>
            <!-- template for setResult -->
            <template v-slot:cell(setResult)="data">
              <div
                v-for="(value, key) in data.item.setResult"
                :key="key.index"
                style="color: #c3c1db;"
              >
                <p v-if="key=='尚未設定'">{{ key }}</p>
                <p v-else>{{ key }}：{{ value }}</p>
              </div>
            </template>
            <!-- tempalte for clear button -->
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
          <!-- checkSet modal section -->
          <b-modal
            id="checkSet"
            ref="checkSet"
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
                @click="showResults()"
              >開始去識別</b-button>
            </template>
          </b-modal>
          <!-- <b-button pill class="mr-1 tableBtn" variant="outline-primary" @click="showResults()">確定</b-button> -->
        </Widget>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Vue from "vue";
import { getColumn, diCheckSync, deidentify } from "@/api.js";
import Widget from "@/components/Widget/Widget";
import demoJson from "@/assets/demo2.json";

export default {
  name: "Conversion",
  components: {
    Widget
  },
  props: ["dir", "zip"],
  data() {
    return {
      showTable: true,
      showResult: false,
      showloading: true,
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
          key: "conversion",
          label: "去識別化工具"
        },
        {
          key: "conver_set",
          label: "去識別化工具設定"
        },
        {
          key: "setResult",
          label: "設定結果"
        },
        {
          key: "clear",
          lable: ""
        }
      ],
      tableData: [],
      conversion_options: [
        { value: "upgrading", text: "欄位上位化" },
        { value: "internalization", text: "欄位區間化" },
        { value: "masking", text: "欄位遮罩" },
        { value: "serialization", text: "欄位序列化" }
      ],
      converSet: {
        upgrading: [
          {
            value: "date",
            text: "時間類別"
          },
          {
            value: "address",
            text: "非時間類別"
          }
        ],
        internalization: [
          {
            value: "auto",
            text: "自動化"
          }
        ],
        masking: [
          {
            value: "default",
            text: "預設"
          }
        ],
        serialization: [
          {
            value: "auto",
            text: "自動化"
          }
        ]
      },
      converInput: {
        null: {
          null: []
        },
        upgrading: {
          date: [
            {
              label: "轉換前格式",
              name: "before_date_format",
              placeholder: "",
              value: ""
            },
            {
              label: "轉換後格式",
              name: "after_date_format",
              placeholder: "",
              value: ""
            }
          ],
          address: [
            {
              label: "上位化區塊",
              name: "tansform_block",
              placeholder: "",
              value: ""
            }
          ]
        },
        internalization: {
          auto: [
            {
              label: "切割等份數",
              name: "separate_number",
              placeholder: "ex: 5",
              value: 0
            }
          ]
        },
        masking: {
          default: [
            {
              label: "遮罩方向",
              name: "from_side",
              placeholder: "0",
              description: "請輸入 0 or 1, 預設值為 0; 0:右至左; 1:左至右",
              value: 0
            },
            {
              label: "遮罩位元數或組數",
              name: "n_masking",
              placeholder: "ex: 4",
              value: 0
            },
            {
              label: "遮罩取代字元",
              name: "masking_char",
              placeholder: "null",
              description: "刪除字元只需輸入null, 預設值為 null",
              value: null
            },
            {
              label: "遮罩前想切割的字串",
              name: "separator",
              placeholder: "null",
              description: "若無只需輸入null, 預設值為 null",
              value: null
            },
            {
              label: "切割字串後的遮罩處理方式是否雙向遮罩",
              name: "Unidirectional",
              placeholder: "null",
              description:
                "true:單向遮罩; false:雙向遮罩, 若無切割字串只需輸入null, 預設值為 null",
              value: null
            }
          ]
        },
        serialization: {
          auto: [
            {
              label: "序列化個數",
              name: "serial_number",
              placeholder: "ex: 5",
              value: 0
            }
          ]
        }
      },
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
      alertText: ""
    };
  },
  created() {},
  methods: {
    getAllCol() {
      getColumn(localStorage.getItem("fileDir"))
        .then(response => {
          var vm = this;
          response.data.forEach(function(item) {
            vm.tableData.push({
              // labeled: "",
              column: item.replace(/"/g, ""),
              type: "",
              conversion: null,
              conver_set: null,
              label_info: {},
              target_info: {},
              hashText: "",
              di: false,
              setResult: {
                尚未設定: null
              }
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
              vm.diNumber += 1;
            }
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    // info(item, index, button) {
    //   let vm = this;
    //   vm.labeledSelectOptions = [];
    //   vm.lawJson.forEach(function(item, i) {
    //     vm.labeledSelectOptions.push({ text: item.code, value: i });
    //   });

    //   this.labeledModal.rowId = index;
    //   this.$root.$emit("bv::show::modal", this.labeledModal.id, button);
    // },
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
    handleSubmit(rowIndex) {
      this.converDataText(rowIndex);
      this.$nextTick(() => {
        this.$refs.converset.hide();
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
        this.alertText = "";
        this.tableData[
          this.hashTextModel.rowId
        ].hashText = this.hashTextModel.hashText;
        this.tableData[this.hashTextModel.rowId].setResult = {};
        this.tableData[this.hashTextModel.rowId].setResult[
          "加密"
        ] = this.hashTextModel.hashText;
        this.$nextTick(() => {
          this.$refs.hashTextModel.hide();
        });
      } else {
        this.alertText = "請填 hash 之文字規則";
      }
    },
    // onChange() {
    //   let vm = this;
    //   vm.labeledRadioOptions = {};
    //   for (let items of vm.lawJson[vm.labeledSelect].second_lev) {
    //     vm.labeledRadioOptions[items.name] = items.item;
    //   }
    // },
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
      }
    },
    clear(index) {
      this.tableData[index].labeled = "";
      this.tableData[index].type = "";
      this.tableData[index].conversion = null;
      this.tableData[index].conver_set = null;
      this.tableData[index].label_info = {};
      this.tableData[index].target_info = {};
      this.tableData[index].hashText = "";
      this.tableData[index].setResult = { 尚未設定: null };
    },
    showTables() {
      this.showTable = true;
      this.showResult = false;
    },
    showResults() {
      this.$refs["checkSet"].hide();
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
          //type未設定，就不會寫入model
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
              // if(item.conversion == "upgrading"){
              //   item.target_info["transform_type"] = "default";
              // }
              de_id_info.push({
                method: item.conversion,
                target: item.conver_set,
                target_info: vm.convertType(item.conversion, item.target_info)
              });
            }

            // else if (item.conversion == "pca" || item.conversion == "mca") {
            //   de_id_info.push({
            //     method: item.conversion,
            //     target: item.conver_set,
            //     target_info: item.target_info
            //   });
            // }

            // if (
            //   Object.entries(item.label_info).length !== 0 &&
            //   item.label_info.constructor === Object &&
            //   item.label_info.target != null
            // ) {
            //   de_id_info.push(item.label_info);
            // }
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
      vm.deidentifyFun();
    },
    convertType(method, info) {
      if (method == "upgrading") {
        info["transform_type"] = "default";
      } else if (method == "internalization") {
        info.separate_number = Number(info.separate_number);
      } else if (method == "masking") {
        info.from_side = Number(info.from_side);
        info.n_masking = Number(info.n_masking);
        if (info.Unidirectional != null) {
          info.Unidirectional = info.Unidirectional == "true";
        }
      } else if (method == "serialization") {
        info.serial_number = Number(info.serial_number);
      }

      return info;
    },
    converDataText(rowIndex) {
      let vm = this;

      vm.converData = [];

      // let target = vm.converSet[tool.method].find(t => t.value === tool.target)
      //   .text;
      vm.tableData[rowIndex].setResult = {};
      for (var key of Object.keys(vm.tableData[rowIndex].target_info)) {
        if (key != "transform_type") {
          let inputNmae = vm.converInput[vm.tableData[rowIndex].conversion][
            vm.tableData[rowIndex].conver_set
          ].find(t => t.name === key).label;
          vm.tableData[rowIndex].setResult[inputNmae] =
            vm.tableData[rowIndex].target_info[key];
        }
      }
    },
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

          this.$router.push("/app/convert/identity/conversionResult");
          console.log(response.data);
        })
        .catch(error => {
          loader.hide();
          localStorage.setItem("resData", JSON.stringify(demoJson.message));
          console.log(error);
        });
    }
  },
  mounted() {
    this.getAllCol();
  }
};
</script>
<style src="./Conversion.scss" lang="scss" />


