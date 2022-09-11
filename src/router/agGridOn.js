import AccountDetail from '../ag-grid-on/AccountDetail.vue'

const urlPrefix = `ag-grid-on`
export const namePrefix = 'agGridOn'
export default [
  {
    path: `/${urlPrefix}/accountDetail`,
    name: `${namePrefix}AccountDetail`,
    component: AccountDetail
  }
]
