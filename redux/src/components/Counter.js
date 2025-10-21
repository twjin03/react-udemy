import classes from './Counter.module.css';
import { useSelector } from 'react-redux';

const Counter = () => {
  const counter = useSelector(state => state.counter); // 이때 자동으로 이 컴포넌트는 저장소를 구독
  // 컴포넌트 제거하면 자동으로 구독 삭제

  const toggleCounterHandler = () => { };

  return (
    <main className={classes.counter}>
      <h1>Redux Counter</h1>
      <div className={classes.value}>{counter}</div>
      <button onClick={toggleCounterHandler}>Toggle Counter</button>
    </main>
  );
};

export default Counter;
