import React, { Component } from "react";
import BarChart from "./BarChart";

function FunctionalComponent() {
  let inputRef = React.createRef();

  function handleClick() {
    inputRef.current.focus();
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={handleClick}>Focus</button>
    </div>
  );
}

class App extends Component {
  barChartRef = React.createRef();
  inputRef = React.createRef();

  highlightThird = () => {
    this.barChartRef.current.highlight(3);
  };

  render() {
    return (
      <div>
        <BarChart data={[5, 8, 14, 15, 22, 34]} ref={this.barChartRef} />
        <button onClick={this.highlightThird}>Highlight</button>
        <FunctionalComponent ref={this.inputRef} />
      </div>
    );
  }
}

export default App;
