import React, { useState } from "react";
import LoginIcon from "@mui/icons-material/Login";
import { userTokencheck } from "./Hooks/userTokenCheck";
import { imageUpadate, logout } from "./api/apiConfigeration";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import Spinner from "./Spinner";
import axios from "axios";
import { userupdateCredantialApi } from "./api/api_url";
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
  const [SpinnerLoad, setSpinnerLoad] = useState(false);

  const handleSubmit = async (id) => {
    if (!username || !email) {
      return toast.warn("Please fill in all fields.");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format.");
    }

    const { data } = await axios.put(
      `${userupdateCredantialApi}/${id}`,
      { newEmail: email, newUsername: username },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    );

    if (data.success) {
      setComingEmailData(data.updateData.email);
      setCominguserData(data.updateData.username);
      toast.success(data.message);
      setIsModalOpen(false);
    }
  };

  const HandleLogout = async () => {
    const res = await logout();
    if (res.success) {
      dispatch(userLogoUpdate(null));
      navigate("/");
      toast.success(res.message);
    }
  };

  const HandleChange = async (e) => {
    const file = e.target.files[0];
    if (!file || !file.type.startsWith("image/")) {
      return toast.error("Please select a valid image file.");
    }

    SetUpadateLogo(file);
    const formData = new FormData();
    formData.append("upadate_logo", file);

    setSpinnerLoad(true);
    try {
      const userImage = await imageUpadate(formData);
      if (userImage.success) {
        const logo = userImage.user;
        setCommintImage(logo);
        dispatch(userLogoUpdate(logo));
      }
    } catch (err) {
      toast.error("Image upload failed.");
    } finally {
      setSpinnerLoad(false);
    }
  };

  return user ? (
    <div className="bg-black p-4 min-h-[100vh] flex justify-center items-start text-white">
      <div className="bg-gray-900 rounded-2xl shadow-lg w-full max-w-md p-6 mt-20">
        <div className="flex justify-end">
          <button
            onClick={HandleLogout}
            className="text-rose-400 hover:text-rose-300 flex items-center gap-1 transition-all"
          >
            Logout <LoginIcon />
          </button>
        </div>

        <div className="flex flex-col items-center mt-6">
          <label htmlFor="logoimage" className="relative group cursor-pointer">
            <input
              type="file"
              id="logoimage"
              hidden
              onChange={HandleChange}
              accept="image/*"
            />
            <div
              className="w-24 h-24 border-2 border-gray-600 rounded-full bg-cover bg-center bg-no-repeat shadow-lg"
              style={{
                backgroundImage: `url(${CommingImage || user?.logo})`,
              }}
            >
              {SpinnerLoad && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Spinner />
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 text-white shadow-md">
              <PhotoCameraIcon fontSize="small" />
            </div>
          </label>

          <div className="mt-6 space-y-3 w-full text-center">
            <div className="text-md font-medium bg-gray-800 py-3 rounded-lg border border-gray-700">
              {comingEmail || user?.email}
            </div>
            <div className="text-md font-medium bg-gray-800 py-3 rounded-lg border border-gray-700">
              {comingUSerName || user?.username}
            </div>
          </div>

          <button
            onClick={() => {
              setIsModalOpen(true);
              setUsername(user?.username);
              setEmail(user?.email);
            }}
            className="mt-6 bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700 transition-all"
          >
            Edit Profile
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
          <div className="bg-gray-900 text-white p-6 rounded-lg shadow-2xl w-11/12 max-w-md animate-fade-in-up border border-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Edit Profile</h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-rose-400 text-xl"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4">
              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Username
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm text-gray-300 block mb-1">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="flex justify-end pt-4">
                <button
                  type="button"
                  onClick={() => handleSubmit(user?.userId)}
                  className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700"
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
  );
};

export default MobileProfile;
