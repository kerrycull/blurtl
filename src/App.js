import React from "react";
import LatestArticles from "./components/LatestArticles";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h2>blurtl</h2>
        <h5>realtime cryptocurrency news.</h5>
      </div>
      <div className="navigation">
        <h3 className="nongreyed">Latest</h3>
        <h3 className="greyed">Top</h3>
        <h3 className="greyed">Rising</h3>
      </div>
      <LatestArticles />
    </div>
  );
}

export default App;
