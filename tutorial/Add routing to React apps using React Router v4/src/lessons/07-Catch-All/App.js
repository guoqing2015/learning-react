// https://jsbin.com/qiwaces

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from 'react-router-dom';


/**
<Switch>
只渲染出第一个与当前访问地址匹配的 <Route> 或 <Redirect>。

思考如下代码，如果你访问 /about，那么组件 About User Nomatch 都将被渲染出来，因为他们对应的路由与访问的地址 /about 匹配。这显然不是我们想要的，我们只想渲染出第一个匹配的路由就可以了，于是 <Switch> 应运而生！

<Route path="/about" component={About}/>
<Route path="/:user" component={User}/>
<Route component={NoMatch}/>

 */

const Links = () =>
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact/xxx/xxx/xxxx/x">Contact</Link>
    </nav>

const App = (props) => (
  <Router basename={props.path}>
    <div>
      <Links />
      <Switch>
        <Route exact path="/" render={() => <h1>Home</h1>} />
        <Route path="/about" render={() => <h1>About</h1>} />
        <Route render={() => <h1>Page not found</h1>} />
      </Switch>
    </div>
  </Router>
)

export default App
