 
// This is a playground for testing out examples given in:
//     JavaScript: The Good Parts
//     Douglas Crockford
//     Copyright 2008 Yahoo! Inc.
//     978-0-596-51774-8.

document.writeln('Hello, world!');

// Chapter 3: Objects
var stooge = {
    "first-name": "Jerome",
    "last-name": "Howard"
};

// Objects are always passed by reference, they are never copied.
// If we want to copy and object we can write a function which
// creates a new object and inherits the old objects prototype.

if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        var F = function () {};
        F.prototype = o;
        return new F();
    };
}
var another_stooge = Object.create(stooge);
another_stooge["first-name"] = "Clone"

document.writeln(stooge["first-name"]+" "+stooge["last-name"]);
document.writeln(another_stooge["first-name"]+" "+another_stooge["last-name"]);

// If we haven't explicitly defined an object to have a given
// property JS will look to its prototype. This is called "delegation".
// the hasOwnProperty method will not look at prototypes.
document.writeln(another_stooge.hasOwnProperty("first-name"));
document.writeln(another_stooge.hasOwnProperty("last-name"));

// JS makes it easy to define global variables to store everything in
// If we want to avoid this and hence the pitfalls associated with
// interference from other libraries we can define a global variable
// to use as the container (name-space) for our work. This could
// improve readability and stability.

var MYAPP = {};
MYAPP.stooge = {
    "first-name": "Joe",
    "last-name": "Howard"
};

// The basic types of JS can be augmented by adding methods to the prototype.
// To hide the ugliness of adding the prototype word in we define a helper
// function
Function.prototype.method = function (name, func) {
    this.prototype[name] = func;
    return this;
};

Number.method('integer', function () {
    return Math[this < 0 ? 'ceil' : 'floor'](this);
});
document.writeln((-10 / 3).integer( )); // -3

// Create myObject. It has a value and an increment
// method. The increment method takes an optional
// parameter. If the argument is not a number, then 1
// is used as the default.
var myObject = {
    value: 0,
    increment: function (inc) {
    this.value += typeof inc === 'number' ? inc : 1;
    }
};

myObject.increment( );
document.writeln(myObject.value); // 1
myObject.increment(2);
document.writeln(myObject.value); // 3

// Alternatively we can define myObject using some closure magic I don't 
// understand fully. This hides the value of value from the outside world
// it also allows the value of value (which looks out of scope) to persist.
var myObject = function () {
    var value = 0;
    return {
            increment: function (inc) {
                value += typeof inc === 'number' ? inc : 1;
            },
            getValue: function () {
                return value;
            }
    };
}();
// In this case We are not assigning a function to myObject. 
// We are assigning the result of invoking that function. Notice the () 
// on the last line. -- MAGIC

myObject.increment();
document.writeln(myObject.getValue()); // 1
myObject.increment(2);
document.writeln(myObject.getValue()); // 3

// Create a maker function called quo. It makes an
// object with a get_status method and a private
// status property.
var quo = function (status) {
    return {
            get_status: function () {
                return status;
            }
    };
};
// Make an instance of quo.
var myQuo = quo("amazed");
document.writeln(myQuo.get_status());

// Define a function that sets a DOM node's color
// to yellow and then fades it to white.
var fade = function (node) {
    var level = 1;
    var step = function ( ) {
        var hex = level.toString(16);
        node.style.backgroundColor = '#FFFF' + hex + hex;
        if (level < 15) {
            level += 1;
            setTimeout(step, 100);
        }
    };
    setTimeout(step, 100);
};

fade(document.body);

String.method('deentityify', function () {
    // The entity table. It maps entity names to
    // characters.
    var entity = {
        quot: '"',
        lt: '<',
        gt: '>'
    };
    // Return the deentityify method.
    return function ( ) {
        // This is the deentityify method. It calls the string
        // replace method, looking for substrings that start
        // with '&' and end with ';'. If the characters in
        // between are in the entity table, then replace the
        // entity with the character from the table. It uses
        // a regular expression (Chapter 7).
        return this.replace(/&([^&;]+);/g,
            function (a, b) {
                var r = entity[b];
                return typeof r === 'string' ? r : a;
            }
        );
    };
}());

document.writeln('&lt;&quot;&gt;'.deentityify( )); // <">