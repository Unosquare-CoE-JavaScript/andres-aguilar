# Pinia

## What is state?

The data for your aplication, tipically retrived from a database or API.

There's also aplication data:
* Show Dropdown
* Show Modal
* Current page

## Global state

It is when data is shared across multiple components

## Store

Short for storage. A store is a unique location for storing data.

## Actions
In **Vuex** Actions call mutations to change the state.

But now, in **Pinia** actions can perform mutations themselfs, without the "mutation" object.

Actions must be mapped in component methos // you always forget that lol

And no more "dispatch" keyword for call the action in component :D