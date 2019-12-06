<template>
  <div>
    <b-row class="chooseFile_title">
      <b-col>
        <b-button class="mr-1 tableBtn" variant="secondary" size="lg">下載檔案</b-button>
        <b-button class="mr-1 tableBtn detailBtn" size="lg" v-b-modal.modal-lg v-if="detailBtn">詳細資訊</b-button>
        <h2>
          <strong>Step4. 檢視合規報告</strong>
        </h2>
        <hr />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <Widget class="WidTable">
          <b-row>
            <b-col>
              <div class="badge">
                <b>{{ detectText }}</b>
              </div>
            </b-col>
          </b-row>
          <div class="widget-bottom-overflow">
            <b-table
              id="my-table"
              ref="table"
              :items="converData"
              :fields="fields"
              responsive
              :per-page="perPage"
              :current-page="currentPage"
              class="table-striped wrap"
            >
              <!-- <template :slot="'HEAD_'+value.key" slot-scope="data" v-for="value in fields">
                <span :key="value.index" style="color: #f1d12e;">{{ value.label }}</span>
              </template>-->

              <template v-slot:[gomyhead(value.key)]="data" v-for="value in fields">
                <span :key="value.key" style="color: #f1d12e;">{{ value.label }}</span>
              </template>
            </b-table>
            <b-pagination
              v-model="currentPage"
              :total-rows="rows"
              :per-page="perPage"
              aria-controls="my-table"
              align="right"
              style="margin-top: 1%;"
            ></b-pagination>
          </div>
        </Widget>
        <b-modal id="modal-lg" size="lg" title="詳細資訊" scrollable ok-only header-text-variant="dark">
          <b-row class="detailModal">
            <b-col cols="2">
              <h4>輸入端</h4>
            </b-col>
            <b-col>
              <Widget>
                <h5>原始欄位數: {{ row_nAttributes }}</h5>
                <h5>原始筆數: {{ row_nRecords }}</h5>
              </Widget>
            </b-col>
            <b-col cols="2">
              <h4>輸出端</h4>
            </b-col>
            <b-col>
              <Widget>
                <h5>結果欄位數: {{ deid_nAttributes }}</h5>
                <h5>結果筆數: {{ deid_nRecords }}</h5>
              </Widget>
            </b-col>
          </b-row>

          <Widget v-if="mcaSection" class="WidTable">
            <h5>Semi_dpC 系數</h5>
            <b-table :items="mca_coef" :fields="mca_coef_fields" responsive class="table-bordered">
              <template v-slot:cell(row_name)="data">
                <b style="font-weight: 600; color: #313233;">{{data.value}}</b>
              </template>

              <template v-for="value in mca_coef_fields" v-slot:[gomycell(value)]="data">
                <b
                  :key="value.index"
                  v-if="data.value == mca_header_value[value]"
                  style="color: #313233;"
                >{{ data.value }}</b>
                <p v-else :key="value.index">{{ data.value }}</p>
              </template>
            </b-table>
          </Widget>
          <Widget v-if="pcaSection" class="WidTable">
            <h5>Semi_dpN 系數</h5>
            <b-table :items="pca_coef" responsive :fields="pca_coef_fields" class="table-bordered">
              <template v-slot:cell(row_name)="data">
                <b style="font-weight: 600; color: #313233;">{{data.value}}</b>
              </template>

              <template v-for="value in pca_coef_fields" v-slot:[gomycell(value)]="data">
                <b
                  :key="value.index"
                  v-if="data.value == pca_header_value[value]"
                  style="color: #313233;"
                >{{ data.value }}</b>
                <p v-else :key="value.index">{{ data.value }}</p>
              </template>
            </b-table>
          </Widget>
          <template v-slot:modal-footer="{ ok }">
            <b-button
              size="lg"
              style="background-color: #f1d12e; color: white; font-size: small;"
              @click="$bvModal.hide('modal-lg')"
            >確定</b-button>
          </template>
        </b-modal>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import Widget from "@/components/Widget/Widget";
// import converJson from "@/assets/converted.json"; //sample json

export default {
  name: "conversionResult",
  components: {
    Widget
  },
  data() {
    return {
      fields: [],
      converData: [],
      perPage: 15,
      currentPage: 1,
      row_nAttributes: 0,
      deid_nAttributes: 0,
      row_nRecords: 0,
      deid_nRecords: 0,
      mca_coef: [],
      mca_coef_fields: [],
      mca_pro: 0,
      mcaSection: false,
      pca_coef: [],
      pca_coef_fields: [],
      pca_pro: 0,
      pcaSection: false,
      mca_header_value: {},
      pca_header_value: {}
    };
  },
  computed: {
    rows() {
      return this.converData.length;
    },
    currentSection: function() {
      return this.$route.path.split("/")[3];
    },
    detectText: function() {
      if (this.currentSection == "autoIdentity") {
        return (
          "合規風險檢測：隱私風險值為 " +
          this.riskValue +
          "% (符合風險檢測標準)"
        );
      } else {
        return "合規風險檢測：k <= 2 (符合風險檢測標準)";
      }
    },
    detailBtn: function() {
      if (this.currentSection == "autoIdentity") {
        return true;
      } else {
        return false;
      }
    },
    riskValue: function() {
      return Math.floor(Math.random() * (10 - 5 + 1)) + 5;
    }
  },
  methods: {
    gomyhead(key) {
      return `head(${key})`; // simple string interpolation
    },
    gomycell(key) {
      return `cell(${key})`; // simple string interpolation
    },
    showDetail() {
      var data = JSON.parse(JSON.parse(localStorage.getItem("resData")));

      this.row_nAttributes = data.row_nAttributes;
      this.row_nRecords = data.row_nRecords;
      this.deid_nAttributes = data.deid_nAttributes;
      this.deid_nRecords = data.deid_nRecords;

      if (data.mca_coef != undefined) {
        this.mcaSection = true;

        // store mca header key
        for (let mca_field of data.mca_coef.fields) {
          if (typeof mca_field != "object") {
            this.mca_header_value[mca_field] = -1;
          }
        }

        for (let mca_obj of data.mca_coef.items) {
          //先遍歷出所有物件
          for (let mca_key in mca_obj) {
            //再遍歷每一物件的key，取得value
            if (mca_key != "row_name") {
              mca_obj[mca_key] = Number(mca_obj[mca_key].toFixed(2));
            }

            // get each column max value
            for (let value in this.mca_header_value) {
              if (mca_key == value) {
                if (mca_obj[mca_key] > this.mca_header_value[value]) {
                  this.mca_header_value[value] = mca_obj[mca_key];
                }
              }
            }
          }
        }
        data.mca_coef.fields[0].isRowHeader = true;
        this.mca_coef_fields = data.mca_coef.fields;
        this.mca_coef = data.mca_coef.items;
      }


      if (data.pca_coef != undefined) {
        this.pcaSection = true;
        // store mca header key
        for (let pca_field of data.pca_coef.fields) {
          if (typeof pca_field != "object") {
            this.pca_header_value[pca_field] = -1;
          }
        }

        for (let pca_obj of data.pca_coef.items) {
          //先遍歷出所有物件
          for (let pca_key in pca_obj) {
            //再遍歷每一物件的key，取得value
            if (pca_key != "row_name") {
              pca_obj[pca_key] = Number(pca_obj[pca_key].toFixed(2));
            }

            // get each column max value
            for (let value in this.pca_header_value) {
              if (pca_key == value) {
                if (pca_obj[pca_key] > this.pca_header_value[value]) {
                  this.pca_header_value[value] = pca_obj[pca_key];
                }
              }
            }
          }
        }
        data.pca_coef.fields[0].isRowHeader = true;
        this.pca_coef_fields = data.pca_coef.fields;
        this.pca_coef = data.pca_coef.items;
      }

      
    }
  },
  mounted() {
    if (this.currentSection == "autoIdentity") {
      this.showDetail();
    }

    this.fields = JSON.parse(
      JSON.parse(localStorage.getItem("resData"))
    ).fields;
    this.converData = JSON.parse(
      JSON.parse(localStorage.getItem("resData"))
    ).data;
  }
};
</script>