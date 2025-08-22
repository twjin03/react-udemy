
export async function fetchAvailablePlaces(params) {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failed to fetch places');
  }
  return resData.places;
}

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/user-places', {
    method: 'PUT',
    body: JSON.stringify({places: places}),// jsvascript 배열은 첨부할 수 있는 형식이 아님 -> json으로 변환해야 함
    headers: { // extra metadata
      'Content-Type': 'application/json' // 이렇게 알려줘야 데이터가 성공적으로 백엔드에 추출됨 
    }
  }); // default는 get 

  const resData = await response.json(); 
  if (!response.ok){
    throw new Error('Failed to update user data.');
  }
  return resData.message;

}