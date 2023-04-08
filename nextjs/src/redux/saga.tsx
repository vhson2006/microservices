import { all } from "redux-saga/effects";
import { productSagas } from "../stores/products";
import { userSagas } from "../stores/user";
import { packageSagas } from "../stores/packages";
import { newsSagas } from "../stores/news";
import { detailPackageSagas } from "../stores/detail-package";
import { ownProductSagas } from "../stores/own-products";
import { detailProductSagas } from "../stores/product";
import { cartSagas } from "../stores/cart";

const rootSaga = function* () {
  yield all([
    productSagas(),
    userSagas(),
    packageSagas(),
    newsSagas(),
    cartSagas(),
    ownProductSagas(),
    detailPackageSagas(),
    detailProductSagas(),
  ]);
};

export default rootSaga;
