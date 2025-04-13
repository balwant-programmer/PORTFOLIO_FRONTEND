import React from "react";

const AnimatedText = () => {
  return (
    <div>
      <span
        className="letter text-red-500"
        style={{ animation: "color-change 5s infinite" }}
      >
        M
      </span>
      <span
        className="letter text-blue-700"
        style={{ animation: "color-change 5s infinite" }}
      >
        y
      </span>
      <span
        className="letter text-green-700"
        style={{ animation: "color-change 5s infinite" }}
      >
        {" "}
      </span>
      <span
        className="letter text-orange-900"
        style={{ animation: "color-change 5s infinite" }}
      >
        W
      </span>
      <span
        className="letter text-purple-200"
        style={{ animation: "color-change 3s infinite" }}
      >
        o
      </span>
      <span
        className="letter text-pink-300"
        style={{ animation: "color-change 3s infinite" }}
      >
        r
      </span>
      <span
        className="letter text-yellow-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        k
      </span>
      <span
        className="letter text-teal-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        e
      </span>
      <span className="animate-spin text-brown-500">d</span>

      {/* Add your style block for keyframes */}
      <style jsx="true">
        {`
          @keyframes color-change {
            0% {
              color: red;
            }
            25% {
              color: orange;
            }
            50% {
              color: yellow;
            }
            75% {
              color: green;
            }
            100% {
              color: blue;
            }
          }
        `}
      </style>
    </div>
  );
};

export default AnimatedText;
