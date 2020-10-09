---
title: Redux Basics
date: 2019-03-18
description: We will focus understanding the need, core principles & understanding action, stores & reducers
categories:
  - react
author_staff_member: rohit
---

Lets dive into Redux, I will be covering

1. Do we need redux?
2. Core Principles for redux.
3. Redux flow

# Do we need Redux?

Why do we need redux in the first place, react does provides mechanism to share data between components. Hmmm... 

No tool is perfect for all the job, suppose you want a very simple web app, simple JS & HTML should suffice. But as the complexity grows you decide to pull in react as its component based, easy to manage. But now your app is growing fast, and it is becoming difficult to manage user interactions.

A React app is a component tree, each component is rendered when their state is changed. Below diagram represents how a simple component tree. Let's assume the blue colored component require to share user information, so if the state of user in changed in one component, it should get reflected on the second component.

<img alt="react first app" src="/images/loader.svg" data-src="/images/2019/react/component-tree.png" class="img-center img-half lazy"/>

There are three ways to achieve it.

{% include ad %}

1. **Lift State**: push the state to the common ancestor node, and passed down to all the intermediate nodes. 
    <img alt="state lift" src="/images/loader.svg" data-src="/images/2019/react/state-lift.png" class="img-center img-half lazy"/>
    
    But finding & managing ancestor is will be pain. Also you need keep passing state as prop types to all nodes. This is called Prop Drilling. So not a good option.
    
2. **React Context**: React provides an elegant way to handle Prop Drilling, in this case you can expose global data & functions on React component using context. To access the data you import the context and consume it, you can also invoke functions like createUser() for the context. 
    <img alt="react context" src="/images/loader.svg" data-src="/images/2019/react/react-context.png" class="img-center img-half lazy"/>
    
3. **Redux**: In redux you maintain only one storage, its like having a database which store all your data, you can read any data from any component. To update you raise an event, which invokes reducer to creates a new state based on action. Once a new state is generated, respective components are refreshed. 
    
    <img alt="react context" src="/images/loader.svg" data-src="/images/2019/react/redux-flow.png" class="img-center img-half lazy"/>
    
# Core Principles of Redux

Redux has three core principles:

1. States are immutable (Once state is created it cannot be modified)
2. Action trigger changes (Action is object which must have type variable). A simple example can be
    ```json5
    { 
       type: SUBMIT_FORM,
       message: 'HI'
    }
    ```
3. Reducers update the state.

We discussed core concepts of redux, but we don't know enough to write code, so let's dive deeper into Redux

{% include ad-h %}

# Action

Events happening in redux are called _Actions_. Action are plain object with description of an event. a simple object can be **{type: RATE_BLOG, rating: 5}**, **here _type_ is a required field**, rest can be any value, a complex object, value or any serializable data. You should not pass functions or promises as action values as they are not serializable.

Mostly we use convenient functions to create Action data, often called as ActionCreators.
```javascript
function rateBlog(rating) {
    return {type: RATE_BLOG, rating: rating}
}
```

# Store
    
Redux Store honors single responsibility function. You might think it to be constraint when working with large application, but its quite the opposite. Having a single store make it a single source of truth, hence it leads to better manageability.

To create a store:
```javascript
let store = createStore(reducer);
```
Redux is very simple, store can dispatch an action, subscribe to a listener, return its current state & finally replace a reducer.
```javascript
store.dispatch(action); // dispatch an action
store.subscribe(listener); //subscribe to listener
store.getState(); // return the current state
store.replaceReducer(newReducer); //assign a new reducer for hot reloading.
```

# Reducer
To simply put, reducers are simple function which take two argument default_state & action_type. And based on action_type returns a new state.

{% include ad %} 

For example if the action is increment counter, we will return the new state.
```javascript
function myReducer(state, action) {
  switch (action.type) {
      case INCREMENT:
        return {...state, counter: state.counter + 1};
      default:
        return state;
  }
}
```
At line 4: we are using copy via spread functionality of javascript, ...state followed my arguments mean we want to create a copy of existing value with update field value, in this case we want to set counter value with new one.

Reducers must be pure functions, that means if calling with same set of argument it returns the same set of values.

Now that we have basic understanding of redux, we will move to next to adding it our react app.