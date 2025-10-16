import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

export default function EventsPage() {
  const data = useLoaderData();
  const events = data.events;

  return (
    <>
      {<EventsList events={events} />}
    </>
  );
}


export async function loader() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // ...
  } else {
    return response;
    // react router가 자동으로 데이터를 추출하기 때문에 따로 추가 작업할 필요 없이 바로 반환하는 게 가능함
  }

}