import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Hotels({ trip }) {
  const [photos, setPhotos] = useState({});

  useEffect(() => {
    trip?.tripData?.hotels?.forEach((hotel, index) => GetPlacePhoto(hotel, index));
  }, [trip]);

  const GetPlacePhoto = (hotel, index) => {
    if (!hotel?.hotelName) return;

    const data = { textQuery: hotel.hotelName };

    GetPlaceDetails(data).then((resp) => {
      const photoRef = resp?.data?.places?.[0]?.photos?.[0]?.name;
      if (photoRef) {
        setPhotos((prev) => ({
          ...prev,
          [index]: PHOTO_REF_URL.replace("{NAME}", photoRef),
        }));
      }
    });
  };

  return (
    <div>
      <h2 className="font-bold text-xl mt-7 text-left">Hotel Recommendations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mt-4">
        {trip?.tripData?.hotels?.map((item, index) => (
          <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              item.hotelName + "," + item.hotelAddress
            )}`}
            target="_blank"
            key={index}
          >
            <div className="hover:scale-105 transition-all cursor-pointer">
              <img
                src={photos[index] || "/placeholder.jpg"}
                className="rounded-xl w-[250px] h-[220px] object-cover"
                alt={item.hotelName}
              />
              <div className="my-2 flex flex-col gap-2">
                <h2 className="font-medium text-left">{item.hotelName}</h2>
                <h2 className="text-sm text-gray-500 text-left">📍 {item.hotelAddress}</h2>
                <h2 className="text-sm text-left">💰 {item.price}</h2>
                <h2 className="text-sm text-left">⭐ {item.rating} stars</h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
