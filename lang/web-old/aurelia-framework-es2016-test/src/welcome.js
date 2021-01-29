export class Welcome {
	heading = 'Hello!'
	firstName = 'jane'
	lastName = 'doe'

	get fullName(){
		return `${this.firstName} ${this.lastName}`
	}

	submit(){
		alert(`Welcome, ${this.fullName}!`)
	}
}

