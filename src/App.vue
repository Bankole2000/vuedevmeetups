<template>
  <v-app>
    <Navbar />
    <router-view class="mt-10" />
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";
// import BottomNav from "@/components/BottomNav";
import Navbar from "@/components/Navbar";

export default {
  name: "App",

  components: {
    // HelloWorld,
    // BottomNav,
    Navbar
  },

  data: () => ({
    //
  })
};
</script>
<style>
/* body #app {
  background-color: #191919;
} */
</style>
