import { combineReducers } from "redux";
import { products } from "../stores/products";
import { user } from "../stores/user";
import { cart } from "../stores/cart";
import { packages } from "../stores/packages";
import { news } from "../stores/news";
import { HYDRATE } from "next-redux-wrapper";
import { ownProducts } from "../stores/own-products";
import { ReduxAction } from "../typescripts/common";
import { detailPackage } from "../stores/detail-package";
import { product } from "../stores/product";

export const SET_IS_SERVER = "SET_IS_SERVER";

// this is to set a flag for initial server renders
function serverCheck(state = { isServer: false }, action: ReduxAction) {
  const { type } = action;
  switch (type) {
    case SET_IS_SERVER: {
      return { ...state, isServer: true };
    }
    default:
      return state;
  }
}

//We hydrate only if this is the initial server render
function hydrate(state = {}, action: ReduxAction) {
  const { type } = action;
  switch (type) {
    case HYDRATE: {
      if (action.payload.serverCheck.isServer) {
        return { ...state, ...action.payload };
      }
      return state;
    }
    default:
      return state;
  }
}

const combinedReducer = combineReducers({
  serverCheck,
  products,
  user,
  cart,
  packages,
  news,
  ownProducts,
  detailPackage,
  product,
});

function rootReducer(state: any, action: ReduxAction) {
  const intermediateState = combinedReducer(state, action);
  return hydrate(intermediateState, action);
}
export default rootReducer;
