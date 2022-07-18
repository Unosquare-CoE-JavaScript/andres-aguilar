### Table of contents: <!-- omit in toc -->

- [Chapter 1: What’s the Scope?](#chapter-1-whats-the-scope)
    - [Compiled vs. Interpreted](#compiled-vs-interpreted)
    - [Compiling Code](#compiling-code)
    - [Required: Two Phases](#required-two-phases)

# Chapter 1: What’s the Scope?

This book will dig through all aspects of scope—how it works, what it’s useful for, gotchas to avoid—and then point toward common scope patterns that guide the structure of programs.

Our first step is to uncover how the JS engine processes our program before it runs.

JS functions are themselves first-class values; they can be assigned and passed around just like numbers or strings. But since these functions hold and access variables, they maintain their original scope no matter where in the program the functions are eventually executed. This is called closure.
Modules are a code organization pattern characterized by public methods that have privileged access (via closure) to hidden variables and functions in the internal scope of the module.

### Compiled vs. Interpreted

<img src="./img/fig1.png">

It’s not mysterious or magical, though. Code compilation is a set of steps that process the text of your code and turn it into a list of instructions the computer can understand.

Modern JS engines actually employ numerous variations of both compilation and interpretation in the handling of JS programs.

### Compiling Code

But first, why does it even matter whether JS is compiled or not?

Scope is primarily determined during compilation, so un- derstanding how compilation and execution relate is key in mastering scope.

JS engines don’t have the luxury of an abundance of time to perform their work and optimizations, because JS compilation doesn’t happen in a build step ahead of time, as with other languages.

It usually must happen in mere microseconds (or less!) right before the code is executed.

To ensure the fastest performance under these constraints, JS engines use all kinds of tricks (like JITs, which lazy compile and even hot re- compile); these are well beyond the “scope” of our discussion here.

### Required: Two Phases

