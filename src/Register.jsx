import React, { useEffect, useState } from "react";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { register } from "./api/apiConfigeration";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { toast } from "react-toastify";
import Spinner from "./Spinner";

const Register = () => {
  const [togglepassword, setTogglePassword] = useState(false);
  const [username, setuserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setemail] = useState("");
  const [LogoFile, setLogofile] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const data = userTokencheck();
  const [direction, setDirection] = useState(false);
  const [loading, setLaoding] = useState(false);

  useEffect(() => {
    document.title = "user- sign up";
  }, []);

  if (!!data && location.pathname === "/register") {
    navigate("/");
    setDirection(true);
  }

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username) {
      toast("fill user name");
      return;
    }
    if (!email) {
      toast("fill your email !");
      return;
    }
    if (!password) {
      toast("fill your Password");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("email", email);
    if (LogoFile) {
      formData.append("logo", LogoFile);
    } else {
      console.error("Logo file is not valid");
    }

    try {
      setLaoding(true);
      const response = await register(formData);
      if (!response.success) {
        setLaoding(false);
        toast(response?.message);
        return;
      }
      if (response.success) {
        setLaoding(false);
        toast.success(response?.message);
        navigate("/login");
        return;
      }
    } catch (error) {
      console.log("error while regitration form !", error);
      setLaoding(false);
    } finally {
      setLaoding(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10  sm:hidden">
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
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col md:flex-row w-full max-w-7xl sm:bg-white p-8 rounded-xl">
            <div className="flex-1 hidden md:block">
              <img
                src="/loginAllustration.avif"
                alt="Register Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex-1 md:mt-10 mb-32">
              <div className=" text-center">
                <label htmlFor="input" className="cursor-pointer">
                  <input
                    id="input"
                    onChange={(e) => setLogofile(e.target.files[0])}
                    type="file"
                    name="logo"
                    hidden
                  />
                  {!!LogoFile ? (
                    <div className="rounded-full flex justify-center  overflow-hidden mx-auto p-1 mt-16">
                      <img
                        className="object-cover w-12 h-12 border-2 p-1 rounded-full  bg-green-100 shadow-md shadow-green-400"
                        src={URL.createObjectURL(LogoFile)}
                        alt="Logo"
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center ">
                      <img
                        src="/logicon.jpg"
                        alt=""
                        className="size-10 object-cover border-2 p-1 
                          rounded-full bg-green-100 shadow-md shadow-green-400"
                      />
                    </div>
                  )}
                </label>
              </div>

              <h2 className="md:text-2xl  text-center text-md text-rose-500 font-serif mt-3 mb-0 ">
                Register
              </h2>
              <form onSubmit={handleRegister}>
                <div className="mb-4">
                  <label
                    className="block text-slate-900 text-sm  mb-2 font-serif "
                    htmlFor="username"
                  >
                    Username
                  </label>
                  <input
                    onChange={(e) => setuserName(e.target.value)}
                    className="w-full p-3 outline-none bg-slate-200 rounded-tl-xl font-serif
                     "
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>

                <div className="mb-4">
                  <label
                    className="block text-slate-900 text-sm  mb-2 font-serif "
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    onChange={(e) => setemail(e.target.value)}
                    className="w-full p-3 outline-none bg-slate-200 rounded-tl-xl font-serif"
                    id="email"
                    type="email"
                    placeholder="Email"
                  />
                </div>
                <div className="mb-6 relative">
                  <label
                    className="block text-slate-900 text-sm  mb-2 font-serif "
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 outline-none bg-slate-200 rounded-tl-xl font-serif"
                    id="password"
                    type={togglepassword ? "text" : "password"}
                    placeholder="Password"
                  />

                  {togglepassword ? (
                    <RemoveRedEyeIcon
                      fontSize="medium"
                      onClick={() => setTogglePassword(!togglepassword)}
                      className="absolute right-4 top-[50px] transform -translate-y-1/2 cursor-pointer text-gray-500"
                    />
                  ) : (
                    <VisibilityOffIcon
                      fontSize="medium"
                      onClick={() => setTogglePassword(!togglepassword)}
                      className="absolute right-4 top-[50px] transform -translate-y-1/2 cursor-pointer text-gray-500"
                    />
                  )}
                  <span className="text-red-400 text-xs ml-3"></span>
                </div>

                <button
                  type="submit"
                  className="bg-rose-700 text-white w-full flex justify-center items-center p-2 rounded-lg"
                >
                  {loading ? (
                    <div className="flex gap-2 items-center">
                      Wait..
                      <div className="size-4 animate-spin rounded-full  border-b-2 border-t-2"></div>{" "}
                    </div>
                  ) : (
                    "Register"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-gray-600 font-serif text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-blue-500 hover:text-blue-700 font-semibold"
                  >
                    Login here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Register;
