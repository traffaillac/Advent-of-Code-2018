let f = new Array(300)
for (let y = 0; y < 300; y++) {
	f[y] = new Array(300)
	for (let x = 0; x < 300; x++) {
		let rack = x + 11
		f[y][x] = ((rack * (y + 1) + 1723) * rack / 100 | 0) % 10 - 5
	}
}

let best = -45
for (let s = 1; s <= 300; s++) {
	console.log(`s=${s}`)
	for (let Y = 0; Y <= 300 - s; Y++) {
		for (let X = 0; X <= 300 - s; X++) {
			let p = 0
			for (let y = Y; y < Y + s; y++) {
				for (let x = X; x < X + s; x++)
					p += f[y][x]
			}
			if (p > best) {
				best = p
				console.log(`${X + 1},${Y + 1},${s}`)
			}
		}
	}
}
