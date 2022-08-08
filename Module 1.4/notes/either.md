# Either Monad

In functional programming they recognized that those two paths ok or error can be joined into a structure that signifies one or the other as a possibility and so we can unify them into an Either <ok,error> structure.

Either is a common type in functional Languages. Is commonly called a discriminated union. Which means an Either type can contain any of the types it sums up.

In order to find out whats inside the Either we pattern match. Usually in most functional libraries there would be a method that is called cata (also match or matchWith) that does exactly than :

```Js
  const right = (v) => ({ 
    map: (f) => right(f(v)), 
    matchWith: (pattern) => pattern.right(v),  
  });
  
  const left = (v) => ({ 
    map: () => left(v), 
    matchWith: (pattern) => pattern.left  (v),  
  });
     
 
right(4).map(x=>x*x).matchWith({
right:v=>console.log(v),
left:v=>console.log("left"+v)
})

left(4).map(x=>x*x).matchWith({
right:v=>console.log(v),
left:v=>console.log("left "+v)
})
```