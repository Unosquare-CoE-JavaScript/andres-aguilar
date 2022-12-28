# Review

- React and Redux work well together but need more to support React’s UI optimization and Redux’s one-way data flow.
- The react-redux library provides React application components access to the Redux store
- The <Provider> component wraps around the root component to give its descendants access to the - Redux store without props drilling
- Selectors are pure functions used to access all or part of the state in the Redux store
- useSelector() retrieves the application state through selectors. It must be called from within a component
- useSelector() subscribes components to data retrieved from the selectors. React, not Redux, re-renders those components when the selected data changes
- useDispatch() returns a reference to Redux store dispatch() function