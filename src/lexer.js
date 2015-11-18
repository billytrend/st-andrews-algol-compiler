
var input = "write 0;?"

var handle = {
	let: function(tokenString) {
		return { type: "LET" };
	},

	id: function(tokenString) {
		return { type: "ID" };
	},

	eof: function(tokenString) {
		return { type: "EOF" };
	},

	init_op: function(tokenString) {
		return { type: "INIT_OP" };
	},

	write: function(tokenString) {
		return { type: "WRITE" };
	},

	int_literal: function(tokenString) {
		return { type: "INT_LITERAL" };
	}

}

var matches = [
	[/let/, handle.let],
	[/write/, handle.write],
	[/\?/, handle.eof],
	[new RegExp(":\=|\="), handle.init_op],
	[/[a-zA-Z][a-zA-Z0-9]*/, handle.id],
	[/[0-9]*/, handle.int_literal]
];

var lex = function(cur) {
	var lexed = [];
	console.log(cur)
	for (var i = 0; i < matches.length; i++) {
		if (cur.match(matches[i][0])) {
			return matches[i][1](cur);
		}
	}
	return null;
}

console.log(input.split(/\n| |;/).map(lex))

module.exports = function(input) {
	return input.split(/\n| |;/).map(lex);
}

