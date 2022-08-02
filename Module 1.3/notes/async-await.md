# Async/Await

## Async
The Async Keyword goes before the function declaration, it forces the function to return a **Promise**, if the function returns a value, it is Wrapped on a promise.

## Await

* It can only be used inside an async function.
* It waits for a promise.
* It causes the async function to pause.


```Js
const asyncFun = async function() {
    let p1 = await asyncFunction();
    console.log(p1);
    console.log(`${p1}-more info`);
};

asyncFun();
```

Lets use them in a Star Wars API example

```Js
const swapiFilms=async function(){
    let url="https://swapi.co/api/films/",
        filmsData = {},
        films = [];
    films Data = await fetch(url).then(data => data.json());

    // processing data
    films = filmsData.results.map(obj => objs.title)
    console.log(films);
};

swapiFilms();
```

### try...catch

The try...catch statement is comprised of a try block and either a catch block, a finally block, or both. The code in the try block is executed first, and if it throws an exception, the code in the catch block will be executed. The code in the finally block will always be executed before control flow exits the entire construct.

```Js
try {
  nonExistentFunction();
} catch (error) {
  console.error(error);
  // expected output: ReferenceError: nonExistentFunction is not defined
  // Note - error messages will vary depending on browser
}
```
