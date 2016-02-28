var readlineSync = require('readline-sync');


function enter(head, temp) {
	if (!head) return temp;
	if (temp.prettyValue < head.prettyValue) head.left = enter(head.left, temp);
	else head.right = enter(head.right, temp);
	return head;
}

function printTree(head) {
	if (head) {
		printTree(head.left);
		if (head.val) console.log(head.val);
		printTree(head.right);
	}
}

var head;
var value = readlineSync.question("val"); // read in!

function mainProgramme() {
	while (value != -1) {
		head = enter(head, { val: value });
		value = readlineSync.question("val");; // read in!
	}
	console.log("The sorted numbers are: ");
	printTree(head);
}

mainProgramme();
