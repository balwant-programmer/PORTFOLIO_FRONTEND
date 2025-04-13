import React, { useEffect, useState, useRef } from "react";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { solarizedlight } from "react-syntax-highlighter/dist/esm/styles/prism";
import { allblog, bloglikeFun } from "./api/blogapi";
import AnimatedText from "./AnimatedText ";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { toast } from "react-toastify";
import Spinner from "./Spinner";
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
        setLoader(false);
        if (data?.data?.success === false) {
          toast(data?.data?.message);
          return setBlog(data?.data?.message);
        }
        setBlogData(data);
      } catch (error) {
        console.log("Error while fetching blog data:", error);
        setLoader(false);
      } finally {
        setLoader(false);
      }
    };
    fetchData();
  }, [likeData]);

  useEffect(() => {
    document.title = "blog programming";
  }, []);

  const HandleLike = async (id) => {
    try {
      const data = await bloglikeFun(id);
      if (!data?.data?.success && data?.status === 403) {
        return toast("You are not registered");
      }
      if (data?.modifiedCount === 1) {
        setLikeData((pre) => !pre);
        toast(data?.message);
      }
    } catch (error) {
      console.log("Error while handling like:", error);
      setLoader(false);
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

  return (
    <>
      {loader ? (
        <Spinner />
      ) : (
        <div className="p-6">
          <div className="lg:mt-10">
            <h1 className="text-2xl font-extralight text-center -mt-4">
              <AnimatedText />
            </h1>
          </div>

          {blogData?.map(({ data, description, id, like }) => (
            <React.Fragment key={id}>
              {!!blog && <div>{blog}</div>}

              <div className="mt-2 p-4 lg:mx-72 text-black border-2 cursor-pointer rounded-md">
                <div className="text-end font-sans flex justify-end items-center select-none text-gray-900">
                  <div className="px-4 flex items-center gap-2 rounded shadow">
                    <FavoriteIcon
                      fontSize="small"
                      className={
                        !!like.find((userId) => userId === user?.userId)
                          ? "text-red-500"
                          : "text-black"
                      }
                      onClick={() => HandleLike(id)}
                    />
                    <p>{like?.length}</p>
                  </div>
                  &nbsp;&nbsp;&nbsp;
                  <div
                    onClick={() => handleCopy(id)}
                    className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
                  >
                    <ContentCopyIcon fontSize="small" />
                    <span>Copy</span>
                  </div>
                </div>

                <SyntaxHighlighter
                  language="javascript"
                  style={solarizedlight}
                  wrapLongLines={true}
                >
                  {(() => {
                    codeRefs.current[id] = data;
                    return data;
                  })()}
                </SyntaxHighlighter>
              </div>

              <div className="mt-2 p-4 lg:mx-72 text-black break-words rounded-md pb-12">
                <div>{description}</div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </>
  );
};

export default Blog;
