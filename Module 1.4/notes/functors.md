# Functors

Following the mathematical definition, and relating in the programing world in a very simple way, functors are a mapping using a function f(x) (or composite function f(g(x)) for instance) on a category A generating a category B, creating a new image, respecting the morphism.

In other words, is any object we can map and apply a function generating another object instance of the same type and connections.

Let’s check an example:

```Js
[1, 2, 3].map(val => val * 2); //generates [2, 4, 6]
```

So, we can see that Array is a functor, because it respects the same type (results in other Array instance) and the connections too (have the same number of items).

