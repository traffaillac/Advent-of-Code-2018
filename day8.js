const input = require('./input')

function parse_node() {
	let N = input.num()
	let M = input.num()
	let children = []
	for (let n = 0; n < N; n++)
		children.push(parse_node())
	let sum = 0
	for (let m = 0; m < M; m++) {
		if (N === 0)
			sum += input.num()
		else
			sum += children[input.num() - 1] || 0
	}
	return sum
}
console.log(parse_node())
