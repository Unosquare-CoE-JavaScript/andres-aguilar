# Vue.js

- [Vue.js](#vuejs)
    - [Data](#data)
    - [Multiple elements](#multiple-elements)
    - [Methods](#methods)
    - [Directives](#directives)
    - [Two way data binding](#two-way-data-binding)
    - [Binding attributes](#binding-attributes)
    - [Outputting Raw HTML](#outputting-raw-html)
    - [Listening to Events](#listening-to-events)
    - [Passing on Data with Events](#passing-on-data-with-events)
    - [Event Modifiers](#event-modifiers)
    - [Keyboard Events and Modifiers](#keyboard-events-and-modifiers)
    - [v-model Modifiers](#v-model-modifiers)
    - [Computed Properties](#computed-properties)
    - [Watchers](#watchers)
    - [Binding Classes](#binding-classes)
    - [Binding Styles](#binding-styles)
    - [Conditional Rendering](#conditional-rendering)
    - [The v-show Directive](#the-v-show-directive)
    - [List rendering](#list-rendering)
      - [v-for](#v-for)
        - [v-for with an Object](#v-for-with-an-object)
    - [Understanding the role of the key attribute](#understanding-the-role-of-the-key-attribute)

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

v-cloak, v-if, v-for, v-model, etc ...

### Two way data binding

It is the idea where if the data in the document is updated, then the data in the js code is updated and if the js is updated, the document will also get updated.

Using the v-model directive, will track the input

in vanilla Javascrit it will be something similar to this

```Js
const input = document.getElementById("first-name"); //Well actually EcmaScript

input.addEventListener("keyup", function() {
    const p = document.querySelector("p");

    p.innerText = this.value;
});
```
But in Vue it's kind of:

```Vue.js
<p> {{ first-name }} </p>

<input v-model="first-name"></input>
```

Without ids or classes.

### Binding attributes

We don't have to memorize a lot of directives for attributes, instead, we use v-bind, for example v-bind:href or :href, that gives a dinamic value to the attribute.

### Outputting Raw HTML

With v-html, but, avoid it.

### Listening to Events

We use "v-on:" directive, or we can use "@" as a short hand.
```Js
<button v-on:click="increment"></button> //this is a method, if you don't need to pass an argument, you can omit the "()"

<button @click="increment"></button>
```

we can bind an input and pass the event to a method too.

```html
<input type="text" :value="lastName" @input="updateLastName"/>
```

```Js
updated(event) {
    this.lastName = event.target.value
}
```

this is practically the same as using v-model, and v-model is less code, but you can call a method this way, for another propourse maybe.

### Passing on Data with Events

If we want to pass another data as an argument, like a message we can do it this way:

```html
<input type="text" :value="lastName" @input="updateLastName('this is the way', $event)"/>
```
The dollar sign will identify it as the event

```Js
updated(msg, event) {
    event.preventDefault() //This is important in some cases like submit buttons
    console.log(msg)
    this.lastName = event.target.value
}
```

### Event Modifiers

It is a very common need to call event.preventDefault() or event.stopPropagation() inside event handlers. Although we can do this easily inside methods, it would be better if the methods can be purely about data logic rather than having to deal with DOM event details.

To address this problem, Vue provides event modifiers for v-on. Recall that modifiers are directive postfixes denoted by a dot.

* .stop
* .prevent
* .self
* .capture
* .once
* .passive

```html
<!-- the click event's propagation will be stopped -->
<a @click.stop="doThis"></a>

<!-- the submit event will no longer reload the page -->
<form @submit.prevent="onSubmit"></form>

<!-- modifiers can be chained -->
<a @click.stop.prevent="doThat"></a>

<!-- just the modifier -->
<form @submit.prevent></form>

<!-- only trigger handler if event.target is the element itself -->
<!-- i.e. not from a child element -->
<div @click.self="doThat">...</div>
```

Changing the previous example

```html
<input type="text" :value="lastName" @input.prevent="updateLastName('this is the way', $event)"/>
```
```Js
updated(msg, event) {

    console.log(msg)
    this.lastName = event.target.value
}
```

### Keyboard Events and Modifiers

When listening for keyboard events, we often need to check for specific keys. Vue allows adding key modifiers for v-on or @ when listening for key events:

```html
<!-- only call `vm.submit()` when the `key` is `Enter` -->
<input @keyup.enter="submit" />
```

You can directly use any valid key names exposed via KeyboardEvent.key as modifiers by converting them to kebab-case.

```html
<input @keyup.page-down="onPageDown" />
```

#### Key Aliases <!-- omit in toc -->

* .enter
* .tab
* .delete (captures both "Delete" and "Backspace" keys)
* .esc
* .space
* .up
* .down
* .left
* .right

#### System Modifier Keys <!-- omit in toc -->

* .ctrl
* .alt
* .shift
* .meta // for cmd or windows


**This page will help us to find key alias:**
<a href="https://www.toptal.com/developers/keycode">Key Code</a>

### v-model Modifiers

* .number
* .trim // remove the white spaces at start or end
* .lazy //update data only when the user finishes typing

### Computed Properties

Computed means To calculate something

Vue treats computed properties as data

```Js
fullName() {
    return `${this.firstName} ${this.lastName.toUpperCase()}`
}
```

The benefit is that this is only call when the name is changed, instead the first example, the method will be called if other property of the object is changed, because the v-models update in every render.

When a data property is updated, first it will scan the function of the computed property, If any of those values change, Vue will rerun the function and update the value.

If a data property was updated that wasn't used inside the function.

**Unlike the methods** computed properties must always return a Value.

Because computed stores the values, not the functions.

### Watchers

Watch your data for changes, we can say that is a way to do something when a value is updated.

Computed properties must be syncronous, instead watchers can perform asyncronous.

### Binding Classes

We can add fixed classes as "class" and dinamic with ":class" we can use both ath same time without conflicts.

i know that

but a cleaner way is passing them as a computed property:

```html
<div class="circle" :class="circle_classes"></div>
```
```Js
computed: {
    circle_classes() {
        return {purple: this.IsPurple}
    }
}
```

it also gains performance.

we can also pass it as an array

```html
<div class="circle" :class="[selectedColor, circle_classes]"></div>
```

### Binding Styles

```html
<div class="circle" :class="circle_classes"
    :style="{width: size = 'px', height: size = 'px', lineHeiht},{Another but better use computed properties}"
```

using lineHeiht with camel case will be transform to line-height in render.

### Conditional Rendering

Adding or Removing elements

Yes we're talking about v-if, the value must be a condition.

The important part of this, is, Vue is not showing or hidding the element, it is removed from the Document.

we can use also "v-else-if="condition" and v-else" (they must be in the same level).

if we want to render a block of tags, we should use the template tag.

```html
<template v-else-if="mode == 2">
    <h3>Title</h3>
    <p>Text<p>
</template>
```

### The v-show Directive

This directives also expects a condition, but, this one hides the element with "display: none".

It changes the display CSS property.

### List rendering

#### v-for

```Js
data() {
  return {
    items: [{ message: 'Foo' }, { message: 'Bar' }]
  }
}
```

```html
<li v-for="item in items">
  {{ item.message }}
</li>

```

or

```html
<li v-for="(item, index) in items">
  {{ item.message }}
</li>

```

##### v-for with an Object 

```Js
data() {
  return {
    myObject: {
      title: 'How to do lists in Vue',
      author: 'Jane Doe',
      publishedAt: '2016-04-10'
    }
  }
}

```

```html
<ul>
  <li v-for="value in myObject">
    {{ value }}
  </li>
</ul>
```

v-for with a Range 

```html
<span v-for="n in 10">{{ n }}</span>
```

I have seen in a frecuent use to loop data from api, most of the times is an array of objects:

```js
let vm = Vue.createApp({
    data() {
        return {
            birds: ['Pigeons', 'Eagles', 'Doves', 'Parrots'],
            people: [
                { name: 'John', age: 20 },
                { name: 'Rick', age: 18 },
                { name: 'Amy', age: 33 }
            ]
        }
    }
}).mount('#app');
```
```html
<ul>
    <li v-for="person in people">
        <div v-for="(value, key, index) in person">
            {{ key }}: {{ value }} = index: {{ index }}
        </div>
    </li>
</ul>
```

### Understanding the role of the key attribute

Maintaining State with key

When Vue is updating a list of elements rendered with v-for, by default it uses an "in-place patch" strategy.

This default mode is efficient, but only suitable when your list render output does not rely on child component state or temporary DOM state (e.g. form input values).

To give Vue a hint so that it can track each node's identity, and thus reuse and reorder existing elements, you need to provide a unique **key** attribute for each item:

```html
<div v-for="item in items" :key="item.id">
  <!-- content -->
</div>
```

When using "<template v-for>", the key should be placed on the "<template>" container:

```html
<template v-for="todo in todos" :key="todo.name">
  <li>{{ todo.name }}</li>
</template>
```

key here is a special attribute being bound with v-bind. It should not be confused with the property key variable when using v-for with an object.

It is recommended to provide a key attribute with v-for whenever possible, unless the iterated DOM content is simple (i.e. contains no components or stateful DOM elements), or you are intentionally relying on the default behavior for performance gains.