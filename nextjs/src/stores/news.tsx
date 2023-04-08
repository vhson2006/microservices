import error from "next/error";
import { all, call, put, takeLatest, cancel, select } from "redux-saga/effects";
import { common } from "../configs/consts";
import { getNewsList } from "../utils/api";

const moduleName = "news";

const GET_NEWS_TRIGGER = `${moduleName}/GET_NEWS_TRIGGER`;
const GET_NEWS_REQUEST = `${moduleName}/GET_NEWS_REQUEST`;
const GET_NEWS_SUCCESS = `${moduleName}/GET_NEWS_SUCCESS`;
const GET_NEWS_FAILURE = `${moduleName}/GET_NEWS_FAILURE`;

export const triggerNews = (queryParams: any) => ({
  type: GET_NEWS_TRIGGER,
  queryParams,
});

const initialState = {
  loading: false,
  error: false,
  data: false,
};

export function news(state = initialState, action: any) {
  const { type, data, error } = action;
  switch (type) {
    case GET_NEWS_REQUEST:
      return { ...state, loading: true, error: false };

    case GET_NEWS_SUCCESS:
      return { ...state, loading: false, data, error: false };

    case GET_NEWS_FAILURE:
      return { ...state, loading: false, error };

    default:
      return state;
  }
}

const getNewsSaga = function* ({ queryParams }: any) {
  yield put({ type: GET_NEWS_REQUEST });

  try {
    const { status, data, message } = yield call(getNewsList, queryParams);
    if (status === common.CORRECT) {
      if (data.status === common.CORRECT) {
        yield put({ type: GET_NEWS_SUCCESS, data: data.data });
      } else {
        yield put({ type: GET_NEWS_FAILURE, error: data.message });
        yield cancel();
      }
    } else {
      yield put({ type: GET_NEWS_FAILURE, error: message });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_NEWS_FAILURE, error });
  }
};

export const newsSagas = function* () {
  yield all([takeLatest(GET_NEWS_TRIGGER, getNewsSaga)]);
};
