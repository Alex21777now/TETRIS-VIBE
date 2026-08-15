import logo from './logo.svg';
import './App.css';

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}*/

function App() {
  return (
    <div className="layout">
      <aside className="sidebar sidebar-left">
         <div className="logo">TETRIS-VIBE</div>
         
         <div className="play-for">
          <div className="divider"></div>
          <div className="play-for-title">I play for :</div>
          <div className="divider"></div>
        </div>
      </aside>

      <main className="content">
        Center
      </main>

      <aside className="sidebar sidebar-right">
        Right
      </aside>
    </div>
  );
}

export default App;
