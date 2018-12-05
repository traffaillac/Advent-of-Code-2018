const input = require('./input')

let p = Buffer.from(input.line(), 'utf8')
for (let unit = 65; unit <= 90; unit++) {
	let b = new Buffer(p)
	let dst = 0
	for (let src = 0; src < b.length; src++) {
		if (b[src] != unit && b[src] != (unit ^ 32))
			b[dst++] = b[src]
	}
	b = b.slice(0, dst)
	
	while (true) {
		dst = 0
		for (let src = 0; src < b.length; src++) {
			if (src < b.length - 1 && b[src] == (b[src + 1] ^ 32))
				src++
			else
				b[dst++] = b[src]
		}
		if (dst == b.length)
			break
		b = b.slice(0, dst)
	}
	console.log(b.length)
}
