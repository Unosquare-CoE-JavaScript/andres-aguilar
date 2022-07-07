# You Don’t Know JS Yet: Get Started
notes from the Book You Don’t Know JS Yet: Get Started (YDKJSY)

### Table of contents: <!-- omit in toc -->
- [You Don’t Know JS Yet: Get Started](#you-dont-know-js-yet-get-started)
  - [Chapter 1: What is Javascript?](#chapter-1-what-is-javascript)
    - [The Web Rules Everything About (JS)](#the-web-rules-everything-about-js)
    - [Not all (Web) JS...](#not-all-web-js)
    - [It's not always JS](#its-not-always-js)
    - [Many faces](#many-faces)
    - [Backwards & Forwards](#backwards--forwards)
    - [Jumping the Gaps](#jumping-the-gaps)
      - [Transpiling with Babel](#transpiling-with-babel)

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