var x = new Date().getTime() * 60 / 1000;

function tak(x, y, z) {
	if (x <= y) return z; 
	else {
		tak(tak(x - 1, y, z),
		     tak(y - 1, z, x),
		     tak(z - 1, x, y));
	}
}

console.log(tak( 18,12,6 ),"\n");
console.log("Time taken :- ", time - x, "\n");
