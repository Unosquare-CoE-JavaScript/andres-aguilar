### Table of contents: <!-- omit in toc -->

- [Appendix A: Exploring Further](#appendix-a-exploring-further)
    - [Implied Scopes](#implied-scopes)
      - [Parameter Scope](#parameter-scope)
      - [Function Name Scope](#function-name-scope)
    - [Anonymous vs. Named Functions](#anonymous-vs-named-functions)
      - [Explicit or Inferred Names?](#explicit-or-inferred-names)
      - [Missing Names?](#missing-names)
      - [Who am I?](#who-am-i)
      - [Names are Descriptors](#names-are-descriptors)
      - [Arrow Functions](#arrow-functions)
      - [IIFE Variations](#iife-variations)
    - [Hoisting: Functions and Variables](#hoisting-functions-and-variables)
      - [Function Hoisting](#function-hoisting)
      - [Variable Hoisting](#variable-hoisting)
    - [The Case for var](#the-case-for-var)
      - [Don’t Throw Out var](#dont-throw-out-var)
      - [const-antly Confused](#const-antly-confused)
      - [var and let](#var-and-let)
    - [What’s the Deal with TDZ?](#whats-the-deal-with-tdz)
      - [Where It All Started](#where-it-all-started)
      - [Who let the TDZ Out?](#who-let-the-tdz-out)
    - [Are Synchronous Callbacks Still Closures?](#are-synchronous-callbacks-still-closures)
      - [What is a Callback?](#what-is-a-callback)
      - [Synchronous Callback?](#synchronous-callback)
      - [Synchronous Closure?](#synchronous-closure)
      - [Defer to Closure](#defer-to-closure)
    - [Classic Module Variations](#classic-module-variations)
      - [Where’s My API?](#wheres-my-api)
      - [Asynchronous Module Defintion (AMD)](#asynchronous-module-defintion-amd)
      - [Universal Modules (UMD)](#universal-modules-umd)


# Appendix A: Exploring Further

### Implied Scopes

Scopes are sometimes created in non-obvious places.

Keep an eye out for the following surprising scopes:

* Parameter scope
* Function name scope

#### Parameter Scope

The conversation metaphor in Chapter 2 implies that function parameters are basically the same as locally declared variables in the function scope. But that’s not always true.

```Js
// outer/global scope: RED(1)
function getStudentName(studentID) { 
    // function scope: BLUE(2)
// ..
}
```

Here, studentID is a considered a “simple” parameter, so it does behave as a member of the BLUE(2) function scope.

But if we change it to be a non-simple parameter, that’s no longer technically the case.

Parameter forms considered non-simple include parameters with default values, rest parameters (us- ing ...), and destructured parameters.

Consider:

```Js
// outer/global scope: RED(1)
function getStudentName(/*BLUE(2)*/ studentID = 0) { 
    // function scope: GREEN(3)
    // ..
}
```

Here, the parameter list essentially becomes its own scope, and the function’s scope is then nested inside that scope.

The complication gets even more in the weeds if we introduce a function expression into the default parameter position, which then can create its own closure (Chapter 7) over parameters in this implied parameter scope:

```Js
function whatsTheDealHere(id,defaultID = () => id) { 
    id = 5;
    console.log( defaultID() );
}

whatsTheDealHere(3);
// 5
```

That snippet probably makes sense, because the defaultID() arrow function closes over the id parameter/variable, which we then re-assign to 5.

But now let’s introduce a shadowing definition of id in the function scope:

```Js
function whatsTheDealHere(id,defaultID = () => id) { 
    var id = 5;
    console.log( defaultID() );
}

whatsTheDealHere(3);
// 3
```

Uh oh! The var id = 5 is shadowing the id parameter, but the closure of the defaultID() function is over the parameter, not the shadowing variable in the function body.

My advice to avoid getting bitten by these weird nuances:

* Never shadow parameters with local variables
* Avoid using a default parameter function that closes
over any of the parameters

#### Function Name Scope

In the “Function Name Scope” section in Chapter 3, I asserted that the name of a function expression is added to the func- tion’s own scope. Recall:

```Js
var askQuestion = function ofTheTeacher(){ 
    // ..
};
```

The name identifier of a function expression is in its own implied scope, nested between the outer enclosing scope and the main inner function scope.

If ofTheTeacher was in the function’s scope, we’d expect an error here:

```Js
var askQuestion = function ofTheTeacher(){
    // why is this not a duplicate declaration error? 
    let ofTheTeacher = "Confused, yet?";
};
```

The let declaration form does not allow re-declaration (see Chapter 5). But this is perfectly legal shadowing, not re- declaration, because the two ofTheTeacher identifiers are in separate scopes.

### Anonymous vs. Named Functions

As discussed in Chapter 3, functions can be expressed either in named or anonymous form. It’s vastly more common to use the anonymous form, but is that a good idea?

As you contemplate naming your functions, consider:

* Name inference is incomplete
* Lexical names allow self-reference
* Names are useful descriptions
* Arrow functions have no lexical names • IIFEs also need names

#### Explicit or Inferred Names?

Every function in your program has a purpose.

If it doesn’t have a purpose, take it out, because you’re just wasting space. If it does have a purpose, there is a name for that purpose.

So far many readers likely agree with me. But does that mean we should always put that name into the code? Here’s where I’ll raise more than a few eyebrows. I say, unequivocally, yes!

First of all, “anonymous” showing up in stack traces is just not all that helpful to debugging:

```Js
btn.addEventListener("click",function(){ 
    setTimeout(function(){
        ["a",42].map(function(v){ 
            console.log(v.toUpperCase());
        }); 
    },100);
});
// Uncaught TypeError: Cannot read property
// 'toUpperCase' of null
//     at myProgram.js:4
//     at Array.map (<anonymous>)
//     at myProgram.js:3
```

Ugh. Compare to what is reported if I give the functions names:

```Js
btn.addEventListener("click",function onClick(){ 
    setTimeout(function waitAMoment(){
        ["a",42].map(function allUpper(v){ 
            console.log(v.toUpperCase());
        }); 
    },100);
});
// Uncaught TypeError: v.toUpperCase is not a function
//     at allUpper (myProgram.js:4)
//     at Array.map (<anonymous>)
//     at waitAMoment (myProgram.js:3)
```

#### Missing Names?

Yes, these inferred names might show up in stack traces, which is definitely better than “anonymous” showing up. But...

```Js
function ajax(url,cb) { 
    console.log(cb.name);
}

ajax("some.url",function(){ 
    // ..
});
// ""
```

Oops. Anonymous function expressions passed as callbacks are incapable of receiving an inferred name, so cb.name holds just the empty string "".

The vast majority of all function expressions, especially anonymous ones, are used as callback arguments; none of these get a name.

And it’s not just callbacks that fall short with inference:

```Js
var config = {};

config.cb = function(){ 
    // ..
};

config.cb.name;
// ""

var [ noName ] = [ function(){} ]; 
noName.name
// ""
```

Name inference is just... not enough.

And even if a function expression does get an inferred name, that still doesn’t count as being a full named function.

#### Who am I?

Without a lexical name identifier, the function has no internal way to refer to itself. Self-reference is important for things like recursion and event handling:

```Js
// broken
runOperation(function(num){
    if (num <= 1) return 1;
    return num * oopsNoNameToCall(num - 1);
});

// also broken
btn.addEventListener("click",function(){ 
    console.log("should only respond to one click!"); 
    btn.removeEventListener("click",oopsNoNameHere);
});
```

Leaving off the lexical name from your callback makes it harder to reliably self-reference the function.

#### Names are Descriptors

leaving off a name from a function makes it harder for the reader to tell what the function’s purpose is, at a quick glance.

They have to read more of the code, including the code inside the function, and the surrounding code outside the function, to figure it out.

Consider:

```Js
[ 1, 2, 3, 4, 5 ].filter(function(v){ 
    return v % 2 == 1;
});
// [ 1, 3, 5 ]
[ 1, 2, 3, 4, 5 ].filter(function keepOnlyOdds(v){ 
    return v % 2 == 1;
});
// [ 1, 3, 5 ]
```

The JS engine doesn’t care about the name. But human readers of your code absolutely do.

Think of it this way: how many times does the author of this code need to figure out the purpose of a function before adding the name to the code? About once.

But how many times will readers of this code have to figure out the name/purpose? Every single time this line is ever read. Hundreds of times? Thousands? More?

#### Arrow Functions

Arrow functions are **always** anonymous, even if (rarely) they’re used in a way that gives them an inferred name.

Don’t use them as a general replacement for regular functions.

Arrow functions have a purpose, but that purpose is not to save keystrokes. Arrow functions have lexical this behavior, which is somewhat beyond the bounds of our discussion in this book.

Briefly: arrow functions don’t define a this identifier key- word at all.

In other words, arrow functions treat this like any other lexical variable.

So, in the rare cases you need lexical this, use an arrow function.

#### IIFE Variations

All functions should have names. I said that a few times, right!? That includes IIFEs.

```Js
(function(){
    // don't do this!
})();

(function doThisInstead(){ 
    // ..
})();
```

How do we come up with a name for an IIFE? Identify what the IIFE is there for.
Why do you need a scope in that spot? Are you hiding a cache variable for student records?

```Js
var getStudents = (function StoreStudentRecords(){ 
    var studentRecords = [];

    return function getStudents() { 
        // ..
    } 
})();
```

IIFEs are typically defined by placing ( .. ) around the function expression, as shown in those previous snippets.

But that’s not the only way to define an IIFE. Technically, the only reason we’re using that first surrounding set of ( .. ) is just so the function keyword isn’t in a position to qualify as a function declaration to the JS parser.

But there are other syntactic ways to avoid being parsed as a declaration:

```Js
!function thisIsAnIIFE(){ 
    // ..
}();
+function soIsThisOne(){ 
    // ..
}();
~function andThisOneToo(){ 
    // ..
}();
```

The !, +, ∼, and several other unary operators (operators with
one operand) can all be placed in front of function to turn it into an expression. Then the final () call is valid, which makes it an IIFE.

### Hoisting: Functions and Variables

Give hoisting a deeper level of consideration by considering the merits of:

* Executable code first, function declarations last 
* Semantic placement of variable declarations

#### Function Hoisting

To review, this program works because of function hoisting:

```Js
getStudents();

// ..
function getStudents() { 
    // ..
}
```

Why is this useful? 

The reason I prefer to take advantage of function hoisting is that it puts the executable code in any scope at the top, and any further declarations (functions) below.

I take advantage of this inverse positioning in all levels of scope:

```Js
getStudents();

// *************

function getStudents() {
    var whatever = doSomething();
    // other stuff
    return whatever;

    // *************
    function doSomething() { 
        // ..
    } 
}
```

When I first open a file like that, the very first line is executable code that kicks off its behavior.

That’s very easy to spot! Then, if I ever need to go find and inspect getStu- dents(), I like that its first line is also executable code.

#### Variable Hoisting

Even though let and const hoist, you cannot use those variables in their TDZ (see Chapter 5). So, the following discussion only applies to var declarations. Before I continue, I’ll admit: in almost all cases, I completely agree that variable hoisting is a bad idea:

```Js
pleaseDontDoThis = "bad idea";

// much later
var pleaseDontDoThis;
```

But there’s one exception that I’ve found, somewhat rarely, in my own coding. It has to do with where I place my var declarations inside a CommonJS module definition.

Here’s how I typically structure my module definitions in Node:

```Js
// dependencies
var aModuleINeed = require("very-helpful"); 
var anotherModule = require("kinda-helpful");

// public API
var publicAPI = Object.assign(module.exports,{ 
    getStudents,
    addStudents,
    // ..
});

// ********************************
// private implementation

var cache = { }; var otherData = [ ];
function getStudents() { 
    // ..
}

function addStudents() { 
    // ..
}

```

Notice how the cache and otherData variables are in the “private” section of the module layout? That’s because I don’t plan to expose them publicly.

they’re located alongside the other hidden implementation details of the module.

### The Case for var

Speaking of variable hoisting, let’s have some real talk for a bit about var, a favorite villain devs love to blame for many of the woes of JS development.

As I lay out the case, don’t miss:

* var was never broken
* let is your friend
* const has limited utility
* The best of both worlds: var and let

#### Don’t Throw Out var

var is fine, and works just fine. It’s been around for 25 years, and it’ll be around and useful and functional for another 25 years or more.

Claims that var is broken, deprecated, outdated, dangerous, or ill-designed are bogus bandwagoning.

Does that mean var is the right declarator for every single declaration in your program? Certainly not.

#### const-antly Confused

const pretends to create values that can’t be mutated—a misconception that’s extremely common in developer com- munities across many languages—whereas what it really does is prevent re-assignment.

```Js
const studentIDs = [ 14, 73, 112 ];

// later

studentIDs.push(6); // whoa, wait... what!?
```

Using a const with a mutable value (like an array or object) is asking for a future developer (or reader of your code) to fall into the trap you set, which was that they either didn’t know, or sorta forgot, that value immutability isn’t at all the same
thing as assignment immutability.

The only time I ever use const is when I’m assigning an already-immutable value (like 42 or "Hello, friends!"), and when it’s clearly a “constant” in the sense of being a named placeholder for a literal value, for semantic purposes.

Combine that with the fact that const (and let) are supposed to be used in blocks, and blocks are supposed to be short, and you have a really small area of your code where a const declaration is even applicable.

#### var and let

So where should we still use var? Under what circumstances is it a better choice than let?

For one, I always use var in the top-level scope of any func- tion, regardless of whether that’s at the beginning, middle, or end of the function. I also use var in the global scope, though I try to minimize usage of the global scope.

Why use var for function scoping? Because that’s exactly what var does. 

There literally is no better tool for the job of function scoping a declaration than a declarator that has, for 25 years, done exactly that.

You could use let in this top-level scope, but it’s not the best tool for that job.

I also find that if you use let everywhere, then it’s less obvious which declarations are designed to be localized and which ones are intended to be used throughout the function.

By contrast, I rarely use a var inside a block. That’s what let is for. Use the best tool for the job.

If you see a let, it tells you that you’re dealing with a localized declaration.

If you see var, it tells you that you’re dealing with a function-wide declaration. Simple as that.

```Js
function getStudents(data) { 
    var studentRecords = [];
    
    for (let record of data.records) { 
        let id = `student-${ record.id }`; 
        studentRecords.push({
            id,
            record.name
        });
    }
    return studentRecords; 
}
```

The studentRecords variable is intended for use across the whole function.

var is the best declarator to tell the reader that. By contrast, record and id are intended for use only in the narrower scope of the loop iteration, so let is the best tool for that job.

One example is when a loop is exclusively using a variable, but its conditional clause cannot see block-scoped declara- tions inside the iteration:

```Js
function commitAction() { 
    do {
        let result = commit();
        var done = result && result.code == 1; 
    } while (!done);
}
```

Here, result is clearly only used inside the block, so we use
let. But done is a bit different. It’s only useful for the loop, but the while clause cannot see let declarations that appear inside the loop. So we compromise and use var, so that done is hoisted to the outer scope where it can be seen.

Another helpful characteristic of var is seen with declarations inside unintended blocks.

Unintended blocks are blocks that are created because the syntax requires a block, but where the intent of the developer is not really to create a localized scope. The best illustration of unintended scope is the try..catch statement:

```Js
function getStudents() { 
    try {
        // not really a block scope
        var records = fromCache("students"); 
    }
    catch (err) {
    // oops, fall back to a default var records = [];
    }
    // ..
}
```

I don’t want to declare records (with var or let) outside of the try block, and then assign to it in one or both blocks.

I prefer initial declarations to always be as close as possible (ideally, same line) to the first usage of the variable.

### What’s the Deal with TDZ?

We illustrated how it occurs, but we skimmed over any explanation of why it was necessary to introduce in the first place. Let’s look briefly at the motivations of TDZ.

* consts should never change
* It’s all about time
* Should let behave more like const or var?

#### Where It All Started

TDZ comes from const, actually.

TC39 had to decide whether const (and let) were going to hoist to the top of their blocks.

They decided these declarations would hoist, similar to how var does. Had that not been the case, I think some of the fear was confusion with mid-scope shadowing,

such as:

```Js
let greeting = "Hi!"; 

{
    // what should print here?
    console.log(greeting);
    
    // .. a bunch of lines of code ..
    
    // now shadowing the `greeting` variable
    let greeting = "Hello, friends!"; 
    
    // ..
}
```

What should we do with that console.log(..) statement? Would it make any sense to JS devs for it to print “Hi!”? Seems like that could be a gotcha, to have shadowing kick in only

for the second half of the block, but not the first half. That’s not very intuitive, JS-like behavior. So let and const have to hoist to the top of the block, visible throughout.

#### Who let the TDZ Out?

let is def- initely more like var than let. That’s especially true since they had already chosen consistency with var for the whole hoisting-to-the-top-of-the-scope thing.

let has a TDZ because const needs a TDZ, because let and const mimic var in their hoisting to the top of the (block) scope.

### Are Synchronous Callbacks Still Closures?

Chapter 7 presented two different models for tackling closure:

* Closure is a function instance remembering its outer variables even as that function is passed around and **invoked in** other scopes.
* Closure is a function instance and its scope environment being preserved in-place while any references to it are passed around and **invoked from** other scopes.

#### What is a Callback?

Let’s first consider an asynchronous callback, a function ref- erence that will be invoked at some future later point. What does “callback” mean, in this case?

It means that the current code has finished or paused, sus- pended itself, and that when the function in question is invoked later, execution is entering back into the suspended program, resuming it.

Specifically, the point of re-entry is the code that was wrapped in the function reference:

```Js
setTimeout(function waitForASecond(){
    // this is where JS should call back into 
    // the program when the timer has elapsed
},1000);

// this is where the current program finishes
// or suspends
```

In this context, “calling back” makes a lot of sense.

The JS engine is resuming our suspended program by calling back in at a specific location.

OK, so a callback is asynchronous.

#### Synchronous Callback?

But what about synchronous callbacks? Consider:

```Js
function getLabels(studentIDs) { 
    return studentIDs.map(
        function formatIDLabel(id){ 
            return `Student ID: ${
                String(id).padStart(6) 
            }`;
        } 
    );
}

getLabels([ 14, 73, 112, 6 ]);
// [
//    "Student ID: 000014",
//    "Student ID: 000073",
//    "Student ID: 000112",
//    "Student ID: 000006"
// ]
```

Should we refer to formatIDLabel(..) as a callback? Is the map(..) utility really calling back into our program by invoking the function we provided?

There’s nothing to call back into per se, because the program hasn’t paused or exited.

We’re passing a function (reference) from one part of the program to another part of the program, and then it’s immediately invoked.

for the map(..) call above, isn’t it? The map(..) utility knows to iterate over the list’s values, but it doesn’t know what to do with those values. That’s why we pass it the formatIDLabel(..) function. We pass in the dependency.

IoC is a pretty similar, related concept. Inversion of control means that instead of the current area of your program controlling what’s happening, you hand control off to another part of the program. We wrapped the logic for computing a label string in the function formatIDLabel(..), then handed invocation control to the map(..) utility.

What’s the relationship between an asynchronous callback and an IIF? An asynchronous callback is an IIF that’s invoked asynchronously instead of synchronously.

#### Synchronous Closure?

Now that we’ve re-labeled synchronous callbacks as IIFs, we can return to our main question: are IIFs an example of closure?

Obviously, the IIF would have to reference variable(s) from an outer scope for it to have any chance of being a closure.

What about an IIF that does have external references, is that closure?

```Js
function printLabels(labels) {
    var list = document.getElementByID("labelsList");
    
    labels.forEach(
        function renderLabel(label){
            var li = document.createELement("li"); 
            li.innerText = label; 
            list.appendChild(li);
        } 
    );
}
```

The inner renderLabel(..) IIF references list from the enclosing scope, so it’s an IIF that could have closure.

But here’s where the definition/model we choose for closure matters:

* If renderLabel(..) is a function that gets passed somewhere else, and that function is then invoked, then yes, renderLabel(..) is exercising a closure, because closure is what preserved its access to its original scope chain.
* But if, as in the alternative conceptual model from Chapter 7, renderLabel(..) stays in place, and only a reference to it is passed to forEach(..), is there any need for closure to preserve the scope chain of render- Label(..), while it executes synchronously right inside its own scope?

No. That’s just normal lexical scope.

To understand why, consider this alternative form of print-
Labels(..):

```Js
function printLabels(labels) {
    var list = document.getElementByID("labelsList");
    for (let label of labels) {
        // just a normal function call in its own 
        // scope, right? That's not really closure! 
        renderLabel(label);
    }

    // **************
    function renderLabel(label) {
        var li = document.createELement("li"); 
        li.innerText = label; 
        list.appendChild(li);
    } 
}
```

These two versions of printLabels(..) are essentially the same.

The latter one is definitely not an example of closure, at least not in any useful or observable sense. It’s just lexical scope.

The former version, with forEach(..) calling our function reference, is essentially the same thing. It’s also not closure, but rather just a plain ol’ lexical scope function call.

#### Defer to Closure

This is a interesting scenario where manual currying can be used:

```Js
function printLabels(labels) {
    var list = document.getElementByID("labelsList"); 
    var renderLabel = renderTo(list);
    
    // definitely closure this time!
    labels.forEach( renderLabel(label) );
    
    // **************
    function renderTo(list) {
        return function createLabel(label){
            var li = document.createELement("li"); 
            li.innerText = label; 
            list.appendChild(li);
        };  
    }
}
```

The inner function createLabel(..), which we assign to renderLabel, is closed over list, so closure is definitely being utilized.

Closure allows us to remember list for later, while we defer execution of the actual label-creation logic from the renderTo(..) call to the subsequent forEach(..) invoca- tions of the createLabel(..) IIF.

### Classic Module Variations

Chapter 8 explained the classic module pattern, which can look like this:

```Js
var StudentList = (function defineModule(Student){ 
    var elems = [];
    
    var publicAPI = { 
        renderList() {
        // ..
        } 
    };
    return publicAPI;     
})(Student);
```

Notice that we’re passing Student (another module instance) in as a dependency.

But there’s lots of useful variations on this module form you may encounter. Some hints for recognizing these variations:

* Does the module know about its own API?
* Even if we use a fancy module loader, it’s just a classic
module
* Some modules need to work universally

#### Where’s My API?

First, most classic modules don’t define and use a publicAPI the way I have shown in this code. Instead, they typically look like:

```Js
var StudentList = (function defineModule(Student){ 
    var elems = [];

    return { 
        renderList() {
            // ..
        }
    };
})(Student);
```

The only difference here is directly returning the object that serves as the public API for the module, as opposed to first saving it to an inner publicAPI variable.

But I strongly prefer, and always use myself, the former publicAPI form. Two reasons:

* publicAPI is a semantic descriptor that aids readability by making it more obvious what the purpose of the object is.
* Storing an inner publicAPI variable that references the same external public API object returned, can be useful if you need to access or modify the API during the lifetime of the module.

For example, you may want to call one of the publicly exposed functions, from inside the module.

Or, you may want to add or remove methods depending on certain conditions, or update the value of an exposed property.

#### Asynchronous Module Defintion (AMD)

Another variation on the classic module form is AMD-style modules (popular several years back), such as those supported by the RequireJS utility:

```Js
define([ "./Student" ],function StudentList(Student){ 
    var elems = [];
    
    return { 
        renderList() {
        // ..
        } 
    };
});
```

If you look closely at StudentList(..), it’s a classic module factory function.

Inside the machinery of define(..) (provided by RequireJS), the StudentList(..) function is executed, passing to it any other module instances declared as dependencies. The return value is an object representing the public API for the module.

#### Universal Modules (UMD)

It was designed to create better interop (without any build-tool conversion) for modules that may be loaded in browsers, by AMD-style loaders, or in Node. I personally still publish many of my utility libraries using a form of UMD.

Here’s the typical structure of a UMD:

```Js
(function UMD(name,context,definition){ 
    // loaded by an AMD-style loader? 
    if (
        typeof define === "function" &&
        define.amd 
    ){
        define(definition);
    }
    // in Node?
    else if (
        typeof module !== "undefined" && 
        module.exports
    ) {
        module.exports = definition(name,context);
    }
    // assume standalone browser script
    else {
        context[name] = definition(name,context);
    }
})("StudentList",this,function DEF(name,context){

    var elems = [];

    return { 
        renderList() {
        // ..
        } 
    };
});
```

Though it may look a bit unusual, UMD is really just an IIFE.

What’s different is that the main function expression part (at
the top) of the IIFE contains a series of if..else if statements to detect which of the three supported environments the module is being loaded in.

The final () that normally invokes an IIFE is being passed three arguments: "StudentsList", this, and another func- tion expression.

If you match those arguments to their pa- rameters, you’ll see they are: name, context, and definition, respectively.

"StudentList" (name) is the name label for the module, primarily in case it’s defined as a global variable. this (context) is generally the window (aka, global object; see Chapter 4) for defining the module by its name.

definition(..) is invoked to actually retrieve the definition of the module, and you’ll notice that, sure enough, that’s just a classic module form!
