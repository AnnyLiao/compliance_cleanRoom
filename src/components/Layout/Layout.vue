<template>
<div :class="{root: true, sidebarClose}">
  <!-- <Helper /> -->
  <Header />
  <Sidebar />
  <div class="content animated fadeInUp">
    <transition name="router-animation">
      <router-view />
    </transition>
  </div>

</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

import Sidebar from '@/components/Sidebar/Sidebar';
import Header from '@/components/Header/Header';

import './Layout.scss';

export default {
  name: 'Layout',
  components: { Sidebar, Header},
  methods: {
    ...mapActions(
      'layout', ['switchSidebar', 'changeSidebarActive'],
    ),
  },
  computed: {
    ...mapState('layout', {
      sidebarClose: state => state.sidebarClose,
    }),
  },
  created() {
  },
};
</script>

<style src="./Layout.scss" lang="scss" />
