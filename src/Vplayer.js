// Vplayer.js
import React from 'react';

const Vplayer = () => {
  return (
    <div>
      {/* Your video player component code goes here */}
      <video controls width="300" height="200">
        <source src="./vid/val.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default Vplayer;
