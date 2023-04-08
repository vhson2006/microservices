import { useToast, Stack } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { triggerPackages } from "../../stores/packages";
import { PackagesGrid } from "../../components/dashboard/PackagesGrid";

export const PackagesGridContainer = (prosp: any) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const {
    data: packageList,
    error: packageError,
    search: packageSearch,
    page: packagePage,
    totalPage: packageTotalPage,
  } = useSelector(({ packages }: any) => packages);

  const gotoOrderPage = (page: number) => {
    dispatch(triggerPackages({ search: packageSearch, page: page }));
  };

  return (
    <Stack spacing={{ base: "5", lg: "6" }}>
      <PackagesGrid
        packageList={packageList}
        page={packagePage}
        totalPage={packageTotalPage}
        gotoPage={gotoOrderPage}
      />
    </Stack>
  );
};
