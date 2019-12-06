<template>
  <div class="charts-overview">
    <div>
        <apexchart type="line" height="350" :series="cd.apex.column.series" :options="cd.apex.column.options"/>
    </div>
  </div>
</template>

<script>
import Widget from "@/components/Widget/Widget";
import {chartData, liveChart, liveChartInterval} from './Chart_1';

import ECharts from 'vue-echarts/components/ECharts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/themeRiver';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import Highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting';
import exportData from 'highcharts/modules/export-data';

exporting(Highcharts);
exportData(Highcharts);

import { Chart } from 'highcharts-vue';
import Sparklines from '../../components/Sparklines/Sparklines'

export default {
  name: "Charts",
  components: { Widget, echart: ECharts, highcharts: Chart, Sparklines },
  data() {
    return {
      cd: {},
      ld: liveChart,
      initEchartsOptions: {
        renderer: 'canvas'
      },
      sparklineData: {
        series: [{data: [1,7,3,5,7,8]}],
        options1: {
          colors: ['#f0af03'],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        },
        options2: {
          colors: ['#ffc0d9'],
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          }
        }
      }
    };
  },
  mounted() {
    var data = JSON.parse(window.localStorage.getItem("saveitem")||'{}');

var model =  [67, 77, 70];
if(data.step1==0){
    if(data.step4==0){
         chartData.apex.column.series[0].data = [67, 70, 77];
    }else{
         chartData.apex.column.series[0].data = [77, 86, 86];
    }
  
  }else{
    if(data.step4==0){
        chartData.apex.column.series[0].data =  [86, 85, 87];
    }else{
        chartData.apex.column.series[0].data =  [88, 86, 87];
    }
  }
     this.cd = chartData;

  
  },changeValue(data){

  },
  beforeDestroy() {
    clearInterval(liveChartInterval);
  }
};
</script>