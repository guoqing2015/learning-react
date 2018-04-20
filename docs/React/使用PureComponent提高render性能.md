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

在PureComponent组件中，如果组件的 **props** 和 **state** 都没发生改变，**render** 方法就不会触发，省去 **Virtual DOM** 的生成和比对过程，达到提升性能的目的。具体就是 React 自动帮我们做了一层**浅比较**：

```js
if (this._compositeType === CompositeTypes.PureClass) {
  shouldUpdate = !shallowEqual(prevProps, nextProps) || !shallowEqual(inst.state, nextState);
}
```

其中，**shadowEqual**只会"浅"检查组件的**props**和**state**，这就意味着嵌套对象和数组是不会被比较的。

深比较操作是非常昂贵的，同时，如果这个组件还是纯组件(PureComponent)，那么深比较将会更浪费。


## 应该注意的问题

PureComponent只能说是一种泛泛的性能问题解决方法，并不具备很高的定制性，最好的方式还是自己去处理组件的shoudComponentUpdate。并且，PureComponent的浅对比shallowEqual在对比引用值的时候，也会存在问题。

例如：
这里有两个组件，**Parent**和**Child**

```js
// parent.js
import React, {Component} from 'react';
import Child from './child';

class Parent extends Component {
  constructor() {
    super();
    this.state = {
      items: ['item1', 'item2']
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    let { items } = this.state;
    items.push('new-item');
    this.setState({ items });
  }

  render() {
    return (
      <div>
        <button type="button" onClick={this.handleClick}>add item</button>
        <Child items={this.state.items} />
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
import React, {PureComponent} from 'react';

class Child extends PureComponent {
  render() {
	const { items } = this.props;
     return (
     	<div>{items}</div>
    );
  }

  componentWillUpdate() {
    console.log('child will update');
  }
}

export default Child;
```

child为纯组件(PureComponent)。 当点击按钮后，**this.state.items** 的值发生了改变，但是它仍然指向同一个对象的引用。


参考：
- [React PureComponent 使用指南](https://juejin.im/entry/5934c9bc570c35005b556e1a)
- [在React.js中使用PureComponent的重要性和使用方式](https://www.zcfy.cc/article/why-and-how-to-use-purecomponent-in-react-js-60devs)
