let scores = Buffer.alloc(100000001)
let e1 = 0, e2 = 1
scores[0] = 3
scores[1] = 7
for (let S = 2; S < 100000000; ) {
	let sum = scores[e1] + scores[e2]
	if (sum >= 10)
		scores[S++] = sum / 10 | 0
	scores[S++] = sum % 10
	e1 = (e1 + 1 + scores[e1]) % S
	e2 = (e2 + 1 + scores[e2]) % S
	if (e2 === e1)
		e2 = (e2 + 1 === S) ? 0 : e2 + 1
}
for (let i = 260321; i < 260321 + 10; i++)
	process.stdout.write(scores[i].toString())
process.stdout.write('\n')
console.log(scores.indexOf(Buffer.from([2, 6, 0, 3, 2, 1])))
