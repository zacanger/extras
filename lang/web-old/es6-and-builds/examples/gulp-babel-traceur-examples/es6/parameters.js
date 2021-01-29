class Car {
  currentYear() {
    return new Date().getFullYear()
  }
  setDetails(make = 'No Make', model = 'No Model', year = this.currentYear(), ...accessories) {
    console.log(make + ' ' + model + ' ' + year)
    if (accessories) {
      for (var i = 0; i < accessories.length; i++) {
        console.log('\n' + accessories[i])
      }
    }
  }
}

var car = new Car()
car.setDetails('Chevy', 'Cavalier')
car.setDetails()
car.setDetails('Ford', 'Tempo', 1992, 'duct-tape', 'keys', 'doors')

