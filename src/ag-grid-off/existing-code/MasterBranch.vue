<template>
  <div>
    <!-- Navigation drawers Start -->
    <div>
      <v-navigation-drawer app permanent :style="{ left: miniDrawerWidth }"
        >Drawer</v-navigation-drawer
      >
      <v-navigation-drawer
        mini-variant
        permanent
        fixed
        :mini-variant-width="miniDrawerWidth"
        >Mini
      </v-navigation-drawer>
    </div>
    <!-- Navigation drawers End -->

    <!-- v-main starts here -->
    <v-main class="text-h5 mt-1 red lighten-4">
      <v-system-bar
        v-if="systemBarVisible"
        class="pa-4 justify-center elevation-5 text-h5"
      ></v-system-bar>
      <v-container fluid class="red lighten-3 py-1 px-3 ma-0">
        <v-row align="center" justify="end">
          <span class="ml-4">{{ accountTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="transparent">Some Button</v-btn>
        </v-row>
        <transition mode="out-in">
          <!-- CompositeView Code starts -->

          <!-- CompositeView Code ends -->
        </transition>
      </v-container>
    </v-main>
    <!-- v-main ends here -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      miniDrawerWidth: "56px",
      systemBarVisible: false,
      accountTitle: "My Account",
    };
  },
};
</script>