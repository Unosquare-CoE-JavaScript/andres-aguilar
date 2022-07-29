# Function composition

Function composition is the process of combining two or more functions to produce a new function. Composing functions together is like snapping together a series of pipes for our data to flow through.

```js
// We call our function c2, short for 'compose two functions together'.
const c2 = (funcA, funcB) => x => funcA(funcB(x));
```

### Curry & Compose

```Js
const url = t => `http://gdata.youtube.com/feeds/api/videos?q=${t}&alt=json`
 
const src = _.compose(_.prop('url'), _.head, _.prop('media$thumbnail'), _.prop('media$group'))
 
const srcs = _.compose(_.map(src), _.prop('entry'), _.prop('feed'))
 
const images = _.compose(_.map(imageTag), srcs)
 
const widget = _.compose(_.map(images), getJSON, url)
 

widget('cats').fork(log, setHtml(document.querySelector('#youtube')))
```

```Js
const doStuff = str => {
  const lower = str.toLowerCase()
  const words = lower.split(' ')
 
  words.reverse()
 
  for(let i in words) {
    words[i] = words[i].trim()
  }
 
  let keepers = []
 
  for(let i in words) {
    if(words[i].length > 3) {
      keepers.push(words[i])
    }
  }
 
  return keepers.join('')
}

```