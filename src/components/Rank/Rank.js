import React from "react";


const Rank = ({ name, submissions }) => {
  return (
    <div>
    <div className='white f3'>{`${name}, you have submitted ${submissions} images so far!`}</div>
    </div>
  );
};
export default Rank;
