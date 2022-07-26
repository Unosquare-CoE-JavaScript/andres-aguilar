### Table of contents: <!-- omit in toc -->

- [Chapter 8: The Module Pattern](#chapter-8-the-module-pattern)
    - [Encapsulation and Least Exposure (POLE)](#encapsulation-and-least-exposure-pole)
    - [What Is a Module?](#what-is-a-module)
      - [Namespaces (Stateless Grouping)](#namespaces-stateless-grouping)
      - [Data Structures (Stateful Grouping)](#data-structures-stateful-grouping)
      - [Modules (Stateful Access Control)](#modules-stateful-access-control)
      - [Module Factory (Multiple Instances)](#module-factory-multiple-instances)
      - [Classic Module Definition](#classic-module-definition)
    - [Node CommonJS Modules](#node-commonjs-modules)
    - [Modern ES Modules (ESM)](#modern-es-modules-esm)
    - [Exit Scope](#exit-scope)


# Chapter 8: The Module Pattern

Our goal in this final chapter is to appreciate how mod- ules embody the importance of these topics, elevating them from abstract concepts to concrete, practical improvements in building programs.

### Encapsulation and Least Exposure (POLE)

Encapsulation is often cited as a principle of object-oriented (OO) programming, but it’s more fundamental and broadly applicable than that.

The goal of encapsulation is the bundling or co-location of information (data) and behavior (functions) that together serve a common purpose.

The recent trend in modern front-end programming to orga- nize applications around Component architecture pushes encapsulation even further.

The idea is to group alike program bits together, and selectively limit programmatic access to the parts we consider private details. 

What’s not considered private is then marked as public, accessible to the whole program.

The natural effect of this effort is better code organization. 

It’s easier to build and maintain software when we know where things are, with clear and obvious boundaries and connection points.

### What Is a Module?

A module is a collection of related data and functions (often referred to as methods in this context), characterized by a division between hidden private details and public accessible details, usually called the “public API.”

A module is also stateful: it maintains some information over time, along with functionality to access and update that information.

#### Namespaces (Stateless Grouping)

If you group a set of related functions together, without data, then you don’t really have the expected encapsulation a module implies.

The better term for this grouping of stateless functions is a namespace:

```Js
// namespace, not module
var Utils = { cancelEvt(evt) {
        evt.preventDefault();
        evt.stopPropagation();
        evt.stopImmediatePropagation();
    }, 
    wait(ms) {
        return new Promise(function c(res){ 
            setTimeout(res,ms);
        }); 
    },
    isValidEmail(email) {
        return /[^@]+@[^@.]+\.[^@.]+/.test(email);
    } 
};
```

Utils here is a useful collection of utilities, yet they’re all state-independent functions.

Gathering functionality together is generally good practice, but that doesn’t make this a module. Rather, we’ve defined a Utils namespace and organized the functions under it.

#### Data Structures (Stateful Grouping)

Even if you bundle data and stateful functions together, if you’re not limiting the visibility of any of it, then you’re stopping short of the POLE aspect of encapsulation; it’s not particularly helpful to label that a module.

```Js
// data structure, not module
var Student = { records: [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ],
    getName(studentID) {
        var student = this.records.find( 
            student => student.id == studentID
        );
        return student.name; 
    }
};

Student.getName(73);
// Suzy
```

Since records is publicly accessible data, not hidden behind a public API, Student here isn’t really a module.

Student does have the data-and-functionality aspect of en- capsulation, but not the visibility-control aspect.

#### Modules (Stateful Access Control)

To embody the full spirit of the module pattern, we not only need grouping and state, but also access control through visibility (private vs. public).

Let’s turn Student from the previous section into a module.

We’ll start with a form I call the “classic module,” which was originally referred to as the “revealing module” when it first emerged in the early 2000s. Consider:

```Js
var Student = (function defineStudent(){ 
    var records = [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ];

    var publicAPI = { 
        getName
    };

    return publicAPI;

    // ************************
    function getName(studentID) { 
        var student = records.find(
            student => student.id == studentID
        );
        return student.name; 
    }
})();

Student.getName(73);   // Suzy
```

Student is now an instance of a module.

It features a public API with a single method: getName(..).

This method is able to access the private hidden records data.

How does the classic module format work?

Notice that the instance of the module is created by the defineStudent() IIFE being executed.

This IIFE returns an object (named publicAPI) that has a property on it referenc- ing the inner getName(..) function.

Naming the object publicAPI is stylistic preference on my part. The object can be named whatever you like (JS doesn’t care), or you can just return an object directly without assign- ing it to any internal named variable.

From the outside, Student.getName(..) invokes this ex- posed inner function, which maintains access to the inner records variable via closure.

#### Module Factory (Multiple Instances)

But if we did want to define a module that supported multiple instances in our program, we can slightly tweak the code:

```Js
// factory function, not singleton IIFE
function defineStudent() { 
    var records = [
        { id: 14, name: "Kyle", grade: 86 },
        { id: 73, name: "Suzy", grade: 87 },
        { id: 112, name: "Frank", grade: 75 },
        { id: 6, name: "Sarah", grade: 91 }
    ];

    var publicAPI = { 
        getName
    };

    return publicAPI;
    
    // ************************ 
    
    function getName(studentID) {
        var student = records.find(
        student => student.id == studentID
    );
        return student.name; 
    }
}

var fullTime = defineStudent();
fullTime.getName(73); //Suzy
```

Rather than specifying defineStudent() as an IIFE, we just define it as a normal standalone function, which is commonly referred to in this context as a “module factory” function.

#### Classic Module Definition

So to clarify what makes something a classic module:

* There must be an outer scope, typically from a module factory function running at least once.
* The module’s inner scope must have at least one piece of hidden information that represents state for the module.
* The module must return on its public API a reference to at least one function that has closure over the hidden
module state (so that this state is actually preserved).

### Node CommonJS Modules

Unlike the classic module format described earlier, where you could bundle the module factory or IIFE alongside any other code including other modules, Com- monJS modules are file-based; one module per file.

Let’s tweak our module example to adhere to that format:

```Js
module.exports.getName = getName;

// ************************

var records = [
    { id: 14, name: "Kyle", grade: 86 }, 
    { id: 73, name: "Suzy", grade: 87 }, 
    { id: 112, name: "Frank", grade: 75 }, 
    { id: 6, name: "Sarah", grade: 91 }
];

function getName(studentID) { 
    var student = records.find(
        student => student.id == studentID
    );
    return student.name; 
}
```

The records and getName identifiers are in the top-level scope of this module, but that’s not the global scope. As such, everything here is by default private to the module.

To expose something on the public API of a CommonJS module, you add a property to the empty object provided as module.exports.

Some developers have the habit of replacing the default exports object, like this:

```Js
// defining a new object for the API
module.exports = {
    // ..exports..
};
```

If you want to assign multiple exports at once, using object literal style definition, you can do this instead:

```Js
Object.assign(module.exports,{
   // .. exports ..
});
```

What’s happening here is defining the { .. } object lit- eral with your module’s public API specified, and then Ob- ject.assign(..) is performing a shallow copy of all those properties onto the existing module.exports object, instead of replacing it This is a nice balance of convenience and safer module behavior.

To include another module instance into your module/pro- gram, use Node’s require(..) method.

```Js
var Student = require("/path/to/student.js"); 

Student.getName(73);
// Suzy
```

Student now references the public API of our example module.

require(..) is an all-or-nothing mechanism; it includes a reference of the entire exposed public API of the module.

To effectively access only part of the API, the typical approach looks like this:

```Js
var getName = require("/path/to/student.js").getName; 

// or alternately:

var { getName } = require("/path/to/student.js");
```

Similar to the classic module format, the publicly exported methods of a CommonJS module’s API hold closures over the internal module details.

That’s how the module singleton state is maintained across the lifetime of your program.

### Modern ES Modules (ESM)

The ESM format shares several similarities with the Com- monJS format.

ESM is file-based, and module instances are singletons, with everything private by default. 

One notable difference is that ESM files are assumed to be strict-mode, without needing a "use strict" pragma at the top. There’s no way to define an ESM as non-strict-mode.

Instead of module.exports in CommonJS, ESM uses an export keyword to expose something on the public API of the module.

The import keyword replaces the require(..) statement. Let’s adjust “students.js” to use the ESM format:

```Js
export getName;

// ************************

var records = [
    { id: 14, name: "Kyle", grade: 86 }, 
    { id: 73, name: "Suzy", grade: 87 }, 
    { id: 112, name: "Frank", grade: 75 }, 
    { id: 6, name: "Sarah", grade: 91 }
];

function getName(studentID) {
    var student = records.find(
        student => student.id == studentID
    );
    return student.name; 
}
```

The only change here is the export getName statement.

ESM offers a fair bit of variation on how the export state- ments can be specified. For example:

```Js
export function getName(studentID) { 
    // ..
}
```

Another allowed variation:

```Js
export default function getName(studentID) { 
    // ..
}
```

This is a so-called “default export,” which has different se- mantics from other exports.

Non-default exports are referred to as “named exports.”

The import keyword—like export, it must be used only at the top level of an ESM outside of any blocks or functions— also has a number of variations in syntax.

The first is referred to as “named import”:

```Js
import { getName } from "/path/to/students.js";

getName(73);   // Suzy
```

As you can see, this form imports only the specifically named public API members from a module (skipping anything not named explicitly), and it adds those identifiers to the top-level scope of the current module.

Multiple API members can be listed inside the { .. } set, separated with commas. A named import can also be renamed with the as keyword:

```Js
import { getName as getStudentName } from "/path/to/students.js";

getStudentName(73); // Suzy
```

If getName is a “default export” of the module, we can import
it like this:

```Js
import getName from "/path/to/students.js";

getName(73);   // Suzy
```

The only difference here is dropping the { } around the import binding. If you want to mix a default import with other named imports:

```Js
import { default as getName, /* .. others .. */ } from "/path/to/students.js";

getName(73); // Suzy
```

By contrast, the other major variation on import is called
“namespace import”:

```Js
import * as Student from "/path/to/students.js"; 

Student.getName(73); // Suzy
```

As is likely obvious, the * imports everything exported to the API, default and named, and stores it all under the single namespace identifier as specified.

### Exit Scope

Whether you use the classic module format (browser or Node), CommonJS format (in Node), or ESM format (browser or Node), modules are one of the most effective ways to structure and organize your program’s functionality and data.

POLE is the defensive private by default posture we always take, making sure we avoid over-exposure and interact only with the minimal public API surface area necessary.

And underneath modules, the magic of how all our module state is maintained is closures leveraging the lexical scope system.