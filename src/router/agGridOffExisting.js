import AccountDetail from '../ag-grid-off/existing-code/AccountDetail.vue'
import ModelsPage from '../ag-grid-off/existing-code/ModelsPage.vue'

const urlPrefix = `ag-grid-off-existing`
export const namePrefix = 'existing'
export default [
  {
    path: `/${urlPrefix}/accountDetail`,
    name: `${namePrefix}AccountDetail`,
    component: AccountDetail
  },
  {
    path: `/${urlPrefix}/modelsPage`,
    name: `${namePrefix}ModelsPage`,
    component: ModelsPage
  }
]
