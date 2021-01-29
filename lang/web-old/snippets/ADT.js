export default (...fields) =>
  class ADT {
    constructor (...values) {
      fields.forEach((field, i) => {
        this[field] = values[i]
      })
    }
  }
