# Functional Programing

Progrqaming with functions.

## Pure functions

One input, one output

### Total

For every input there is always a corresponding output.

```Js
//NO
const inc = i => {
    if(i === 0) return 1
    if(i === 1) return 2
    if(i === 2) return 3
}
```

```Js
//YES
const inc = i => {
    return i + 1
}

```


### Deterministic

Always receive the same output for a given input.

```Js
//No
const timeSince = comment => {
    const now = new Date()
    const then = new Date(comment.createdAt)
    return getDifference(now, then)
}
```

```Js
//Yes
const getDifference = (now, then) => {
    const days = Math.abs(now.getDate() - then.getDate());
    const hours = Math.abs(now.getHours() - then.getHours());
    return {days, hours}
}

```

### No side efects

No observable effects besides computing a value.

Changes to screens, database, etc.

```Js
// not a function
const toSlug = (title) => {
    const urlFriendly = title.replace(/\W+/ig, '-')
    if(urlFriendly.length < 1) {
        throw new Error('is bad')
    }
    return urlFriendly
}
```

```Js
// function
const toSlug = (title) => {
    return new Promise((res, rej) => {
        const urlFriendly = title.replace(/\W+/ig, '-')
 
        if(urlFriendly.length < 1) {
            rej(new Error('is bad'))
        }
        return res(urlFriendly)
    })
}

```

### Advantages

* Reliable
* Portable
* Reusable
* Testable
* Comosable
* Properties/Contract
  
