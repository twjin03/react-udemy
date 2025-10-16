import { useEffect, useState } from 'react';
import Places from './Places.jsx';
import Error from './Error.jsx';
import { sortPlacesByDistance } from '../loc.js';
import { fetchAvailablePlaces } from '../http.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    async function fetchPlaces() {
      setIsFetching(true);
      try {
        const places = await fetchAvailablePlaces(); // 여기서는 아직 await상태 (fetchAvailablePlaces가 프로미스를 반환하기 때문)

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(
            places, position.coords.latitude, position.coords.longitude,);
          setAvailablePlaces(sortedPlaces); // 여기서 데이터 저장
          setIsFetching(false); // 콜백 함수 안으로 넣어주기 
        }); // 콜백 패턴 사용 
      } catch (error) {
        setError({
          message:
            error.message || 'Could not fetch places, please try again later.'
        },
        ); // 에러 저장
        setIsFetching(false);
      }

    }

    fetchPlaces();
  }, []);


  if (error) {
    return <Error title="An error occurred!" message={error.message} />
  }
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
