const input = require('./input')

function Point(x, y, dx, dy) {
	this.x = x
	this.y = y
	this.dx = dx
	this.dy = dy
}

let points = []
for (let p; (p = input.line()) !== undefined; ) {
	let x = parseInt(p.substring(10, 16))
	let y = parseInt(p.substring(18, 24))
	let dx = parseInt(p.substring(36, 38))
	let dy = parseInt(p.substring(40, 42))
	points.push(new Point(x, y, dx, dy))
}

for (let t = 0; t < 10644; t++) {
	let x0 = points[0].x, y0 = points[0].y, x1 = points[0].x, y1 = points[0].y
	for (let p of points) {
		x0 = Math.min(x0, p.x)
		y0 = Math.min(y0, p.y)
		x1 = Math.max(x1, p.x)
		y1 = Math.max(y1, p.y)
	}
	// if (t > 10000) console.log(`t=${t} [${x1 - x0},${y1 - y0}]`)
	if (Math.max(x1 - x0, y1 - y0) <= 80) {
		let bufs = Array.from(new Array(y1 - y0 + 1), () => Buffer.alloc(x1 - x0 + 1, '.'))
		for (let p of points)
			bufs[p.y - y0][p.x - x0] = '#'.charCodeAt()
		console.log(t)
		for (let line of bufs)
			console.log(line.toString())
		console.log()
	}
	for (let p of points) {
		p.x += p.dx
		p.y += p.dy
	}
}
