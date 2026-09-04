import logo from './logo.svg';
import { useEffect, useState } from 'react';
import './App.css';
import us from './images/us.png';
import gb from './images/gb.jpg';
import CollidingScopes from './CollidingScopes';

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

  const [selectedCountry, setSelectedCountry] = useState('USA');
  const [score, setScore] = useState(0);

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
          <input
              type="radio"
              name="country"
              value="USA"
              checked={selectedCountry === 'USA'}
              onChange={() => setSelectedCountry('USA')}
          />
          <span>USA</span>
        </label>

        <div className="scoreboard">
          <span className="score-label">SCORE</span>
          <span className="score-value">{selectedCountry === 'USA'
                 ? String(score).padStart(6, '0')
                 : '000000'}</span>
        </div>
      </div>

      <div className="usa-flag" aria-label="American flag">
       <img src={us} alt="Логотип" style={{ maxWidth: '100%', height: 'auto' }} />
      </div>
     <div className="game-panel game-panel-uk">
  <div className="game-info">
    <label className="radio-option">
           <input
             type="radio"
             name="country"
             value="UK"
             checked={selectedCountry === 'UK'}
             onChange={() => setSelectedCountry('UK')}
           />
      <span>UK</span>
    </label>

    <div className="scoreboard">
      <span className="score-label">SCORE</span>
      <span className="score-value">{selectedCountry === 'UK'
             ? String(score).padStart(6, '0')
             : '000000'}</span>
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
        <Tetris onScoreChange={setScore} />
      </main>

      <aside className="sidebar sidebar-right">

        <CollidingScopes />
      </aside>
    </div>
  );
}

const ROWS = 20;
const COLS = 10;

const SHAPES = [
  [[1, 1, 1, 1]],

  [
    [1, 1],
    [1, 1],
  ],

  [
    [0, 1, 0],
    [1, 1, 1],
  ],

  [
    [0, 1, 1],
    [1, 1, 0],
  ],

  [
    [1, 1, 0],
    [0, 1, 1],
  ],

  [
    [1, 0, 0],
    [1, 1, 1],
  ],

  [
    [0, 0, 1],
    [1, 1, 1],
  ],
];

function createEmptyBoard() {
  return Array.from({ length: ROWS }, () =>
    Array(COLS).fill(0)
  );
}

function randomPiece() {
  const shape =
    SHAPES[Math.floor(Math.random() * SHAPES.length)];

  return {
    shape,
    x: Math.floor(COLS / 2) - Math.ceil(shape[0].length / 2),
    y: 0,
  };
}

function rotateShape(shape) {
  return shape[0].map((_, index) =>
    shape.map(row => row[index]).reverse()
  );
}

function Tetris({ onScoreChange }) {
  const [board, setBoard] = useState(createEmptyBoard);
  const [piece, setPiece] = useState(randomPiece);
  const [score, setScore] = useState(0);
  useEffect(() => {
         onScoreChange(score);
                  }, [score, onScoreChange]);
  const [isPaused, setIsPaused] = useState(false);

  function isValidMove(testPiece, currentBoard = board) {
    for (let y = 0; y < testPiece.shape.length; y++) {
      for (let x = 0; x < testPiece.shape[y].length; x++) {
        if (!testPiece.shape[y][x]) continue;

        const newX = testPiece.x + x;
        const newY = testPiece.y + y;

        if (
          newX < 0 ||
          newX >= COLS ||
          newY >= ROWS
        ) {
          return false;
        }

        if (
          newY >= 0 &&
          currentBoard[newY][newX]
        ) {
          return false;
        }
      }
    }

    return true;
  }

  function mergePiece(currentBoard, currentPiece) {
    const newBoard = currentBoard.map(row => [...row]);

    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell) {
          const boardY = currentPiece.y + y;
          const boardX = currentPiece.x + x;

          if (
            boardY >= 0 &&
            boardY < ROWS &&
            boardX >= 0 &&
            boardX < COLS
          ) {
            newBoard[boardY][boardX] = 1;
          }
        }
      });
    });

    return newBoard;
  }

  function clearLines(currentBoard) {
    const remainingRows = currentBoard.filter(
      row => row.some(cell => !cell)
    );

    const cleared = ROWS - remainingRows.length;

    while (remainingRows.length < ROWS) {
      remainingRows.unshift(Array(COLS).fill(0));
    }

    if (cleared > 0) {
      setScore(prev => prev + cleared * 100);
    }

    return remainingRows;
  }

  function lockPiece() {
    const merged = mergePiece(board, piece);
    const cleaned = clearLines(merged);

    const nextPiece = randomPiece();

    if (!isValidMove(nextPiece, cleaned)) {
      setBoard(createEmptyBoard());
      setPiece(randomPiece());
      setScore(0);
      return;
    }

    setBoard(cleaned);
    setPiece(nextPiece);
  }

  function move(dx, dy) {
    const movedPiece = {
      ...piece,
      x: piece.x + dx,
      y: piece.y + dy,
    };

    if (isValidMove(movedPiece)) {
      setPiece(movedPiece);
      return true;
    }

    return false;
  }

  function moveDown() {
  if (isPaused) return;

  if (!move(0, 1)) {
    lockPiece();
  }
}

  function moveLeft() {
    if (isPaused) return;
    move(-1, 0);
  }

  function moveRight() {
    if (isPaused) return;
    move(1, 0);
  }

  function rotate() {
    if (isPaused) return;

    const rotatedPiece = {
      ...piece,
      shape: rotateShape(piece.shape),
    };

    if (isValidMove(rotatedPiece)) {
      setPiece(rotatedPiece);
    }
  }

  useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(() => {
    moveDown();
  }, 600);

  return () => clearInterval(interval);
  }, [isPaused, piece, board]);

  useEffect(() => {
    function handleKeyDown(event) {
      if (isPaused) return;

      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        moveLeft();
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault();
        moveRight();
      }

      if (event.key === 'ArrowDown') {
        event.preventDefault();
        moveDown();
      }

      if (event.key === 'ArrowUp') {
        event.preventDefault();
        rotate();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener(
        'keydown',
        handleKeyDown
      );
    };
  });

  const displayBoard = board.map(row => [...row]);

  piece.shape.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell) {
        const boardY = piece.y + y;
        const boardX = piece.x + x;

        if (
          boardY >= 0 &&
          boardY < ROWS &&
          boardX >= 0 &&
          boardX < COLS
        ) {
          displayBoard[boardY][boardX] = 2;
        }
      }
    });
  });

  return (
    <div className="tetris-container">
      <div className="tetris-header">
        <span>TETRIS</span>
        <span className="tetris-score">
          {String(score).padStart(6, '0')}
        </span>
      </div>

      <div
        className="tetris-board"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {displayBoard.flatMap((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`tetris-cell cell-${cell}`}
            />
          ))
        )}
      </div>

      <div className="tetris-controls">
        <button onClick={moveLeft}>←</button>
        <button onClick={rotate}>↻</button>
        <button onClick={moveDown}>↓</button>
        <button onClick={moveRight}>→</button>

        <button
          className="pause-button"
          onClick={() => setIsPaused(prev => !prev)}
        >
          {isPaused ? 'RESUME' : 'PAUSE'}
        </button>
      </div>
      {isPaused && (
  <div className="pause-overlay">
    PAUSED
  </div>
)}
    </div>
  );
}


export default App;
