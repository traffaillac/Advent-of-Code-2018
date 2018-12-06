const input = require('./input')

let coords = []
let W = 0
let H = 0
for (let pos; (pos = input.nums(2))[0] !== undefined; ) {
	coords.push(pos)
	W = Math.max(W, pos[0])
	H = Math.max(H, pos[1])
}

let size = 0
for (let y = 1; y <= H; y++) {
	for (let x = 1; x <= W; x++) {
		let d = 0
		for (let i = 0; i < coords.length; i++)
			d += Math.abs(x - coords[i][0]) + Math.abs(y - coords[i][1])
		size += d < 10000
	}
}
console.log(size)
