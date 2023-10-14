import React from "react";
import './assets/css/main.css'
import MainMap from "./components/MainMap/MainMap";
import LocateUser from "./components/LocateUser/LocateUser";

function App() {
  return (
    <div className="App">
      <MainMap />
      <LocateUser />
    </div>
  );
}

export default App;
