# Promises

Promises are Objects with properties and methods.

Represents the Eventual Completion (or Failure) of an Asynchronous Operation.

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
Callbacks kind of still in this code, we are not replacing them, we are using them with promises.

#### then()

The then() method returns a Promise. It takes up to two arguments: callback functions for the success and failure cases of the Promise.

this method invokes a function after the previous is resolved.

You can chain a then() if it is a promise, and then itself return a promise, but if you want to pass data you need the **return** statement.


```Js
let promise=asyncFunction();

let promise2 = promise.then(function(val) {
    console.log("Yeah !!" + val);
    return async Function2();
});

promise2.then(function(val) {
    console.log("Second promise:"+val);
});

console.log("The code is Asynchronous.");
```

#### Promise chain

When you return a value in the then() method, the then() method returns a new Promise that immediately resolves to the return value.

```Js
asyncFunction() //this function return a promise, as you can see in the first example.
.then(function(val){
    console.log("Yeah !!"+val);
    return asyncFunction2(); // returning a promise
}) 
.then(function(val){
    console.log("Second promise:"+val);
});

console.log("The code is Asynchronous.");
```

Lets see an example using fetch:

```Js
fetch(wordnikWords + "randomWord" + apiKey)
.then(function(response) {
    return response.json();
})
.then(function(data){
    console.log(data.word);
    return fetch(wordnikWord + data.word + "/definitions" + apiKey);
})
.then(function(def) {
   return def.json();
}) 
.then(function(def) {
   console.log(def);
})
.catch(function(err) {
    console.log(err);
});
```

Example with Star wars API and arrow functions

```Js
const swapi=function(num){
    let url="https://swapi.dev/api/people/";

    fetch(url+num+"/")
    .then(data => data.json())
    .then(obj => {
        console.log(obj);
        return fetch(obj.homeworld);
    })
    .then(hwdata => hwdata.json())
    .then(hwobj => console.log(hwobj));
};

swapi(1);

console.log("Other commands!");
```

#### Finally

The finally() method of a Promise schedules a function, the callback function, to be called when the promise is settled. Like then() and catch(), it immediately returns an equivalent Promise object, allowing you to chain calls to another promise method, an operation called composition.

```Js
asyncFunction()
.then(msg => console.log(msg))
.catch(err => console.log(err))
.finally(() => console.log("Cleaning up tasks."));
```
#### Promise.all

The Promise.all() method takes an **iterable** of promises as an input, and returns a single Promise that resolves to an array of the results of the input promises. This returned promise will fulfill when all of the input's promises have fulfilled, or if the input iterable contains no promises. It rejects immediately upon any of the input promises rejecting or non-promises throwing an error, and will reject with this first rejection message / error.

```Js
const promise1 = Promise.resolve(3);
const promise2 = 42;
const promise3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
});

Promise.all([promise1, promise2, promise3]).then((values) => {
  console.log(values);
});
// expected output: Array [3, 42, "foo"]
```

A clear scenario would be if you need to perform an operation that need all the information from the promises passed, it would be resolved after, like that dashboard project, we had 3 Axios request, this method could be usefull.

#### Promise.race

The Promise.race() method returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.

Literally a race, just the first is retuned the other are ignored.

#### Promise.allSettled()

The Promise.allSettled() method returns a promise that fulfills after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.

It is typically used when you have multiple asynchronous tasks that are **not dependent** on one another to complete successfully, or you'd always like to know the result of each promise.

```Js
const promise1 = Promise.resolve(3);
const promise2 = new Promise((resolve, reject) => setTimeout(reject, 100, 'foo'));
const promises = [promise1, promise2];

Promise.allSettled(promises)
.then((results) => results.forEach((result) => console.log(result.status)));

// expected output:
// "fulfilled"
// "rejected"
```

#### Promise.any()

Promise.any() takes an iterable of Promise objects. It returns a single promise that fulfills as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. 

If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.

```Js
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve) => setTimeout(resolve, 100, 'quick'));
const promise3 = new Promise((resolve) => setTimeout(resolve, 500, 'slow'));

const promises = [promise1, promise2, promise3];

Promise.any(promises).then((value) => console.log(value));

// expected output: "quick"
```