import React from "react";

const FaceRecognition = ({ imageUrl, boxArray }) => {
  return (
    <div className="center ma3">
      <div className="absolute mt2" style={{ top: 285 }}>
        <img id="inputImg" src={imageUrl} alt="" />
        {boxArray.map((box) => (
          <div
            className="bounding_box"
            style={{
              top: box.topRow,
              right: box.rightCol,
              left: box.leftCol,
              bottom: box.bottomRow,
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FaceRecognition;
