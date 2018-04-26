// import React, { Component } from 'react';

const Profile = props => (
    <div>
        Name： {props.user.name}
    </div>
);

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: { name: "Chris" },
            hasError: false
        };
    }

    componentDidCatch() {
        this.setState(state => ({ ...state, hasError: true }))
    }

    updateUser = () => {
        this.setState(state => ({ ...state, user: null }));
    }

    render() {
        if(this.state.hasError) {
            return <div>Sorry, something went wrong.</div>
        } else {
            return (
                <div>
                    <Profile user={this.state.user} />
                    <button onClick={this.updateUser}>Update</button>
                </div>
            )
        }
    }
} 

ReactDOM.render(<App />, document.getElementById("root"));