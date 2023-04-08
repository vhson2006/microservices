import { all, call, put, takeLatest, cancel } from "redux-saga/effects";
import { common } from "../configs/consts";
import { getOwnProductList } from "../utils/api";

const moduleName = "ownProducts";
const GET_OWN_PRODUCT_LIST_TRIGGER = `${moduleName}/GET_OWN_PRODUCT_LIST_TRIGGER`;
const GET_OWN_PRODUCT_LIST_REQUEST = `${moduleName}/GET_OWN_PRODUCT_LIST_REQUEST`;
const GET_OWN_PRODUCT_LIST_SUCCESS = `${moduleName}/GET_OWN_PRODUCT_LIST_SUCCESS`;
const GET_OWN_PRODUCT_LIST_FAILURE = `${moduleName}/GET_OWN_PRODUCT_LIST_FAILURE`;

export const triggerOwnProductList = (queryParams: any) => ({
  type: GET_OWN_PRODUCT_LIST_TRIGGER,
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

export function ownProducts(state = initialState, action: any) {
  const { type, data, error, totalPage, page, search } = action;
  switch (type) {
    case GET_OWN_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: false };

    case GET_OWN_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data,
        totalPage,
        page,
        search,
      };

    case GET_OWN_PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error };

    default:
      return state;
  }
}

const getOwnProductListSaga = function* ({ queryParams }: any) {
  yield put({ type: GET_OWN_PRODUCT_LIST_REQUEST });
  try {
    const { page, search } = queryParams;
    const { status, data, message } = yield call(
      getOwnProductList,
      queryParams
    );
    if (status === common.CORRECT) {
      if (data.status === common.CORRECT) {
        yield put({
          type: GET_OWN_PRODUCT_LIST_SUCCESS,
          data: data.data,
          totalPage: data.totalPage,
          page: page,
          search: search,
        });
      } else {
        yield put({ type: GET_OWN_PRODUCT_LIST_FAILURE, error: data.message });
        yield cancel();
      }
    } else {
      yield put({ type: GET_OWN_PRODUCT_LIST_FAILURE, error: message });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_OWN_PRODUCT_LIST_FAILURE, error });
  }
};

export const ownProductSagas = function* () {
  yield all([takeLatest(GET_OWN_PRODUCT_LIST_TRIGGER, getOwnProductListSaga)]);
};
