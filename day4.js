const input = require('./input')

const records = input.lines()
records.sort()

let mins = {}
let id
let start
for (let r of records) {
	let m = +r.substring(15, 17)
	if (r.charAt(19) === 'G') {
		id = parseInt(r.substring(26))
		if (!(id in mins))
			mins[id] = new Uint8Array(60)
	} else if (r.charAt(19) === 'f') {
		start = m
	} else {
		for (let i = start; i < m; i++)
			mins[id][i]++
	}
}

for (let g in mins) {
	let asleep = 0
	let best = 0
	for (let i = 0; i < 60; i++) {
		asleep += mins[g][i]
		if (mins[g][i] > mins[g][best])
			best = i
	}
	console.log(`Guard ${g}: asleep ${asleep} minutes, ${mins[g][best]} times during minute ${best}`)
}
