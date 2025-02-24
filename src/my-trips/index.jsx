import { db } from "@/service/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "./components/UserTripCardItem";

function MyTrips() {
  const navigate = useNavigate();
  const [userTrips, setUserTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user.email)
    );
    const querySnapshot = await getDocs(q);

    const trips = querySnapshot.docs.map((doc) => doc.data());
    setUserTrips(trips);
    setLoading(false);
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-10 text-left">
      <h2 className="font-bold text-3xl">My Trips</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-10">
        {loading
          ? Array(6)
              .fill(null)
              .map((_, index) => (
                <div
                  key={index}
                  className="h-[220px] w-[300px] bg-gray-300 animate-pulse rounded-xl"
                ></div>
              ))
          : userTrips.map((trip, index) => (
              <UserTripCardItem trip={trip} key={index} />
            ))}
      </div>
    </div>
  );
}

export default MyTrips;
