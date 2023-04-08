import { all, call, put, takeLatest, cancel } from "redux-saga/effects";
import { common } from "../configs/consts";
import { getPackageList } from "../utils/api";

const moduleName = "packages";

const GET_PACKAGE_LIST_TRIGGER = `${moduleName}/GET_PACKAGE_LIST_TRIGGER`;
const GET_PACKAGE_LIST_REQUEST = `${moduleName}/GET_PACKAGE_LIST_REQUEST`;
const GET_PACKAGE_LIST_SUCCESS = `${moduleName}/GET_PACKAGE_LIST_SUCCESS`;
const GET_PACKAGE_LIST_FAILURE = `${moduleName}/GET_PACKAGE_LIST_FAILURE`;

export const triggerPackages = (queryParams: any) => ({
  type: GET_PACKAGE_LIST_TRIGGER,
  queryParams,
});

const initialState = {
  loading: false,
  search: "",
  page: 0,
  totalPage: 0,
  error: false,
  data: [],
};
export function packages(state = initialState, action: any) {
  const { type, data, error, totalPage, page, search } = action;
  switch (type) {
    case GET_PACKAGE_LIST_REQUEST:
      return { ...state, loading: true, error: false };

    case GET_PACKAGE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
        totalPage,
        page,
        search,
        error: false,
      };

    case GET_PACKAGE_LIST_FAILURE:
      return { ...state, loading: false, error };

    default:
      return state;
  }
}

const getPackageSaga = function* ({ queryParams }: any): any {
  const { page, search } = queryParams;

  yield put({ type: GET_PACKAGE_LIST_REQUEST });
  const { status, data, message } = yield call(getPackageList, queryParams);

  if (status === common.CORRECT) {
    if (data.status === common.CORRECT) {
      yield put({
        type: GET_PACKAGE_LIST_SUCCESS,
        data: data.data,
        totalPage: data.totalPage,
        page: page,
        search: search,
      });
    } else {
      yield put({ type: GET_PACKAGE_LIST_FAILURE, error: data.message });
      yield cancel();
    }
  } else {
    yield put({ type: GET_PACKAGE_LIST_FAILURE, error: message });
    yield cancel();
  }
};

export const packageSagas = function* () {
  yield all([takeLatest(GET_PACKAGE_LIST_TRIGGER, getPackageSaga)]);
};
