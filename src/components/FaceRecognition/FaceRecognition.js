import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="center ma">
      {imageUrl && (
        <div className="absolute mt2">
          <img
            id="inputimage"
            alt="faces are detected with rectangles"
            src={imageUrl}
            width="500px"
            height="auto"
          />
          <div
            className="bounding-box"
            style={{
              left: box.left,
              top: box.top,
              right: box.right,
              bottom: box.bottom,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
