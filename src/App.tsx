import './assets/css/main.css'
import MainMap from "./components/MainMap/MainMap";
import LocateUser from "./components/LocateUser/LocateUser";
import BaseDrawer from "./components/BaseDrawer/BaseDrawer";

function App() {
  return (
    <div className="App">      
      <MainMap />
      <LocateUser />
      <BaseDrawer />
    </div>
  );
}

export default App;
