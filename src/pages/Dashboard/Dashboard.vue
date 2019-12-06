<template>
  <div class="dashboard-page text-center">
    <h1 style="font-weight: 400;">- 歡迎體驗 -</h1>
    <h2 class="display-4">數據交換無塵室</h2>
    <h4 style="font-weight: 400; letter-spacing: 5px;">您可以選擇左側欄的工具列，開始您想要的服務</h4>
    <img :src="images" alt="..." />
  </div>
</template>

<script>
import Vue from "vue";
import Widget from "@/components/Widget/Widget";
// import Map from "./components/Map/Map";
// import AnimatedNumber from "animated-number-vue";
// import AreaChart from "./components/AreaChart/AreaChart";

const todos = [
  {
    description: "Take Sebastian to basketball practice.",
    isComplete: false,
    dates: { weekdays: 6, weeklyInterval: 2 }, // Every other Friday
    color: "#ff8080" // Red
  },
  {
    description: "German courses",
    isComplete: false,
    dates: new Date(),
    color: "#64a4ff" // Red
  },
  {
    description: "Constitution Day",
    isComplete: false,
    dates: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // in 6 days
    color: "#6ae696" // Red
  }
];

export default {
  name: "Dashboard",
  components: {
    Widget,
    // Map,
    // AnimatedNumber,
    // AreaChart
  },
  data() {
    return {
      checkedArr: [false, false, false],
      dataCollection: null,
      todos,
      images: require('../../assets/dashboard.png')
    };
  },
  mounted() {
    this.fillData();
  },
  methods: {
    checkTable(id) {
      let arr = [];
      if (id === 0) {
        const val = !this.checkedArr[0];
        for (let i = 0; i < this.checkedArr.length; i += 1) {
          arr[i] = val;
        }
      } else {
        arr = this.checkedArr;
        arr[id] = !arr[id];
      }
      if (arr[0]) {
        let count = 1;
        for (let i = 1; i < arr.length; i += 1) {
          if (arr[i]) {
            count += 1;
          }
        }
        if (count !== arr.length) {
          arr[0] = !arr[0];
        }
      }
      Vue.set(this, "checkedArr", arr);
    },
    fillData() {
      this.dataCollection = {
        labels: [
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt(),
          this.getRandomInt()
        ],
        datasets: [
          {
            label: "Data One",
            backgroundColor: "#f87979",
            borderColor: "transparent",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          },
          {
            label: "Data Two",
            backgroundColor: "#7c87f8",
            borderColor: "transparent",
            data: [
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt(),
              this.getRandomInt()
            ]
          }
        ]
      };
    },
    getRandomInt() {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5;
    }
  },
  computed: {
    calendarAttributes() {
      return [
        // Today attribute
        {
          contentStyle: {
            fontWeight: "700",
            fontSize: ".9rem"
          },
          dates: new Date()
        },
        // Attributes for todos
        ...this.todos.map(todo => ({
          dates: todo.dates,
          dot: {
            backgroundColor: todo.color,
            opacity: todo.isComplete ? 0.3 : 1
          },
          popover: {
            label: todo.description
          }
        }))
      ];
    }
  }
};
</script>



<style src="./Dashboard.scss" lang="scss"/>

