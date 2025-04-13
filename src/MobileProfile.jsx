import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { imageUpadate, logout } from "./api/apiConfigeration";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Spinner from "./Spinner";
import axios from "axios";
import { userApi, userupdateCredantialApi } from "./api/api_url";
import { useDispatch } from "react-redux";
import { userLogoUpdate } from "./redux/Slice/userLogoSlice";
const MobileProfile = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [upadteLogo, SetUpadateLogo] = useState(null);
  const [CommingImage, setCommintImage] = useState(null);
  const [comingEmail, setComingEmailData] = useState("");
  const [comingUSerName, setCominguserData] = useState("");
  const dispatch = useDispatch();

  const user = userTokencheck();
  const [SpinnerLoad, setSpinnerLoad] = useState();

  const handleSubmit = async (id) => {
    if (!username) {
      toast.warn("fill user update Name");
      return;
    }
    if (!email) {
      toast("fill Your update email Email !");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      toast("Email is not valid!");
      return;
    }

    const { data } = await axios.put(
      `${userupdateCredantialApi}/${id}`,
      { newEmail: email, newUsername: username },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
      { withCredentials: true }
    );
    const { success, message, updateData } = data;
    console.log(updateData);
    if (success) {
      const { email, username } = updateData;
      setComingEmailData(email);
      setCominguserData(username);
      toast(message);
      setIsModalOpen(false);
    }
  };

  const HandleLogout = async () => {
    const response = await logout();
    const { message, success } = response;
    if (success) {
      navigate("/");
      toast(message);
      dispatch(userLogoUpdate(null))
    }
  };
  const HandleChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return toast("file not found");
      if (!file.type.startsWith("image/")) {
        console.log("Selected file is not an image");
        return;
      }

      SetUpadateLogo(file);

      const formData = new FormData();
      formData.append("upadate_logo", file);
      setSpinnerLoad(true);
      const userImage = await imageUpadate(formData);
      if (userImage.success) {
        setSpinnerLoad(false);
        const logo = userImage?.user;
        setCommintImage(logo);
        dispatch(userLogoUpdate(logo));
      }
    } catch (error) {
      console.log("error");
    } finally {
      setSpinnerLoad(false);
    }
  };

  return (
    <>
      {!!user ? (
        <div className="bg-gradient-to-r from-blue-500 -mt-5 via-purple-300 to-pink-700 shadow-md p-2 h-60 container mx-auto -my-24">
          <div className="shadow bg-white min-w-72 rounded h-96  animate-fade-in-up mt-10">
            <button
              className="border-1 py-2 pl-2 lg:mt-5 "
              onClick={HandleLogout}
            >
              <span>Logout</span>
              <LoginIcon />
            </button>
            <div className="container mx-auto flex items-center justify-center">
              <label htmlFor="logoimage" className="flex">
                <input
                  type="file"
                  id="logoimage"
                  onChange={HandleChange}
                  name="logoimage"
                  accept="image\*"
                  hidden
                />

                {SpinnerLoad ? (
                  <>
                    <div
                      className="border-t-red-200 border-b-red-300 border-l-red-900
                  border-r-red-700 border-2  rounded-full size-12 p-1 flex items-center justify-center"
                    >
                      <span className="absolute top-10  rounded-full">
                        <Spinner />
                      </span>
                    </div>
                  </>
                ) : (
                  <div
                    className="border-t-red-200 border-b-red-300 border-l-red-900
                  border-r-red-700 border-2 relative rounded-full size-12 p-1"
                    style={{
                      backgroundImage: `url(${
                        CommingImage ? CommingImage : user?.logo
                      })`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="mt-7  absolute -top-1 -right-2 -ml-3 size-5 text-white bg-green-300 rounded-full flex justify-center items-center">
                      <PhotoCameraIcon fontSize="10" />
                    </div>
                  </div>
                )}
              </label>
            </div>

            <div className=" mt-3 gap-1 lg:w-112 lg:flex justify-center">
              <p
                className=" shadow mx-9 rounded px-7 lg:w-72 py-7 hover:scale-105
               hover:bg-gray-100 transition-all duration-300 bg-gradient-to-r from-blue-300 to-pink-100 "
              >
                {!!comingEmail ? comingEmail : user?.email}
              </p>
              <p
                className="shadow mx-9 rounded px-6 mt-3 lg:w-72 py-7 bg-gradient-to-r from-pink-300 to-pink-100  
              
               hover:scale-105 hover:bg-gray-100 transition-all duration-300"
              >
                {!!comingUSerName ? comingUSerName : user?.username}
              </p>
            </div>
            <div className="flex justify-center mt-8">
              <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                onClick={() => {
                  setIsModalOpen(true);
                  setUsername(user?.username);
                  setEmail(user?.email);
                }}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {isModalOpen && (
            <div
              className="fixed inset-0  flex items-center justify-center h-screen bg-black bg-opacity-50"
              style={{ zIndex: 1000 }}
            >
              <div className="bg-white rounded-lg shadow-lg p-6 h-2/4 m-4">
                <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
                <form>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter username"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter email"
                    />
                  </div>
                  <div className="flex justify-end gap-3 relative">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="absolute -top-52 text-2xl"
                    >
                      X
                    </button>
                    <button
                      onClick={() => handleSubmit(user?.userId)}
                      type="button"
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </>
  );
};

export default MobileProfile;
