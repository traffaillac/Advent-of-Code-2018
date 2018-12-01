const input = require('./input')

let f = 0
let seen = new Set([0])
for (let d; !isNaN(d = input.num()); ) {
	f += d
	if (seen.has(f)) {
		console.log(f)
		break
	}
	seen.add(f)
}
console.log(f)
