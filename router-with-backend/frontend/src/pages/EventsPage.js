import EventsList from '../components/EventsList';
import { useLoaderData } from 'react-router-dom';

export default function EventsPage() {
  const events = useLoaderData();

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
    const resData = await response.json();
    return resData.events;
  }

}