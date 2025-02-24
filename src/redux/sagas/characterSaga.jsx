import { call, put, takeLatest } from "redux-saga/effects";
import axios from "axios";
import {
  fetchCharactersRequest,
  fetchCharactersSuccess,
  fetchCharactersFailure,
} from "../slices/characterSlice";

const API_URL = "https://thronesapi.com/api/v2/Characters";

// Worker Saga: Fetches characters from API
function* fetchCharactersSaga() {
  try {
    const response = yield call(axios.get, API_URL);
    yield put(fetchCharactersSuccess(response.data));
  } catch (error) {
    yield put(fetchCharactersFailure(error.message));
  }
}

// Watcher Saga: Listens for fetchCharactersRequest action
export function* watchFetchCharacters() {
  yield takeLatest(fetchCharactersRequest.type, fetchCharactersSaga);
}
