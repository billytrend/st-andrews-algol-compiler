function move(a, b) {
	console.log(" ", a, "->", b, "\n");
}

function hanoi(n, a, b, c) {
	if (n > 0) {
		hanoi(n-1, a, c, b);
		move(a, b);
		hanoi(n-1, c, b, a);
	}
}

hanoi(6, "a", "b", "c");