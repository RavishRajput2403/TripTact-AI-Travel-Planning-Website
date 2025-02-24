import { Button } from "@/components/ui/button";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    place&&GetPlacePhoto();
  }, [place]);

  const GetPlacePhoto = async () => {
    const data = {
      textQuery: place.placeName,
    };
    const result = await GetPlaceDetails(data).then((resp) => {

      const PhotoUrl = PHOTO_REF_URL.replace(
        "{NAME}",
        resp.data.places[0].photos[5].name
      );

      setPhotoUrl(PhotoUrl);
    });
  };

  return (
    <Link
      to={"https://www.google.com/maps/search/?api=1&query=" + place.placeName}
      target="_blank"
    >
      <div className="border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 transition-all relative hover:shadow-md cursor-pointer">
        <img
          src={photoUrl?photoUrl:"/placeholder.jpg"}
          className="w-[130px] h-[130px] rounded-xl object-cover"
        />
        <div className="flex flex-col justify-between flex-grow">
          <div>
            <h2 className="font-bold text-lg text-left">{place.placeName}</h2>
            <p className="text-left text-sm text-gray-600">
              {place.placeDetails}
            </p>
            <h2 className="text-left mt-2">🕙 {place.travelTime}</h2>
            <h2 className="text-left font-bold mt-1">⭐ {place.rating}/5</h2>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PlaceCardItem;
