# Generators

The Generator object is returned by a generator function and it conforms to both the iterable protocol and the iterator protocol.

```Js
const foo = function*() { //Look at the "*" is an important part of the syntaxis
  yield 'a';
  yield 'b';
  yield 'c';
};

let str = '';
for (const val of foo()) {
  str = str + val;
}

console.log(str);
// expected output: "abc"
```

## function*

The function* declaration (function keyword followed by an asterisk) defines a generator function, which returns a Generator object.

```Js
function* generator(i) {
  yield i;
  yield i + 10;
}

const gen = generator(10);

console.log(gen.next().value); //next method
// expected output: 10

console.log(gen.next().value);
// expected output: 20

```

Basically a generator is away to write code that you can pause and then continue at a later time.

You can't use an Arrow function as a generator, it has to be a regular function.

computing a fibonacci sequence with generator:

```Js
const fibonacci = function *(len, nums = [0,1]) {
    let num1 = nums[0],
        num2 = nums[1],
        next,
        cnt = 2;
   while(cnt<len){
        next = num1 + num2;
        num1 = num2;
        num2 = next;
        nums.push(next);
        cnt ++;
        yield
    }
    return nums;
};

var fib = fibonacci(20)
```

### Using Generator to create an iterator

```Js
let arr = ['a','b','c','d'];

//let it = arr[Symbol.iterator](); //it.next() will invoke it

//Generator function
const arrIt = function*(arr) {
    for(leti = 0;i < arr.length; i++){
        yield arr[i];
   };
};

let it = arrit(arr);

console.log("Remaining Code.");
```

with an object:

```Js
obj[Symbol.iterator] = function*() {
    for(let i = 1; i < 4; i++) {
        yield this[i];
    }
};

let it2 = obj[Symbol.iterator]();
```

### Two way comunication

```Js
function *yieldConsole() {
    let val = yield 'EnteraValue:'; //You can pass a value with it.next(500) for example
    console.log(val);
};

let it = yieldConsole();
let prompt = it.next().value;
console.log(prompt);
```