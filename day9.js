function Node(value, at) {
	this.value = value
	this.prev = at.prev
	this.next = at
	at.prev.next = this
	at.prev = this
}

let scores = new Array(476).fill(0)
let cur = {value: 0}
cur.prev = cur.next = cur
let root = cur
for (let m = 1, p = 0; m <= 7143100; m++) {
	if (m % 23 !== 0) {
		cur = new Node(m, cur.next.next)
	} else {
		cur = cur.prev.prev.prev.prev.prev.prev
		scores[p] += m + cur.prev.value
		cur.prev = cur.prev.prev
		cur.prev.next = cur
	}
	if (++p === scores.length)
		p = 0
}
console.log(Math.max.apply(Math, scores))
