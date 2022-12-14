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
                <!-- Tabs View starts -->
                <div
                  style="position: relative"
                  class="d-flex flex-column flex"
                  data-testid-tabs
                >
                  <!-- v-tab and v-tabs-items is written inside v-tabs because v-tabs has flex: 1 CSS from Vuetify. So, if we keep v-tab and v-tabs-items separate like Vuetify shows in examples, then, the tabs will occupy flex height and prevent the tab content from occupying full height-->
                  <v-tabs
                    class="v-tabs-v3 d-flex flex-column"
                    v-model="activeTab"
                    ref="tabs"
                  >
                    <v-tab
                      v-for="tab in tabs"
                      :key="`header-${tab.title}`"
                      :data-testid-tab-title="tab.title"
                      class="px-2"
                      active-class="active-tab"
                    >
                      <span
                        class="v3 text-none text-h4 text-truncate"
                        :title="tab.title"
                      >
                        {{ tab.title }}
                      </span>
                    </v-tab>
                    <v-tabs-items
                      class="btn-visibility transparent cyan lighten-4 flex d-flex flex-column"
                      v-model="activeTab"
                    >
                      <v-tab-item
                        v-for="tab in tabs"
                        :key="`content-${tab.title}`"
                        class="flex flex-column"
                        active-class="active-tab-item"
                      >
                        <v-card
                          flat
                          class="mt-2 flex d-flex flex-column"
                          color="transparent"
                        >
                          <!-- Timeline content starts -->
                          <div data-testid-list v-if="tab.title === 'Timeline'">
                            <div>Timeline Content</div>
                          </div>
                          <!-- Timeline content ends -->
                          <!-- Models Content starts -->
                          <!-- Bottom tabs starts -->
                          <div
                            data-testid-bottom-tabs
                            class="flex d-flex flex-column"
                            v-if="tab.title === 'Models'"
                          >
                            <v-tabs-items
                              v-model="activeBottomTab"
                              :ref="`bottomTabItems-${tab.title}`"
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
                                  <!-- Ready Table starts -->
                                  <div
                                    data-testid-list
                                    class="flex"
                                    v-if="bottomTab.title === 'Ready'"
                                  >
                                    <ag-grid-vue
                                      style="width: 100%; height: 100%"
                                      class="ag-theme-material"
                                      :columnDefs="readyHeaders"
                                      :rowData="readyItems"
                                      v-resize.quiet="resizeHandler"
                                      @grid-ready="onGridReady"
                                    >
                                    </ag-grid-vue>
                                  </div>
                                  <!-- Ready Table ends -->
                                  <!-- Processing Table starts -->
                                  <div
                                    data-testid-list
                                    class="flex"
                                    v-if="bottomTab.title === 'Processing'"
                                  >
                                    <ag-grid-vue
                                      style="width: 100%; height: 100%"
                                      class="ag-theme-material"
                                      :columnDefs="processingHeaders"
                                      :rowData="processingItems"
                                      v-resize.quiet="resizeHandler"
                                      @grid-ready="onGridReady"
                                    >
                                    </ag-grid-vue>
                                  </div>
                                  <!-- Processing Table ends -->
                                </v-card>
                              </v-tab-item>
                            </v-tabs-items>
                            <v-tabs
                              v-model="activeBottomTab"
                              show-arrows
                              hide-slider
                              class="amber"
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
                          <!-- Bottom tabs ends -->
                          <!-- Models Content ends -->
                          <!-- Events Content starts -->
                          <div data-testid-list v-if="tab.title === 'Events'">
                            <div>Events Content</div>
                          </div>
                          <!-- Events Content ends -->
                        </v-card>
                      </v-tab-item>
                    </v-tabs-items>
                  </v-tabs>
                </div>
                <!-- Tabs View ends -->
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
import GenerateItemsMixin from '@/mixins/GenerateItemsMixin'
import { AgGridVue } from 'ag-grid-vue'

export default {
  mixins: [GenerateItemsMixin],
  components: {
    AgGridVue
  },
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

      // Common Table Props
      tableProps: {
        itemsPerPage: 10,
        itemKey: 'name'
      },

      // Top level Tabs Stuff
      activeTab: 0,
      tabs: [{ title: 'Models' }, { title: 'Timeline' }, { title: 'Events' }],

      // Bottom tabs stuff
      activeBottomTab: 0,
      bottomTabs: [{ title: 'Ready' }, { title: 'Processing' }],

      // Ready table Stuff
      readyHeaders: [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Type', field: 'type' },
        { headerName: 'Description', field: 'description' },
        { headerName: 'Live', field: 'live' },
        { headerName: 'Created', field: 'createTime' }
      ],

      // Processing table stuff
      processingHeaders: [
        { headerName: 'Description', field: 'description' },
        { headerName: 'Type', field: 'flowType' },
        { headerName: 'Created', field: 'createTime' },
        { headerName: 'Status', field: 'status' }
      ],

      // Ag-grid stuff
      gridApi: null,
      columnApi: null
    }
  },
  computed: {
    readyItems() {
      return this.generateItems(this.readyHeaders, 10, 'field')
    },
    processingItems() {
      return this.generateItems(this.processingHeaders, 100, 'field')
    }
  },
  methods: {
    onGridReady(params) {
      this.gridApi = params.api
      this.columnApi = params.columnApi

      // Check if columns need to be resized on load
      this.resizeHandler()
    },
    resizeHandler() {
      this.gridApi.sizeColumnsToFit()
    },
    isBottomTabActive(index) {
      return this.activeBottomTab === index
    }
  }
}
</script>

<style scoped>
/* Tabs related styling */
.v-tabs-floating >>> .v-tabs-bar {
  position: absolute;
  z-index: 1;
  padding-bottom: 3px;
}
:deep(.v-tabs-v3 > .v-tabs-bar) {
  background-color: transparent;
  height: 3.3rem;
}
.active-tab .v3 {
  font-weight: 700;
}
.btn-visibility {
  overflow: visible;
}
.active-tab-item {
  display: flex;
}
:deep([data-testid-tabs] .v-tabs-items > .v-window__container) {
  flex: 1;
}

/* Bottom tabs styling */
[data-testid-bottom-tabs] .v-tabs {
  flex: none; /* Makes tab content occupy the entire vertical height and keeps tabs buttons at the bottom*/
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
</style>
