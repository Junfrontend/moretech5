import React from "react";
import MainMap from "./components/MainMap/MainMap";
import LocateUser from "./components/LocateUser/LocateUser";
import BaseDrawer from "./components/BaseDrawer/BaseDrawer";
import { OfficeDetails } from "./components/OfficeDetails/OfficeDetails";
function App() {
  return (
    <div className="App">
      <MainMap />
      <LocateUser />
      <BaseDrawer />
      <OfficeDetails />
    </div>
  );
}

export default App;
