### Table of contents: <!-- omit in toc -->

- [Chapter 5: The (Not So) Secret Lifecycle of Variables](#chapter-5-the-not-so-secret-lifecycle-of-variables)
    - [When Can I Use a Variable?](#when-can-i-use-a-variable)
      - [Hoisting: Declaration vs. Expression](#hoisting-declaration-vs-expression)
      - [Variable Hoisting](#variable-hoisting)
    - [Hoisting: Yet Another Metaphor](#hoisting-yet-another-metaphor)
    - [Re-declaration?](#re-declaration)
      - [Constants?](#constants)
      - [Loops](#loops)
    - [Uninitialized Variables (aka, TDZ)](#uninitialized-variables-aka-tdz)
    - [Finally Initialized](#finally-initialized)

# Chapter 5: The (Not So) Secret Lifecycle of Variables

By now you should have a decent grasp of the nesting of scopes, from the global scope downward—called a program’s scope chain.

But just knowing which scope a variable comes from is only part of the story. If a variable declaration appears past the first statement of a scope, how will any references to that identifier before the declaration behave?

What happens if you try to declare the same variable twice in a scope?

JS’s particular flavor of lexical scope is rich with nuance in how and when variables come into existence and become available to the program.

### When Can I Use a Variable?

At what point does a variable become available to use within its scope? There may seem to be an obvious answer: after the variable has been declared/created. Right? Not quite.

```Js
greeting();

// Hello!
function greeting() { 
    console.log("Hello!");
}
```

Did you ever wonder how or why it works?

Recall Chapter 1 points out that all identifiers are registered to their respective scopes during compile time.

Moreover, every identifier is created at the beginning of the scope it belongs to,**every time that scope is entered.**

The term most commonly used for a variable being visible from the beginning of its enclosing scope, even though its declaration may appear further down in the scope, is called **hoisting.**

how does the variable greeting have any value (the function reference) assigned to it, from the moment the scope starts running?

The answer is a special characteris- tic of formal function declarations, called *function hoisting.*

When a function declaration’s name identifier is registered at the top of its scope, it’s additionally auto-initialized to that function’s reference.

One key detail is that both function hoisting and var-flavored variable hoisting attach their name identifiers to the nearest enclosing **function scope** (or, if none, the global scope), not a block scope.

#### Hoisting: Declaration vs. Expression

Function hoisting only applies to formal function declara- tions (specifically those which appear outside of blocks—see “FiB” in Chapter 6), not to function expression assignments. Consider:

```Js
greeting();
// TypeError

var greeting = function greeting() { 
    console.log("Hello!");
};
```

Line 1 (greeting();) throws an error. But the kind of error thrown is very important to notice. A TypeError means we’re trying to do something with a value that is not allowed.


So on that first line, greeting exists, but it holds only the default undefined value. It’s not until line 4 that greeting gets assigned the function reference.

Pay close attention to the distinction here. A function declaration is hoisted **and initialized to its function value** (again, called function hoisting).

In both cases, the name of the identifier is hoisted. But the function reference association isn’t handled at initialization time (beginning of the scope) unless the identifier was created in a formal function declaration.

#### Variable Hoisting

Let’s look at another example of variable hoisting:

```Js

greeting = "Hello!";
console.log(greeting);
// Hello!

var greeting = "Howdy!";
```

Though greeting isn’t declared until line 5, it’s available to
be assigned to as early as line 1. Why?

There’s two necessary parts to the explanation:

* the identifier is hoisted,
* andit’sautomaticallyinitializedtothevalueundefined
from the top of the scope.

### Hoisting: Yet Another Metaphor

It’s more useful to think of hoisting as a visualization of various actions JS takes in setting up the program before execution.

The typical assertion of what hoisting means: *lifting*—like lifting a heavy weight upward—any identifiers all the way to the top of a scope.

The explanation often asserted is that the JS engine will actually rewrite that program before execution, so that it looks more like this:

```Js
var greeting; // hoisted declaration 
greeting = "Hello!"; // the original line 1 
console.log(greeting); // Hello!
greeting = "Howdy!"; // `var` is gone!
```

The hoisting (metaphor) proposes that JS pre-processes the original program and re-arranges it a bit, so that all the decla- rations have been moved to the top of their respective scopes, before execution.

Moreover, the hoisting metaphor asserts that function declarations are, in their entirety, hoisted to the top of each scope. 

```Js
studentName = "Suzy";
greeting();
// Hello Suzy!

function greeting() {
    console.log(`Hello ${ studentName }!`);
}

var studentName;
```

The “rule” of the hoisting metaphor is that function declara- tions are hoisted first, then variables are hoisted immediately after all the functions.

Thus, the hoisting story suggests that
program is re-arranged by the JS engine to look like this:

```Js
function greeting() {
    console.log(`Hello ${ studentName }!`);
}
var studentName;

studentName = "Suzy";
greeting();
// Hello Suzy!
```

Hoisting as a mechanism for re-ordering code may be an attractive simplification, but it’s not accurate.

The JS engine doesn’t actually re-arrange the code.

It can’t magically look ahead and find declarations; the only way to accurately find them, as well as all the scope boundaries in the program, would be to fully parse the code.

I don’t think we should claim it’s an actual re-arrangement of source code.

I assert that hoisting should be used to refer to the **compiletime operation** of generating runtime instructions for the automatic registration of a variable at the beginning of its scope, each time that scope is entered.

That’s a subtle but important shift, from hoisting as a runtime behavior to its proper place among compile-time tasks.

### Re-declaration?

What do you think happens when a variable is declared more than once in the same scope? Consider:

```Js
var studentName = "Frank"; 
console.log(studentName); 
// Frank

var studentName; 
console.log(studentName); // ???
```

But is there such a thing as a variable being “re-declared” in the same scope? No.

If you consider this program from the perspective of the hoisting metaphor, the code would be re-arranged like this for execution purposes:

```Js
var studentName;
var studentName; // clearly a pointless no-op!

studentName = "Frank";
console.log(studentName);
// Frank

console.log(studentName);
// Frank
```

It’s just a no-op(eration), a pointless statement.

It’s also important to point out that var studentName; doesn’t mean var studentName = undefined;, as most assume. Let’s prove they’re different by considering this variation of the program:

```Js

var studentName = "Frank"; console.log(studentName); // Frank
var studentName;

console.log(studentName); // Frank <--- still!

// let's add the initialization explicitly
var studentName = undefined; console.log(studentName); // undefined <--- see!?
```

Here’s another illustration, this time across a function of the same name:

```Js
var greeting;
function greeting() { 
    console.log("Hello!");
}

// basically, a no-op
var greeting;

typeof greeting; // "function"

var greeting = "Hello!";
typeof greeting; // "string"
```

What about repeating a declaration within a scope using let or const?

```Js
let studentName = "Frank"; 

console.log(studentName); 

let studentName = "Suzy";
```

This program will not execute, but instead immediately throw a SyntaxError.

Depending on your JS environment, the error message will indicate something like: “studentName has already been declared.”

**In other words, the only way to “re-declare” a variable is to use var for all (two or more) of its declarations.**

#### Constants?

The const keyword is more constrained than let.

But there’s actually an overriding technical reason why that sort of “re-declaration” is disallowed, unlike let which disallows “re-declaration” mostly for stylistic reasons.

The const keyword requires a variable to be initialized, so omitting an assignment from the declaration results in a SyntaxError:

```Js
const empty; // SyntaxError
```

const declarations create variables that cannot be re-as-
signed:
```Js
const studentName = "Frank"; 
console.log(studentName); // Frank

studentName = "Suzy"; // TypeError
```

The studentName variable cannot be re-assigned because it’s
declared with a const.

#### Loops

So it’s clear from our previous discussion that JS doesn’t really want us to “re-declare” our variables within the same scope.

That probably seems like a straightforward admonition, until you consider what it means for repeated execution of decla- ration statements in loops. Consider:

```Js
var keepGoing = true; 
while (keepGoing) {
    let value = Math.random(); 
    if (value > 0.5) {
        keepGoing = false; 
    }
}
```

Is value being “re-declared” repeatedly in this program? Will we get errors thrown? No.

All the rules of scope (including “re-declaration” of let- created variables) are applied per scope instance.

In other words, each time a scope is entered during execution, every- thing resets.

Each loop iteration is its own new scope instance, and within each scope instance, value is only being declared once.

what if the value declaration in the previous snippet were changed to a var?

```Js
var keepGoing = true;
while (keepGoing) {
    var value = Math.random(); 
    if (value > 0.5) {
        keepGoing = false; 
    }
}
```

Is value being “re-declared” here, especially since we know var allows it? No. Because var is not treated as a block-scoping declaration (see Chapter 6), it attaches itself to the global scope.

What about “re-declaration” with other loop forms, like for- loops?

```Js
for (let i = 0; i < 3; i++) {
    let value = i * 10; 
    console.log(`${ i }: ${ value }`);
}
// 0: 0
// 1: 10
// 2: 20
```

It should be clear that there’s only one value declared per scope instance. But what about i? Is it being “re-declared”?

To answer that, consider what scope i is in. It might seem like it would be in the outer (in this case, global) scope, but it’s not. It’s in the scope of for-loop body, just like value is. In fact, you could sorta think about that loop in this more verbose equivalent form:

```Js
{
    // a fictional variable for illustration
    let $$i = 0;
    for ( /* nothing */; $$i < 3; $$i++) { 
        // here's our actual loop `i`! 
        let i = $$i;
        let value = i * 10;
        console.log(`${ i }: ${ value }`); 
    }
    // 0: 0
    // 1: 10
    // 2: 20
}
```
Now it should be clear: the i and value variables are both de- clared exactly once per scope instance. No “re-declaration” here.

What about other for-loop forms?

```Js
for (let index in students) { 
    // this is fine
}
for (let student of students) { 
    // so is this
}
```

Just like the let variant of this program we saw earlier, const is being run exactly once within each loop iteration, so it’s safe from “re-declaration” troubles. But things get more complicated when we talk about for-loops.

for..in and for..of are fine to use with const:

```Js
for (const index in students) { 
    // this is fine
}
for (const student of students) { 
    // this is also fine
}
```

But not the general for-loop:

```Js
for (const i = 0; i < 3; i++) {
    // oops, this is going to fail with
    // a Type Error after the first iteration
}
```

Our i is indeed just created once inside the loop. That’s not the problem. The problem is the conceptual $$i that must be incremented each time with the $$i++ expression. That’s re-assignment (not “re- declaration”), which isn’t allowed for constants.

The straightforward answer is: const can’t be used with the classic for-loop form because of the required re-assignment.

Interestingly, if you don’t do re-assignment, then it’s valid:

```Js
var keepGoing = true;

for (const i = 0; keepGoing; /* nothing here */ ) { 
    keepGoing = (Math.random() > 0.5);
    // ..
}
```

That works, but it’s pointless. There’s no reason to declare i in that position with a const, since the whole point of such a variable in that position is **to be used for counting iterations.** Just use a different loop form, like a while loop, or use a let!

### Uninitialized Variables (aka, TDZ)

With var declarations, the variable is “hoisted” to the top of its scope.
But it’s also automatically initialized to the undefined value, so that the variable can be used throughout the entire scope.

However, let and const declarations are not quite the same in this respect.

```js
console.log(studentName);
// ReferenceError

let studentName = "Suzy";
```

The result of this program is that a ReferenceError is thrown on the first line.

Depending on your JS environment, the error message may say something like: “Cannot access studentName before initialization.”

That error message is quite indicative of what’s wrong: stu- dentName exists on line 1, but it’s not been initialized, so it cannot be used yet. Let’s try this:

```Js

studentName = "Suzy";   // let's try to initialize it!
// ReferenceError

console.log(studentName); 

let studentName;
```

The real question is, how do we initialize an uninitialized variable? For let/const, the only way to do so is with an assignment attached to a declaration statement. An assign- ment by itself is insufficient! Consider:

```Js
let studentName = "Suzy"; 
console.log(studentName); // Suzy
```

```Js
Alternatively:
// ..
let studentName;
// or:
// let studentName = undefined;
// ..
studentName = "Suzy";
console.log(studentName);
// Suzy
```

The term coined by TC39 to refer to this period of time from the entering of a scope to where the auto-initialization of the variable occurs is: Temporal Dead Zone (TDZ).

A var also has technically has a TDZ, but it’s zero in length and thus unobservable to our programs! Only let and const have an observable TDZ.

```Js
askQuestion();
// ReferenceError

let studentName = "Suzy";
function askQuestion() {
    console.log(`${ studentName }, do you know?`);
}
```

Even though positionally the console.log(..) referencing studentName comes after the let studentName declara- tion, timing wise the askQuestion() function is invoked before the let statement is encountered, while studentName is still in its TDZ! Hence the error.

There’s a common misconception that TDZ means let and const do not hoist. This is an inaccurate, or at least slightly misleading, claim. They definitely hoist.

The actual difference is that let/const declarations do not automatically initialize at the beginning of the scope, the way var does.

The debate then is if the auto-initialization is part of hoisting, or not? I think auto-registration of a variable at the top of the scope (i.e., what I call “hoisting”) and auto-initialization at the top of the scope (to undefined) are distinct operations and shouldn’t be lumped together under the single term “hoisting.”

But let’s prove that let and const do hoist (auto-register at the top of the scope), courtesy of our friend shadowing (see “Shadowing” in Chapter 3):

```Js
var studentName = "Kyle"; {
    console.log(studentName);
    // ???

    // ..

    let studentName = "Suzy";

    console.log(studentName);
    // Suzy
}
```

What’s going to happen with the first console.log(..) statement? If let studentName didn’t hoist to the top of the scope, then the first console.log(..) should print "Kyle", right? At that moment, it would seem, only the outer stu- dentName exists, so that’s the variable console.log(..) should access and print.

But instead, the first console.log(..) throws a TDZ error, because in fact, the inner scope’s studentName was hoisted (auto-registered at the top of the scope).

What didn’t happen (yet!) was the auto-initialization of that inner studentName; it’s still uninitialized at that moment, hence the TDZ viola- tion!

So to summarize, TDZ errors occur because let/const dec- larations do hoist their declarations to the top of their scopes, but unlike var, they defer the auto-initialization of their variables until the moment in the code’s sequencing where the original declaration appeared

This window of time (hint: temporal), whatever its length, is the TDZ.

**Always put your let and const declarations at the top of any scope. Shrink the TDZ window to zero (or near zero) length, and then it’ll be moot.**

### Finally Initialized

Hoisting is generally cited as an explicit mechanism of the JS engine, but it’s really more a metaphor to describe the various ways JS handles variable declarations during compilation. But even as a metaphor, hoisting offers useful structure for thinking about the life-cycle of a variable—when it’s created, when it’s available to use, when it goes away.

The TDZ (temporal dead zone) error is strange and frustrating when encountered. Fortunately, TDZ is relatively straightfor- ward to avoid if you’re always careful to place let/const declarations at the top of any scope.