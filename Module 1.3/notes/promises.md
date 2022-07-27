# Promises

Promises are Objects with properties and methods.

Represents the Eventual Completion (or Failure) of an
Asynchronous Operation.

Provides a Resulting Value.

```Js
let asyncFunction = function() {
    return new Promise(function(resolve,reject) {
        setTimeout(function(){
            resolve("async Function has resolved.");
        },4000);
    });
};

let asyncFunction2 = function() {
    return new Promise(function(resolve,reject) {
        setTimeout(function(){
            resolve("async Function2 is done.");
        },3000);
    });
};
```