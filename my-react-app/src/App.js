// import logo from './logo.svg';
import './App.css';
// import GlobeView from './globeView.jsx';
import GlobeRings from './globeRings';


function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <GlobeView/>
      </header> */}
        <GlobeRings />
    </div>
  );
}

export default App;
