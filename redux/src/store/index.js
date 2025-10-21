import { createStore } from 'redux';

export const INCREMENT = 'increment';

const initialState = { counter: 0, showCounter: true }

const counterReducer = (state = initialState, action) => {
  // state 업데이트 할 때는 항상 다른 state도 모두 설정해야 함
  // 기존의 state는 절대 변경해서는 안되며, 항상 state를 덮어쓰는 방식으로 state를 업데이트해야 함
  if (action.type === 'increment') {
    return {
      counter: state.counter + 1,
      showCounter: state.showCounter
    };
  }
  if (action.type === 'increase') {
    return {
      counter: state.counter + action.amount,
      showCounter: state.showCounter,
    };
  }
  if (action.type === 'decrement') {
    return {
      counter: state.counter - 1,
      showCounter: state.showCounter
    };
  }

  if (action.type === 'toggle') {
    return {
      showCounter: !state.showCounter,
      counter: state.counter,
    }
  }
  return state;
};

const store = createStore(counterReducer);

export default store;