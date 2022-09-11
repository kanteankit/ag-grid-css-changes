<template>
  <div class="pa-3">
    <h3>Open a group and then click on a layout</h3>
    <v-card
      v-for="(group, groupIndex) in groups"
      :key="groupIndex"
      class="mb-6"
    >
      <v-list-group>
        <template #activator>
          <v-list-item-title>{{ group.name }}</v-list-item-title>
        </template>

        <template v-for="(linkItem, index) in group.links">
          <v-list-item :to="linkItem.to" :key="linkItem.to.name">
            <v-list-item-content>
              <v-list-item-subtitle>{{
                linkItem.description
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider :key="index"></v-divider>
        </template>
      </v-list-group>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  data() {
    return {
      groups: [
        {
          name: 'Ag-grid off, Existing code',
          links: [
            {
              to: { name: 'existingAccountDetail' },
              description:
                'Existing Account detail page (The one that shows recents assessments, datastreams and live models)'
            }
          ]
        },
        {
          name: 'Ag-grid off, Proposed code',
          links: [
            {
              to: { name: 'proposedAccountDetail' },
              description: 'Proposed Account detail page'
            }
          ]
        },
        {
          name: 'Ag-grid on, Proposed code',
          links: [
            {
              to: { name: 'agGridOnAccountDetail' },
              description: 'Proposed Account detail page with ag-grid on'
            }
          ]
        }
      ]
    }
  }
}
</script>
