
## Scaffolding a Vue Project

create-vue package allows you to create a project in a minute

```console
npm init vue@latest
```

## Shadow DOM

Shadow DOM is mostly about encapsulation of the implementation. A single custom element can implement more-or-less complex logic combined with more-or-less complex DOM. Shadow DOM refers to the ability of the browser to include a subtree of DOM elements into the rendering of a document, but not into the main document DOM tree.

## Props

In parent component:
```html
<user :age="age"></user>
```
child:


```js
export default {
    props: ["age"]
}
```

### Validate props

```js
export default {
    props: {
        age: {
            type: Number // or [Number,String]
            required: true // it will throw an error if the parent doesn't pass the prop.
            //You can set a default:
            default: 20
            //You can have a validator
            validator(value) {
                return value < 130 // will return true or false
                //then you can access to the validator and used in an other mechanism
            }
        }
    }
}
```

## Events

in parent:
```html
<user @age-change="age++"></user>
<!--Or you can call a method-->
```

in child:

```html
<button @click="onClickAge"></button>
```

```Js
methods: {
    onClickAge() {
        this.$emit('age-change')
    }
}
```

you can pass parameters like this:

```Js
methods: {
    onClickAge() {
        this.$emit('age-change', 3)
    }
}
```

## Slots

How we pass markup from parent to child template

We have learned that components can accept props, which can be JavaScript values of any type. But how about template content? In some cases, we may want to pass a template fragment to a child component, and let the child component render the fragment within its own template.

for example:

App.vue (parent):

```Js
<script>
import FancyButton from './FancyButton.vue'
  
export default {
  components: { FancyButton }
}
</script>
```

```html
<template>
  <FancyButton>
    Click me <!-- slot content -->
 	</FancyButton>
</template>
```

FancyButton.vue (child)

```html
<template>
  <button class="fancy-btn">
  	<slot/> <!-- slot outlet -->
	</button>
</template>
```

And the final rendered DOM:
```Js
<button class="fancy-btn">Click me!</button>
```

This allows us to make more re usable components, in this way we can add diferent html in the template.

### Fallback Content 

There are cases when it's useful to specify fallback (i.e. default) content for a slot, to be rendered only when no content is provided. For example, in a "<SubmitButton>" component:

```html
<button type="submit">
  <slot></slot>
</button>

```

We might want the text "Submit" to be rendered inside the "button" if the parent didn't provide any slot content. To make "Submit" the fallback content, we can place it in between the "<slot>" tags:

```html
<button type="submit">
  <slot>
    Submit <!-- fallback content -->
  </slot>
</button>
```

### Named Slots

There are times when it's useful to have multiple slot outlets in a single component. For example, in a "<BaseLayout>" component with the following template:

```html
<div class="container">
  <header>
    <!-- We want header content here -->
  </header>
  <main>
    <!-- We want main content here -->
  </main>
  <footer>
    <!-- We want footer content here -->
  </footer>
</div>
```
For these cases, the "<slot>" element has a special attribute, name, which can be used to assign a unique ID to different slots so you can determine where content should be rendered:

```html
<div class="container">
  <header>
    <slot name="header"></slot>
  </header>
  <main>
    <slot></slot>
  </main>
  <footer>
    <slot name="footer"></slot>
  </footer>
</div>
```

## Dynamic components

We can use the tag component with the attribute :is for pass a component name

We can store the name in Data an changed with a selector or something else.

But the data will be gone once the component is toggled.

We can use the keep-alive tag to persist data.

This may be useful as a navigator or something.