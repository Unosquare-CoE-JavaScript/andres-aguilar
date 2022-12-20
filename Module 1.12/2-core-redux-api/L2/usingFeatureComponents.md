# Using Store Data Within Feature Components

Plugging in a feature-component to a Redux application involves the following steps:

- Import the React feature-components into the top-level App.js file.
- Render each feature-component and pass along the slice of state and the dispatch method as props.
- Within each feature-component:
  - Extract the slice of state and dispatch from props.
  - Render the component using data from the slice of state.
  - Import any action creators from the associated slice file.
  - Dispatch actions in response to user inputs within the component.

## Read
<a href="https://github.com/erikras/ducks-modular-redux">Redux Ducks</a>