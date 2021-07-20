import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageUrl, boxes }) => {
  return (
    <div className="center ma">
      <div className="absolute mt2">
        <img
          id="inputimage"
          alt="faces are detected with rectangles"
          src={imageUrl}
          width="500px"
          height="auto"
        />
        {boxes.map((box, i) => {
          return (
            <div
              key={i}
              className="bounding-box"
              style={{
                left: box.left_col,
                top: box.top_row,
                right: box.right_col,
                bottom: box.bottom_row,
              }}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default FaceRecognition;
