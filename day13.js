const input = require('./input')

function Cart(c, x, y) {
	this.dir = '>v<^'.indexOf(c)
	this.turn = 0
	this.x = x
	this.y = y
}

let carts = []
let tracks = input.lines().map((l, y) => {
	for (let x = 0; x < l.length; x++) {
		if ('>v<^'.includes(l[x]))
			carts.push(new Cart(l[x], x, y))
	}
	return l.replace(/\^|v/, '|').replace(/>|</, '-')
})
console.log(carts)

while (carts.length > 1) {
	carts.sort((a, b) => a.y === b.y ? a.x - b.x : a.y - b.y)
	for (let i = 0; i < carts.length; i++) {
		let c = carts[i]
		c[(c.dir & 1) === 0 ? 'x' : 'y'] += c.dir < 2 ? 1 : -1
		let t = tracks[c.y][c.x]
		c.dir ^= t === '\\' ? 1 : t === '/' ? 3 : 0
		if (t === '+') {
			c.dir = (c.dir + 3 + c.turn) & 3
			c.turn = [1, 2, 0][c.turn]
		}
		let j = carts.findIndex(d => d !== c && d.x === c.x && d.y === c.y)
		if (j !== -1) {
			console.log(`Crash at ${c.x},${c.y}`)
			carts.splice(j, 1)
			i -= j < i ? 1 : 0
			carts.splice(i, 1)
			i--
		}
	}
}
console.log(carts)
