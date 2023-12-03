import React from "react";

const FaceRecognition = ({ imageUrl, boxArray }) => {
  return (
    <div className="center">
      <div className="img-container">
        <img id="inputImg" src={imageUrl} alt="" />
        {boxArray.map((box, index) => (
          <div
            key={index}
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
