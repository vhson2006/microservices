import { put, all, call, cancel, takeLatest } from "redux-saga/effects";
import { common } from "../configs/consts";
import { geCartInfo } from "../utils/api";

const moduleName = "cart";
const TRIGGER_USER_CART_REQUEST = `${moduleName}/TRIGGER_USER_CART_REQUEST`;
const GET_USER_CART_REQUEST = `${moduleName}/GET_USER_CART_REQUEST`;
const GET_USER_CART_SUCCESS = `${moduleName}/GET_USER_CART_SUCCESS`;
const GET_USER_CART_FAILURE = `${moduleName}/GET_USER_CART_FAILURE`;
const UPDATE_CARD_QUANTITY = `${moduleName}/UPDATE_CARD_QUANTITY`;

export const getUserCart = (params: any) => ({
  type: TRIGGER_USER_CART_REQUEST,
  params,
});

export const updateCardQuantity = (params: any) => ({
  type: UPDATE_CARD_QUANTITY,
  params,
});

const initialState = {
  loading: false,
  error: false,
  data: [],
};

export function cart(state = initialState, action: any) {
  const { type, params, error } = action;
  switch (type) {
    case GET_USER_CART_REQUEST:
      return { ...state, loading: true, error: false };
    case GET_USER_CART_SUCCESS:
      return { ...state, loading: false, data: params, error: false };

    case GET_USER_CART_FAILURE:
      return { ...state, loading: false, error };
    case UPDATE_CARD_QUANTITY:
      state.data.map((e: any) => {
        if (e.id === params.id) {
          e.currentQuantity = params.quantity;
        }
        return e;
      });

      return { ...state };
    default:
      return state;
  }
}

const getCartSaga = function* ({ params }: any): any {
  yield put({ type: GET_USER_CART_REQUEST });
  const { status, data, message } = yield call(geCartInfo, params);
  if (status === common.CORRECT) {
    if (data.status === common.CORRECT) {
      yield put({
        type: GET_USER_CART_SUCCESS,
        params: data.data.map((e: any) => ({
          ...e,
          currentQuantity: Math.min(1, e.quantity),
        })),
      });
    } else {
      yield put({ type: GET_USER_CART_FAILURE, error: data.message });
      yield cancel();
    }
  } else {
    yield put({ type: GET_USER_CART_FAILURE, error: message });
    yield cancel();
  }
};

export const cartSagas = function* () {
  yield all([takeLatest(TRIGGER_USER_CART_REQUEST, getCartSaga)]);
};
