<template>
  <div>
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
      <v-container fluid class="red lighten-3 py-1 px-3 ma-0">
        <v-row align="center" justify="end">
          <span class="ml-4">{{ accountTitle }}</span>
          <v-spacer></v-spacer>
          <v-btn elevation="0" color="transparent">Some Button</v-btn>
        </v-row>
        <transition mode="out-in">
          <!-- CompositeView Code starts -->
          <v-container fluid class="blue lighten-5 pa-0 ma-0">
            <div class="column flex no-gutters">
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

              <div class="px-3 py-0 mb-2 lime lighten-3">
                <!-- Tabs View starts -->
                <div style="position: relative">
                  <v-tabs class="v-tabs-v3" v-model="activeTab" ref="tabs">
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
                  </v-tabs>
                  <v-tabs-items
                    class="btn-visibility transparent cyan lighten-4"
                    v-model="activeTab"
                  >
                    <v-tab-item
                      v-for="tab in tabs"
                      :key="`content-${tab.title}`"
                    >
                      <v-card flat class="mt-2" color="transparent">
                        <!-- Recent Table starts -->
                        <div data-testid-list v-if="tab.title === 'Recents'">
                          <v-data-table
                            :headers="recentHeaders"
                            :items="recentItems"
                            v-bind="tableProps"
                            class="elevation-1"
                          ></v-data-table>
                        </div>
                        <!-- Recent Table ends -->
                        <!-- Datastream Table starts -->
                        <div
                          data-testid-list
                          v-if="tab.title === 'Datastreams'"
                        >
                          <v-data-table
                            :headers="datastreamHeaders"
                            :items="datastreamItems"
                            v-bind="tableProps"
                            class="elevation-1"
                          ></v-data-table>
                        </div>
                        <!-- Datastream Table ends -->
                      </v-card>
                    </v-tab-item>
                  </v-tabs-items>
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

      // Tabs Stuff
      activeTab: 0,
      tabs: [{ title: 'Recents' }, { title: 'Datastreams' }],

      // Common Table Props
      tableProps: {
        itemsPerPage: 10,
        itemKey: 'name'
      },
      // Recent table Stuff
      recentHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Datastream', value: 'datastream' },
        { text: 'Models', value: 'modelCount' },
        { text: 'Last Accessed', value: 'lastAccessTime' },
        { text: 'Actions', value: 'action' }
      ],

      // Datastream table stuff
      datastreamHeaders: [
        { text: 'Name', value: 'name' },
        { text: 'Created', value: 'createTime' },
        { text: 'Signals', value: 'signalCount' },
        { text: 'Entities', value: 'entityCount' },
        { text: 'Assessments', value: 'assessmentCount' },
        { text: 'Data Points', value: 'dataPoints' },
        { text: 'Actions', value: 'action' }
      ]
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
    generateItems(headers, itemsCount) {
      const listOfItems = []
      for (let i = 0; i < itemsCount; i++) {
        const item = headers.reduce((memo, header) => {
          // For each header, provide some random string or timestamp
          if (header.value.toLowerCase().includes('time')) {
            memo[header.value] = new Date().toISOString()
          } else {
            memo[header.value] = (Math.random() + 1).toString(36).substring(3)
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
  top: 7px;
}
.active-tab .v3 {
  font-weight: 700;
}
.btn-visibility {
  overflow: visible;
}
</style>
