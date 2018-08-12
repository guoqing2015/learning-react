import React from 'react';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom';

        // path="/:page?/:subpage?"    匹配的路由例如有:/react/router
        // path="/:page?-:subpage?"    匹配的路由例如有：/react-router
const App = (props) => (
  <Router basename={props.path}>
    <div>
      <Route
        path="/:page?-:subpage?"
        render={({match}) => (
        <h1>
          PAGE: {match.params.page || 'Home'}<br />
          SUBPAGE: {match.params.subpage}
        </h1>
      )} />
    </div>
  </Router>
)

export default App
