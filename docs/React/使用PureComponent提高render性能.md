# 使用PureComponent提高render性能

## 为什么使用PureComponent

PureComponent 也就是纯组件，可以减少不必要的 render 操作的次数，从而提高性能。

## 栗子

这里有两个组件，**Parent**和**Child**

```js
// parent.js
import React, {Component} from 'react';
import Child from './child';

class Parent extends Component {
  constructor() {
    super();
    this.state = {
      title: 'title'
    };

    this.changeState = this.changeState.bind(this);
  }

  changeState() {
    this.setState({
      title: Math.random()
    });
  }

  render() {
    return (
      <div>
        <h3>Container</h3>
        <button type="button" onClick={this.changeState}>change</button>
        <Child></Child>
      </div>
    );
  }

  componentWillUpdate() {
    console.log('parent will update');
  }
}

export default Parent;
```

```js
// child.js
import React, {Component, PureComponent} from 'react';

class Child extends Component {
  render() {
    return (
      <div>child</div>
    );
  }

  componentWillUpdate() {
    console.log('child will update');
  }
}

export default Child;
```

在这里，Child组件没有任何属性输入和state状态，只是一个静态组件，我们点击Parent的change按钮，讲道理Child组件不应该进行任何diff，但是实际情况是"parent will update"和"child will update"都被打印出来了，这是不合理的。

解决方法：让child.js继承PureComponent


## 原理

当组件更新时，如果组件的 **props** 和 **state** 都没发生改变，**render** 方法就不会触发，省去 **Virtual DOM** 的生成和比对过程，达到提升性能的目的。具体就是 React 自动帮我们做了一层**浅比较**：

```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
}
```

而 **shallowEqual** 又做了什么呢？会比较 **Object.keys(state | props)** 的长度是否一致，每一个 **key** 是否两者都有，并且是否是一个引用，也就是只比较了第一层的值，确实很浅，所以嵌套对象和数组是对比不出来的。
深比较操作是非常昂贵的

## 使用指南

### 易变数据不能使用一个引用

```js
class App extends PureComponent {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }
  state = {
    items: [1, 2, 3]
  }
  handleClick = () => {
    const { items } = this.state;
    items.pop();
    this.setState({ items });
  }
  render() {
    return (< div>
      < ul>
        {this.state.items.map(i => < li key={i}>{i}< /li>)}
      < /ul>
      < button onClick={this.handleClick}>delete< /button>
    < /div>)
  }
}
```

会发现，无论怎么点 **delete** 按钮，**li**都不会变少，因为用的是一个引用，**shallowEqual** 的结果为 **true**。改正：

```js
handleClick = () => {
  const { items } = this.state;
  items.pop();
  this.setState({ items: [].concat(items) });
}
```

这样每次改变都会产生一个新的数组，也就可以 **render** 了。这里有一个矛盾的地方，如果没有 **items.pop()**; 操作，每次 **items** 数据并没有变，但还是 **render** 了，这不就很操蛋么？呵呵，数据都不变，你 **setState** 干嘛？


### 不变数据使用一个引用

#### 函数属性

我们在给组件传一个函数的时候，有时候总喜欢:

```js
< MyInput onChange={e => this.props.update(e.target.value)} />
//或者
update(e) {
  this.props.update(e.target.value)
}
render() {
  return < MyInput onChange={this.update.bind(this)} />
}
```

由于每次 **render** 操作, **MyInput** 组件的 **onChange** 属性都会返回一个新的函数，由于引用不一样，所以父组件的 **render** 也会导致 **MyInput** 组件的 **render**，即使没有任何改动，所以需要尽量避免这样的写法，最好这样写：

```js
update = (e) => {
  this.props.update(e.target.value)
}
render() {
  return < MyInput onChange={this.update} />
}
```

#### 空对象或空数组

有时候后台返回的数据中，数组长度为**0**或者对象没有属性会直接给一个 **null**，这时候我们需要做一些容错：

```js
class App extends PureComponent {
  state = {
    items: [{ name: 'test1' }, null, { name: 'test3'  }]
  }
  store = (id, value) => {
    const { items } = this.state;
    items[id]  = assign({}, items[id], { name: value });
    this.setState({ items: [].concat(items) });
  }
  render() {
    return (< div>
      < ul>
        {this.state.items.map((i, k) =>
          <Item store={this.store} key={k} id={k} data={i || {}} />)
        }
      < /ul>
    < /div>)
  }
}
```

当某一个子组件调用 **store** 函数改变了自己的那条属性，触发 **render** 操作，如果数据是 **null** 的话 **data** 属性每次都是一个 **{}**，**{} ==== {}** 是 **false** 的，这样无端的让这几个子组件重新 **render** 了。

最好设置一个 **defaultValue** 为 **{}**,如下：

```js
defaultValue = {}
< Item store={this.store} key={k} id={k} data={i || defaultValue} />
```

### 复杂状态与简单状态不要共用一个组件

这点可能和PureComponent没多少关系，但做的不好可能会浪费很多性能，比如一个页面上面一部分是一个复杂的列表，下面是一个输入框，抽象代码：

```js
change = (e) => {
  this.setState({ value: e.target.value });
}
render() {
  return (< div>
    <ul>
      {this.state.items.map((i, k) => < li key={k}> {...}< /li>)}
    </ul>
    <input value={this.state.value} onChange={this.change} />
  < /div>)
}
```

表单和列表其实是没有什么关联的，表单的值也可能经常变动，但它的会给列表也带来必然的**diff**操作，这是没必要的，最好是给列表抽出成一个单独的 **PureComponent** 组件，这样 **state.items** 不变的话，列表就不会重新 **render** 了。


## 总结

**PureComponent**真正起作用的，只是在一些纯展示组件上，复杂组件用了也没关系，反正**shallowEqual**那一关就过不了，不过记得 **props** 和 **state** 不能使用同一个引用哦。