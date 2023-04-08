import { useDispatch, useSelector } from "react-redux";
import { PaginationButton } from "../../commons/paginations/PaginationButton";
import { triggerProductList } from "../../stores/products";
import useTranslation from "next-translate/useTranslation";

export const ShopPaginationContainer = (props: any) => {
  const { data, error, loading, search, page, totalPage } = useSelector(
    ({ products }: any) => products
  );

  const dispatch = useDispatch();
  const { t } = useTranslation("common");
  const gotoPage = (page: number) => {
    dispatch(
      triggerProductList({
        search: search,
        page: page,
        size: 20,
      })
    );
  };

  return (
    <PaginationButton page={page} totalPage={totalPage} gotoPage={gotoPage} />
  );
};
