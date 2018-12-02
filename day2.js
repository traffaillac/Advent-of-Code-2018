const input = require('./input')

let IDs = input.words(250)
for (let a of IDs) {
	for (let b of IDs) {
		let diff = 0
		let pos = 0
		for (let i = 0; i < a.length; i++) {
			if (a[i] !== b[i]) {
				diff++
				pos = i
			}
		}
		if (diff === 1)
			console.log(a.substring(0, pos) + a.substring(pos + 1)
	}
}

let two = 0
let three = 0
for (let id; (id = input.word()) !== undefined; ) {
	let counts = {}
	for (let letter of id) {
		if (!counts[letter])
			counts[letter] = 0
		counts[letter]++
	}
	let has_two = false
	let has_three = false
	for (let letter in counts) {
		if (counts[letter] === 2)
			has_two = true
		else if (counts[letter] === 3)
			has_three = true
	}
	if (has_two)
		two++
	if (has_three)
		three++
}
console.log(two * three)
