# Task

Task is Promise, it's exactly Promise, it's jus lazy

Task (aka Future) is a data type that lets you create and compose asynchronous functions in a pure functional way.

Here’s an example of how they can be used:

```Js
const {prop} = require('ramda')

const httpGet = url => new Task((reject, resolve) => {
    request(url, (err, data) => { err? reject(err) : resolve(data)})
})

const myTask = httpGet('http://example.com/data.json')
    .map(JSON.parse)
    .map(prop('url'))
    .chain(httpGet)
    .map(JSON.parse)

myTask.fork( //the request isn't sent until we call .fork
    err => console.error(err),
    data => renderData(data)
)
```

Task is often described as a Lazy Promise.

While Promises start their computations as soon as they are created, Tasks don’t do anything until you call the .fork method.

When you call fork, you’re essentially calling the (reject, resolve) => function passed into the Task constructor.

This triggers a fork in your code, where synchronous operations continue to happen after the fork, and the Task computation can happen asynchronously from that point in time.

