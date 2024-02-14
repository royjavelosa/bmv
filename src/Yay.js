// Yay.js
import React, { useState, useEffect } from 'react';
import cuteYes1 from './img/yes1.gif';
import cuteYes2 from './img/yes2.gif';
import cuteYes3 from './img/yes3.gif';
import Vplayer from './Vplayer';
import './Yay.css';

const alternateTexts = [
  "Ok yay!!!",
  "Happy Valentine's Day Love <3",
  "Gusto mo galawan ko Julie?! nyahaha"
];

const Yay = () => {
  const [currentGif, setCurrentGif] = useState(cuteYes1);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState(alternateTexts[0]);
  const [cycleCount, setCycleCount] = useState(0);
  const [showVideoPlayer, setShowVideoPlayer] = useState(false);
  const [showImage, setShowImage] = useState(true);

  useEffect(() => {
    const gifInterval = setInterval(() => {
      // Cycle through the three GIFs
      setCurrentGif((prevGif) => {
        switch (prevGif) {
          case cuteYes1:
            return cuteYes2;
          case cuteYes2:
            return cuteYes3;
          case cuteYes3:
            return cuteYes1;
          default:
            return cuteYes1;
        }
      });

      // Alternate between the two texts
      setCurrentTextIndex((prevIndex) => (prevIndex === 0 ? 1 : 0));

      // Increment cycle count when "Ok yay!!!" is displayed
      if (currentText === "Ok yay!!!") {
        setCycleCount((prevCount) => prevCount + 1);
      }

      // Reset cycle count and switch to the next text after cycling twice through "Ok yay!!!"
      if (cycleCount === 2) {
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % alternateTexts.length);
        setCycleCount(0);
      }

      setCurrentText(alternateTexts[currentTextIndex]);
    }, 2600);

    return () => {
      clearInterval(gifInterval); // Cleanup on component unmount
    };
  }, [cycleCount, currentTextIndex, currentText]);

  const handleButtonClick = () => {
    setShowVideoPlayer(true);
    setShowImage(false); // Hide the image when button is clicked
  };

  return (
    <div className="yay-container">
      <h1 className="pulse">{currentText}</h1>
      {showImage && (
        <div className="image-container">
          <img src={currentGif} alt="Cute Yes" className="animated-gif" />
        </div>
      )}
      {showVideoPlayer && <Vplayer videoSource="FAhjAUYKoB4" />}
      {!showVideoPlayer && <button onClick={handleButtonClick}>Click Me</button>}
    </div>
  );
};

export default Yay;
