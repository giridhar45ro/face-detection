import React from "react";
import Tilt from "react-tilt";
import image from "../images/logo.png";
const Logo = () => {
  return (
    <div className="ma4 mt0">
      <Tilt
        className="Tilt  br-2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner">
          <img
            style={{ paddingTop: "5px" }}
            src={image}
            alt="Logo"
            height="130px"
          />
        </div>
      </Tilt>
      ;
    </div>
  );
};

export default Logo;
