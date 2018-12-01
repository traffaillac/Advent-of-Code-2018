/**
 * Adapted from Raymond Ha's code-jam (https://github.com/Shraymonks/code-jam)
 */
'use strict';

const fs = require('fs')

let input = fs.readFileSync(process.argv[2]).toString('utf8');

function call_times(n, f) {
	const res = []
	for (let i = 0; i < n; i++)
		res.push(f.call(this))
	return res
}



exports.line = function() {
	const i = input.indexOf('\n')
	const line = input.substr(0, i)
	input = input.substr(i + 1)
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
	return +exports.word()
}

exports.lines = function(n) {
	return call_times(n, exports.line)
}

exports.words = function(n) {
	return call_times(n, exports.word)
}

exports.nums = function(n) {
	return call_times(n, exports.num)
}
