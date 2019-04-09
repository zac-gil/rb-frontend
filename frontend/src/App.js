import React from 'react';
import { Link, Route } from "react-router-dom";

import Home from "./Home";
import TestForm from "./test/TestForm";

const ViewStyle = {
  maxWidth: "400px",
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
              <Link to="/">Home</Link>
            </li>
            <li>
              <a href="/test/form/">Test Form</a>
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
