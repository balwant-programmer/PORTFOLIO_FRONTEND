import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { loginFunc } from "./api/apiConfigeration";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { login, setLoading } from "./redux/Slice/authSlice";
import { ClipLoader } from "react-spinners";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { userLogoUpdate } from "./redux/Slice/userLogoSlice";

const Login = () => {
  const [togglepassword, setTogglePassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.auth);
  const location = useLocation();
  const data = userTokencheck();

  const [direction, setRedirection] = useState(false);
  useEffect(() => {
    document.title = "user- login";
  }, []);

  const HandleLogin = async (e) => {
    if (!email) {
      toast?.warn("Fill Your userEmail");
      return;
    }
    if (!password) {
      toast?.warn("Fill Your Password");
      return;
    }

    dispatch(setLoading(true));

    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await loginFunc(formData);
      if (response.success) {
        dispatch(setLoading(false));
        toast(response.message);
        navigate("/");
        console.log(response);
        dispatch(login(response.user));
        dispatch(userLogoUpdate(response.user?.image));
      } else {
        toast(response.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      console.log("Error while submitting form data", error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  if (data && location.pathname === "/login") {
    navigate("/");
    setRedirection(true);
  }

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10">
        <video
          autoPlay
          loop
          muted
          className="w-full h-screen object-cover"
          playsInline
          preload="auto"
        >
          <source
            src="https://media.istockphoto.com/id/538615824/video/4k-login-page.mp4?s=mp4-640x640-is&k=20&c=i3P_r_fkI_jr0IGxKsc40I4bgoR2w_KLQLMOmKdVeS0="
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>
      {direction ? null : (
        <div className="min-h-screen -mt-16  flex items-center justify-center">
          <div className=" p-6 rounded-lg w-full max-w-md">
            <h2 className="text-2xl font-serif text-center text-rose-600 ">
              Login
            </h2>
            <form>
              <div className="mb-6">
                <label
                  className="block text-gray-900 text-sm font-serif mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  className="shadow-sm outline-none bg-slate-100 rounded w-full
                   py-2 px-4 text-gray-700 "
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="mb-6 relative">
                <label
                  className="block text-slate-900 text-sm font-serif mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  className="shadow-sm border border-gray-100 bg-slate-100 rounded-tl-xl w-full py-2
                   px-4 text-black font-serif outline-none "
                  id="password"
                  type={togglepassword ? "text" : "password"}
                  placeholder="Password"
                />
                {togglepassword ? (
                  <RemoveRedEyeIcon
                    fontSize="small"
                    onClick={() => setTogglePassword(!togglepassword)}
                    className="absolute right-4 top-12 text-slate-500 transform -translate-y-1/2 cursor-pointer"
                  />
                ) : (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => setTogglePassword(!togglepassword)}
                    className="absolute right-4 top-12 text-slate-500 transform -translate-y-1/2 cursor-pointer"
                  />
                )}
              </div>

              <div className="flex justify-center mb-4">
                <button
                  className="w-full  bg-blue-900 font-serif text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="button"
                  onClick={HandleLogin}
                  disabled={loading}
                >
                  {loading ? (
                    <ClipLoader color="#ffffff" loading={loading} size={20} />
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
            <div className="text-center mt-6">
              <p className="text-slate-900 font-serif text-sm">
                Don't have an account?
                <Link
                  to="/register"
                  className="text-blue-500 text-sm hover:text-blue-700 font-semibold"
                >
                  &nbsp;Register now
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
