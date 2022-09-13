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
                          <!-- Recent Table starts -->
                          <div
                            data-testid-list
                            class="flex"
                            v-if="tab.title === 'Recents'"
                          >
                            <ag-grid-vue
                              style="width: 100%; height: 100%"
                              class="ag-theme-material"
                              :columnDefs="recentHeaders"
                              :rowData="recentItems"
                              v-resize.quiet="resizeHandler"
                              @grid-ready="onGridReady"
                            >
                            </ag-grid-vue>
                          </div>
                          <!-- Recent Table ends -->
                          <!-- Datastream Table starts -->
                          <div
                            data-testid-list
                            class="flex"
                            v-if="tab.title === 'Datastreams'"
                          >
                            <ag-grid-vue
                              style="width: 100%; height: 100%"
                              class="ag-theme-material"
                              :columnDefs="datastreamHeaders"
                              :rowData="datastreamItems"
                              v-resize.quiet="resizeHandler"
                              @grid-ready="onGridReady"
                            >
                            </ag-grid-vue>
                          </div>
                          <!-- Datastream Table ends -->
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
import { AgGridVue } from 'ag-grid-vue'

export default {
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

      // Tabs Stuff
      activeTab: 0,
      tabs: [{ title: 'Recents' }, { title: 'Datastreams' }],

      // Recent table Stuff
      recentHeaders: [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Datastream', field: 'datastream' },
        { headerName: 'Models', field: 'modelCount' },
        { headerName: 'Last Accessed', field: 'lastAccessTime' },
        { headerName: 'Actions', field: 'action' }
      ],

      // Datastream table stuff
      datastreamHeaders: [
        { headerName: 'Name', field: 'name' },
        { headerName: 'Created', field: 'createTime' },
        { headerName: 'Signals', field: 'signalCount' },
        { headerName: 'Entities', field: 'entityCount' },
        { headerName: 'Assessments', field: 'assessmentCount' },
        { headerName: 'Data Points', field: 'dataPoints' },
        { headerName: 'Actions', field: 'action' }
      ],

      // Ag-grid stuff
      gridApi: null,
      columnApi: null
    }
  },
  computed: {
    recentItems() {
      return this.generateItems(this.recentHeaders, 10)
    },
    datastreamItems() {
      return this.generateItems(this.datastreamHeaders, 100)
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
    generateItems(headers, itemsCount) {
      const listOfItems = []
      for (let i = 0; i < itemsCount; i++) {
        const item = headers.reduce((memo, header) => {
          // For each header, provide some random string or timestamp
          if (header.field.toLowerCase().includes('time')) {
            memo[header.field] = new Date().toISOString()
          } else {
            memo[header.field] = (Math.random() + 1).toString(36).substring(3)
          }

          return memo
        }, {})

        listOfItems.push(item)
      }

      return listOfItems
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
.v-tabs-v3 >>> .v-tabs-bar {
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
[data-testid-tabs] :deep(.v-window__container) {
  flex: 1;
}
</style>
