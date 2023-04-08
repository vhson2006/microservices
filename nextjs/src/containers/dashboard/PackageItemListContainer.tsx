import { Stack } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { PackageItem } from "../../components/dashboard/PackageItem";

export const PackageItemListContainer = (props: any) => {
  const { data, error } = useSelector(
    ({ detailPackage }: any) => detailPackage
  );
  return (
    <Stack spacing="8">
      {data.data?.map((item: any) => (
        <PackageItem key={item.userProductId} {...item} />
      ))}
    </Stack>
  );
};
