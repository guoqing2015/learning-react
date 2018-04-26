// import React, { Component } from 'react';


let sendToErrorReporting = (error, info) => {
    console.log(error)
    console.log(info)
}


class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasError: false
        }
    }

    /**
     * React 16 中的异常处理
     * 在 React 15.x 及之前的版本中，组件内的异常有可能会影响到 React 的内部状态，进而导致下一轮渲染时出现未知错误。这些组件内的异常往往也是由应用代码本身抛出，在之前版本的 React 更多的是交托给了开发者处理，而没有提供较好地组件内优雅处理这些异常的方式。
     * 在 React 16.x 版本中，引入了所谓 Error Boundary 的概念，从而保证了发生在 UI 层的错误不会连锁导致整个应用程序崩溃；未被任何异常边界捕获的异常可能会导致整个 React 组件树被卸载。所谓的异常边界即指某个能够捕获它的子元素（包括嵌套子元素等）抛出的异常，并且根据用户配置进行优雅降级地显示而不是导致整个组件树崩溃。异常边界能够捕获渲染函数、生命周期回调以及整个组件树的构造函数中抛出的异常。
     * 我们可以通过为某个组件添加新的 componentDidCatch(error, info) 生命周期回调来使其变为异常边界：
     */
    componentDidCatch(error, info) {
        this.setState(state => ({ ...state, hasError: true }));
        sendToErrorReporting(error, info);
    }

    render() {
        if (this.state.hasError) {
            return <div>Sorry, something went wrong.</div>;
        } else {
            return this.props.children;
        }
    }
}


class Profile extends React.Component {
    onClick = () => {
        this.setState(state => {
            throw new Error("Oh nooo!");
            return { ...state };
        });
    };

    render() {
        return (
            <div onClick={this.onClick}>
                Name: {this.props.user.name}
            </div>
        );
    }
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { name: "Chris" },
        };
    }

    updateUser = () => {
        this.setState(state => ({ ...state, user: null }));
    }

    render() {
        return (
            <div>
                <ErrorBoundary>
                    <Profile user={this.state.user} />
                    <button onClick={this.updateUser}>Update</button>
                </ErrorBoundary>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"));