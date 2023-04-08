import { all, call, put, takeLatest, cancel } from "redux-saga/effects";
import { common } from "../configs/consts";
import { getProductList } from "../utils/api";
const moduleName = "products";
const GET_PRODUCT_LIST_TRIGGER = `${moduleName}/GET_PRODUCT_LIST_TRIGGER`;
const GET_PRODUCT_LIST_REQUEST = `${moduleName}/GET_PRODUCT_LIST_REQUEST`;
const GET_PRODUCT_LIST_SUCCESS = `${moduleName}/GET_PRODUCT_LIST_SUCCESS`;
const GET_PRODUCT_LIST_FAILURE = `${moduleName}/GET_PRODUCT_LIST_FAILURE`;

export const triggerProductList = (queryParams: any) => ({
  type: GET_PRODUCT_LIST_TRIGGER,
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

export function products(state = initialState, action: any) {
  const { type, data, error, totalPage, page, search } = action;
  switch (type) {
    case GET_PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, error: false };

    case GET_PRODUCT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        data,
        totalPage,
        page,
        search,
        error: false,
      };

    case GET_PRODUCT_LIST_FAILURE:
      return { ...state, loading: false, error };

    default:
      return state;
  }
}

const getProductListSaga = function* ({ queryParams }: any) {
  yield put({ type: GET_PRODUCT_LIST_REQUEST });

  try {
    const { page, search } = queryParams;
    const { status, data, message } = yield call(getProductList, queryParams);
    if (status === common.CORRECT) {
      if (data.status === common.CORRECT) {
        yield put({
          type: GET_PRODUCT_LIST_SUCCESS,
          data: data.data,
          totalPage: data.totalPage,
          page: page,
          search: search,
        });
      } else {
        yield put({ type: GET_PRODUCT_LIST_FAILURE, error: data.message });
        yield cancel();
      }
    } else {
      yield put({ type: GET_PRODUCT_LIST_FAILURE, error: message });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_PRODUCT_LIST_FAILURE, error });
  }
};

export const productSagas = function* () {
  yield all([takeLatest(GET_PRODUCT_LIST_TRIGGER, getProductListSaga)]);
};
