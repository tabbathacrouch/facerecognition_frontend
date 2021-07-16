import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
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
          {boxes.map((box, i) => (
            <div
              key={i}
              className="bounding-box"
              style={{
                left: box.left,
                top: box.top,
                right: box.right,
                bottom: box.bottom,
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FaceRecognition;
