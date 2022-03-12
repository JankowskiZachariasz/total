import React from "react";
import logoImg from "./logo.png";

const ArotechLogo = React.memo(({ ...props }) => {
  const logoStyles = {
    display: "block",
    height: "100%",
    width: "100%",
    maxWidth: "350px"
  };

  return (
    <img
      alt="The Arts on Tour logo."
      style={logoStyles}
      src={logoImg}
      {...props}
    />
  );
});

export default ArotechLogo;