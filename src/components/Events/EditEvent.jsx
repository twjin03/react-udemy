import { Link, useNavigate, useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@tanstack/react-query';

import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { fetchEvent, updateEvent } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EditEvent() {
  const navigate = useNavigate();
  const params = useParams();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['events', params.id],
    queryFn: ({ signal }) => fetchEvent({ signal, id: params.id }),
  });

  const { mutate } = useMutation({
    mutationFn: updateEvent,
  });

  function handleSubmit(formData) {
    mutate({ id: params.id, event: formData });
    navigate('../');
  }

  function handleClose() {
    navigate('../');
  }

  let content;

  if (isPending) {
    content = (<div className='center'><LoadingIndicator /></div>);
  }

  if (isError) {
    content = (<>
      <ErrorBlock
        title="이벤트 불러오기 실패"
        message={error.info?.message || "이벤트를 가져오는 데 실패했습니다. 입력한 값을 확인하거나 나중에 다시 시도해주세요."}
      />
      <div className='form-actions'>
        <Link to="../" className='button'>
          확인
        </Link>
      </div>
    </>);
  }

  if (data) {
    content = (<EventForm inputData={data} onSubmit={handleSubmit}>
      <Link to="../" className="button-text">
        Cancel
      </Link>
      <button type="submit" className="button">
        Update
      </button>
    </EventForm>);
  }

  return (
    <Modal onClose={handleClose}>
      {content}
    </Modal>
  );
}
