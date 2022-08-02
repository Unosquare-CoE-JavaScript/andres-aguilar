# Vue.js

- [Vue.js](#vuejs)
    - [Data](#data)
    - [Multiple elements](#multiple-elements)
    - [Methods](#methods)
    - [Directives](#directives)
    - [Two way data binding](#two-way-data-binding)

### Data
You can store expresions in data()

it runs the expresions
Replaces curly brackets with value from the expression.
we don't have to use the this keyword

It's really important to declare the data inside the data() Vue will not search for aditional data in the outside of the configuration objects.

### Multiple elements
If you instance, can only be mounted to one element.

### Methods

methods will be set as an object.

```Js
methods: {
    // Example
    fullName() {
        return `${this.firstName} ${this.lastName.toUpperCase()}` //The this keyword should't work, but Vue allows it.
    }
}
```

We have to use regular functions for methods to accesss to this keyword, arrofunctions would not work for methods.

I have used arrow functions but mostly for cases where you only need the function scope like an axios request response.

### Directives

v-cloak, v-if, v-for, etc ...

### Two way data binding

