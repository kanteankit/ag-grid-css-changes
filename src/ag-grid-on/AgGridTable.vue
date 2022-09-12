<template>
  <ag-grid-vue
    style="width: 100%; height: 100%"
    class="ag-theme-material"
    :columnDefs="columnDefs"
    :rowData="rowData"
  >
  </ag-grid-vue>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'

export default {
  components: {
    AgGridVue
  },
  data() {
    return {
      columnDefs: [
        { headerName: 'Make', field: 'make' },
        { headerName: 'Model', field: 'model' },
        { headerName: 'Price', field: 'price' }
      ],
      rowData: [
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxster', price: 72000 }
      ]
    }
  }
}
</script>
