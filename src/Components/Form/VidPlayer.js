import React from "react";
import ReactPlayer from "react-player/lazy";

const VidPlayer = ({ link, title }) => {
  return (
    <div className="container">
      <h4>{title}</h4>
      <ReactPlayer url={link} width="100%" height="480px" controls />
    </div>
  );
};

export default VidPlayer;
