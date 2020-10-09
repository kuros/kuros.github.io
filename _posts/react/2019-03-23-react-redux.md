---
title: React Redux with typescript
date: 2019-03-18
description: In this article we will focus on configuring redux, creating our first action, reducer & store. 
categories:
  - react
author_staff_member: rohit
---

In my earlier post, I had explained the [basic principle of redux]({% link _posts/react/2019-03-18-react-basics.md %}). Also we have created [our first react app]({% link _posts/react/2019-03-17-react-with-typescript.md %}).

I will be extending the same example to integrate redux in it, you can download the [start code here.](https://github.com/kuros/blog-code/tree/master/react/first-app)

Earlier we have created Books Page, which will contain the details of all the Book in the library. For now this component has a simple form to add books.


```tsx
// src/components/book/BookPage.tsx

import React, {ChangeEvent, Component, FormEvent, ReactNode} from "react";


class BookPage extends Component<BookProps, BookState> {

    constructor(props : BookProps) {
        super(props);
        this.state = {book: {title: '', author: ''}};
    }

    render(): ReactNode {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Books</h2>
                    <h3>Add Books</h3>
                    <input type='text'
                           onChange={this.handleChange}
                           value={this.state.book.title}
                    />
                    <input type='submit' value='Save'/>
                </form>
            </div>
        );
    }

    private handleChange (event: ChangeEvent<HTMLInputElement>) {
        const book:Book = { ...this.state.book, title: event.target.value};
        this.setState({ book });
    };

    private handleSubmit (event: FormEvent) {
        event.preventDefault();
        alert(this.state.book.title);
    }
}

interface BookProps {
}

interface BookState {
    book: Book;
}

interface Book {
    title: string,
    author: string
}

export default BookPage;
```

Let's look into detail.

1. Line 6: We add what is the type prop & state it would manage, here BookProps (declared at line: 40) & BookState (declared at line:43) respectively.
2. Line 8: constructor takes BookProps as constructor args.
3. Line 10: initialize state with book value. The type is declared at line: 47
4. Line 16: on submit of form we are calling handleSubmit method, passing the event reference (line: 34)
5. Line 20: added function mapping on change event, references line: 29
6. Line 30-31: We used spread operator to copy state of the book, with new title, then setting the state.
7. Line 35: the default behaviour of form is to reload the page, we don't want that, so we will disable the default behavior.


{% include ad %}

When we run the application, and type in the text box, we get an error.
```bash
TypeError: Cannot read property 'state' of undefined
handleChange
src/components/book/BookPage.tsx:28
  25 | }
  26 | 
  27 | private handleChange (event: ChangeEvent<HTMLInputElement>) {
> 28 |     const book:Book = { ...this.state.book, title: event.target.value};
     | ^  29 |     this.setState({ book });
  30 | };
  31 | 
View compiled
▶ 20 stack frames were collapsed.
```

In order to fix this issue we will have to bind **this** to the functions in constructor.

```tsx
    constructor(props : BookProps) {
        super(props);
        this.state = {book: {title: '', author: ''}};
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
```

Now we can see our functionality works, after we write in text box press save we see the alert with same text.

There is also a simple way of writing the classes which is less verbose;

```tsx
class BookPage extends Component<BookProps, BookState> {
    
    state = {book: {title: '', author: ''}};

    render(): ReactNode {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Books</h2>
                    <h3>Add Books</h3>
                    <input type='text'
                           onChange={this.handleChange}
                           value={this.state.book.title}
                    />
                    <input type='submit' value='Save'/>
                </form>
            </div>
        );
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const book:Book = { ...this.state.book, title: event.target.value};
        this.setState({ book });
    };

    private handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        alert(this.state.book.title);
    }
}
```

You don't need to call super or declare a constructor, no binding required, as we are using arrow function.


{% include ad %}

Great !!! Time for Redux.

# Installing Redux

First thing first, lets add redux packages.

```bash
$ npm install --save @types/react-redux react-redux
$ npm install --save-dev @types/redux-devtools redux-devtools
$ npm install --save @types/redux-immutable-state-invariant redux-immutable-state-invariant
```

_redux-immutable-state-invariant_ is a middleware, which ensures that you don't mutate state.

# Redux Action

We have a form that is setup & ready to send data, we will create action creator for Books.

```tsx
// src/redux/book/bookActionType.ts

import {Book} from "../../components/book/BookPage";

export const CREATE_BOOK = 'CREATE_BOOK';

interface CreateBookAction {
    type: typeof CREATE_BOOK
    payload: Book
}

export type BookActionType = CreateBookAction;
```

- At line 7: We created interface which will have two field, type & payload.
- At line 12: We are exporting CreateBookAction as BookActionType, because later we will be assigning & checking More types.

```tsx
// src/redux/book/bookAction.ts

import {Book} from "../../components/book/BookPage";
import {BookActionType, CREATE_BOOK} from "./bookActionType";

export function createBook(book: Book): BookActionType {
    return {type: CREATE_BOOK, payload: book}
}
```

{% include ad %}

Our first action is ready, which returns a BookActionType just another reminder, it must contain type field.

# Redux Reducer

Reducer takes two arguments, state & action. In our case state will be book array, & action will be of type BookActionType and it will return a new state which will be a new book array.

```tsx
// src/redux/book/bookReducer.ts

import {Book} from "../../components/book/BookPage";
import {BookActionType, CREATE_BOOK} from "./bookActionType";

export default function BookReducer(state: Book[] = [], action: BookActionType): Book[] {
    switch (action.type) {
        case CREATE_BOOK:
            return [...state, {...action.payload}];
        default:
            return state;
    }
}
```

Since our application is going to have a lot number of reducers, we need to combine them, using redux **combineReducer** function

```tsx
// src/redux/rootReducer.ts

import {combineReducers} from "redux";
import BookReducer from "./book/bookReducer";

const rootReducer = combineReducers({
    books: BookReducer
});

export default rootReducer;
```

# Redux Store
The third main component in Redux is store, so let's not wait and create a store.

```ts
// src/redux/store.ts
// one time configuration

import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./rootReducer";
import immutableStateInvariantMiddleware  from "redux-immutable-state-invariant";


export default function configureStore(initialState?: any) {

    // @ts-ignore
    const composeEnhancers =
        (<any>window).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools

    return createStore(rootReducer,
        initialState,
        composeEnhancers(applyMiddleware(immutableStateInvariantMiddleware())))
}
```

**createStore** takes in three argument: reducer, initial state & middleware, we want to make sure our state is immutable, to make this happen we apply a middleware **immutableStateInvariantMiddleware** to take care of this job.

{% include ad %}

Now its time to plugin store to our react app. We will modify our index.tsx

```tsx
// src/index.tsx
// one time configuration

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";
import configureStore from "./redux/store";
import {Provider as ReduxProvider} from "react-redux";

const store = configureStore();

ReactDOM.render(
    <ReduxProvider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ReduxProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```
We are wrapping all our application within ReduxProvider, so that store is accessible to all our application.

Now that out configuration is in place let's wire in Redux in our component.

# Redux Connect

Its time to put all the pieces together, let's take a look at the modified BookPage:
```tsx
//  src/components/book/BookPage.tsx

import React, {ChangeEvent, Component, FormEvent, ReactNode} from "react";
import {connect} from "react-redux";
import {createBook} from "../../redux/book/bookAction";

class BookPage extends Component<BookProps, BookState> {

    state = {book: {title: '', author: ''}};

    render(): ReactNode {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h2>Books</h2>
                    <h3>Add Books</h3>
                    <input type='text'
                           onChange={this.handleChange}
                           value={this.state.book.title}
                    />
                    <input type='submit' value='Save'/>


                    {
                        this.props
                        .books
                        .map(book => (
                        <div key={book.title}>{book.title}</div>
                        ))
                    }
                </form>
            </div>
        );
    }

    private handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        const book:Book = { ...this.state.book, title: event.target.value};
        this.setState({ book });
    };

    private handleSubmit = (event: FormEvent) => {
        event.preventDefault();
        this.props.createBook(this.state.book);
    }
}

interface BookProps {
    createBook(book: Book): void;
    books: Book[];
}

export interface BookState {
    book: Book;
}

export interface Book {
    title: string,
    author: string
}

export interface BookStoreState {
    books: Book[]
}

function mapStateToProps(state: BookStoreState) {
    return {
        books: state.books
    }
}

const mapDispatchToProps = {
    createBook: createBook
};

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
```

This time lets review from down to up:

1. Line 75: We are not exporting BookPage now, instead we are calling connect function (of redux) with mapStateToProps & mapDispatchToProps, the output is a function to which we are passing our BookPage.
2. Line 71: We have created mapping object, which will get bind to react props. We can also use a function instead, but in that case, we will have to dispatch our action explicitly.
3. Line 65: Maps redux store state to props, in the root reducer, we have assigned output array to books variable, so to get new state, we fetch state.books
4. Line 47: BookProps has changed, now it contains book field & createBook function (mapped in function at line: 71 & line:75).
5. Line 43: In the handleSubmit function, we are dispatching event by calling props.createBook method.
6. Line 25: Finally, we have iterated over mapped store books and printed the titles.

If you have followed correctly, you can see your page in action.

<img alt="react redux complete" src="/images/loader.svg" data-src="/images/2019/react/react-redux.gif" class="lazy img-center img-half"/>

# Conclusion

In this article we have integrated redux to react, in typescript. As usual the complete code is on [github](https://github.com/kuros/blog-code/tree/master/react/react-redux). 
 