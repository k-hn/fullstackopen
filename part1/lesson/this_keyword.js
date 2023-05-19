const arto = {
	name: "Arto Hellas",
	age: 35,
	education: "PhD",
	greet: function() {
		console.log(`hello, my name is ${this.name}`);
	},
	doAddition: function(a, b) {
		console.log(a + b);
	}
}

arto.doAddition(1, 4);

const referenceToAddition = arto.doAddition;
referenceToAddition(10, 15);


arto.greet()

const referenceToGreet = arto.greet // needs to be binded to object `arto` so that `this` context is not lost
referenceToGreet()

setTimeout(arto.greet.bind(arto), 1000);
