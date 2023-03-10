import React from "react";
import LatestArticles from "./components/LatestArticles";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="header">
        <h2>Blurtl</h2>
        <h5>Realtime cryptocurrency news.</h5>
      </div>
      <div className="navigation">
        <h3>Latest</h3>
        <h3>Top (coming soon)</h3>
        <h3>Rising (coming soon)</h3>
      </div>
      <LatestArticles />
    </div>
  );
}

export default App;
