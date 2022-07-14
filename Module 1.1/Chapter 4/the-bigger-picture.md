### Table of contents: <!-- omit in toc -->

- [Chapter 4: The Bigger Picture](#chapter-4-the-bigger-picture)
    - [Pillar 1: Scope and Closure](#pillar-1-scope-and-closure)
    - [Pillar 2: Prototypes](#pillar-2-prototypes)
    - [Pillar 3: Types and Coercion](#pillar-3-types-and-coercion)

# Chapter 4: The Bigger Picture

This final chapter divides the organization of the JS language into three main pillars, then offers a brief roadmap of what to expect from the rest of the book series, and how I suggest you proceed. Also, don’t skip the appen- dices, especially Appendix B, “Practice, Practice, Practice!”.

### Pillar 1: Scope and Closure

The organization of variables into units of scope (functions, blocks) is one of the most foundational characteristics of any language; perhaps no other characteristic has a greater impact on how programs behave.

Scopes are like buckets, and variables are like marbles you put into those buckets.

Scopes nest inside each other, and for any given expression or statement, only variables at that level of scope nesting, or in higher/outer scopes, are accessible; variables from lower/in- ner scopes are hidden and inaccessible.

JS is lexically scoped, though many claim it isn’t, because of two particular characteristics of its model that are not present in other lexically scoped languages.

The first is commonly called *hoisting*: when all variables declared anywhere in a scope are treated as if they’re declared at the beginning of the scope. The other is that var-declared variables are function scoped, even if they appear inside a block.

Neither hoisting nor function-scoped var are sufficient to back the claim that JS is not lexically scoped.

let/const dec- larations have a peculiar error behavior called the “Temporal Dead Zone” (TDZ) which results in observable but unusable variables.

**Closure** is a natural result of lexical scope when the language has functions as first-class values, as JS does. When a function makes reference to variables from an outer scope, and that function is passed around as a value and executed in other scopes, it maintains access to its original scope variables; this is closure.

### Pillar 2: Prototypes

JS is one of very few languages where you have the option to create objects directly and explicitly, without first defining their structure in a class.

For many years, people implemented the class design pattern on top of prototypes—so-called “prototypal inheritance” (see Appendix A, “Prototypal ‘Classes’”)—and then with the ad- vent of ES6’s class keyword, the language doubled-down on its inclination toward OO/class-style programming.

But I think that focus has obscured the beauty and power of the prototype system: the ability for two objects to simply connect with each other and cooperate dynamically (during function/method execution) through sharing a this context.

### Pillar 3: Types and Coercion

The third pillar of JS is by far the most overlooked part of JS’s nature.

I don’t agree at all that the inevitable conclusion of this is to decide JS’s type mechanism is bad and that we need to cover up JS’s types with solutions outside the language. We don’t have to follow the “static typing” way to be smart and solid with types in our programs.

this pillar is more important than the other two, in the sense that no JS program will do anything useful if it doesn’t properly leverage JS’s value types, as well as the conversion (coercion) of values between types.