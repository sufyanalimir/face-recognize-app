import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav>
        <p
          className="f3 link dim underline pointer"
          onClick={() => onRouteChange("signout")}
        >
          Sign out
        </p>
      </nav>
    );
  } else {
    return (
      <nav className="flex">
        <p
          className="f3 link dim underline pointer mh2"
          onClick={() => onRouteChange("signin")}
        >
          Sign In
        </p>
        <p
          className="f3 link dim underline pointer mh2"
          onClick={() => onRouteChange("register")}
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
