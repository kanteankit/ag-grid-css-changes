<template>
  <div class="flex-grow-1 d-flex flex-column">
    <!-- Navigation drawers Start -->
    <div>
      <v-navigation-drawer
        app
        permanent
        :width="treeDrawerWidth"
        class="yellow lighten-4"
        >Drawer
      </v-navigation-drawer>
      <v-navigation-drawer
        mini-variant
        permanent
        fixed
        :mini-variant-width="miniDrawerWidth"
        class="purple lighten-5"
        >Mini
        <v-btn icon to="/"><v-icon>mdi-home</v-icon></v-btn>
      </v-navigation-drawer>
    </div>
    <!-- Navigation drawers End -->

    <!-- v-main starts here -->
    <v-main class="text-h5 mt-1 red lighten-4" :style="mainSectionStyle">
      <v-system-bar
        v-if="systemBarVisible"
        class="pa-4 justify-center elevation-5 text-h5"
      ></v-system-bar>
      <v-container
        fluid
        class="red lighten-3 py-1 px-3 ma-0 fill-height flex-column d-flex"
      >
        <div class="d-flex align-center align-self-stretch">
          <span>{{ accountTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="transparent">Some Button</v-btn>
        </div>
        <transition mode="out-in">
          <!-- CompositeView Code starts -->
          <v-container
            fluid
            class="d-flex blue lighten-5 pa-0 ma-0 flex flex-column"
          >
            <div class="d-flex flex-column compositeWrapper flex">
              <!-- For loop on `views` config renders the title and tabs view -->

              <div class="px-3 py-0 mb-2 green lighten-3">
                <!-- Title View Starts-->
                <v-row
                  data-testid-title
                  align="center"
                  no-gutters
                  class="mb-1 mt-3"
                >
                  <h2
                    class="text-h4 font-weight-semibold mr-1"
                    data-testid-titlemenu-title
                  >
                    {{ pageTitle }}
                  </h2>
                </v-row>
                <!-- Title View Ends -->
              </div>

              <div
                class="px-3 py-0 mb-2 lime lighten-3 flex d-flex flex-column"
              >
                <!-- Report Detail starts -->
                <div
                  no-gutters
                  data-id-report-detail
                  class="flex d-flex flex-column"
                >
                  <div class="d-flex justify-end red darken-1">
                    <v-btn icon><v-icon>mdi-plus</v-icon></v-btn>
                  </div>

                  <div class="purple lighten-3 d-flex flex-column flex">
                    <!-- Bottom Tabs View starts -->
                    <div
                      data-testid-bottom-tabs
                      class="flex d-flex flex-column"
                    >
                      <v-tabs-items
                        v-model="activeBottomTab"
                        ref="bottomTabItems"
                        class="btn-visibility transparent amber flex d-flex flex-column"
                      >
                        <v-tab-item
                          v-for="bottomTab in bottomTabs"
                          :key="`content-${bottomTab.title}`"
                          class="flex-column flex"
                          active-class="active-bottom-tab-item"
                        >
                          <v-card
                            flat
                            class="mt-2 flex d-flex flex-column"
                            color="transparent"
                          >
                            <!-- ReportCoversheet  starts -->
                            <div
                              data-report-coversheet
                              class="flex d-flex flex-column mb-12"
                              v-if="bottomTab.title === 'Coversheet'"
                            >
                              <v-container
                                fluid
                                class="py-0 flex d-flex flex-column"
                              >
                                <v-card v-if="isTinyMceLoading">
                                  <v-skeleton-loader
                                    :height="editorHeight"
                                    type="image"
                                  ></v-skeleton-loader
                                ></v-card>
                                <div id="editorId" v-else></div>
                                <v-toolbar
                                  dense
                                  flat
                                  class="pa-0 toolbarStyling flex-grow-0"
                                >
                                  <v-spacer></v-spacer>
                                  <span
                                    v-if="lastUpdateTime"
                                    class="px-3 font-italic"
                                    >{{ lastUpdateTime }}</span
                                  >
                                  <v-btn color="primary"> save </v-btn>
                                </v-toolbar>
                              </v-container>
                            </div>
                            <!-- ReportCoversheet Content ends -->
                            <!-- Timeline starts -->
                            <div
                              data-testid-list
                              v-if="bottomTab.title === 'Timeline'"
                            >
                              <div>Timeline content</div>
                            </div>
                            <!-- Timeline ends -->
                            <!-- Svd 2x2 starts -->
                            <div
                              data-testid-list
                              v-if="bottomTab.title === 'SVD 2x2'"
                            >
                              <div>SVD 2x2</div>
                            </div>
                            <!-- Svd 2x2 -->
                          </v-card>
                        </v-tab-item>
                      </v-tabs-items>
                      <v-tabs
                        v-model="activeBottomTab"
                        show-arrows
                        hide-slider
                        class="amber"
                        :style="bottomTabBarStyle"
                      >
                        <v-tab
                          v-for="(bottomTab, index) in bottomTabs"
                          :key="`header-${bottomTab.title}`"
                          :data-testid-bottom-tab-title="bottomTab.title"
                          class="px-2 v3 text-none text-h4 text-truncate"
                          :class="{
                            'v-tab-active': isBottomTabActive(index),
                            'v-tab-hover': !isBottomTabActive(index)
                          }"
                        >
                          <span
                            class="v3 text-none text-h4 text-truncate"
                            :title="bottomTab.title"
                          >
                            {{ bottomTab.title }}
                          </span>
                        </v-tab>
                      </v-tabs>
                    </div>
                    <!-- Bottom Tabs View ends -->
                  </div>
                </div>
                <!-- Report Detail ends -->
              </div>

              <!-- For loop ends -->
            </div>
          </v-container>
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
      // Drawer stuff
      miniDrawerWidth: '56',
      treeDrawerWidth: '300',
      treeDrawerStyle: `left: ${this.miniDrawerWidth}`,

      // v-main stuff
      mainSectionStyle: `margin-left:${this.miniDrawerWidth}px; padding-left:${this.treeDrawerWidth}`,
      systemBarVisible: false,
      accountTitle: 'My Account',
      pageTitle: 'My Account',

      // Bottom tabs stuff
      activeBottomTab: 0,
      tabItemsWidth: '82%', // This is set by resize event in BottomTabsView.
      bottomTabs: [
        { title: 'Coversheet' },
        { title: 'Timeline' },
        { title: 'SVD 2x2' }
      ],

      // TinyMCE stuff
      isTinyMceLoading: false,
      lastUpdateTime: '3 minutes ago'
      // editorHeight: 500
    }
  },
  mounted() {
    this.initEditor()
  },
  computed: {
    bottomTabBarStyle() {
      return { width: this.tabItemsWidth }
    }
  },
  methods: {
    isBottomTabActive(index) {
      return this.activeBottomTab === index
    },
    initEditor() {
      window.tinymce.init({
        selector: `#editorId`,
        cleanup: true,
        menubar: false,
        branding: false,
        statusbar: false,
        toolbar_location: 'top',
        toolbar_sticky: true,
        toolbar_sticky_offset: 63,
        image_description: false,
        image_title: false,
        image_dimensions: false,
        media_poster: false,
        media_alt_source: false,
        media_dimensions: false,
        link_default_target: '_blank',
        link_title: false,
        plugins: [
          'image',
          'media',
          'lists',
          'advlist',
          'autolink',
          'autoresize',
          'table',
          'link'
        ],
        link_context_toolbar: true,
        content_style:
          'body { line-height: 1.1;overflow-y:visible !important; } img {max-width: 100%;}',
        max_height: '100%',
        min_height: '100%',
        toolbar:
          'bold italic underline link forecolor image media anchor numlist bullist alignleft aligncenter alignright alignjustify table h1 h2 h3 h4 h5 h6',
        file_picker_types: 'image'
      })
    }
  }
}
</script>

<style scoped>
/* Bottom tabs styling */
[data-testid-bottom-tabs] .v-tabs {
  position: fixed;
  z-index: 1;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #c0c0c0;
  border-radius: 5px 5px 0 0;
}
[data-testid-bottom-tabs] .v-tab {
  background-color: #ecf3fb;
  color: #000;
  border-radius: 4px;
  margin: 8px 0px 8px 8px;
  box-shadow: inset 0px 11px 8px -10px #c0c0c0;
  font-weight: 600;
  font-size: 14px;
}
[data-testid-bottom-tabs] .v-tab-active {
  background-color: #4696ec;
  color: #fff;
  border-radius: 4px;
  margin: 8px 0px 8px 8px;
  font-weight: bold;
  font-size: 14px;
}
[data-testid-bottom-tabs] .v-tab-hover {
  background-color: #f2f9ff;
  color: #000;
  border-radius: 4px;
  margin: 8px 0px 8px 8px;
  border: auto;
  font-weight: 600;
  font-size: 14px;
  box-shadow: inset 0px 11px 8px -10px #c0c0c0;
}
:deep([data-testid-bottom-tabs] .v-tabs-items > .v-window__container) {
  flex: 1;
}
.active-bottom-tab-item {
  display: flex;
}

/* TinyMCE stuff from ReportCoversheet */
.toolbarStyling {
  border: 2px solid #eee;
  border-radius: 0px 0px 10px 10px;
}
:deep(.tox.tox-tinymce.tox-tinymce--toolbar-sticky-off) {
  border-radius: 10px 10px 0px 0px !important;
  height: calc(
    100% - 48px
  ) !important; /* Reduced 48px for the editors toolbar that has the Save button */
}
</style>
