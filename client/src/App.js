import logo from './logo.svg';
import './App.css';
import us from './images/us.png';
import gb from './images/gb.jpg';

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

       <div className="play-for-title">
         I play for :
       </div>

    <div className="divider"></div>

    <div className="game-panel">
      <div className="game-info">
        <label className="radio-option">
          <input type="radio" name="country" />
          <span>USA</span>
        </label>

        <div className="scoreboard">
          <span className="score-label">SCORE</span>
          <span className="score-value">000000</span>
        </div>
      </div>

      <div className="usa-flag" aria-label="American flag">
       <img src={us} alt="Логотип" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
     <div className="game-panel game-panel-uk">
  <div className="game-info">
    <label className="radio-option">
      <input type="radio" name="country" />
      <span>UK</span>
    </label>

    <div className="scoreboard">
      <span className="score-label">SCORE</span>
      <span className="score-value">000000</span>
    </div>
  </div>

  <div className="uk-flag" aria-label="United Kingdom flag">
    <img src={gb} alt="Логотип" style={{ maxWidth: '100%', height: 'auto' }} />
  </div>
</div>
    </div>

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
