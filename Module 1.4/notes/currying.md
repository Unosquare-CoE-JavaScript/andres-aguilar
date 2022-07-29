# Currying

## Properties, Arguments & Currying

```Js
// associative
add(add(x, y), z) == add(x, add(y, z))
 
// commutative
add(x, y) == add(y, x)
 
// identity
add(x, 0) == x
 
// distributive
add(multiply(x, y), multiply(x, z)) == multiply(x, add(y,z))

```

## Currying

Currying is a transformation of functions that translates a function from callable as f(a, b, c) into callable as f(a)(b)(c).

Currying doesn’t call a function. It just transforms it.

```Js
function curry(f) { // curry(f) does the currying transform
  return function(a) {
    return function(b) {
      return f(a, b);
    };
  };
}

// usage
function sum(a, b) {
  return a + b;
}

let curriedSum = curry(sum);

alert( curriedSum(1)(2) ); // 3

```
