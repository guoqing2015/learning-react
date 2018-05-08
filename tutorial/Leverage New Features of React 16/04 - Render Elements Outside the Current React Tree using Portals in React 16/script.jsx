/**
 * 传送门：React Portal 参考： https://zhuanlan.zhihu.com/p/29880992
 * 
 * React Portal之所以叫Portal，因为做的就是和“传送门”一样的事情：render到一个组件里面去，实际改变的是网页上另一处的DOM结构。
 * 
 * 在React的世界中，一切都是组件（参见《帮助你深入理解React》），用组件可以表示一切界面中发生的逻辑，不过，有些特例处理起来还比较麻烦，比如，某个组件在渲染时，在某种条件下需要显示一个对话框(Dialog)，这该怎么做呢？
 * 
 * 最直观的做法，就是直接在JSX中把Dialog画出来，像下面代码的样子。
<div class="foo">
   <div> ... </div>
   { needDialog ? <Dialog /> : null }
</div>
 * 
 * 问题是，我们写一个Dialog组件，就这么渲染的话，Dialog最终渲染产生的HTML就存在于上面JSX产生的HTML一起了，类似下面这样。
<div class="foo">
   <div> ... </div>
   <div class="dialog">Dialog Content</div>
</div>
 * 
 * 可是问题来了，对于对话框，从用户感知角度，应该是一个独立的组件，通常应该显示在屏幕的最中间，现在Dialog被包在其他组件中，要用CSS的position属性控制Dialog位置，就要求从Dialog往上一直到body没有其他postion是relative的元素干扰，这……有点难为作为通用组件的Dialog，毕竟，谁管得住所有组件不用position呢。
 * 还有一点，Dialog的样式，因为包在其他元素中，各种样式纠缠，CSS样式太容易搞成一坨浆糊了。
 * 
 */

class Overlay extends React.Component {
  constructor(props) {
    super(props);
    this.overlayContainer = document.createElement('div');
    document.body.appendChild(this.overlayContainer);
  }

  render() {
    return ReactDOM.createPortal(
      <div className="overlay">
        {this.props.children}
      </div>,
      this.overlayContainer
    );
  }
}

class App extends React.Component {
    render() {
      return (
        <div>
          <h1>Dashboard</h1>
          {/* {
            ReactDOM.createPortal(
              <div className="overlay">welcome</div>,  //塞进传送门的JSX
              document.getElementById('portal-container') //传送门的另一端DOM node
            )
          } */}
          <Overlay>
            welcome
          </Overlay>
        </div>
      );
    }
}
  
  ReactDOM.render(<App />, document.getElementById('root'));
  