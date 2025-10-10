import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events']
      });
      navigate('/events');
    }
  });

  function handleDelete() {
    mutate({ id: params.id });
  }

  let content;

  if (isPending) {
    content = <div id="event-details-conntent" className='center'>
      <p>데이터를 불러오는 중...</p>
    </div>
  }

  if (isError) {
    content = <div id="event-details-conntent" className='center'>
      <ErrorBlock title="이벤트를 가져오는 데 실패함." message={error.info?.message || '이벤트 데이터를 가져오는 데 실패했습니다. 나중에 다시 시도해주세요.'} />
    </div>
  }

  if (data) {
    const formattedDate = new Date(data.date).toLocaleDateString('ko-KR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });

    content = (
      <>
        <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={handleDelete}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
        <div id="event-details-content">
          <img src={`http://localhost:3333/${data.image}`} alt={data.title} />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{formattedDate} @ {data.time}</time>
            </div>
            <p id="event-details-description">{data.discription}</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
        {content}
      </article>
    </>
  );
}
