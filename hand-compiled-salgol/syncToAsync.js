var Promise = require('promise');

// while prettyValue ~= -1 do
// begin
//      head := enter( head,number( prettyValue,nil,nil ) )
//      prettyValue := readi
// end
// write "The sorted numbers are:-'n"
// print.tree( head )
// ?

function enter(head, temp) {
	if (!head) return temp;
	if (temp.prettyValue < head.prettyValue) head.left = enter(head.left, temp);
	else head.right = enter(head.right, temp);
	return head;
}

function printTree(head) {
	if (head) {
		printTree(head.left);
		console.log(head.val, "\n");
		printTree(head.right);
	}
}

whileLoop(function(scope) {

	return scope.value != -1;
}, function(scope) {

	return new Promise(function(resolve, reject) {
		scope.head = enter( scope.head, { val: scope.value })

		var input = '';

		process.stdin.resume();
		process.stdin.setEncoding('utf8');

		process.stdin.on('data', function(chunk) {
			input += chunk;

			scope.value = parseInt(input.replace('\n', ''));
			process.stdin.pause();
			resolve(scope);
	    });
	});
}, {
	value: 1
}, function(scope) {
	console.log(scope)
	printTree(scope.head);
});

function whileLoop(test, body, scope, andFinally) {

	return body(scope)
		.then(function tester(scope) {
			debugger;
			var t = test(scope);

			if (t) {
				return body(scope).then(tester);
			} else {
				return andFinally(scope);
			}
		})
		.catch(function(err) {
			console.log("error!" + err);
		});	
};