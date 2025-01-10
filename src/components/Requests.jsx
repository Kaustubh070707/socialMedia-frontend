import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();
  const fetchRequest = async () => {
    try {
      const req = await axios.get(BASE_URL + "/users/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(req?.data));
    } catch (error) {
      console.log(error);
    }
  };
  console.log(requests);
  const reviewRequest = async (status, _id) => {
    console.log(_id);
    try {
      const req = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);
  if (!requests) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-xl font-semibold">Loading...</p>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold">No Requests Found</h1>
      </div>
    );
  }
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-8">Your Requests</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((c, index) => (
          <div key={index} className="card bg-base-100 w-96 shadow-xl">
            <figure>
              <img
                src={c.fromUserId.photoUrl || "https://via.placeholder.com/150"}
                alt={`${c.firstName}'s profile`}
                className="w-full h-48 object-cover rounded-box"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">
                {c.fromUserId.firstName + " " + c.fromUserId.lastName}
              </h2>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("accepted", c.fromUserId._id)}
                >
                  Accept
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", c.fromUserId._id)}
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
