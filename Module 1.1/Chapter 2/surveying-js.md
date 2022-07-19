
### Table of contents: <!-- omit in toc -->
- [Chapter 2: Surveying JS](#chapter-2-surveying-js)
    - [Each File is a Program](#each-file-is-a-program)
    - [Values](#values)
    - [Arrays And Objects](#arrays-and-objects)
    - [Value Type Determination](#value-type-determination)
    - [Declaring and Using Variables](#declaring-and-using-variables)
    - [Functions](#functions)
    - [Comparisons](#comparisons)
      - [Equal...ish](#equalish)
      - [Coercive Comparisons](#coercive-comparisons)
    - [How We Organize in JS](#how-we-organize-in-js)
      - [Classes](#classes)
      - [Class Inheritance](#class-inheritance)
      - [Modules](#modules)
      - [Classic Modules](#classic-modules)
      - [ES Modules](#es-modules)
    - [The Rabbit Hole Deepens](#the-rabbit-hole-deepens)
 
 # Chapter 2: Surveying JS

This chapter is not an exhaustive reference on every bit of syntax of the JS language. It’s also not intended to be a complete “intro to JS” primer.
Instead, we’re just going to survey some of the major topic areas of the language. Our goal is to get a better feel for it, so that we can move forward writing our own programs with more confidence.

### Each File is a Program

In JS, each standalone file is its own separate program.

The reason this matters is primarily around error handling. Since JS treats files as programs, one file may fail (during parse/compile or execution) and that will not necessarily prevent the next file from being processed. 

It may surprise you to consider separate .js files as separate JS programs. From the perspective of your usage of an appli- cation, it sure seems like one big program. That’s because the execution of the application allows these individual programs to cooperate and act as one program.

The only way multiple standalone .js files act as a single program is by sharing their state (and access to their public functionality) via the “global scope.” They mix together in this global scope namespace, so at runtime they act as as whole.

Since ES6, JS has also supported a module format in addition to the typical standalone JS program format.

Modules are also file-based. If a file is loaded via module-loading mechanism such as an import statement or a 
```html
<script type=module>
``` 
tag, all its code is treated as a **single module**.

Regardless of which code organization pattern (and loading mechanism) is used for a file (standalone or module), you should still think of each file as its own (mini) program, which may then cooperate with other (mini) programs to perform the functions of your overall application.

### Values

The most fundamental unit of information in a program is a value.

**Values are data.**

They’re how the program maintains state.

Values come in two forms in JS: **primitive and object.**

Values are embedded in programs using literals:

```Js 
greeting("My name is Kyle.");
```

In this program, the value "My name is Kyle." is a primi- tive string literal; strings are ordered collections of characters, usually used to represent words and sentences.

The choice of which quote character (" or ') is entirely stylistic. The important thing, for code readability and maintainability sake, is to pick one and to use it consistently throughout the program.

Another option to delimit a string literal is to use the back- tick ` character. However, this choice is not merely stylistic; there’s a behavioral difference as well. Consider:

```Js
console.log("My name is ${ firstName }.");
// My name is ${ firstName }.
console.log('My name is ${ firstName }.');
// My name is ${ firstName }.
console.log(`My name is ${ firstName }.`); 
// My name is Kyle.
```

Other than strings, JS programs often contain other primitive literal values such as booleans and numbers:

```Js
while (false) { console.log(3.141592);
}
```

while represents a loop type, a way to repeat operations while
**its condition is true.**

In this case, the loop will never run (and nothing will be printed), because we used the false boolean value as the loop conditional. true would have resulted in a loop that keeps going forever, so be careful!

Another variation on numbers is the bigint (big-integer) primitive type, which is used for storing arbitrarily large numbers.

In addition to strings, numbers, and booleans, two other primitive values in JS programs are *null* and *undefined*.

it’s safest and best to use only undefined as the single empty value, even though null seems attractive in that it’s shorter to type!

```Js
while (value != undefined) { 
    console.log("Still got something!");
}
```

The final primitive value to be aware of is a symbol, which is a special-purpose value that behaves as a hidden unguessable value. Symbols are almost exclusively used as special keys on objects:

```Js
hitchhikersGuide[ Symbol("meaning of life") ];
// 42
```

You won’t encounter direct usage of symbols very often in typical JS programs. They’re mostly used in low-level code such as in libraries and frameworks.

### Arrays And Objects

Besides primitives, the other value type in JS is an object value.

Arrays are a special type of object that’s comprised of an ordered and numerically indexed list of data:

```Js
names = [ "Frank", "Kyle", "Peter", "Susan" ];
names.length;
// 4
names[0];
// Frank
names[1];
// Kyle
```
JS arrays can hold any value type, either primitive or object (including other arrays).

Even functions are values that can be held in arrays or objects.

```Js
name = {
    first: "Kyle",
    last: "Simpson",
    age: 39,
    specialties: [ "JS", "Table Tennis" ]
};
console.log(`My name is ${ name.first }.`);
```

Here, name represents an object, and first represents the name of a location of information in that object (value col- lection). Another syntax option that accesses information in an object by its property/key uses the square-brackets [ ], such as name["first"].

### Value Type Determination
For distinguishing values, the typeof operator tells you its built-in type, if primitive, or "object" otherwise:

```Js
typeof 42; // "number"
typeof "abc"; // "string"
typeof true; // "boolean"
typeof undefined; // "undefined"
typeof null; // "object" -- oops, bug!
typeof { "a": 1 }; // "object"
typeof [1,2,3]; // "object"
typeof function hello(){}; // "Function"
```

### Warning! <!-- omit in toc -->
*typeof null unfortunately returns "object" instead of the expected "null". Also, typeof returns the specific "function" for functions, but not the expected "array" for arrays.*

### Declaring and Using Variables
In JS programs, values can either appear as literal values (as many of the preceding examples illustrate), or they can be held in variables; think of variables as just containers for values.

Variables have to be declared (created) to be used.

There are various syntax forms that declare variables (aka, “iden- tifiers”), and each form has different implied behaviors.

For example, consider the var statement:

```Js
var name = "Kyle";
var age;
```

Another similar keyword is let:

```Js
let name = "Kyle"; 
let age;
```

The let keyword has some differences to var, with the most obvious being that let allows a more limited access to the variable than var. This is called “block scoping” as opposed to regular or function scoping.

Consider:

```Js
var adult = true;
if (adult) {
    var name = "Kyle";
    let age = 39;
    console.log("Shhh, this is a secret!");
}
console.log(name);
// Kyle
console.log(age);
// Error!
```

Block-scoping is very useful for limiting how widespread variable declarations are in our programs, which helps pre- vent accidental overlap of their names.

A third declaration form is const. It’s like let but has an additional limitation that it must be given a value at the moment it’s declared, and cannot be re-assigned a different value later.

Consider:

```Js
const myBirthday = true; 
let age = 39;
if (myBirthday) {
    age=age+1; //OK! 
    myBirthday = false; // Error!
}
```

The myBirthday constant is not allowed to be re-assigned.

**Const declared variables are not “unchangeable”, they just cannot be re-assigned.**

It’s ill-advised to use const with object values, because those values can still be changed even though the variable can’t be re-assigned.

```Js
const actors = [
"Morgan Freeman", "Jennifer Aniston"
];
actors[2] = "Tom Cruise";   // OK :(
actors = [];                // Error!
```

Besides var / let / const, there are other syntactic forms that declare identifiers (variables) in various scopes. For example:

```Js
//Function scope
function hello(name) { 
    console.log(`Hello, ${ name }.`);
}
hello("Kyle");
// Hello, Kyle.
```

The identifier hello is created in the outer scope, and it’s also automatically associated so that it references the function. But the named parameter name is created only inside the function, and thus is only accessible inside that function’s scope. hello and name generally behave as var-declared.

Another syntax that declares a variable is a catch clause:

```Js
try { 
    someError();
}
catch (err) {
    console.log(err);
}
```

The err is a **block-scoped** variable that **exists only inside the catch clause**, as if it had been declared with let.

### Functions

In JS, we should consider “function” to take the broader meaning of another related term: “procedure.”

A procedure is a collection of statements that can be invoked one or more times, may be provided some inputs, and may give back one or more outputs.

From the early days of JS, function definition looked like:

```Js
function awesomeFunction(coolThings) { 
    // ..
    return amazingStuff; 
}
```

This is called a function declaration because it appears as a statement by itself, not as an expression in another statement.

In contrast to a function declaration statement, a function expression can be defined and assigned like this:

```Js
// let awesomeFunction = ..
// const awesomeFunction = ..
var awesomeFunction = function(coolThings) {
    // ..
    return amazingStuff; 
};
```
It’s extremely important to note that in JS, functions are values that can be assigned (as shown in this snippet) and passed around. In fact, JS functions are a special type of the object value type. Not all languages treat functions as values, but it’s essential for a language to support the functional programming pattern, as JS does.

JS functions can receive parameter input:

```Js
function greeting(myName) {
     console.log(`Hello, ${ myName }!`);
}
greeting("Kyle");   // Hello, Kyle!
```

In this snippet, myName is called a parameter, which acts as a local variable inside the function.

Functions also can return values using the return keyword:

```Js
function greeting(myName) {
     return `Hello, ${ myName }!`;
}
var msg = greeting("Kyle");
console.log(msg);   // Hello, Kyle!
```

You can only return a single value, but if you have more val- ues to return, you can wrap them up into a single object/array.

Since functions are values, they can be assigned as properties on objects:

```Js
var whatToSay = { greeting() {
        console.log("Hello!");
    },
    question() {
        console.log("What's your name?");
}, answer() {
        console.log("My name is Kyle.");
    }
};
whatToSay.greeting();
// Hello!
```

Each function can be called by accessing the property to retrieve the function reference value. Compare this straightforward style of defining functions on an object to the more sophisticated class syntax discussed later in this chapter.

### Comparisons

Making decisions in programs requires comparing values to determine their identity and relationship to each other. JS has several mechanisms to enable value comparison.

#### Equal...ish

If you’ve spent any time working with and reading about JS, you’ve certainly seen the so-called “triple-equals” === operator, also described as the “strict equality” operator. That seems rather straightforward, right? Surely, “strict” means strict, as in narrow and exact.

Yes, most values participating in an === equality comparison will fit with that exact same intuition. Consider some exam- ples:

```Js
3 === 3.0;   //true
"yes" === "yes";  //true
null === null;  //true
false === false; //true

42 === "42";  //false 
"hello" === "Hello"; //false
true === 1;  //false
0 === null;  //false
"" === null;  //false
null === undefined;  //false
```

### Note <!-- omit in toc -->
Another way ===’s equality comparison is often described is, “checking both the value and the type”. In several of the examples we’ve looked at so far, like 42 === "42", the type of both values (number, string, etc.) does seem to be the distinguishing factor. There’s more to it than that, though. All value comparisons in JS consider the type of the values being compared, not just the === operator. Specifically, === disallows any sort of type conversion (**aka, “coercion”**) in its com- parison, where other JS comparisons do allow **coercion**.

But the === operator does have some nuance to it, a fact many JS developers gloss over, to their detriment.

The === operator is designed to lie in two cases of special values: NaN and -0. 

Consider:

```Js
NaN === NaN; // false 
0 === -0; // true
```

In the case of NaN, the === operator lies and says that an occurrence of NaN is not equal to another NaN.

In the case of -0 (yes, this is a real, distinct value you can use intentionally in your programs!), the === operator lies and says it’s equal to the regular 0 value.

Since the lying about such comparisons can be bothersome, it’s best to avoid using === for them. For NaN comparisons, use the Number.isNaN(..) utility, which does not lie. For -0 comparison, use the Object.is(..) utility, which also does not lie. Object.is(..) can also be used for non-lying NaN checks, if you prefer. Humorously, you could think of Object.is(..) as the *“quadruple-equals”* ====, the really- really-strict comparison!

The story gets even more complicated when we consider comparisons of object values (non-primitives). Consider:

```Js
[1,2,3]===[1,2,3]; //false 
{ a: 42 } === { a: 42 } // false 
(x=>x*2)===(x=>x*2) //false
```

JS does not define === as *structural equality* for object values. Instead, === uses *identity equality* for object values.

In JS, all object values are held by reference, are assigned and passed by reference-copy, and to our current discussion, are compared by reference (identity) equality. 

Consider:

```Js
var x = [ 1, 2, 3 ];
// assignment is by reference-copy, so // y references the *same* array as x, // not another copy of it.
var y = x;
y === x; // true 
y === [1,2,3]; //false 
x === [1,2,3]; //false
```

In this snippet, y === x is true because both variables hold a reference to the same initial array. But the === [1,2,3] comparisons both fail because y and x, respectively, are being compared to new different arrays [1,2,3].

The array structure and contents don’t matter in this comparison, only the reference identity.

JS does not provide a mechanism for structural equality comparison of object values, only reference identity compar- ison. To do structural equality comparison, **you’ll need to implement the checks yourself.**

#### Coercive Comparisons

Coercion means a value of one type being converted to its respective representation in another type (to whatever extent possible).

**Coercion is a core pillar of the JS language**, not some optional feature that can reasonably be avoided.

What about the == equality?

Few JS features draw more ire in the broader JS community than the == operator, generally referred to as the “loose equality” operator. The majority of all writing and public dis- course on JS condemns this operator as poorly designed and dangerous/bug-ridden when used in JS programs. Even the creator of the language himself, Brendan Eich, has lamented how it was designed as a big mistake.

The == allows type conversions first, and once the types have been converted to be the same on both sides, then == does the same thing as ===. Instead of “loose equality,” the == operator should be described as “coercive equality.”

Consider:

```Js
42 == "42"; // 
true 1 == true; // true
```

In both comparisons, the value types are different, so the == causes the non-number values ("42" and true) to be converted to numbers (42 and 1, respectively) before the comparisons are made.

There’s a pretty good chance that you’ll use relational com- parison operators like <, > (and even <= and >=).

Just like ==, these operators will perform as if they’re “strict” if the types being relationally compared already match, but they’ll allow coercion first (generally, to numbers) if the types differ.

Consider:

```Js
var arr = [ "1", "10", "100", "1000" ];
for (let i = 0; i < arr.length && arr[i] < 500; i++) {
    // will run 3 times
}
```

The i < arr.length comparison is “safe” from coercion because i and arr.length are always numbers. The arr[i] < 500 invokes coercion, though, because the arr[i] values are all strings.

Those comparisons thus become 1 < 500, 10 < 500, 100 < 500, and 1000 < 500. Since that last one is false, the loop stops after its third iteration.

These relational operators typically use numeric comparisons, except in the case where **both** values being compared are already strings; in this case, they use alphabetical (dictionary- like) comparison of the strings:

```Js
var x = "10"; 
var y = "9";
x < y;      // true, watch out!

```


There’s no way to get these relational operators to avoid coercion, other than to just never use mismatched types in the comparisons. That’s perhaps admirable as a goal, but it’s still pretty likely you’re going to run into a case where the types *may* differ.

The wiser approach is not to avoid coercive comparisons, but to embrace and learn their ins and outs.

### How We Organize in JS

Two major patterns for organizing code (data and behavior) are used broadly across the JS ecosystem: *classes* and *modules.*

they’re just different sides of the same coin.

#### Classes

A class in a program is a definition of a “type” of custom data structure that includes both data and behaviors that operate on that data.

Classes define how such a data structure works, but classes are not themselves concrete values.

To get a concrete value that you can use in the program, a class must be instantiated (with the new keyword) one or more times.

Consider:

```Js
class Page {
     constructor(text) {
        this.text = text;
    }
    print() {
         console.log(this.text);
    } 
}
class Notebook {
    constructor() {
        this.pages = [];
    }
    addPage(text) {
        var page = new Page(text); this.pages.push(page);
    }
    print() {
        for (let page of this.pages) {
            page.print();
        }
    } 
}

var mathNotes = new Notebook(); 
mathNotes.addPage("Arithmetic: + - * / ..."); 
mathNotes.addPage("Trigonometry: sin cos tan ...");

mathNotes.print();
// ..

```

In the Page class, the data is a string of text stored in a this.text member property. The behavior is print(), a method that dumps the text to the console.

The class mechanism allows packaging data (text and pages) to be organized together with their behaviors (e.g., addPage(..) and print()).

The same program could have been built without any class definitions, but it would likely have been much less organized, harder to read and reason about, and more susceptible to bugs and subpar maintenance.

#### Class Inheritance

Another aspect inherent to traditional “class-oriented” design, though a bit less commonly used in JS, is “inheritance” (and “polymorphism”).

Consider:
```Js
class Publication {
    constructor(title,author,pubDate) {
    this.title = title; 
    this.author = author; 
    this.pubDate = pubDate;
}
    print() {
        console.log(`
            Title: ${ this.title } 
            By: ${ this.author } 
            ${ this.pubDate }
        `); 
    }
}
```

This Publication class defines a set of common behavior
that any publication might need.

Now let’s consider more specific types of publication, like
Book and BlogPost:

```Js
class Book extends Publication { 
    constructor(bookDetails) {
        super(
            bookDetails.title, 
            bookDetails.author, 
            bookDetails.publishedOn
        );
        this.publisher = bookDetails.publisher; 
        this.ISBN = bookDetails.ISBN;
        }

    print() { 
        super.print();
        console.log(`
            Publisher: ${ this.publisher }
            ISBN: ${ this.ISBN } 
        `);
    }
}

class BlogPost extends Publication { 
    constructor(title,author,pubDate,URL) {
        super(title,author,pubDate);
        this.URL = URL; 
    }

    print() { 
        super.print();
        console.log(this.URL); 
    }
}
```

Both Book and BlogPost use the extends clause to extend the general definition of Publication to include additional behavior.

The super(..) call in each constructor delegates to the parent Publication class’s constructor for its initial- ization work, and then they do more specific things according to their respective publication type (aka, “sub-class” or “child class”).

Now consider using these child classes:

```Js
var YDKJS = new Book({
    title: "You Don't Know JS", 
    author: "Kyle Simpson", 
    publishedOn: "June 2014", 
    publisher: "O'Reilly", 
    ISBN: "123456-789"
});

YDKJS.print();
// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789

var forAgainstLet = new BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014", "https://davidwalsh.name/for-and-against-let"
);

forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

Notice that both child class instances have a print() method, which was an override of the inherited print() method from the parent Publication class.

The fact that both the inherited and overridden methods can have the same name and co-exist is called polymorphism.

Inheritance is a powerful tool for organizing data/behavior in separate logical units (classes), but allowing the child class to cooperate with the parent by accessing/using its behavior and data.

#### Modules

The module pattern has essentially the same goal as the class pattern, which is to group data and behavior together into logical units. Also like classes, modules can “include” or “access” the data and behaviors of other modules, for cooperation sake.
But modules have some important differences from classes. Most notably, the syntax is entirely different.

#### Classic Modules

ES6 added a module syntax form to native JS syntax, But from the early days of JS, modules was an important and common pattern that was leveraged in countless JS programs, even without a dedicated syntax.

Consider the classic module form of the earlier Publication, Book, and BlogPost classes:

```Js
function Publication(title,author,pubDate) { 
    var publicAPI = {
        print() {
            console.log(`
                Title: ${ title } 
                By: ${ author } 
                ${ pubDate }
            `); }
    };
    return publicAPI; 
}
function Book(bookDetails) { 
    var pub = Publication( bookDetails.title,
        bookDetails.author,
        bookDetails.publishedOn
    );
    var publicAPI = { 
        print() {
            pub.print();
                console.log(`
                    Publisher: ${ bookDetails.publisher }
                    ISBN: ${ bookDetails.ISBN } 
                `);
            } 
        };

        return publicAPI; 
    }
function BlogPost(title,author,pubDate,URL) { 
    var pub = Publication(title,author,pubDate);
    var publicAPI = { print() {
            pub.print();
            console.log(URL);
        }
    };

    return publicAPI; 
}
```

The class form stores methods and data on an object in- stance, which must be accessed with the *this*. prefix.

With modules, the methods and data are accessed as **identifier variables** in scope, without any this. prefix.

There are other variations to this factory function form that are quite common across JS, even in 2020; you may run across these forms in different JS programs: AMD (Asynchronous Module Definition), UMD (Universal Module Definition), and CommonJS (classic Node.js-style modules). The variations, however, are minor (yet not quite compatible). Still, all of these forms rely on the same basic principles.

Consider also the usage (aka, “instantiation”) of these module factory functions:

```Js
var YDKJS = Book({
    title: "You Don't Know JS", 
    author: "Kyle Simpson", 
    publishedOn: "June 2014", 
    publisher: "O'Reilly", 
    ISBN: "123456-789"
});
YDKJS.print();
// Title: You Don't Know JS
// By: Kyle Simpson
// June 2014
// Publisher: O'Reilly
// ISBN: 123456-789
var forAgainstLet = BlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014", 
    "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```
 
The only observable difference here is the lack of using new, calling the module factories as normal functions.

#### ES Modules

ES modules (ESM), introduced to the JS language in ES6, are meant to serve much the same spirit and purpose as the existing classic modules just described, especially taking into account important variations and use cases from AMD, UMD, and CommonJS.

The implementation approach does, however, differ signifi- cantly.

First, there’s no wrapping function to define a module. The wrapping context is a file. ESMs are always file-based; **one file, one module**.

Second, you don’t interact with a module’s “API” explicitly, but rather use the export keyword to add a variable or method to its public API definition. If something is defined in a module but not exported, then it stays hidden (just as with classic modules).

Third, and maybe most noticeably different from previously discussed patterns, you don’t “instantiate” an ES module, you just import it to use its single instance.

ESMs are, in effect, “singletons,” in that there’s only one instance ever created, at first import in your program, and all other imports just receive a reference to that same single instance. If your module needs to support multiple instantiations, you have to provide a classic module-style factory function on your ESM definition for that purpose.

In our running example, we do assume multiple-instantiation, so these following snippets will mix both ESM and classic modules.

Consider the file publication.js:

```Js
function printDetails(title,author,pubDate) { 
    console.log(`
        Title: ${ title } 
        By: ${ author } 
        ${ pubDate }
    `); 
}

export function create(title,author,pubDate) { 
    var publicAPI = {
        print() {
            printDetails(title,author,pubDate);
        } 
    };
    return publicAPI; 
}
```

To import and use this module, from another ES module like blogpost.js:

```Js
import { create as createPub } from "publication.js";

function printDetails(pub,URL) { 
    pub.print();
    console.log(URL);
}

export function create(title,author,pubDate,URL) { 
    var pub = createPub(title,author,pubDate);

    var publicAPI = { 
        print() {
            printDetails(pub,URL);
        }
    };
    return publicAPI; 
}
```

And finally, to use this module, we import into another ES module like main.js:

```Js
import { create as newBlogPost } from "blogpost.js";

var forAgainstLet = newBlogPost(
    "For and against let",
    "Kyle Simpson",
    "October 27, 2014", "https://davidwalsh.name/for-and-against-let"
);
forAgainstLet.print();
// Title: For and against let
// By: Kyle Simpson
// October 27, 2014
// https://davidwalsh.name/for-and-against-let
```

### Note <!-- omit in toc -->
The as newBlogPost clause in the import state- ment is optional; if omitted, a top-level function just named create(..) would be imported. In this case, I’m renaming it for readability sake; its more generic factory name of create(..) becomes more semantically descriptive of its pur- pose as newBlogPost(..).

As shown, ES modules can use *classic modules* internally if they need to support multiple-instantiation.

Alternatively, we could have exposed a class from our module instead of a create(..) factory function, with generally the same outcome. However, since you’re already using ESM at that point, I’d recommend sticking with classic modules instead of class.
If your module only needs a single instance, you can skip the extra layers of complexity: export its public methods directly.

### The Rabbit Hole Deepens

Even with just this “brief” survey of JS, we covered or hinted at a ton of details you should carefully consider and ensure you are comfortable with. I’m serious when I suggest: re-read this chapter, maybe several times.
