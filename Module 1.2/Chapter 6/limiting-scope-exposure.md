### Table of contents: <!-- omit in toc -->

- [Chapter 6: Limiting Scope Exposure](#chapter-6-limiting-scope-exposure)
    - [Least Exposure](#least-exposure)
    - [Hiding in Plain (Function) Scope](#hiding-in-plain-function-scope)
      - [Invoking Function Expressions Immediately (Important for me)](#invoking-function-expressions-immediately-important-for-me)
      - [Function Boundaries](#function-boundaries)
    - [Scoping with Blocks](#scoping-with-blocks)
      - [*var* and *let*](#var-and-let)
      - [Where To let?](#where-to-let)
      - [What’s the Catch?](#whats-the-catch)
    - [Function Declarations in Blocks (FiB)](#function-declarations-in-blocks-fib)
    - [Blocked Over](#blocked-over)


# Chapter 6: Limiting Scope Exposure

So far our focus has been explaining the mechanics of how scopes and variables work. With that foundation now firmly in place, our attention raises to a higher level of thinking: decisions and patterns we apply across the whole program.

To begin, we’re going to look at how and why we should be using different levels of scope (functions and blocks) to organize our program’s variables, specifically to reduce scope over-exposure.

### Least Exposure

It makes sense that functions define their own scopes. But why do we need blocks to create scopes as well?

Software engineering articulates a fundamental discipline, typically applied to software security, called “The Principle of Least Privilege” (POLP). 1 And a variation of this principle that applies to our current discussion is typically labeled as “Least Exposure” (POLE).

In following POLE, what do we want to minimize the expo- sure of? Simply: the variables registered in each scope.

When variables used by one part of the program are exposed to another part of the program, via scope, there are three main hazards that often arise:

* Naming Collisions: if you use a common and useful variable/function name in two different parts of the program, but the identifier comes from one shared scope (like the global scope), then name collision occurs, and it’s very likely that bugs will occur as one part uses the variable/function in a way the other part doesn’t expect.
For example, imagine if all your loops used a single global i index variable, and then it happens that one loop in a function is running during an iteration of a loop from another function, and now the shared i variable gets an unexpected value.
* Unexpected Behavior: if you expose variables/func- tions whose usage is otherwise private to a piece of the program, it allows other developers to use them in ways you didn’t intend, which can violate expected behavior and cause bugs. For example, if your part of the program assumes an array contains all numbers, but someone else’s code accesses and modifies the array to include booleans and strings, your code may then misbehave in unexpected ways.
Worse, exposure of private details invites those with mal-intent to try to work around limitations you have imposed, to do things with your part of the software that shouldn’t be allowed.
* UnintendedDependency:ifyouexposevariables/func- tions unnecessarily, it invites other developers to use and depend on those otherwise private pieces. While that doesn’t break your program today, it creates a refactoring hazard in the future, because now you can- not as easily refactor that variable or function without potentially breaking other parts of the software that you don’t control.
For example, if your code relies on an array of numbers, and you later decide it’s better to use some other data structure instead of an array, you now must take on the liability of adjusting other affected parts of the software.

If you design your software accordingly, you have a much greater chance of avoiding (or at least minimizing) these three hazards.

Consider:

```Js
function diff(x,y) { 
    if (x > y) {
        let tmp = x; x = y;
        y = tmp;
    }
    
    return y - x; 
}

diff(3,7);      // 4
diff(7,5);      // 2
```

we swap x and y using a tmp variable, to keep the result positive.

In this simple example, it doesn’t seem to matter whether tmp is inside the if block or whether it belongs at the function level—it certainly shouldn’t be a global variable! However, following the POLE principle, tmp should be as hidden in scope as possible. So we block scope tmp (using let) to the if block.

### Hiding in Plain (Function) Scope

It should now be clear why it’s important to hide our variable and function declarations in the lowest (most deeply nested) scopes possible. But how do we do so?

We’ve already seen the let and const keywords, which are block scoped declarators; we’ll come back to them in more detail shortly.

Let’s consider an example where function scoping can be useful.

The mathematical operation “factorial” (notated as “6!”) is the multiplication of a given integer against all successively lower integers down to 1—actually, you can stop at 2 since multiplying 1 does nothing. In other words, “6!” is the same as “6 * 5!”, which is the same as “6 * 5 * 4!”, and so on. Because of the nature of the math involved, once any given integer’s factorial (like “4!”) has been calculated, we shouldn’t need to do that work again, as it’ll always be the same answer.

So if you naively calculate factorial for 6, then later want to calculate factorial for 7, you might unnecessarily re-calculate the factorials of all the integers from 2 up to 6. If you’re willing to trade memory for speed, you can solve that wasted computation by caching each integer’s factorial as it’s calculated:

```Js
var cache = {};
function factorial(x) { 
    if (x < 2) return 1; 
    if (!(x in cache)) {
        cache[x] = x * factorial(x - 1);
    }
    return cache[x]; 
}

factorial(6);
// 720
cache;

// {
// "2": 2,
// "3": 6,
// "4": 24,
// "5": 120,
// "6": 720
// }

factorial(7);
// 5040
```

We’re storing all the computed factorials in cache so that across multiple calls to factorial(..), the previous com- putations remain.

But the cache variable is pretty obviously a private detail of how factorial(..) works, not something that should be exposed in an outer scope—especially not the global scope.

Since we need cache to survive multiple calls, it must be located in a scope outside that function. 

So what can we do?

Define another middle scope (between the outer/global scope and the inside of factorial(..)) for cache to be located:

```Js

// outer/global scope
function hideTheCache() {
    // "middle scope", where we hide `cache` 
    var cache = {};

    return factorial;
        // **********************
    function factorial(x) { // inner scope
        if (x < 2) return 1; 
        if (!(x in cache)) {
            cache[x] = x * factorial(x - 1);
        }
        return cache[x]; 
    }
}

var factorial = hideTheCache();

factorial(6);
// 720
factorial(7);
// 5040
```

The hideTheCache() function serves no other purpose than to create a scope for cache to persist in across multiple calls to factorial(..).

But for factorial(..) to have access to cache, we have to define factorial(..) inside that same scope.

Then we return the function reference, as a value from hideTheCache(), and store it in an outer scope variable, also named factorial.

Now as we call factorial(..) (multiple times!), its persistent cache stays hidden yet accessible only
to factorial(..)!

OK, but... it’s going to be tedious to define (and name!) a hideTheCache(..) function scope each time such a need for variable/function hiding occurs, especially since we’ll likely want to avoid name collisions with this function by giving each occurrence a unique name. Ugh.

Rather than defining a new and uniquely named function each time one of those scope-only-for-the-purpose-of-hiding- a-variable situations occurs, a perhaps better solution is to use a function expression:

```Js
var factorial = (function hideTheCache() { 
    var cache = {};
    
    function factorial(x) { 
        if (x < 2) return 1; 
        if (!(x in cache)) {
            cache[x] = x * factorial(x - 1);
        }
        return cache[x]; 
    }
    return factorial; 
    })();

factorial(6);
// 720
factorial(7);
// 5040
```
Wait! This is still using a function to create the scope for hiding cache, and in this case, the function is still named hideTheCache, so how does that solve anything?

Recall from “Function Name Scope” (in Chapter 3), what happens to the name identifier from a function expression. Since hideTheCache(..) is defined as a function expres- sion instead of a function declaration, its name is in its own scope—essentially the same scope as cache—rather than in the outer/global scope.

Me: soooo, can i use an arrow function? i mean it looks cleaner.

```Js
var factorial = (() => { 
    var cache = {};
    
    function factorial(x) { 
        if (x < 2) return 1; 
        if (!(x in cache)) {
            cache[x] = x * factorial(x - 1);
        }
        return cache[x]; 
    }
    return factorial; 
    })();

factorial(6);
// 720
factorial(7);
// 5040
```

Just saying...

#### Invoking Function Expressions Immediately (Important for me)

There’s another important bit in the previous factorial recur- sive program that’s easy to miss: the line at the end of the function expression that contains })();.


Notice that we surrounded the entire function expression in a set of ( .. ), and then on the end, we added that second () parentheses set; that’s actually calling the function ex- pression we just defined.

So, in other words, we’re defining a function expression that’s then immediately invoked. This common pattern has a (very creative!) name: Immediately Invoked Function Ex- pression (IIFE).


An IIFE is useful when we want to create a scope to hide variables/functions.

Since it’s an expression, it can be used in any place in a JS program where an expression is allowed.

An IIFE can be named, as with hideTheCache(), or (much more commonly!) unnamed/anonymous.

And it can be standalone or, as before, part of another statement—hideTheCache() returns the factorial() function reference which is then = assigned to the variable factorial.

For comparison, here’s an example of a standalone IIFE:

```Js
// outer scope
(function(){
    // inner hidden scope
})();

// more outer scope
```
Me: That's what i was talking about haha

Unlike earlier with hideTheCache(), where the outer sur- rounding (..) were noted as being an optional stylistic choice, for a standalone IIFE they’re **required**; they distin- guish the function as an expression, not a statement. For consistency, *however, always surround an IIFE function with ( .. ).*

#### Function Boundaries

Beware that using an IIFE to define a scope can have some unintended consequences, depending on the code around it.

Because an IIFE is a full function, the function boundary alters the behavior of certain statements/constructs. 

Non-arrow function IIFEs also change the binding of a this keyword—more on that in the Objects & Classes book.

And statements like break and continue won’t operate across an IIFE function boundary to control an outer loop or block.

So, if the code you need to wrap a scope around has *return*, *this*, *break*, or *continue* in it, an IIFE is probably not the best approach. In that case, you might look to create the scope with a block instead of a function.

### Scoping with Blocks

A block only becomes a scope if necessary, to contain its block-scoped declarations (i.e., let or const). Consider:

```Js
{
    // not necessarily a scope (yet)
    // ..
    // now we know the block needs to be a scope
    let thisIsNowAScope = true;

    for (let i = 0; i < 5; i++) {
        // this is also a scope, activated each // iteration
        if (i % 2 == 0) {
            // this is just a block, not a scope console.log(i);
        } 
    }
}
// 0 2 4
```

Not all { .. } curly-brace pairs create blocks (and thus are eligible to become scopes):

* Object literals use { .. } curly-brace pairs to delimit their key-value lists, but such object values are not scopes.
* class uses { .. } curly-braces around its body defini- tion, but this is not a block or scope.
* A function uses { .. } around its body, but this is not technically a block—it’s a single statement for the function body. It is, however, a (function) scope.
* The { .. } curly-brace pair on a switch statement (around the set of case clauses) does not define a block/scope.

Explicit standalone { .. } blocks have always been valid JS syntax, but since they couldn’t be a scope prior to ES6’s let/const, they are quite rare. However, post ES6, they’re starting to catch on a little bit.

An explicit block scope can be useful even inside of another block (whether the outer block is a scope or not).

For example:

```Js
if (somethingHappened) {
    // this is a block, but not a scope
    {
    // this is both a block and an
    // explicit scope
    let msg = somethingHappened.message(); 
    notifyOthers(msg);
    }

// ..
    recoverFromSomething();
}
```

Here, the { .. } curly-brace pair inside the if statement is an even smaller inner explicit block scope for msg, since that variable is not needed for the entire if block.

But as code grows, these over-exposure issues become more pronounced.

So does it matter enough to add the extra { .. } pair and indentation level?

I think you should follow POLE and always (within reason!) define the smallest block for each variable.

So I recommend using the extra explicit block scope as shown.

If you find yourself placing a let declaration in the middle of a scope, first think, “Oh, no! TDZ alert!” If this let declaration isn’t needed in the first half of that block, you should use an inner explicit block scope to further narrow its exposure!

Another example with an explicit block scope:

```Js
function getNextMonthStart(dateStr) { 
    var nextMonth, year;

    {
        let curMonth;
        [ , year, curMonth ] = dateStr.match(
                /(\d{4})-(\d{2})-\d{2}/
            ) || [];
        nextMonth = (Number(curMonth) % 12) + 1;
    }

    if (nextMonth == 1) { 
        year++;
    }

    return `${ year }-${ 
        String(nextMonth).padStart(2,"0")
    }-01`;
}
getNextMonthStart("2019-12-25"); // 2020-01-01
```

Let’s first identify the scopes and their identifiers:

1. The outer/global scope has one identifier, the function getNextMonthStart(..).
2. The function scope for getNextMonthStart(..) has three: dateStr (parameter), nextMonth, and year.
3. The { .. } curly-brace pair defines an inner block scope that includes one variable: curMonth.

So why put curMonth in an explicit block scope instead of just alongside nextMonth and year in the top-level function scope?

Because curMonth is only needed for those first two statements; at the function scope level it’s over-exposed.

This example is small, so the hazards of over-exposing cur- Month are pretty limited.

Let’s now look at an even more substantial example:

```Js
function sortNamesByLength(names) { 
    var buckets = [];
    for (let firstName of names) {
        if (buckets[firstName.length] == null) {
            buckets[firstName.length] = [];
        }
        buckets[firstName.length].push(firstName);
        
        }
        // a block to narrow the scope
    {
        let sortedNames = [];
        for (let bucket of buckets) { 
            if (bucket) {
                // sort each bucket alphanumerically
                bucket.sort();

                // append the sorted names to our
                // running list
                sortedNames = [
                    ...sortedNames,
                    ...bucket 
                ];
            } 
        }
        return sortedNames; 
    }
}

sortNamesByLength([
    "Sally",
    "Suzy",
    "Frank",
    "John",
    "Jennifer",
    "Scott"
]);
// [ "John", "Suzy", "Frank", "Sally",
//   "Scott", "Jennifer" ]
```

There are six identifiers declared across five different scopes. Could all of these variables have existed in the single outer/global scope?

Technically, yes, since they’re all uniquely named and thus have no name collisions. But this would be really poor code organization, and would likely lead to both confusion and future bugs.

We split them out into each inner nested scope as appropriate. Each variable is defined at the innermost scope possible for the program to operate as desired.

sortedNames could have been defined in the top-level func- tion scope, but it’s only needed for the second half of this function. To avoid over-exposing that variable in a higher level scope, we again follow POLE and block-scope it in the inner explicit block scope.

#### *var* and *let*

```Js
function diff(x,y) { 
    if (x > y) {
        var tmp = x; 
        x = y;
        y = tmp;
    }
    return y - x; 
}
```

Even though var is inside a block, its declaration is function- scoped (to diff(..)), not block-scoped.

While you can declare var inside a block (and still have it be function-scoped), I would recommend against this approach except in a few specific cases (discussed in Appendix A).

Otherwise, var should be reserved for use in the top-level scope of a function.

Why not just use let in that same location? Because var is visually distinct from let and therefore signals clearly, “this variable is function-scoped.” 

Using let in the top-level scope, especially if not in the first few lines of a function, and when all the other declarations in blocks use let, does not visually draw attention to the difference with the function- scoped declaration.

In other words, I feel var better communicates function- scoped than let does, and let both communicates (and achieves!) block-scoping where var is insufficient.

As long as your programs are going to need both function-scoped and block-scoped variables, the most sensible and readable approach is to use both var and let together, each for their own best purpose.

#### Where To let?

My advice to reserve var for (mostly) only a top-level func- tion scope means that most other declarations should use let.

But you may still be wondering how to decide where each declaration in your program belongs?

The way to decide is not based on which keyword you want to use. The way to decide is to ask, “What is the most minimal scope exposure that’s sufficient for this variable?”

Once that is answered, you’ll know if a variable belongs in a block scope or the function scope. If you decide initially that a variable should be block-scoped, and later realize it needs to be elevated to be function-scoped, then that dictates a change not only in the location of that variable’s declaration, but also the declarator keyword used. The decision-making process really should proceed like that.

If a declaration belongs in a block scope, use let. If it belongs in the function scope, use var (again, just my opinion).

#### What’s the Catch?

So far we’ve asserted that var and parameters are func- tion-scoped, and let/const signal block-scoped declarations. There’s one little exception to call out: the catch clause.

Since the introduction of try..catch back in ES3 (in 1999), the catch clause has used an additional (little-known) block- scoping declaration capability:

```Js
try { 
    doesntExist();
}
catch (err) {
    console.log(err);
    // ReferenceError: 'doesntExist' is not defined
    // ^^^^ message printed from the caught exception
    let onlyHere = true;
    var outerVariable = true; 
}

console.log(outerVariable);     // true
console.log(err);
// ReferenceError: 'err' is not defined
// ^^^^ this is another thrown (uncaught) exception
```

The err variable declared by the catch clause is block-scoped to that block.

This catch clause block can hold other block- scoped declarations via let.

But a var declaration inside this block still attaches to the outer function/global scope.

ES2019 (recently, at the time of writing) changed catch clauses so their declaration is optional; if the declaration is omitted, the catch block is no longer (by default) a scope; it’s still a block, though!

So if you need to react to the condition that an exception occurred (so you can gracefully recover), but you don’t care about the error value itself, you can omit the catch declara- tion:

```Js
try { 
    doOptionOne();
}
catch { // catch-declaration omitted
    doOptionTwoInstead();
}
```

This is a small but delightful simplification of syntax for a fairly common use case, and may also be slightly more performant in removing an unnecessary scope!

### Function Declarations in Blocks (FiB)

We’ve seen now that declarations using let or const are block-scoped, and var declarations are function-scoped.

So what about function declarations that appear directly inside blocks? As a feature, this is called “FiB.”

We typically think of function declarations like they’re the equivalent of a var declaration. So are they function-scoped like var is?

No and yes. I know... that’s confusing. Let’s dig in:

```Js
if (false) { 
    function ask() {
        console.log("Does this run?");
    }
} 
ask();
```

1. The ask() call might fail with a ReferenceError ex- ception, because the ask identifier is block-scoped to the if block scope and thus isn’t available in the outer/- global scope.
2. The ask() call might fail with a TypeError exception, because the ask identifier exists, but it’s undefined (since the if statement doesn’t run) and thus not a callable function.
3. The ask() call might run correctly, printing out the “Does it run?” message.

The JS specification says that function declarations inside of blocks are block-scoped, so the answer should be (1). How- ever, most browser-based JS engines (including v8, which comes from Chrome but is also used in Node) will behave as (2), meaning the identifier is scoped outside the if block but the function value is not automatically initialized, so it remains undefined.

Why are browser JS engines allowed to behave contrary to the specification?

Because these engines already had certain be- haviors around FiB before ES6 introduced block scoping, and there was concern that changing to adhere to the specification might break some existing website JS code. 

One of the most common use cases for placing a function declaration in a block is to conditionally define a function one way or another (like with an if..else statement) depending on some environment state. For example:

```Js
if (typeof Array.isArray != "undefined") { 
    function isArray(a) {
        return Array.isArray(a); 
    }
}
else {
    function isArray(a) {
        return Object.prototype.toString.call(a)
            == "[object Array]";
    } 
}
```

In addition to the previous snippets, several other FiB corner cases are lurking; such behaviors in various browsers and non-browser JS environments (JS engines that aren’t browser based) will likely vary. For example:

```Js
if (true) { function ask() {
        console.log("Am I called?");
    }
}

if (true) { function ask() {
        console.log("Or what about me?");
    }
}
for (let i = 0; i < 5; i++) { function ask() {
        console.log("Or is it one of these?");
    }
}
ask();

function ask() {
    console.log("Wait, maybe, it's this one?");
}
```

As far as I’m concerned, the only practical answer to avoiding the vagaries of FiB is to simply avoid FiB entirely.

In other words, never place a function declaration directly inside any block.

Always place function declarations anywhere in the top-level scope of a function (or in the global scope).

Even if you test your program and it works correctly, the small benefit you may derive from using FiB style in your code is far outweighed by the potential risks in the future for confusion by other developers, or variances in how your code runs in other JS environments.

FiB is not worth it, and should be avoided.

### Blocked Over

The point of lexical scoping rules in a programming language is so we can appropriately organize our program’s variables, both for operational as well as semantic code communication purposes.

And one of the most important organizational techniques is to ensure that no variable is over-exposed to unnecessary scopes (POLE). Hopefully you now appreciate block scoping much more deeply than before.