import React from "react";

const Navigation = ({ onRouteChange }) => {
  return (
    <nav>
      <p
        className="f3 link dim underline pointer"
        onClick={() => onRouteChange("signin")}
      >
        Sign out
      </p>
    </nav>
  );
};

export default Navigation;
