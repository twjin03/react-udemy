import { useEffect, useState } from 'react';
import Places from './Places.jsx';


export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false); 

  useEffect(() => {
    setIsFetching(true);
    async function fetchPlaces() {
      const response = await fetch('http://localhost:3000/places'); 
      const resData = await response.json(); 
      setAvailablePlaces(resData.places);
      setIsFetching(false);
    }
    fetchPlaces(); 
  }, []); // 의존성 바뀌었다는 전제 하에 실행됨 
  // 빈칸이면 딱 한번 실행됨 -> 무한 루프 빠지지 않음 
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Fetching place data..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
