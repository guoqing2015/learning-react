// 参考： https://www.jianshu.com/p/e3adc9b5f75c

import React from 'react';
import {
  BrowserRouter as Router,
  Route
 } from 'react-router-dom';

/**
<BrowserRouter>

一个使用了 HTML5 history API 的高阶路由组件，保证你的 UI 界面和 URL 保持同步。此组件拥有以下属性：

(1) basename: string
作用：为所有位置添加一个基准URL
使用场景：假如你需要把页面部署到服务器的二级目录，你可以使用 basename 设置到此目录。

<BrowserRouter basename="/minooo" />
<Link to="/react" /> // 最终渲染为 <a href="/minooo/react">

(2) getUserConfirmation: func
作用：导航到此页面前执行的函数，默认使用 window.confirm
使用场景：当需要用户进入页面前执行什么操作时可用，不过一般用到的不多。

const getConfirmation = (message, callback) => {
  const allowTransition = window.confirm(message)
  callback(allowTransition)
}

<BrowserRouter getUserConfirmation={getConfirmation('Are you sure?', yourCallBack)} />

(3) forceRefresh: bool
作用：当浏览器不支持 HTML5 的 history API 时强制刷新页面。
使用场景：同上。

const supportsHistory = 'pushState' in window.history
<BrowserRouter forceRefresh={!supportsHistory} />



(4) keyLength: number
作用：设置它里面路由的 location.key 的长度。默认是6。（key的作用：点击同一个链接时，每次该路由下的 location.key都会改变，可以通过 key 的变化来刷新页面。）
使用场景：按需设置。

<BrowserRouter keyLength={12} />
children: node
作用：渲染唯一子元素。
使用场景：作为一个 Reac t组件，天生自带 children 属性。

<BrowserRouter keyLength={12} />
 */





/**
<Route>

<Route> 也许是 RR4 中最重要的组件了，重要到你必须理解它，学会它，用好它。它最基本的职责就是当页面的访问地址与 Route 上的 path 匹配时，就渲染出对应的 UI 界面。

<Route> 自带三个 render method 和三个 props 。

render methods 分别是：
<Route component>
<Route render>
<Route children>

每种 render method 都有不同的应用场景，同一个<Route> 应该只使用一种 render method ，大部分情况下你将使用 component 。

props 分别是：

match
location
history
所有的 render method 无一例外都将被传入这些 props。

 */


const Home = (props) => {
  console.log(props)
  return <h1>Home</h1>
}

const App = (props) => (
  <Router basename={props.path}>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/about" render={() => <h1>About</h1>} />
      <Route path="/children" children={() => <h1>children</h1>} />
    </div>
  </Router>
);

export default App
