var n = 0;
var more = true;
var pos = new Array(8).map(function() { return 1; });

function addAQueen() {
	var n = n+1;
	pos[n] = 1;
}

function alter() {
	if (pos[n] == 8) {
		n = n - 1;
		if (n == 0) {
			more = false;
		}

		else {
			return;
		}
	}

	else {
		pos[n] = pos[n] + 1;
	}
}

function canTake(i, j) {
	return (pos[i] == pos[j]) || Math.abs(pos[i] - pos[j]) == abs(i-j);
}

function inCheck() {
	var check = false;
	var i = 1;
	while (i < n && !check) {
		if (canTake(i, n)) {
			check = true;
		}
		i = i + 1;
	}
	return check;
}

function mainProgramme() {
	while (more && n < 8) {
		addAQueen();
		while(more && inCheck) {
			alter();
		}
	}
	if (more) {
		console.log("The solution to the 8 queens problem is\n");
		for (var i = 1; i < 8; i++) {
			console.log(pos[i], 3);
		}
	} else {
		console.log("No solution exists\n");
	}
}

mainProgramme();