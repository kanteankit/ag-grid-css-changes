import AccountDetail from '../ag-grid-off/existing-code/AccountDetail.vue'

const urlPrefix = `ag-grid-off-existing`
export const namePrefix = 'existing'
export default [
  {
    path: `/${urlPrefix}/accountDetail`,
    name: `${namePrefix}AccountDetail`,
    component: AccountDetail
  }
]
