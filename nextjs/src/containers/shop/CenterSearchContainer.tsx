import useTranslation from "next-translate/useTranslation";
import { useDispatch } from "react-redux";
import { triggerProductList } from "../../stores/products";
import { CenterSearchForm } from "../../components/shop/CenterSearchForm";

export const CenterSearchContainer = (props: any) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("common");

  const searchHandler = async (data: any) => {
    const { search } = data;
    const param = {
      search: search,
      page: 1,
      size: 20,
    };
    dispatch(triggerProductList(param));
  };

  return <CenterSearchForm searchHandler={searchHandler} />;
};
