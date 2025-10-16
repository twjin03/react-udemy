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