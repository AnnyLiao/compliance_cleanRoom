<template>
  <b-collapse class="sidebar-collapse" id="sidebar-collapse" :visible="sidebarOpened">
    <nav :class="{sidebar: true}">
      <header class="logo">
        <img src="../../assets/logo.jpg" alt="..." />
      </header>
      <ul class="nav">
        <NavLink :activeItem="activeItem" header="首頁" link="/app/index" index="index" isHeader />

        <NavLink
          :activeItem="activeItem"
          header="資料合規去識別"
          link="/app/convert"
          index="convert"
          :childrenLinks="[
          { header: '-選擇資料集', link: '/app/convert/chooseFile' },
          { header: '-選擇去識別方式', link: '/app/convert/chooseTool' },
          { header: '-設定處理方式', link: convertion },
          { header: '-檢視合規報告', link: convertionResult },
        ]"
        />
        <NavLink
          :activeItem="activeItem"
          header="資料賦能分析"
          link="/app/datafuc"
          index="datafuc"
          :childrenLinks="[
          { header: '-選擇應用情境', link: '/app/datafuc/fun2a' },
          { header: '-選擇內部資料集', link: '/app/datafuc/fun2b' },
          { header: '-選擇外部資料集', link: '/app/datafuc/fun2c' },
          { header: '-檢視分析模型', link: '/app/datafuc/fun2d' },
          { header: '-檢視分析報告', link: '/app/datafuc/fun2e' }

        ]"
        />
      </ul>
    </nav>
  </b-collapse>
</template>

<script>
import { mapState, mapActions } from "vuex";
import NavLink from "./NavLink/NavLink";

export default {
  name: "Sidebar",
  components: { NavLink },
  data() {
    return {
      alerts: [
        {
          id: 0,
          title: "Sales Report",
          value: 15,
          footer: "Calculating x-axis bias... 65%",
          color: "info"
        },
        {
          id: 1,
          title: "Personal Responsibility",
          value: 20,
          footer: "Provide required notes",
          color: "danger"
        }
      ]
    };
  },
  methods: {
    ...mapActions("layout", ["changeSidebarActive", "switchSidebar"]),
    setActiveByRoute() {
      const paths = this.$route.fullPath.split("/");
      paths.pop();
      this.changeSidebarActive(paths.join("/"));
    }
  },
  created() {
    this.setActiveByRoute();
  },
  computed: {
    ...mapState("layout", {
      sidebarOpened: state => !state.sidebarClose,
      activeItem: state => state.sidebarActiveElement
    }),
    convertion: function() {
      return "/app/convert/" + this.$route.path.split("/")[3] + "/conversion";
    },
    convertionResult: function() {
      return "/app/convert/" + this.$route.path.split("/")[3] + "/conversionResult";
    }
  }
};
</script>

<!-- Sidebar styles should be scoped -->
<style src="./Sidebar.scss" lang="scss" scoped/>
