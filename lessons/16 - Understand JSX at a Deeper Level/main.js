import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('app'));


document.getElementsByTagName('textarea')[0].value =
    `const App = (props) => {
  var myStyle = {
    backgroundColor: '#000',
    height: 10
  }
  return (
    <div>
      <a href="#"
        notrendered="x"
        onClick={update}>
          {/*this is a coment*/}
        this is the text
        {i>1 ? 'more than one' : 'one'}
        {i>1 && 'MOre than one'}
      </a>
    </div>
  )
}`;

