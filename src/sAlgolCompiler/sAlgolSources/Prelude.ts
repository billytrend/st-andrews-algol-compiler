export function prelude() { return `

function image(x, y) {
    if (!canvas && require) {
        Canv = require('canvas');
        canvas = new Canv(x, y);
    } else if (!canvas && document) {
        canvas = document.createElement('canvas');
        canvas.width = x;
        canvas.height = y;
    } else {
        throw "No canvas available.";
    }
    
    return canvas.getContext('2d');  
}

function _errorHandler(e) {
    var err = "[Runtime Exception] ";
    switch (e) {
        case 0: err += "Program aborted itself."; break;
        case 1: err += "Program attempted to access array index that is out of bounds."; break;
        default: err += "Unknown error '" + e.message + "'."; break;
    }
    console.log(err);
}

function _array(lb, elements) {
    this.elements = elements;
    this.lb = lb;
    this.size = elements.length;
}

_array.prototype.get = function(index) {
    if (index < this.lb || index >= this.lb + this.size) {
        throw 1;
    }
    return this.elements[index - this.lb];
}

_array.prototype.set = function(index, value) {
    if (index < this.lb || index >= this.lb + this.size) {
        throw 1;
    }
    this.elements[index + this.lb] = value;
}

function _accessArray(array) {
    var indices = arguments.slice(1);

}

function write() {
    var args = arguments;
    var argsArray = [];
    for (var i = 0; i < args.length; i++) {
        argsArray.push(args[i]);
    }
    console.log(argsArray.join(" "));
}

function abort() {
    throw 0;
}

// procedure sqrt( creal x -> real )
// ! the non-negative square root of x where x ≥ 0.
var sqrt = Math.sqrt;

// procedure exp( creal x -> real )
// ! e to the power x.
var exp = Math.exp;

// procedure ln( creal x -> real )
// ! the logarithm of x to the base e where x > 0.
var ln = Math.log;

// procedure sin( creal x -> real ) ! sine of x( radians ).
var sin = Math.sin;

// procedure cos( creal x -> real ) ! cosine of x( radians ).
var cos = Math.cos;

// procedure atan( creal x -> real )
// ! arctangent ( radians ) of x where -π / 2 < atan( x ) < π / 2.
var tan = Math.tan;

// procedure code( cint n -> string )
// ! string of length 1 where s( 1|1 ) = character with numeric code abs( n rem 128 ).


// procedure decode( cstring s -> int ) ! numeric code for s( 1|1 ).

// procedure truncate( creal x -> int )
// ! the integer i such that | i | ≤ | x | < | i | + 1 where i * x ≥ 0.


// procedure rabs( creal x -> real )
// ! the absolute value of real number x.
var rabs = Math.abs;

// procedure abs( cint n -> int )
// ! the absolute value of integer n.
var abs = Math.abs;

// procedure length( cstring s -> int )
// ! the number of characters in the string s.
function length(str) {
    return str.length;
}

// procedure eformat( creal n ; cint w,d -> string )
// ! the string representing n with w digits before the decimal point and d digits after ! with an exponent.
function eformat(n, sigfig, dplaces) {
    var o = n.toFixed(dplaces);
    return o.toPrecision(sigfig).toString();
}

// procedure fformat( creal n ; cint w,d -> string )
// ! the string representing n with w digits before the decimal point and d digits after.
var fformat = this.eformat;

// procedure gformat( creal n -> string )
// ! the string representing n in eformat or fformat whichever is suitable.
var fformat = this.eformat;

// procedure letter( cstring s -> bool )
// ! length( s ) = 1 and
// ! s ≥ "A" and s ≤ "Z" or s ≥ "a" and s ≤ "z".
function letter(str) {
    return str.length === 1 && str.match(/[a-zA-Z]/);
}

// procedure digit( cstring s -> bool ) ! length( s ) = 1 and
// ! s ≥ "0" and s ≤ "9".
function digit(str) {
    return str.length === 1 && str.match(/0-9/);
}

// procedure iformat( cint n -> string ) ! integer n as a string of characters.
function iformat(n) {
    return n.toString();
}

// procedure shift.l( cint value,count -> int )
// ! shift the first parameter left 'count' places bringing in zeros at the low order end and ! dropping digits at the left.
function shift_l(value, count) {
    return value << count;
}

// procedure shift.r( cint value,count -> int )
// ! shift the first parameter right 'count' places bringing in zeros at the high order end and ! dropping digits on the right.
function shift_r(value, count) {
    return value >> count;
}

// procedure b.and( cint value1,value2 -> int ) ! logical (bitwise) 'and' of value1 and value2.
function b_and(value1, value2) {
    return value1 & value2;
}

// procedure b.or( cint value1,value2 -> int ) ! logical (bitwise) 'or' of value1 and value2.
function b_or(value1, value2) {
    return value1 | value2;
}

// procedure b.not( cint value -> int ) ! logical (bitwise) 'not' of value.
function b_not(value) {
    return ~value;
}

// procedure b.xor( cint value1,value2 -> int )
// ! logical (bitwise) 'exclusive or' of value1 and value2.
function b_xor(value1, value2) {
    return value1 ^ value2;
}

// procedure fiddle.r( creal n -> *int )
// ! split a real into a vector of two integers.
// TODO
function fiddle_r(n) {
}

// procedure find.substr( cstring target,substring -> int )
// ! return the starting position of string 'substring' in 'target', zero otherwise.
function find_substr(target, substring) {
    return target.indexOf(substring);
}

// procedure random( cint x -> int )
// ! takes the non-zero seed 'x' and produces a non-zero random number between -maxint - 1 ! and maxint.
function random(x) {
    var min = Number.MIN_VALUE;
    var max = Number.MAX_VALUE;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// procedure open( cstring name ; int access.mode -> file )
// ! Open the existing file named. Access mode is '0' for read only, '1' is write only, ! '2' is reading and writing. Return the file descriptor.


// procedure create( cstring name -> file )
// ! create the named file and return the file descriptor.
// procedure close( cfile f) ! close the file f.
// procedure flush( cfile f)
// ! Clear out the internal buffer for file f. This should be done before closing the file ! after writing.
// procedure seek( cfile f ; cint offset,key)
// ! This moves the current position in file f 'offset' bytes through the file with 'key' ! interpreted as:-
// ! '0' - move to offset bytes from start of file.
// ! '1' - move offset bytes from current position.
// ! '2' - move back offset bytes from end of file.
// procedure trace
// ! Print a snapshot of the current procedure calls.

// procedure date( -> string )
// ! gives the date and time in a format determined by the implementation.
function date() {
    return new Date().toString();
}

// procedure time( -> int )
// ! returns the number of clock ticks ( 1/60 second ) passed since a reference time t = 0.
function time() {
    return  parseInt((new Date).getTime() / 60);
}

// procedure draw( c#pixel i ; cpic p ; creal x1,x2,y1,y2 )
// ! draw the picture p on the image i.
// ! the picture is bounded by x1,x2,y1,y2 in its coordinate space.
// procedure X.dim( c#pixel i -> int ) ! return the x dimension of image i.
// procedure Y.dim( c#pixel i -> int ) ! return the y dimension of image i.
// procedure locator( -> pntr )
// ! returns a structure containing information about the status of the mouse. ! the structure returned is a mouse( defined below ).
// procedure cursor.tip( cpntr the.tip -> pntr )
// ! make the effective tip of the cursor 'the.tip' return old tip
// ! both pointers are pointers to point.strc( cint point.x,point.y )
// procedure cursor.on
// ! make the cursor track the mouse ( the default state ).
// procedure cursor.off
// ! make the cursor invisible.
// procedure Pixel( c#pixel i ; cint xpos,ypos -> pixel ) ! return the pixel at xpos,ypos in i.
// procedure constant.image( c#pixel i -> #cpixel ) ! return a copy of image i with constant pixels.
// procedure variable.image( c#cpixel i -> #pixel ) ! return a copy of image i with variable pixels.
// procedure fill( c#pixel i ; cpixel col ; cint xpos,ypos )
// ! seed fill image i from position xpos,ypos with the pixel col.
// procedure make.menu( c#pixel title ; c*c#pixel entries ; cbool vertical -> pntr )
// ! Returns a 'menu' structure to pass to call.menu. 'vertical' indicates the menu orientation. ! The menu has a 'title' and a vector of icons called 'entries'
// procedure call.menu( cpntr a.menu ; cint xpos,ypos -> int )
// ! Causes a menu to appear with its bottom left hand corner at position xpos,ypos relative to ! 'screen'. The integer returned indicates if the user made a selection. If not then the integer ! is one more than the upper bound of the vector of icons.
// procedure depth( c#pixel i -> int )
// ! return the number of planes in image i.
// procedure colour.map( cpixel p ; cint i )
// ! when pixel p is displayed the integer i will be sent to the display hardware.

// procedure colour.of( cpixel p -> int )
// ! return the integer sent to the hardware when pixel p is displayed.
// procedure string.to.tile( cstring the.string,font ; cint font.size -> #pixel ) ! returns an image which contains 'the.string' in the 'font' in the 'font.size'. ! Any font.size may be specified - scaling is automatically performed.
// ! Any installed Mac font can be named.
// procedure line.end( c#pixel i ; pixel p ; cint x,y,direct -> int )
// ! searches for the first pixel of colour p from position x,y in image i ! direct specifies the search direction
// ! odd numbers do not look at boundary pixels
// ! 0,1 - left ; 2,3 - right ; 4,5 - down ; 6,7 - up
// ! return the position of the pixel or 1 past the position last searched
// procedure line( c#pixel i ; cint x1,y1,x2,y2,style )
// ! draws a line from x1,y1 to x2,y2 on image i
// ! style may be 0 - draw: set pixels to on ; 1 - erase: set pixels to off ; 2 - xor: invert pixels.
// procedure clear.output
// ! Delete all text from the output window and clear graphics from the output window.
// procedure plane.of( c#pixel i ; cint p -> *int ) ! returns the p'th plane of image i.
// procedure pixel.depth( cpixel p -> int ) ! returns the number of planes in pixel p.
// procedure input.pending( -> bool )
// ! returns true if a read or peek would complete immediately.
// procedure interrupt( -> bool )
// ! returns true if an interrupt (control-\ on the Mac) has been received since the last call of ! this procedure or the start of the program.
// procedure interrupt.on
// ! Enable interrupts (control-\ on the Mac) to be trapped.
// procedure interrupt.off
// ! Disable interrupts (control-\ on the Mac) being trapped.`; }