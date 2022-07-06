# You Don’t Know JS Yet: Get Started
notes from the Book You Don’t Know JS Yet: Get Started (YDKJSY)

### Table of contents: <!-- omit in toc -->
- [You Don’t Know JS Yet: Get Started](#you-dont-know-js-yet-get-started)
  - [Chapter 1: What is Javascript?](#chapter-1-what-is-javascript)
    - [The Web Rules Everything About (JS)](#the-web-rules-everything-about-js)
    - [Not all (Web) JS...](#not-all-web-js)

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

