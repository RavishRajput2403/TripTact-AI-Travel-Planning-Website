import { Button } from "@/components/ui/button";
import { GetPlaceDetails } from "@/service/GlobalApi";
import React, { useEffect, useState } from "react";
import { IoIosSend } from "react-icons/io";

const PHOTO_REF_URL='https://places.googleapis.com/v1/{NAME}/media?maxHeightPx=1000&maxWidthPx=1000&key=' + import.meta.env.VITE_GOOGLE_PLACE_API_KEY

function InfoSection({ trip }) {

  const [photoUrl, setPhotoUrl] = useState();

  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto=async()=>{
    const data={
      textQuery:trip?.userSelection?.location.label
    }
    const result = await GetPlaceDetails(data).then(resp=>{

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}',resp.data.places[0].photos[1].name);

      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <div className="relative">

      <div className="relative h-[350px]">
        <img
          src={photoUrl?photoUrl:"/placeholder.jpg"}
          className="h-full w-full object-cover rounded-xl"
          alt="Trip Destination"
        />

        <div className="absolute bottom-5 left-5 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg shadow-lg">
          <h2 className="text-lg font-semibold">
            📍 {trip?.userSelection?.location.label}
          </h2>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3 items-center">
        <h2 className="px-4 py-2 bg-gray-200 rounded-full text-gray-600 shadow">
          📅 {trip?.userSelection?.noOfdays} Days
        </h2>

        <h2 className="px-4 py-2 bg-gray-200 rounded-full text-gray-600 shadow">
          💰 {trip?.userSelection?.budget} Budget
        </h2>

        <h2 className="px-4 py-2 bg-gray-200 rounded-full text-gray-600 shadow">
          👥 Travelers : {trip?.userSelection?.traveler} People
        </h2>

        <Button className="ml-auto flex items-center gap-2">
          <IoIosSend className="h-5 w-5" />
          Share
        </Button>
      </div>
    </div>
  );
}

export default InfoSection;