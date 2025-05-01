import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './sagas';
import  authReducer from "../redux/slices/authSlice";


const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware), // Adding sagaMiddleware to the default middleware
});

sagaMiddleware.run(rootSaga); // Run the root saga (this is where you define your side effects)

export default store;