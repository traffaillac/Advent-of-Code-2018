const input = require('./input')

function exec(regs, op, A, B, C) {
	switch (op) {
	case 12: regs[C] = regs[A] + regs[B]; break // addr(12)
	case 9: regs[C] = regs[A] + B; break // addi(9)
	case 3: regs[C] = regs[A] * regs[B]; break // mulr(3)
	case 6: regs[C] = regs[A] * B; break // muli(6)
	case 1: regs[C] = regs[A] & regs[B]; break // banr(1)
	case 5: regs[C] = regs[A] & B; break // bani(5)
	case 11: regs[C] = regs[A] | regs[B]; break // borr(11)
	case 2: regs[C] = regs[A] | B; break // bori(2)
	case 8: regs[C] = regs[A]; break // setr(8)
	case 4: regs[C] = A; break // seti(4)
	case 10: regs[C] = A > regs[B] ? 1 : 0; break // gtir(10)
	case 14: regs[C] = regs[A] > B ? 1 : 0; break // gtri (14)
	case 7: regs[C] = regs[A] > regs[B] ? 1 : 0; break // gtrr(7)
	case 15: regs[C] = A === regs[B] ? 1 : 0; break // eqir(15)
	case 0: regs[C] = regs[A] === B ? 1 : 0; break // eqri(0)
	case 13: regs[C] = regs[A] === regs[B] ? 1 : 0; break // eqrr(13)
	}
	return regs
}

let regs = [0, 0, 0, 0]
for (let inst; (inst = input.nums(4))[0] !== undefined; )
	exec(regs, inst[0], inst[1], inst[2], inst[3])
console.log(regs)

/*
let before = [0, 0, 0, 0]
let after = [0, 0, 0, 0]
let threes = 0
for (let line; (line = input.line()) !== undefined; ) {
	before[0] = parseInt(line.substring(9, 10))
	before[1] = parseInt(line.substring(12, 13))
	before[2] = parseInt(line.substring(15, 16))
	before[3] = parseInt(line.substring(18, 19))
	let orig = input.num()
	let A = input.num()
	let B = input.num()
	let C = input.num()
	line = input.line()
	input.line()
	after[0] = parseInt(line.substring(9, 10))
	after[1] = parseInt(line.substring(12, 13))
	after[2] = parseInt(line.substring(15, 16))
	after[3] = parseInt(line.substring(18, 19))
	let ops = []
	for (let op = 0; op < 16; op++) {
		if (exec(before.slice(), op, A, B, C).every((v, i) => v === after[i]) &&
			![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(op))
			ops.push(op)
	}
	if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].includes(orig) && ops.length <= 2)
		console.log(orig, ops)
	threes += ops.length >= 3
}
console.log(threes)
*/