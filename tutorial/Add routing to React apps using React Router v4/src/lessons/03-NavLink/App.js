// https://jsbin.com/fibugif/

// 参考： https://blog.csdn.net/lhjuejiang/article/details/80366839

import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  NavLink
 } from 'react-router-dom';
import './App.css';


/**
 * 
<NavLink>是<Link>的一个特定版本，会在匹配上当前的url的时候 给已经渲染的元素添加参数，组件的属性有

- activeClassName(string)：设置选中样式，默认值为active
- activeStyle(object)：当元素被选中时，为此元素添加样式
- exact(bool)：为true时，只有当导致和完全匹配class和style才会应用
- strict(bool)：为true时，在确定为位置是否与当前URL匹配时，将考虑位置pathname后的斜线
isActive(func)判断链接是否激活的额外逻辑的功能

嗯、看例子就懂了

// activeClassName选中时样式为selected
<NavLink
  to="/faq"
  activeClassName="selected"
>FAQs</NavLink>
 
// 选中时样式为activeStyle的样式设置
<NavLink
  to="/faq"
  activeStyle={{
    fontWeight: 'bold',
    color: 'red'
   }}
>FAQs</NavLink>
 
// 当event id为奇数的时候，激活链接
const oddEvent = (match, location) => {
  if (!match) {
    return false
  }
  const eventID = parseInt(match.params.eventID)
  return !isNaN(eventID) && eventID % 2 === 1
}
 
<NavLink
  to="/events/123"
  isActive={oddEvent}

 */

const isActiveFunc = (match, location) => {
  console.log(match, location)
  return match
  // return false;
}

const Links = () => (
  <nav>
    <NavLink exact activeClassName="active" to="/">Home</NavLink>
    <NavLink activeStyle={{color: 'green'}} to="/about">About</NavLink>
    <NavLink
      activeClassName="active"
      isActive={isActiveFunc}
      to="/contact">
      Contact
    </NavLink>
  </nav>
)

const App = (props) => (
  <Router basename={props.path}>
    <div>
      <Links />
      <Route exact path="/" render={() => <h1>Home</h1>} />
      <Route path="/about" render={() => <h1>About</h1>} />
      <Route path="/contact" render={() => <h1>Contact</h1>} />
    </div>
  </Router>
);

export default App
