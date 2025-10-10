import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

import Header from '../Header.jsx';
import { useMutation, useQuery } from '@tanstack/react-query';
import { deleteEvent, fetchEvent, queryClient } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';
import { useState } from 'react';
import Modal from '../UI/Modal.jsx';

export default function EventDetails() {
  const [isDeleting, setIsDeleting] = useState();
  const params = useParams();
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const {
    mutate,
    isPending: isPendingDeletion,
    isError: isErrorDeleting,
    error: deleteError
  } = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['events'],
        refetchType: 'none'
      });
      navigate('/events');
    }
  });

  function handleStartDelete() {
    setIsDeleting(true);
  }
  function handleStopDelete() {
    setIsDeleting(false);
  }

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
            <button onClick={handleStartDelete}>Delete</button>
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
      {isDeleting && <Modal onClose={handleStopDelete}>
        <h2>정말 삭제하시겠습니까?</h2>
        <p>이벤트를 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.</p>
        <div className='form-actions'>
          {isPendingDeletion && <p>삭제 중... 잠시만 기다려주세요.</p>}
          {!isPendingDeletion &&
            <>
              <button onClick={handleStopDelete} className='button-text'>취소</button>
              <button onClick={handleDelete} className='button'>삭제</button>
            </>
          }
        </div>
        {isErrorDeleting && <ErrorBlock title="이벤트 삭제 실패" message={deleteError.info?.message || '삭제에 실패했습니다. 나중에 다시 시도해주세요.'} />}
      </Modal>}
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
