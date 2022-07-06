# You Don’t Know JS Yet: Get Started
notes from the Book You Don’t Know JS Yet: Get Started (YDKJSY)

### Table of contents: <!-- omit in toc -->
- [You Don’t Know JS Yet: Get Started](#you-dont-know-js-yet-get-started)
  - [Chapter 1: What is Javascript?](#chapter-1-what-is-javascript)
    - [The Web Rules Everything About (JS)](#the-web-rules-everything-about-js)
    - [Not all (Web) JS...](#not-all-web-js)
    - [It's not always JS](#its-not-always-js)
    - [Many faces](#many-faces)

## Chapter 1: What is Javascript?
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
