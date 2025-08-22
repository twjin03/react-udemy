import { useEffect, useState } from 'react';
import Places from './Places.jsx';


export default function AvailablePlaces({ onSelectPlace }) {
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:3000/places')
      .then((response) => {
        return response.json() // json 형식의 데이터 추출 - 텍스트 기반 데이터 형식임 
      })
      .then((resData) => {
        setAvailablePlaces(resData.places);
      }); // 브라우저가 제공함 
  }, []); // 의존성 바뀌었다는 전제 하에 실행됨 
  // 빈칸이면 딱 한번 실행됨 -> 무한 루프 빠지지 않음 
  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
