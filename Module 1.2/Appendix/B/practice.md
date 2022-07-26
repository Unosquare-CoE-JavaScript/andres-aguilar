### Table of contents: <!-- omit in toc -->

- [Appendix B: Practice](#appendix-b-practice)
    - [Buckets of Marbles](#buckets-of-marbles)
    - [Closure (PART 1)](#closure-part-1)
    - [Closure (PART 2)](#closure-part-2)
    - [Closure (PART 3)](#closure-part-3)
    - [Modules](#modules)

# Appendix B: Practice

### Buckets of Marbles

This exercise asks you to write a program—any program!— that contains nested functions and block scopes, which satis- fies these constraints:

* If you color all the scopes (including the global scope!) different colors, you need at least six colors. Make sure to add a code comment labeling each scope with its color.
BONUS: identify any implied scopes your code may
have.
* Each scope has at least one identifier.
* Contains at least two function scopes and at least two
block scopes.
* At least one variable from an outer scope must be
shadowed by a nested scope variable (see Chapter 3).
* At least one variable reference must resolve to a variable declaration at least two levels higher in the scope chain.

Suggested solution:

```Js
// RED(1)
const howMany = 100;

// Sieve of Eratosthenes
function findPrimes(howMany) { 
    // BLUE(2)
    var sieve = Array(howMany).fill(true); 
    var max = Math.sqrt(howMany);
    
    for (let i = 2; i < max; i++) { 
        // GREEN(3)
        if (sieve[i]) { 
            // ORANGE(4)
            let j = Math.pow(i,2);
            for (let k = j; k < howMany; k += i) { 
                // PURPLE(5)
                sieve[k] = false; 
            }
        }
    }

    return sieve
        .map(function getPrime(flag,prime){
            // PINK(6)
            if (flag) return prime;
            return flag; 
        })
        .filter(function onlyPrimes(v){ 
            // YELLOW(7)
            return !!v; 
        })
        .slice(1);
}

findPrimes(howMany);
// [
// 2,3,5,7,11,13,17,
//    19, 23, 29, 31, 37, 41,
//    43, 47, 53, 59, 61, 67,
//    71, 73, 79, 83, 89, 97
// ]
```

### Closure (PART 1)

The first part of this exercise is to use closure to implement a cache to remember the results of isPrime(..), so that the primality (true or false) of a given number is only ever computed once. Hint: we already showed this sort of caching
in Chapter 6 with factorial(..).

If you look at factorize(..), it’s implemented with recur- sion, meaning it calls itself repeatedly. That again means we may likely see a lot of wasted calls to compute prime factors for the same number. So the second part of the exercise is to use the same closure cache technique for factorize(..).

Use separate closures for caching of isPrime(..) and fac- torize

Suggested solution:

```Js
var isPrime = (function isPrime(v){ 
    var primes = {};
    
    return function isPrime(v) { 
        if (v in primes) {
            return primes[v]; 
        }
        if (v <= 3) {
            return (primes[v] = v > 1);
        }
        if (v % 2 == 0 || v % 3 == 0) {
            return (primes[v] = false); 
        }
        let vSqrt = Math.sqrt(v);
        for (let i = 5; i <= vSqrt; i += 6) {
            if (v % i == 0 || v % (i + 2) == 0) { 
                return (primes[v] = false);
            } 
        }
        return (primes[v] = true); 
    };
})();

var factorize = (function factorize(v){
    var factors = {};

    return function findFactors(v) { 
        if (v in factors) {
            return factors[v]; 
        }
        if (!isPrime(v)) {
            let i = Math.floor(Math.sqrt(v)); 
            while (v % i != 0) {
                i--; 
            }
            return (factors[v] = [
                ...findFactors(i),
                ...findFactors(v / i)
            ]);
        }
        return (factors[v] = [v]); 
    };
})();
```

### Closure (PART 2)

In this exercise, we’re going to again practive closure by defining a toggle(..) utility that gives us a value toggler.

You will pass one or more values (as arguments) into tog- gle(..), and get back a function.

That returned function will alternate/rotate between all the passed-in values in order, one at a time, as it’s called repeatedly.

The corner case of passing in no values to toggle(..) is not very important; such a toggler instance could just always return undefined.

Suggested solution:

```Js
function toggle(...vals) { 
    var unset = {};
    var cur = unset;
    
    return function next(){
        // save previous value back at 
        // the end of the list
        if (cur != unset) {
            vals.push(cur);
        }
        cur = vals.shift();
        return cur; 
    };
}

var hello = toggle("hello");
var onOff = toggle("on","off");
var speed = toggle("slow","medium","fast");

hello();   // "hello" 
hello();   // "hello"

onOff();  // "on"
onOff();  // "off"
onOff();  // "on"

speed();  // "slow"
speed();  // "medium"
speed();  // "fast"
speed();  // "slow"
```

### Closure (PART 3)

In this third and final exercise on closure, we’re going to implement a basic calculator. The calculator() function will produce an instance of a calculator that maintains its own state, in the form of a function (calc(..), below):

```Js
function calculator() { 
    // ..
}
var calc = calculator();

```

The most sensible usage of this useCalc(..) helper is to always have “=” be the last character entered.

Some of the formatting of the totals displayed by the cal- culator require special handling. I’m providing this for- matTotal(..) function, which your calculator should use whenever it’s going to return a current computed total

Suggested solution:

```Js
// from earlier:
//
// function useCalc(..) { .. }
// function formatTotal(..) { .. }

function calculator() { var currentTotal = 0; 
    var currentVal = "";  
    var currentOper = "=";
    
    return pressKey;
    // ********************

    function pressKey(key){ 
        // number key?
        if (/\d/.test(key)) { 
            currentVal += key; 
            return key;
        }
        // operator key?
        else if (/[+*/-]/.test(key)) {
            // multiple operations in a series? 
            if (
                currentOper != "=" &&
                currentVal != "" 
            ){
                // implied '=' keypress
                pressKey("=");
            }
            else if (currentVal != "") { 
                currentTotal = Number(currentVal);
            }
            currentOper = key; 
            currentVal = ""; 
            return key;
        }
        // = key?
        else if (
            key == "=" &&
            currentOper != "=" ){
            currentTotal = op(
                currentTotal,
                currentOper,
                Number(currentVal)
            );
            currentOper = "=";
            currentVal = "";
            return formatTotal(currentTotal);
        }
        return ""; 
    };
    
    function op(val1,oper,val2) { 
        var ops = {
            // NOTE: using arrow functions
            // only for brevity in the book
            "+": (v1,v2) => v1 + v2,
            "-": (v1,v2) => v1 - v2,
            "*": (v1,v2) => v1 * v2,
            "/": (v1,v2) => v1 / v2
        };
        return ops[oper](val1,val2); 
    }
}

var calc = calculator();

useCalc(calc,"4+3="); // 4+3=7
useCalc(calc,"+9=");  // +9=16
useCalc(calc,"*8=");  // *5=128

useCalc(calc,"7*2*3="); // 7*2*3=42
useCalc(calc,"1/0="); // 1/0=ERR
useCalc(calc,"+3="); // +3=ERR
useCalc(calc,"51="); // 51
```

### Modules

This exercise is to convert the calculator from Closure (PART 3) into a module.

This module should be expressed as a classic module factory function called calculator(), instead of a singleton IIFE, so that multiple calculators can be created if desired.
The public API should include the following methods:

* number(..) (input: the character/number “pressed”)
* plus()
* minus() 
* mult() 
* div()
* eq()

Suggested solution:

```Js
// from earlier:
//
// function useCalc(..) { .. }
// function formatTotal(..) { .. }

function calculator() { 
    var currentTotal = 0; 
    var currentVal = ""; 
    var currentOper = "=";
    
    var publicAPI = { 
        number,
        eq,
        plus() { return operator("+"); }, 
        minus() { return operator("-"); }, 
        mult() { return operator("*"); },
        div() { return operator("/"); } 
    };
    
    return publicAPI;

    // ********************

    function number(key) { 
        // number key?
        if (/\d/.test(key)) { 
            currentVal += key; 
            return key;
        }
    }

    function eq() { 
        // = key?
        if (currentOper != "=") { 
            currentTotal = op(
                currentTotal,
                currentOper,
                Number(currentVal)
            );
            currentOper = "=";
            currentVal = "";
            return formatTotal(currentTotal);
        }
        return ""; 
    }

    function operator(key) {
        // multiple operations in a series? 
        if (
            currentOper != "=" &&
            currentVal != "" 
        ) {
            // implied '=' keypress
            eq(); 
        }
        else if (currentVal != "") { 
            currentTotal = Number(currentVal);
        }
        currentOper = key; 
        currentVal = ""; 
        return key;
    }

    function op(val1,oper,val2) { 
        var ops = {
            // NOTE: using arrow functions
            // only for brevity in the book
            "+": (v1,v2) => v1 + v2,
            "-": (v1,v2) => v1 - v2,
            "*": (v1,v2) => v1 * v2,
            "/": (v1,v2) => v1 / v2
        };
        return ops[oper](val1,val2); 
    
    }
}

var calc = calculator();

useCalc(calc,"4+3="); // 4+3=7
useCalc(calc,"+9="); // +9=16
useCalc(calc,"*8="); // *5=128
useCalc(calc,"7*2*3="); // 7*2*3=42
useCalc(calc,"1/0="); // 1/0=ERR
useCalc(calc,"+3="); // +3=ERR
useCalc(calc,"51="); // 51
```

