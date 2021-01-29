module.exports = (
  Bacon,
  fieldA,
  validationA,
  fieldB,
  validationB,
  fieldC,
  validationC
) => {
  const fieldAValid = fieldA.map(validationA).toProperty(false)
  const fieldBValid = fieldB.map(val => val ? validationB(val) : true).toProperty(true)
  const fieldCValid = fieldC.map(validationC).toProperty(false)
  const formValid   = a.and(b).and(c)

  return {
    fieldAValid,
    fieldBValid,
    fieldCValid,
    formValid
  }
}
