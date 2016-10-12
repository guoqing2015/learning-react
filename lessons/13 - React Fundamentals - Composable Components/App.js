import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Componnet {
  constructor(){
    super();
    this.state = {
      red: 0
    }
    this.update = this.update.bind(this)
  }
  update(e) {
    this.setState({
      red: ReactDOM.findDOMNode(this.refs.red.refs.inp).value
    })
  }
  render(){
    return (
      <div>
        <Slider ref="red" update={this.update} />
      </div>
    )
  }
}


class Slider extends React.Component {
  render(){
    return (
      <div>
        <input ref="inp" type="range"
               min="0"
               max="255"
               onChange={this.props.update} />
      </div>
    )
  }
}

export default App