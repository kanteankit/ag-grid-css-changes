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
                          <!-- Recent Table starts -->
                          <div
                            data-testid-list
                            class="flex"
                            v-if="tab.title === 'Recents'"
                          >
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
                            class="flex"
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

export default {
  mixins: [GenerateItemsMixin],
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
:deep([data-testid-tabs] .v-tabs-items > .v-window__container) {
  flex: 1;
}
</style>
