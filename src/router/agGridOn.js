import AccountDetail from '../ag-grid-on/AccountDetail.vue'
import ModelsPage from '../ag-grid-on/ModelsPage.vue'
import ReportDetail from '../ag-grid-on/ReportDetail.vue'

const urlPrefix = `ag-grid-on`
export const namePrefix = 'agGridOn'
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
  },
  {
    path: `/${urlPrefix}/reportDetail`,
    name: `${namePrefix}ReportDetail`,
    component: ReportDetail
  }
]
