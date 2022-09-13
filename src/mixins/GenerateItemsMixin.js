export default {
  methods: {
    generateItems(headers, itemsCount, path = 'value') {
      const listOfItems = []
      for (let i = 0; i < itemsCount; i++) {
        const item = headers.reduce((memo, header) => {
          // For each header, provide some random string or timestamp
          if (header[path].toLowerCase().includes('time')) {
            memo[header[path]] = new Date().toISOString()
          } else {
            memo[header[path]] = (Math.random() + 1).toString(36).substring(3)
          }

          return memo
        }, {})

        listOfItems.push(item)
      }

      return listOfItems
    }
  }
}
