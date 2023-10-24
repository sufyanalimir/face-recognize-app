import React from "react";

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className="center ma3">
      <div className="mt2">
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
};

export default FaceRecognition;
