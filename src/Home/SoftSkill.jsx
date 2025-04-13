import React from "react";

const SoftSkill = () => {
  return (
    <>
      <div
        className="-mx-5 mt-3 border p-3 py-8 border-y-green-600 border-x-rose-400 
      rounded-tr-xl flex flex-col font-serif gap-y-3 text-sm md:text-md break-all "
      >
        <p>
          <span>●</span>&nbsp; I troubleshoot and debug issues in both
          <span className="font-bold text-blue-500"> front-end</span> and
          <span className="font-bold text-blue-500"> back-end</span> code, using
          tools like{" "}
          <span className="text-green-500">Chrome Developer Tools</span>,
          <span className="text-green-500"> Postman</span>, and logging to
          identify and fix errors.
        </p>
        <p>
          <span>●</span>&nbsp; I optimize{" "}
          <span className="text-purple-500">MongoDB queries</span>, improve{" "}
          <span className="text-purple-500">server performance in Node.js</span>
          , and ensure smooth interaction between the front-end (
          <span className="text-blue-500">React</span>) and back-end (
          <span className="text-blue-500">Express</span>) by leveraging my
          <span className="font-bold text-yellow-500">
            {" "}
            problem-solving skills
          </span>
          .
        </p>

        <p>
          <span>●</span>&nbsp; When faced with difficult technical challenges, I
          don't hesitate to{" "}
          <span className="font-semibold text-green-500">research</span>,
          consult{" "}
          <span className="font-semibold text-green-500">documentation</span>,
          and collaborate with my team to brainstorm solutions, which leads to
          continuous{" "}
          <span className="italic text-purple-600">learning and growth</span>.
        </p>
      </div>
    </>
  );
};

export default SoftSkill;
