
class Person {
  constructor(options) {
    this.firstName = options.firstName
    this.lastName = options.lastName
    this.age = options.age
  }

  setFirstName(name) {
    this.firstName = name
  }

  setLastName(name) {
    this.lastName = name
  }

  fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  fullDetails() {
    return `${this.fullName()}, ${this.age} years old`
  }



}

module.exports = Person