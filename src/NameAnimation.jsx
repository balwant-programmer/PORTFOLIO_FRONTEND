import React from "react";

const NameAnimation = () => {
  return (
    <div>
      <span
        className="letter text-red-500"
        style={{ animation: "color-change 5s infinite" }}
      >
        &nbsp;B
      </span>
      <span
        className="letter text-blue-700"
        style={{ animation: "color-change 5s infinite" }}
      >
        &nbsp;a
      </span>
      <span
        className="letter text-green-700"
        style={{ animation: "color-change 5s infinite" }}
      >
        &nbsp;l
      </span>
      <span
        className="letter text-orange-900"
        style={{ animation: "color-change 5s infinite" }}
      >
        &nbsp;w
      </span>
      <span
        className="letter text-purple-200"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;a
      </span>
      <span
        className="letter text-pink-300"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;n
      </span>
      <span
        className="letter text-yellow-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;t &nbsp;
      </span>

      <span
        className="letter text-teal-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;G
      </span>
      <span
        className="letter text-teal-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;u
      </span>
      <span
        className="letter text-teal-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;p
      </span>
      <span
        className="letter text-teal-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;t
      </span>
      <span
        className="letter text-teal-500"
        style={{ animation: "color-change 3s infinite" }}
      >
        &nbsp;a
      </span>
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

export default NameAnimation;
