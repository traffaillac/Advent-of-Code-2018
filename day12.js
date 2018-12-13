let first = -3
let plants = Buffer.from('...##..#.#.#..##..#..##..##..#.#....#.....##.#########...#.#..#..#....#.###.###....#..........###.#.#...')
let spread = [
	Buffer.from('...##'),
	Buffer.from('#..#.'),
	Buffer.from('.#...'),
	Buffer.from('##...'),
	Buffer.from('#...#'),
	Buffer.from('.#..#'),
	Buffer.from('#####'),
	Buffer.from('..#.#'),
	Buffer.from('.#.##'),
	Buffer.from('.####'),
	Buffer.from('##.##'),
	Buffer.from('#.##.'),
	Buffer.from('#.#..'),
]

for (let g = 0; g < 162; g++) { // determined empirically
	let next = Buffer.alloc(plants.length + 2, '.')
	for (let i = 0; i <= plants.length - 5; i++) {
		for (let s of spread) {
			if (plants.slice(i, i + 5).equals(s))
				next[i + 3] = '#'.charCodeAt()
		}
	}
	first--
	while (next.slice(0, 5).equals(Buffer.from('.....'))) {
		next = next.slice(1)
		first++
	}
	plants = next
	console.log(plants.toString())
}

// at this point plants are isolated and moving 1 step right each generation
first += 50000000000 - 162
let sum = 0
for (let i = 0; i < plants.length; i++)
	sum += (plants[i] === '.'.charCodeAt()) ? 0 : first + i
console.log(sum)
