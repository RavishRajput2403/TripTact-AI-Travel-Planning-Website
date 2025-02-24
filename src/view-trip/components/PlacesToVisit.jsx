import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-lg text-left">Places to Visit</h2>

      <div>
        {Object.entries(trip?.tripData?.itinerary || {})
          .sort(([dayA], [dayB]) => parseInt(dayA.replace(/\D/g, '')) - parseInt(dayB.replace(/\D/g, '')))
          .map(([day, details], index) => (
            <div className='mt-5' key={index}>
              <h2 className="font-medium text-lg text-left">{day.replace(/day/i, 'Day')}</h2>

              <div >
              {details?.places?.map((place, idx) => (
                <div key={idx}>
                <PlaceCardItem place={place}/>
                </div>
              ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
