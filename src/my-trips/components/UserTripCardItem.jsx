import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState("/placeholder.jpg");

  useEffect(() => {
    if (trip) GetPlacePhoto();
  }, [trip]);

  const GetPlacePhoto = async () => {
    if (!trip?.userSelection?.location?.label) return;

    try {
      const data = { textQuery: trip.userSelection.location.label };
      const resp = await GetPlaceDetails(data);

      const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoRef) {
        setPhotoUrl(PHOTO_REF_URL.replace("{NAME}", photoRef));
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setPhotoUrl("/placeholder.jpg");
    }
  };

  return (
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all cursor-pointer">
        <img
          src={photoUrl}
          className="object-cover rounded-xl w-[300px] h-[220px]"
          alt="Trip"
          onError={() => setPhotoUrl("/placeholder.jpg")}
        />
        <div>
          <h2 className="font-bold text-lg">{trip?.userSelection?.location?.label}</h2>
          <h2 className="text-sm text-gray-500">
            {trip?.userSelection?.noOfdays} Days trip with {trip?.userSelection?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCardItem;
