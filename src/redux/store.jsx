import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import characterReducer from "./slices/characterSlice";
import filterReducer from "./slices/filterSlice";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    characters: characterReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;
