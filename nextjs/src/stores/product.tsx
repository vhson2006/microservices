import { all, call, put, takeLatest, cancel } from "redux-saga/effects";
import { common } from "../configs/consts";
import { getProduct } from "../utils/api";

const moduleName = "product";

const GET_PRODUCT_TRIGGER = `${moduleName}/GET_PRODUCT_TRIGGER`;
const GET_PRODUCT_REQUEST = `${moduleName}/GET_PRODUCT_REQUEST`;
const GET_PRODUCT_SUCCESS = `${moduleName}/GET_PRODUCT_SUCCESS`;
const GET_PRODUCT_FAILURE = `${moduleName}/GET_PRODUCT_FAILURE`;

export const triggerProduct = (id: any) => ({
  type: GET_PRODUCT_TRIGGER,
  id: id,
});

const initialState = {
  loading: false,
  error: false,
  data: false,
};

export function product(state = initialState, action: any) {
  const { type, data, error } = action;
  switch (type) {
    case GET_PRODUCT_TRIGGER:
      return { ...state, loading: true, error: false };

    case GET_PRODUCT_SUCCESS:
      return { ...state, loading: false, data, error: false };

    case GET_PRODUCT_FAILURE:
      return { ...state, loading: false, error };

    default:
      return state;
  }
}

const getProductSaga = function* (params: any): any {
  const { id } = params;
  yield put({ type: GET_PRODUCT_REQUEST });

  try {
    const { status, data, message } = yield call(getProduct, id);
    if (status === common.CORRECT) {
      if (data.status === common.CORRECT) {
        yield put({ type: GET_PRODUCT_SUCCESS, data: data.data });
      } else {
        yield put({ type: GET_PRODUCT_FAILURE, error: data.message });
        yield cancel();
      }
    } else {
      yield put({ type: GET_PRODUCT_FAILURE, error: message });
      yield cancel();
    }
  } catch (error) {
    yield put({ type: GET_PRODUCT_FAILURE, error });
  }
};

export const detailProductSagas = function* () {
  yield all([takeLatest(GET_PRODUCT_TRIGGER, getProductSaga)]);
};
