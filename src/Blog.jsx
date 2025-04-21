import React, { useEffect, useState, useRef } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { allblog, bloglikeFun } from "./api/blogapi";
import { toast } from "react-toastify";
import { userTokencheck } from "./Hooks/userTokenCheck";

const Blog = () => {
  const [blogData, setBlogData] = useState([]);
  const [blog, setBlog] = useState(null);
  const [likeData, setLikeData] = useState(false);
  const [loader, setLoader] = useState(false);
  const user = userTokencheck();
  const codeRefs = useRef({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoader(true);
        const data = await allblog();
        if (data?.data?.success === false) {
          toast(data?.data?.message);
          return setBlog(data?.data?.message);
        }
        setBlogData(data);
      } catch (error) {
        console.log("Error while fetching blog data:", error);
        toast.error("Something went wrong while fetching blogs.");
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [likeData]);

  useEffect(() => {
    document.title = "Blog Programming";
  }, []);

  const HandleLike = async (id) => {
    try {
      const data = await bloglikeFun(id);
      if (!data?.data?.success && data?.status === 403) {
        return toast("You are not registered");
      }
      if (data?.modifiedCount === 1) {
        setLikeData((prev) => !prev);
        toast(data?.message);
      }
    } catch (error) {
      console.log("Error while handling like:", error);
    }
  };

  const handleCopy = (id) => {
    const textToCopy = codeRefs.current[id];
    if (!textToCopy) return;

    if (navigator?.clipboard?.writeText) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => toast("Code copied to clipboard!"))
        .catch(() => toast.error("Failed to copy code."));
    } else {
      toast.error("Clipboard API not supported in this browser.");
    }
  };

  if (loader) {
    return (
      <div className="min-h-screen bg-black flex flex-col justify-center items-center px-6">
        <div className="w-full max-w-3xl space-y-6 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-gradient-to-b from-[#1a1a1a] to-[#0f0f0f] shadow-lg border border-gray-800"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="h-4 w-16 bg-gray-700 rounded" />
                <div className="h-4 w-20 bg-gray-700 rounded" />
              </div>
              <div className="h-40 bg-gray-800 rounded mb-4" />
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-700 rounded" />
                <div className="h-3 w-5/6 bg-gray-700 rounded" />
                <div className="h-3 w-2/3 bg-gray-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 text-white bg-black min-h-screen">
      <div className="lg:mt-10">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-rose-400 to-blue-500 text-center mb-8 tracking-wide drop-shadow-md">
          My Work
        </h1>
      </div>

      {blogData?.map(({ data, description, id, like }) => (
        <React.Fragment key={id}>
          {!!blog && <div className="text-red-400 text-center">{blog}</div>}

          <div className="mt-6 p-6 font-poppins lg:mx-72 rounded-xl bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] shadow-lg border border-gray-800 hover:shadow-2xl transition-shadow">
            <div className="flex justify-between items-center mb-4 select-none">
              <div className="flex items-center gap-2">
                <FavoriteIcon
                  fontSize="small"
                  className={`cursor-pointer transition duration-200 ${
                    !!like.find((userId) => userId === user?.userId)
                      ? "text-red-500"
                      : "text-gray-400"
                  } hover:scale-110`}
                  onClick={() => HandleLike(id)}
                />
                <p className="text-sm">{like?.length}</p>
              </div>
              <div
                onClick={() => handleCopy(id)}
                className="flex items-center gap-1 cursor-pointer hover:text-blue-500 transition-transform active:scale-95"
              >
                <ContentCopyIcon fontSize="small" />
                <span className="font-poppins text-sm">Copy</span>
              </div>
            </div>

            <SyntaxHighlighter
              language="javascript"
              style={atomDark}
              wrapLongLines={true}
              customStyle={{
                backgroundColor: "#000",
                color: "#fff",
                borderRadius: "12px",
                padding: "1rem",
              }}
            >
              {(() => {
                codeRefs.current[id] = data;
                return data;
              })()}
            </SyntaxHighlighter>
          </div>

          <div className="mt-2 lg:mx-72 text-gray-400 font-poppins text-sm leading-relaxed pb-12">
            {description}
          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default Blog;
