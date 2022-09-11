import AccountDetail from '../ag-grid-off/proposed-code/AccountDetail.vue'

const urlPrefix = `ag-grid-off-proposed`
export const namePrefix = 'proposed'
export default [
  {
    path: `/${urlPrefix}/accountDetail`,
    name: `${namePrefix}AccountDetail`,
    component: AccountDetail
  }
]
