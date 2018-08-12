import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
  Redirect
} from 'react-router-dom';

/**
<Redirect>
<Redirect> 渲染时将导航到一个新地址，这个新地址覆盖在访问历史信息里面的本该访问的那个地址。

to: string
重定向的 URL 字符串

to: object
重定向的 location 对象

push: bool
若为真，重定向操作将会把新地址加入到访问历史记录里面，并且无法回退到前面的页面。

from: string
需要匹配的将要被重定向路径。

 */

const loggedin = true;
const Links = () =>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/old/123">Old</Link>
    <Link to="/new/456">New</Link>
    <Link to="/protected">Protected</Link>
  </nav>

const App = (props) => (
  <Router basename={props.path}>
    <div>
      <Links />
        <Route exact path="/" render={() => (<h1>Home</h1>)} />
        <Route
          path="/new/:str"
          render={({match}) => (<h1>New: {match.params.str}</h1>)}/>

        <Route path="/old/:str" render={({match}) => (
          <Redirect to={`/new/${match.params.str}`} />
        )} />

        <Route path="/protected" render={() => (
          loggedin
          ? <h1>Welcome to the protected page</h1>
          : <Redirect to="/new/Login" />
        )} />

    </div>
  </Router>
)

export default App
