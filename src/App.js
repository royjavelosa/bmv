// App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import cute1 from './img/cute1.gif';
import cute2 from './img/cute2.gif';
import cute3 from './img/cute3.gif';
import cute4 from './img/cute4.gif';
import cute5 from './img/cute5.gif';
import Yay from './Yay';

const catGifs = [cute1, cute2, cute3, cute4, cute5];

const App = () => {
  const [screenDimensions, setScreenDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [randomCatGif, setRandomCatGif] = useState('');
  const [showFirstPage, setShowFirstPage] = useState(true);
  const [yesSize, setYesSize] = useState(1);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    // Set a random cat gif on component mount
    setRandomCatGif(getRandomCatGif());

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Set a new random cat gif whenever yesSize changes
    setRandomCatGif(getRandomCatGif());
  }, [yesSize]);

  const getRandomCatGif = () => {
    const randomIndex = Math.floor(Math.random() * catGifs.length);
    return catGifs[randomIndex];
  };

  const teleportButton = () => {
    const noButton = document.getElementById('teleport-button-no');
    if (noButton) {
      const newPosition = calculateNewPosition();
      noButton.style.transition = 'left 0.5s ease, top 0.5s ease';
      noButton.style.left = `${newPosition.x}px`;
      noButton.style.top = `${newPosition.y}px`;

      // Increase the yesSize by 50% for each click
      setYesSize((prevSize) => prevSize * 1.5);

      // Trigger shake animation by toggling the shake state
      setShake((prevShake) => !prevShake);
    }
  };

  const calculateNewPosition = () => {
    const buttonWidth = 100;
    const buttonHeight = 40;
    const count = Math.floor(Math.random() * 5);

    switch (count) {
      case 0:
        return { x: 10, y: screenDimensions.height - buttonHeight - 10 };
      case 1:
        return { x: 10, y: 10 };
      case 2:
        return { x: screenDimensions.width - buttonWidth - 10, y: 10 };
      case 3:
        return { x: screenDimensions.width - buttonWidth - 10, y: screenDimensions.height - buttonHeight - 10 };
      case 4:
        return { x: screenDimensions.width / 2 - buttonWidth / 2, y: screenDimensions.height / 2 - buttonHeight / 2 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const handleYesClick = () => {
    // Set showFirstPage to false when clicking "Yes"
    setShowFirstPage(false);
  };

  return (
    <div className="App">
      {showFirstPage ? (
        <>
          <h1 style={{ position: 'absolute', top: '5%', left: '50%', transform: 'translateX(-50%)' }}>
            Will you be my Valentine Princess Julie?
          </h1>
          <div id="cat-container" style={{ position: 'absolute', top: '20%', left: '30%', width: '40%' }}>
            <img src={randomCatGif} alt="Cute Cat" style={{ width: '100%', height: '100%', borderRadius: '10px' }} />
          </div>
          <button
            id="teleport-button-no"
            className={`teleport-button no ${shake ? 'shake' : ''}`}
            onClick={teleportButton}
            style={{ fontWeight: '800', marginBottom: '80px' }}

          >
            No
          </button>
          <button
            id="teleport-button"
            className="teleport-button yes"
            onClick={handleYesClick}
            style={{ transform: `scale(${yesSize})`,fontWeight: '800', marginBottom: '80px' }}
          >
            Yes
          </button>
        </>
      ) : (
        <Yay />
      )}
    </div>
  );
};

export default App;
