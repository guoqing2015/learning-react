# withRouter

## Route

react-router-dom 的路由为组件提供了**history**, **location** , **match** 三个对象
```jsx
<Route exact path="/Home" component={Home}/>

var Home = ( {history,location,match })=> <div>{location.pathname}</div>
```

## withRouter的作用

react-router 提供了一个withRouter组件

withRouter可以包装任何自定义组件，将react-router-dom 的 **history**, **location** , **match** 三个对象传入。这样就不用一级级传递react-router的属性

```jsx
import {withRouter} from 'react-router-dom' ;

var Test = ({history, location, match} => {
    return <div>{location.pathname}</div>
})

export default withRouter(Test)
```

## react-router-redux的使用

如果使用了 (react-router-redux)[https://github.com/ReactTraining/react-router/tree/master/packages/react-router-redux] , 则可以直接从state 中的router属性中获取location。不需要再使用withRouter 获取路由信息了

```jsx
import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

import createHistory from 'history/createBrowserHistory'
import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
)

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

ReactDOM.render(
  <Provider store={store}>
    { /* ConnectedRouter will use the store from Provider automatically */ }
    <ConnectedRouter history={history}>
      <div>
        <Route exact path="/" component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/topics" component={Topics}/>
      </div>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
)
)
```
