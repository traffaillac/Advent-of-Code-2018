const input = require('./input')

let graph = {}
for (let inst; (inst = input.line()) !== undefined; ) {
	let src = inst.charAt(5)
	let dst = inst.charAt(36)
	if (!(src in graph)) {
		graph[src] = []
		graph[src].deps = 0
	}
	if (!(dst in graph)) {
		graph[dst] = []
		graph[dst].deps = 0
	}
	graph[src].push(dst)
	graph[dst].deps++
}

let ready = []
for (let n in graph) {
	graph[n].time = 0
	if (graph[n].deps === 0)
		ready.push(n)
}
let avail = [0, 0, 0, 0, 0]
while (ready.length > 0) {
	let n = ready[0]
	for (let i = 1; i < ready.length; i++) {
		let si = Math.max(avail[0], graph[ready[i]].time)
		let sb = Math.max(avail[0], graph[n].time)
		if (si < sb || si === sb && ready[i] < n)
			n = ready[i]
	}
	ready.splice(ready.indexOf(n), 1)
	process.stdout.write(n)
	avail[0] = Math.max(avail[0], graph[n].time) + 60 + n.charCodeAt(0) - 64
	for (let m of graph[n]) {
		graph[m].time = Math.max(graph[m].time, avail[0])
		if (--graph[m].deps === 0)
			ready.push(m)
	}
	avail.sort((a, b) => a - b)
	console.log(avail)
}
