import { all } from "redux-saga/effects";
import { watchFetchCharacters } from "./sagas/characterSaga";


// Root Saga: Combines all watcher sagas
export default function* rootSaga() {
  yield all([
    watchFetchCharacters(), // Character API saga
  ]);
}
