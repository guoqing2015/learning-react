// import React, { Component, Fragment } from "react";

function Fruits(){
  return (
    <React.Fragment>
      <li>Apple</li>
      <li>Orange</li>
      <li>Banana</li>
    </React.Fragment>
  );
}

function Glossary(props) {
  return (
    <dl>
      {props.items.map(item => (
        <React.Fragment key={item.id}>
          <dt>{item.term}</dt>
          <dd>{item.description}</dd>
        </React.Fragment>
      ))}
    </dl>
  );
}

class App extends React.Component {
    render() {
      return(
        <div>
          <ul>
            <li>Peach</li>
            <li>Ananas</li>
            <Fruits />
          </ul>
          <Glossary
            items={
              [
                {
                  id: 1,
                  term: "HTML",
                  description:
                    "Is a descriptive language that specifies webpage structure"
                },
                {
                  id: 2,
                  term: "CSS",
                  description:
                    "Is a declarative language that controls how webpages look in the browser"
                }
              ]
            }
          />
        </div>
      )
    }
  }

ReactDOM.render(<App />, document.getElementById("root"));