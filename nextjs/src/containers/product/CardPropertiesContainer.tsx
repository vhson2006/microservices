import { useSelector } from "react-redux";
import { CardProperties } from "../../components/product/CardProperties";

export const CardPropertiesContainer = (props: any) => {
  const { data, error } = useSelector(({ product }: any) => product);

  return <CardProperties data={data} />;
};
