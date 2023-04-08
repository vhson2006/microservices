import { all, call, put, takeLatest, cancel } from "redux-saga/effects";
import { common } from "../configs/consts";
import { getPackage } from "../utils/api";

const moduleName = "detailPackage";

const GET_DETAIL_PACKAGE_TRIGGER = `${moduleName}/GET_DETAIL_PACKAGE_TRIGGER`;
const GET_DETAIL_PACKAGE_REQUEST = `${moduleName}/GET_DETAIL_PACKAGE_REQUEST`;
const GET_DETAIL_PACKAGE_SUCCESS = `${moduleName}/GET_DETAIL_PACKAGE_SUCCESS`;
const GET_DETAIL_PACKAGE_FAILURE = `${moduleName}/GET_DETAIL_PACKAGE_FAILURE`;

export const triggerDetailPackage = (id: any) => ({
  type: GET_DETAIL_PACKAGE_TRIGGER,
  id: id,
});

const initialState = {
  loading: false,
  error: false,
  data: false,
};

export function detailPackage(state = initialState, action: any) {
  const { type, data, error } = action;
  switch (type) {
    case GET_DETAIL_PACKAGE_TRIGGER:
      return { ...state, loading: true, error: false };

    case GET_DETAIL_PACKAGE_SUCCESS:
      return { ...state, loading: false, data, error: false };

    case GET_DETAIL_PACKAGE_FAILURE:
      return { ...state, loading: false, error };

    default:
      return state;
  }
}

const getDetailPackageSaga = function* (params: any): any {
  const { id } = params;
  yield put({ type: GET_DETAIL_PACKAGE_REQUEST });

  try {
    const { status, data, message } = yield call(getPackage, id);
    if (status === common.CORRECT) {
      if (data.status === common.CORRECT) {
        yield put({ type: GET_DETAIL_PACKAGE_SUCCESS, data: data.data });
      } else {
        yield put({ type: GET_DETAIL_PACKAGE_FAILURE, error: data.message });
        yield cancel();
      }
    } else {
      yield put({ type: GET_DETAIL_PACKAGE_FAILURE, error: message });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_DETAIL_PACKAGE_FAILURE, error });
  }
};

export const detailPackageSagas = function* () {
  yield all([takeLatest(GET_DETAIL_PACKAGE_TRIGGER, getDetailPackageSaga)]);
};
