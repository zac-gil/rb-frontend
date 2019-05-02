import React from 'react';
import { Link, Route } from "react-router-dom";

import Home from "./Home";
import TestForm from "./test/TestForm";
import { genKey } from "./Functions";

const ViewStyle = {
  maxWidth: "600px",
  width: "100%",
  margin: "0 auto",
  padding: "10px",
  boxSizing: "border-box"
};

class App extends React.Component {
  render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/" key={genKey()}>Home</Link>
            </li>
            <li>
              <Link to="/test/form/" key={genKey()}>Test Form</Link>
            </li>
          </ul>
        </nav>
        <main style={ViewStyle} className="App">
          <Route path="/" exact component={Home} />
          <Route path="/test/form/" component={TestForm} />
        </main>
      </div>
    );
  }
}

export default App;
