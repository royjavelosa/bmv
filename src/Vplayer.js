import React from 'react';

const Vplayer = ({ videoSource }) => {
  const youtubeEmbedUrl = `https://www.youtube.com/embed/${videoSource}?autoplay=1`;

  return (
    <div className="video-container">
      <iframe
        width="560"
        height="315"
        src={youtubeEmbedUrl}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Vplayer;
