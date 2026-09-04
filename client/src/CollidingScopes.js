import { useEffect, useRef, useState } from 'react';
import './CollidingScopes.css';

function CollidingScopes() {
  const canvasRef = useRef(null);
  const imageRef = useRef(null);
  const animationRef = useRef(null);

  const [speed, setSpeed] = useState(1);
  const [segments, setSegments] = useState(10);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const rotationRef = useRef(0);

  function handleImageUpload(event) {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const image = new Image();

      image.onload = () => {
        imageRef.current = image;
        setImageLoaded(true);
      };

      image.src = e.target.result;
    };

    reader.readAsDataURL(file);
  }

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    function resizeCanvas() {
      const container = canvas.parentElement;

      if (!container) return;

      const size = Math.min(
        container.clientWidth,
        container.clientHeight
      );

      canvas.width = size;
      canvas.height = size;
    }

    resizeCanvas();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const context = canvas.getContext('2d');

    function animate() {
      const width = canvas.width;
      const height = canvas.height;

      const centerX = width / 2;
      const centerY = height / 2;

      context.clearRect(0, 0, width, height);

      context.fillStyle = '#222222';
      context.fillRect(0, 0, width, height);

      const image = imageRef.current;

      if (image) {
        const angle = (Math.PI * 2) / segments;

        for (let i = 0; i < segments; i++) {
          context.save();

          context.translate(centerX, centerY);

          context.rotate(i * angle + rotationRef.current);

          if (i % 2 === 1) {
            context.scale(-1, 1);
          }

          context.beginPath();

          context.moveTo(0, 0);

          context.arc(
            0,
            0,
            Math.max(width, height),
            -angle / 2,
            angle / 2
          );

          context.closePath();

          context.clip();

          const scale = Math.max(
            width / image.width,
            height / image.height
          ) * 1.5;

          const imageWidth = image.width * scale;
          const imageHeight = image.height * scale;

          context.drawImage(
            image,
            -imageWidth / 2,
            -imageHeight / 2,
            imageWidth,
            imageHeight
          );

    

          context.restore();
        }
      } else {
        context.fillStyle = '#888888';
        context.font = `${Math.max(14, width / 14)}px Arial`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';

        context.fillText(
          'UPLOAD IMAGE',
          centerX,
          centerY
        );
      }

      if (isPlaying) {
        rotationRef.current += 0.002 * speed;
      }

      animationRef.current =
        requestAnimationFrame(animate);
    }

    animate();

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [speed, segments, isPlaying]);

  return (
    <div className="scopes-container">
      <div className="scopes-title">
        COLLIDING SCOPES
      </div>

      <div className="canvas-wrapper">
        <canvas
          ref={canvasRef}
          className="scopes-canvas"
        />
      </div>

      <div className="scopes-controls">

        <label className="upload-button">
          UPLOAD IMAGE

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </label>

        <div className="control-group">
          <label>
            SPEED: {speed.toFixed(1)}
          </label>

          <input
            type="range"
            min="0"
            max="5"
            step="0.1"
            value={speed}
            onChange={(event) =>
              setSpeed(Number(event.target.value))
            }
          />
        </div>

        <div className="control-group">
          <label>
            SEGMENTS: {segments}
          </label>

          <input
            type="range"
            min="3"
            max="30"
            step="1"
            value={segments}
            onChange={(event) =>
              setSegments(Number(event.target.value))
            }
          />
        </div>

        <button
          className="scopes-play-button"
          onClick={() =>
            setIsPlaying(previous => !previous)
          }
          disabled={!imageLoaded}
        >
          {isPlaying ? 'PAUSE' : 'PLAY'}
        </button>

      </div>
    </div>
  );
}

export default CollidingScopes;