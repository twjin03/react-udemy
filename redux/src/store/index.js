import { configureStore } from '@reduxjs/toolkit';

import counterReducer from './counter';
import authReducer from './auth';

// 하나의 저장소, 여러 개의 슬라이스
const store = configureStore({
  reducer: { counter: counterReducer, auth: authReducer },
});

export default store;