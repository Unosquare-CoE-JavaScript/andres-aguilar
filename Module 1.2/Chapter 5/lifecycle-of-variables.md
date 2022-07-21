### Table of contents: <!-- omit in toc -->

- [Chapter 5: The (Not So) Secret Lifecycle of Variables](#chapter-5-the-not-so-secret-lifecycle-of-variables)
    - [When Can I Use a Variable?](#when-can-i-use-a-variable)
      - [Hoisting: Declaration vs. Expression](#hoisting-declaration-vs-expression)
      - [Variable Hoisting](#variable-hoisting)
    - [Hoisting: Yet Another Metaphor](#hoisting-yet-another-metaphor)
    - [Re-declaration?](#re-declaration)

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