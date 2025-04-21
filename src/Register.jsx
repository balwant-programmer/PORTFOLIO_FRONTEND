import React, { useEffect, useState } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "./api/apiConfigeration";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { toast } from "react-toastify";

const Register = () => {
  const [togglepassword, setTogglePassword] = useState(false);
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const data = userTokencheck();
  const [direction, setDirection] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "User Sign Up";
  }, []);

  if (!!data && location.pathname === "/register") {
    navigate("/");
    setDirection(true);
  }

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username) {
      toast.warn("Please enter a username.");
      return;
    }
    if (!email) {
      toast.warn("Please enter your email.");
      return;
    }
    if (!password) {
      toast.warn("Please enter your password.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);

    try {
      setLoading(true);
      const response = await register(formData);
      if (!response.success) {
        setLoading(false);
        toast.error(response?.message);
        return;
      }
      if (response.success) {
        setLoading(false);
        toast.success(response?.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!direction && (
        <div className="min-h-screen flex items-center justify-center px-1 -mt-8 sm:mt-7">
          <div className="flex flex-col md:flex-row w-full max-w-5xl backdrop-blur-md rounded-2xl shadow-2xl overflow-hidden border border-gray-800 animate-fadeIn">
            {/* Left Side Image - hidden on mobile */}
            <div
              className="hidden md:flex w-full md:w-1/2 relative contrast-100 hover:contrast-150 items-center justify-center bg-cover bg-center h-64 md:h-auto"
              style={{
                backgroundImage: "url('/homsectionimage.png')",
              }}
            ></div>

            {/* Right Side Form */}
            <div className="flex-1 p-4 text-white bg-gradient-to-r from-gray-900 via-black brightness-95 hover:brightness-110 to-black rounded-r-2xl">
              <h2 className="text-4xl text-center font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-yellow-500 to-orange-500 bg-clip-text text-transparent tracking-tight">
                Create Your Account
              </h2>

              <form onSubmit={handleRegister} className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Username</label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setuserName(e.target.value)}
                    placeholder="Enter username"
                    className="w-full p-3 mt-1 bg-zinc-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all hover:ring-2 hover:ring-pink-500"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setemail(e.target.value)}
                    placeholder="Enter email"
                    className="w-full p-3 mt-1 bg-zinc-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all hover:ring-2 hover:ring-pink-500"
                  />
                </div>

                <div className="relative">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type={togglepassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full p-3 mt-1 bg-zinc-900 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all hover:ring-2 hover:ring-pink-500"
                  />
                  {togglepassword ? (
                    <RemoveRedEyeIcon
                      onClick={() => setTogglePassword(!togglepassword)}
                      className="absolute top-[47px] right-4 cursor-pointer text-gray-400"
                    />
                  ) : (
                    <VisibilityOffIcon
                      onClick={() => setTogglePassword(!togglepassword)}
                      className="absolute top-[47px] right-4 cursor-pointer text-gray-400"
                    />
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 via-yellow-500 to-orange-500 text-white py-3 rounded-lg text-lg font-semibold hover:scale-105 hover:opacity-95 transition duration-300"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Registering...
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>

              <p className="text-center text-sm text-gray-400 mt-6">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:underline hover:text-blue-500"
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
