---
title: Create React App Using Typescript
date: 2019-03-17
description: In next 30 minutes we will learn how to create a React application with typescript. Also we will be adding routing
categories:
  - react
author_staff_member: rohit
---

When we talk of UI tech stack, two of the web technologies have emerged as main competitors, Angular(supported by Google) & React(supported by Facebook).

Although comparing Angular & React is like comparing apples vs oranges, Angular is framework which gives all the functions you need in build, whereas React is a library designed specifically for view rendering, for everything else you need to pull dependencies specifically 

In this post we are going to focus on React with typescript. Lets talk about typescript before we proceed.

# Typescript

Though typescript has been in market since 2012, it gained popularity after Angular adapted it. Typescript is superset of Javascript, provides you static typechecking, which I think is very beneficial to find errors early in product lifecycle. Its always better to find errors at compile time rather than breaking at runtime in production. And this makes life of the developer easier.

# React
Coming back to React lets create our first react app. For only prerequisite is to have [node](https://nodejs.org/en/) installed on your system.

{% include ad %}

React has come up with a package which simplifies basic infrastructure for you, lets install the package on our local system.

```bash
$ npx create-react-app first-app
``` 

Wait for a minute!!!

This would create a react app, but wait... it has created a normal react app with javascript, but we want to work with typescript, we have two options either to add typescript manually or leverage react-create-app package to do the same.

So this time we will use the same command but will pass the argument _--typescript_
```bash
$ npx create-react-app first-app --typescript
```

Now that we have regenerated our app, lets see if it runs. You need to go to first-app folder and run the below commands:

```bash
$ cd first-app
$ npm start 
``` 

This would start the server
```bash
Compiled successfully!

You can now view first-app in the browser.

  Local:            http://localhost:3000/
  On Your Network:  http://192.168.0.105:3000/

Note that the development build is not optimized.
To create a production build, use npm run build.
```

Go to the browser, and open _http://localhost:3000/_, if everything is correct you will see your app in the browser.

<img alt="react first app" src="/images/loader.svg" data-src="/images/2019/react/first.png" class="lazy img-center img-half" />

{% include ad-h %}

It says modify App.tsx, that's what we will do. But first lets include few dependencies 
1. Bootstrap: for designing UI.
2. react-router-dom: For routing.

```bash
$ npm install --save @types/bootstrap bootstrap
$ npm install --save @types/react-router-dom react-router-dom
```
This will download & add dependencies to your project. Your new package.json should look like this.

```json
{
  "name": "first-app",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@types/bootstrap": "^4.3.0",
    "@types/jest": "24.0.11",
    "@types/node": "11.11.3",
    "@types/react": "16.8.8",
    "@types/react-dom": "16.8.2",
    "@types/react-router-dom": "^4.3.1",
    "bootstrap": "^4.3.1",
    "react": "^16.8.4",
    "react-dom": "^16.8.4",
    "react-router-dom": "^4.4.0",
    "react-scripts": "2.1.8",
    "typescript": "3.3.3333"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": "react-app"
  },
  "browserslist": [
    ">0.2%",
    "not dead",
    "not ie <= 11",
    "not op_mini all"
  ]
}
```

So in this exercise, we will create two pages Home & About and will set up a routing for them. 

Let's add these two pages. I like to keep all the component in its respective folders. So I will create 
1. _/src/components/about/AboutPage.tsx_

    ```tsx
   import React, {FunctionComponent} from "react";
    
    
   const AboutPage: FunctionComponent = () => {
       return (<div>This is the about Page </div>)
   };
    
   export default AboutPage;
    ``` 
    
    Here We are creating AboutPage as a type of FunctionComponent, FunctionComponent is special type of component which do not maintain state. The compiled js file is very lightweight, so we must try to use FunctionComponent as much as possible.
    
    We just return the function which we want to render.

2. _/src/components/home/HomePage.tsx_
    ```tsx
   import React, {Component} from "react";
   import {Link} from "react-router-dom";
   
   class HomePage extends Component {
   
       render() {
           return (
               <div className='container-fluid'>
                   <div className='jumbotron'>
                       <p>Welcome to your first React App</p>
                       <Link to='about'  className="btn btn-primary btn-lg" >More</Link>
                   </div>
               </div>
           );
       }
   }
   
   export default HomePage;
    ```
    
    Whereas here we are using normal Component(this will maintain state). Also we are adding a Link to navigate to about page.
    
{% include ad-h %}

# Routing

We have added both pages, now time to integrate them with our app. Earlier we added package for react-router-dom, it provides inbuilt components to care of routing.

Normally, within an application your pages should be redirecting to each other, so its always a good idea to wrap your root component for routing.

So we will modify the _index.tsx_, and wrap the App Component with BrowserRouter provided in react-router-dom.

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from "react-router-dom";

ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
```

Next we will modify our _App.tsx_ to keep our routing urls:

```tsx
import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/home/HomePage";
import {Route} from "react-router-dom";
import AboutPage from "./components/about/AboutPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/common/Header";

class App extends Component {
    render() {
        return (
            <div className='container'>
                <Header/>
                <Route exact path='/' component={HomePage}/>
                <Route path='/about' component={AboutPage}/>
            </div>
        );
    }
}

export default App;
```

Now lets review our application. It working as expected, and we can navigate to both the pages.

<img alt="react first app home" src="/images/loader.svg" data-src="/images/2019/react/first-home.png" class="lazy img-center img-half" />

{% include ad-h %}

Till now we successfully created a react app to serve static pages, now lets add some more features to the home page.

# Header Component

Our application is working fine, but it would be good if we can navigate easily, we will add Navigation Links. I like components to be organized so will create Header at location _/src/components/common/Header.tsx_.

```tsx
import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";
import './Header.css'

const Header: FunctionComponent = () => {

    const activeStyle = {color: '#F15B2A'}
    return (
        <nav className='space'>
            <NavLink to='/' activeStyle={activeStyle}  exact >Home</NavLink> { " | "}
            <NavLink to='/about' activeStyle={activeStyle} >About</NavLink>
        </nav>
    )
};

export default Header;
```

We also create a css file at location _/src/components/common/Header.css_ and imported it the component.

```css
.space {
    margin-bottom: 20px;
    margin-top: 20px;
}
```

We have the Header ready, so lets access our first react simple application with routing.

<img alt="react first app home" src="/images/loader.svg" data-src="/images/2019/react/first-header.png" class="lazy img-center img-half"/>


But what happens when we try to access some wrong url in our application? We want to show a Page Not Found message to user, currently it just shows blank page.

{% include ad %}

So lets create PageNotFound Component & to achieve default routing we will use switch function provided in routing.

```tsx
import React, {FunctionComponent} from "react";

const NotFoundPage:FunctionComponent = () => <div>Oops Page Not found.</div>;

export default NotFoundPage;
```

And modify the existing App.tsx as:

```tsx
import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/home/HomePage";
import {Route, Switch} from "react-router-dom";
import AboutPage from "./components/about/AboutPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/common/Header";
import NotFoundPage from "./NotFoundPage";

class App extends Component {
    render() {
        return (
            <div className='container'>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/about' component={AboutPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
```

{% include ad-h %}

Before we close lets add another page BookPage.tsx, which will become our playground for redux integration.

```tsx
// src/components/book/BookPage.tsx

import React, {Component, ReactNode} from "react";

class BookPage extends Component{

    render(): ReactNode {
        return <div>Books</div>;
    }
}

export default BookPage;
```
```tsx
// src/App.tsx

import React, {Component} from 'react';
import './App.css';
import HomePage from "./components/home/HomePage";
import {Route, Switch} from "react-router-dom";
import AboutPage from "./components/about/AboutPage";
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/common/Header";
import NotFoundPage from "./NotFoundPage";
import BookPage from "./components/book/BookPage";

class App extends Component {
    render() {
        return (
            <div className='container'>
                <Header/>
                <Switch>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/about' component={AboutPage}/>
                    <Route path='/books' component={BookPage}/>
                    <Route component={NotFoundPage}/>
                </Switch>
            </div>
        );
    }
}

export default App;
```
```tsx
// src/components/common/Header.tsx

import React, {FunctionComponent} from "react";
import {NavLink} from "react-router-dom";
import './Header.css'

const Header: FunctionComponent = () => {

    const activeStyle = {color: '#F15B2A'}
    return (
        <nav className='space'>
            <NavLink to='/' activeStyle={activeStyle}  exact >Home</NavLink> { " | "}
            <NavLink to='/books' activeStyle={activeStyle} >Books</NavLink> { " | "}
            <NavLink to='/about' activeStyle={activeStyle} >About</NavLink>
        </nav>
    )
};

export default Header;
```

After all these changes, our app will look like.

<img alt="react first app home" src="/images/loader.svg" data-src="/images/2019/react/first-book.png" class="lazy img-center"/>

# Conclusion

We have created a simple react app with typescript added the routing to it. You can find the [code here](https://github.com/kuros/blog-code/tree/master/react/first-app).






 


 

