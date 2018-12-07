/**
 * Adapted from Raymond Ha's code-jam (https://github.com/Shraymonks/code-jam)
 */
'use strict'
const fs = require('fs')
let input = fs.readFileSync(process.argv[2]).toString('utf8');

function call_times(f, n) {
	const res = []
	if (n === undefined) {
		for (let p; (p = f.call(this)) !== undefined; ) {
			res.push(p)
		}
	} else {
		for (let i = 0; i < n; i++)
			res.push(f.call(this))
	}
	return res
}



exports.line = function() {
	if (input.length === 0)
		return undefined
	const i = input.indexOf('\n')
	const line = i >= 0 ? input.substring(0, i) : input
	input = i >= 0 ? input.substring(i + 1) : ''
	return line
}

exports.word = function() {
	const match = /(\S+)\s*/.exec(input)
	if (match) {
		input = input.substr(match[0].length)
		return match[1]
	}
}

exports.num = function() {
	let w = exports.word()
	return w === undefined ? undefined : parseInt(w)
}

exports.lines = function(n) {
	return call_times(exports.line, n)
}

exports.words = function(n) {
	return call_times(exports.word, n)
}

exports.nums = function(n) {
	return call_times(exports.num, n)
}
