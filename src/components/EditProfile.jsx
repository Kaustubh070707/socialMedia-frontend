import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [age, setAge] = useState(34);
  const [gender, setGender] = useState("Male");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const saveProfile = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
        },
        { withCredentials: true }
      );
      console.log(res);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
      setError(err.response?.data?.message || "An unexpected error occurred.");
    }
  };

  return (
    user && (
      <div>
        <div className="flex items-start justify-center min-h-screen bg-gray-900 space-x-10 p-6">
          <div className="w-full max-w-sm p-12 space-y-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center text-white">
              Edit Profile
            </h2>
            <form className="space-y-6">
              <div>
                <label className="block text-sm text-white">First Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-white">Last Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-white">Photo</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={photoUrl}
                  onChange={(e) => setPhotoUrl(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-white">Age</label>
                <input
                  type="number"
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm text-white">Gender</label>
                <select
                  className="w-full px-4 py-2 mt-2 bg-gray-700 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>{error}</div>
              <button
                onClick={saveProfile}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Update Profile
              </button>
            </form>
          </div>
          <UserCard user={{ firstName, lastName, photoUrl }} />
        </div>
        {showToast && (
          <div className="toast toast-top toast-center">
            <div className="alert alert-success">
              <span>Profile Updated successfully.</span>
            </div>
          </div>
        )}
      </div>
    )
  );
};

export default EditProfile;
