
### Table of contents: <!-- omit in toc -->
- [Chapter 1: What is Javascript?](#chapter-1-what-is-javascript)
    - [The Web Rules Everything About (JS)](#the-web-rules-everything-about-js)
    - [Not all (Web) JS...](#not-all-web-js)
    - [It's not always JS](#its-not-always-js)
    - [Many faces](#many-faces)
    - [Backwards & Forwards](#backwards--forwards)
    - [Jumping the Gaps](#jumping-the-gaps)
      - [Transpiling with Babel](#transpiling-with-babel)
    - [Filling the Gaps](#filling-the-gaps)
    - [What’s in an Interpretation?](#whats-in-an-interpretation)
    - [Web Assembly (WASM)](#web-assembly-wasm)
    - [Strictly Speaking](#strictly-speaking)
    - [Defined](#defined)

# Chapter 1: What is Javascript?
Actually what we use in modern web development is not Javascript anymore "the official name of the language specified by TC39 and formalized by the ECMA standards body is ECMAScript" but we should just call it "JS".

### The Web Rules Everything About (JS)
JS runs in lots of places, the one envionment that rules JS is the web.
In other words how JS is implemented for web browsers is, in all practicality, the only reality that matters.

### Not all (Web) JS...

Is this code a JS program?

alert("Hello, JS!");

Depends on how you look at things. The alert(..) function shown here is not included in the JS specification, but it is in all web JS environments.

Various JS environments (like browser JS engines, Node.js, etc.) add APIs into the global scope of your JS programs that give you environment-specific capabilities, like being able to pop an alert-style box in the user’s browser.

In fact, a wide range of JS-looking APIs.
For example:

* fetch(..)
* getCurrentLocation(..)
* getUserMedia(..)
* console.log(..) (and all the other console.* methods!)
* alert(..)

**They look like  JS, but they are not defined by JS.**

They are functions and object methods and they obey JS syntax rules. The behaviors behind them are controlled by the environment running the JS engine, but on the surface they definitely have to abide by JS to be able to play in the JS playground.

### It's not always JS
**Developer Tools**
Do not assume JS native behavior while using them(in the console part):
* Whether a var or function declaration in the top- level “global scope” of the console actually creates a real global variable (and mirrored window property, and vice versa!).
* What happens with multiple let and const declara- tions in the top-level “global scope.”
* Whether "use strict"; on one line-entry (pressing "enter" after) enables strict mode for the rest of that console session, the way it would on the first line of a .js file, as well as whether you can use "use strict"; beyond the “first line” and still get strict mode turned on for that session.
* How non-strict mode this default-binding works for function calls, and whether the “global object” used will contain expected global variables.
* How hoisting (see Book 2, Scope & Closures) works across multiple line entries.
* ...several others

The developer console is not trying to pretend to be a JS compiler that handles your entered code exactly the same way the JS engine handles a .js file.
Just use it for quickly enter a few lines of code and see the results inmediatly.

Don’t trust what behavior you see in a developer console as representing exact to-the-letter JS semantics; for that, read the specification. Instead, think of the console as a “JS-friendly” environment. That’s useful in its own right.

### Many faces
The term “paradigm” in programming language context refers to a broad (almost universal) mindset and approach to struc- turing code. 

Typical paradigm-level code categories include procedural, object-oriented (OO/classes), and functional (FP):

* Procedural style organizes code in a top-down, linear progression through a pre-determined set of operations, usually collected together in related units called proce- dures.
* OO style organizes code by collecting logic and data together into units called classes.
* FP style organizes code into functions (pure computa- tions as opposed to procedures), and the adaptations of those functions as values.

JavaScript is most definitely a multi-paradigm language. You can write procedural, class-oriented, or FP-style code, and you can make those decisions on a line-by-line basis instead of being forced into an all-or-nothing choice.

### Backwards & Forwards
One of the most foundational principles that guides JavaScript is preservation of backwards compatibility.
The idea is that JS developers can write code with confidence that their code won’t stop working unpredictably because a browser update is released. This makes the decision to choose JS for a program a more wise and safe investment, for years into the future.
There are some small exceptions to this rule. JS has had some backwards-incompatible changes, but TC39 is extremely cau- tious in doing so.
They study existing code on the web (via browser data gathering) to estimate the impact of such break- age, and browsers ultimately decide and vote on whether they’re willing to take the heat from users for a very small- scale breakage weighed against the benefits of fixing or improving some aspect of the language for many more sites (and users).

These kinds of changes are rare, and are almost always in corner cases of usage that are unlikely to be observably breaking in many sites.

Compare backwards compatibility to its counterpart, for- wards compatibility. Being forwards-compatible means that including a new addition to the language in a program would not cause that program to break if it were run in an older JS engine. **JS is not forwards-compatible**, despite many wishing such, and even incorrectly believing the myth that it is.

HTML and CSS, by contrast, are forwards-compatible but not backwards-compatible. If you dug up some HTML or CSS written back in 1995, it’s entirely possible it would not work (or work the same) today.

But, **if you use a new feature from 2019 in a browser from 2010**, the page isn’t “broken” – **the unrecognized CSS/HTML is skipped over**, while the rest of the CSS/HTML would be processed accordingly.

it’s impossible to ensure that a subsequent part of the program wasn’t expecting the skipped-over part to have been processed.
Though JS isn’t, and can’t be, forwards-compatible, it’s crit- ical to recognize JS’s backwards compatibility, including the enduring benefits to the web and the constraints and difficul- ties it places on JS as a result.

### Jumping the Gaps
Since JS is not forwards-compatible, it means that there is always the potential for a gap between code that you can write that’s valid JS, and the oldest engine that your site or application needs to support.

If the feature is a new syntax, the program will in general completely fail to compile and run, usually throwing a syntax error. If the feature is an API (such as ES6’s Object.is(..)), the program may run up to a point but then throw a runtime exception and stop once it encounters the reference to the unknown API.

**JS developers need to take special care to address this gap.**

**For new and incompatible syntax, the solution is transpiling.**

#### Transpiling with Babel
Transpiling is a contrived and community-invented term to describe using a tool to convert the source code of a program from one form to another (but still as textual source code).

Typically, forwards-compatibility problems related to syntax are solved by using a transpiler (the most common one being Babel to convert from that newer JS syntax version to an equivalent older syntax.

For example, a developer may write a snippet of code like:

```Javascript 
if (something) { let x = 3;
    console.log(x);
}
else {
let x = 4;
    console.log(x);
}
```

This is how the code would look in the source code tree for that application. But when producing the file(s) to deploy to the public website, the Babel transpiler might convert that code to look like this:

```Javascript 
var x$0, x$1; if (something) {
x$0 = 3;
    console.log(x$0);
}
else {
x$1 = 4;
    console.log(x$1);
}
```

As you see, the source code use 'let' for variables but that was added in ES6 (2015), so it replaces it for vanilla JS 'var'.

An equivalent program (with minimal re-working) that Babel can produce just chooses to name two different variables with unique names, producing the same non-interference outcome.

You may wonder: why go to the trouble of using a tool to convert from a newer syntax version to an older one? Couldn’t we just write the two variables and skip using the let keyword? The reason is, it’s strongly recommended that developers use the latest version of JS so that their code is clean and communicates its ideas most effectively.

Developers should focus on writing the clean, new syntax forms, and let the tools take care of producing a forwards- compatible version of that code that is suitable to deploy and run on the oldest-supported JS engine environments.

### Filling the Gaps
If the forwards-compatibility issue is not related to new syntax, but rather to a missing API method that was only recently added, the most common solution is to provide a definition for that missing API method that stands in and acts as if the older environment had already had it natively defined. This pattern is called a **polyfill (aka “shim”)**.

```Javascript 
// getSomeRecords() returns us a promise for some // data it will fetch
var pr = getSomeRecords();
// show the UI spinner while we get the data
startSpinner();
pr
.then(renderRecords) // render if successful .catch(showError) // show an error if not .finally(hideSpinner) // always hide the spinner

```
This code uses an ES2019 feature, the **finally(..)** method on the **promise prototype**.

This method (finally()) would not work in a pre-ES2019 environment.

A polyfill for finally(..) in pre-ES2019 environments could look like this:

```js 
if (!Promise.prototype.finally) { 
  Promise.prototype.finally = function f(fn){
    return this.then( 
      function t(v){
        return Promise.resolve( fn() ) 
        .then(function t(){
         return v; 
         });
      },
      function c(e){
        return Promise.resolve( fn() ) .then(function t(){
          throw e; });
        });
      } 
    );
  }; 
}
```

### Warning! <!-- omit in toc -->
  *This is only a simple illustration of a ba- sic (not entirely spec-compliant) polyfill for finally(..). Don’t use this polyfill in your code; always use a robust, official polyfill wher- ever possible, such as the collection of polyfill- s/shims in ES-Shim.*

The if statement protects the polyfill definition by preventing it from running in any environment where the JS engine has already defined that method. In older environments, the polyfill is defined, but in newer environments the if statement is quietly skipped.

Transpilers like Babel typically detect which polyfills your code needs and provide them automatically for you.

But occasionally you may need to include/define them explicitly,
which works similar to the snippet we just looked at.

Since JS isn’t going to stop improving, the gap will never go away. Both techniques should be embraced as a standard part of every JS project’s production chain going forward.

### What’s in an Interpretation?

A long-debated question for code written in JS: is it an inter- preted script or a compiled program?

**we distribute the source code, not the binary form**

In scripted or interpreted languages, an error on line 5 of a program won’t be discovered until lines 1 through 4 have already executed.

Compare that to languages which do go through a processing step (typically, called parsing) before any execution occurs,
In this processing model, an invalid command (such as broken syntax) on line 5 would be caught during the **parsing phase**, before any execution has begun, and none of the program would run.

JS source code is parsed before it is executed. The specification requires as much, because it calls for “early errors”—statically determined errors in code, such as a duplicate parameter name—to be reported before the code starts executing.

So **JS is a parsed language**, but is it compiled?

The answer is closer to yes than no.

To be specific, this “compilation” produces a binary byte code (of sorts), which is then handed to the “JS virtual machine” to execute. Some like to say this VM is “interpreting” the byte code.

Another wrinkle is that JS engines can employ multiple passes of JIT (Just-In-Time) processing/optimization on the generated code (post parsing), which again could reasonably be labeled either “compilation” or “interpretation” depending on perspective.

So what do these nitty-gritty details boil down to? Step back
and consider the entire flow of a JS source program:

1. After a program leaves a developer’s editor, it gets tran- spiled by Babel, then packed by Webpack (and perhaps half a dozen other build processes), then it gets delivered in that very different form to a JS engine.
2. The JS engine parses the code to an AST.
3. Then the engine converts that AST to a kind-of byte
code, a binary intermediate representation (IR), which is then refined/converted even further by the optimizing JIT compiler.
4. Finally, the JS VM executes the program.

I think it’s clear that in spirit, if not in practice, **JS is a compiled language.**

And again, the reason that matters is, since JS is compiled, we are informed of static errors (such as malformed syntax) before our code is executed. That is a substantively different interaction model than we get with traditional “scripting” programs, and arguably more helpful!

### Web Assembly (WASM)

In 2013, engineers from Mozilla Firefox demonstrated a port of the Unreal 3 game engine from C to JS.

WASM is similar to ASM.js in that its original intent was to provide a path for non-JS programs (C, etc.) to be converted to a form that could run in the JS engine.

WASM will not replace JS. WASM significantly augments what the web (including JS) can accomplish. That’s a great thing, entirely orthogonal to whether some people will use it as an escape hatch from having to write JS.

### Strictly Speaking

Back in 2009 with the release of ES5, JS added strict mode as
an opt-in mechanism for encouraging better JS programs.

Strict mode shouldn’t be thought of as a restriction on what you can’t do, but rather as a guide to the best way to do things so that the JS engine has the best chance of optimizing and efficiently running the code.

Most strict mode controls are in the form of early errors, meaning errors that aren’t strictly syntax errors but are still thrown at compile time (before the code is run).

For example, strict mode disallows naming two function parameters the same, and results in an early error. Some other strict mode controls are only observable at runtime, such as how this defaults to undefined instead of the global object.

the best mindset is that strict mode is like a linter reminding you how JS should be written to have the highest quality and best chance at performance.

Strict mode is switched on per file with a special pragma (nothing allowed before it except comments/whitespace):

```js 

// only whitespace and comments are allowed
// before the use-strict pragma
"use strict";
// the rest of the file runs in strict mode
```

### Warning! <!-- omit in toc -->
*Something to be aware of is that even a stray ; all by itself appearing before the strict mode pragma will render the pragma useless; no errors are thrown because it’s valid JS to have a string literal expression in a statement position, but it also will silently not turn on strict mode!*

Strict mode can alternatively be turned on **per-function scope**, with exactly the same rules about its surroundings:

```js 
function someOperations() {
// whitespace and comments are fine here 
"use strict";
// all this code will run in strict mode
}
```

Interestingly, if a file has strict mode turned on, the function- level strict mode pragmas are disallowed. **So you have to pick one or the other.**

The **only** valid reason to use a per-function approach to strict mode is when you are converting an existing non-strict mode program file and need to make the changes little by little over time.

### Defined

JS is an implementation of the ECMAScript standard (version ES2019 as of this writing), which is guided by the TC39 committee and hosted by ECMA. It runs in browsers and other JS environments such as Node.js.

JS is a multi-paradigm language, meaning the syntax and capabilities allow a developer to mix and match (and bend and reshape!) concepts from various major paradigms, such as procedural, object-oriented (OO/classes), and functional (FP).

JS is a compiled language, meaning the tools (including the JS engine) process and verify a program (reporting any errors!) before it executes.
