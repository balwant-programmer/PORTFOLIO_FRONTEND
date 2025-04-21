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
    document.title = "User Login";
  }, []);

  const HandleLogin = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.warn("Please enter your email.");
      return;
    }
    if (!password) {
      toast.warn("Please enter your password.");
      return;
    }

    dispatch(setLoading(true));

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await loginFunc(formData);
      if (response.success) {
        dispatch(setLoading(false));
        toast.success(response.message);
        dispatch(login(response.user));
        dispatch(userLogoUpdate(response.user?.image));
        navigate("/");
      } else {
        toast.error(response.message);
        dispatch(setLoading(false));
      }
    } catch (error) {
      toast.error("Something went wrong during login.");
      console.error("Login error:", error);
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
      {!direction && (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-black px-4">
          <div className="w-full max-w-md p-8 bg-[#1a1a1a]/90 border border-gray-800 rounded-2xl backdrop-blur-md shadow-2xl">
            <h2 className="text-4xl font-extrabold text-center mb-8 bg-gradient-to-r from-rose-500 via-yellow-400 to-pink-500 bg-clip-text text-transparent">
              Welcome Back
            </h2>

            <form onSubmit={HandleLogin} className="space-y-6">
              <div>
                <label className="text-sm font-medium text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full mt-1 p-3 rounded-md bg-zinc-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div className="relative">
                <label className="text-sm font-medium text-white">
                  Password
                </label>
                <input
                  type={togglepassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full mt-1 p-3 rounded-md bg-zinc-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
                {togglepassword ? (
                  <RemoveRedEyeIcon
                    fontSize="small"
                    onClick={() => setTogglePassword(!togglepassword)}
                    className="absolute top-[47px] right-3 cursor-pointer text-gray-400"
                  />
                ) : (
                  <VisibilityOffIcon
                    fontSize="small"
                    onClick={() => setTogglePassword(!togglepassword)}
                    className="absolute top-[47px] right-3 cursor-pointer text-gray-400"
                  />
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 rounded-md text-white font-semibold hover:scale-105 transition duration-300"
              >
                {loading ? (
                  <div className="flex justify-center">
                    <ClipLoader color="#ffffff" size={20} />
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </form>

            <div className="text-center mt-6 text-sm text-gray-400">
              Don’t have an account?{" "}
              <Link
                to="/register"
                className="font-semibold bg-gradient-to-r from-yellow-300 to-pink-400 bg-clip-text text-transparent hover:underline"
              >
                Register now
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
