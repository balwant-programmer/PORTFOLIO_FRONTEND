import React from "react";

const Spinner = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="size-6 border-2 border-t-red-500 rounded-full mt-16 animate-spin stroke-purple-500 border-l-blue-100"></div>
    </div>
  );
};

export default Spinner;
