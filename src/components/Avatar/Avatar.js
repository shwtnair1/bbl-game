import React from "react";
import "./Avatar.scss";

const Avatar = ({ image, name }) => {
  return (
    <div className="avatar">
      <img src={image} alt={name} />
    </div>
  );
};

export default Avatar;
