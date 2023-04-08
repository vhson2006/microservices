import { Flex, useToast } from "@chakra-ui/react";
import Router from "next/router";
import { useSelector } from "react-redux";
import { common } from "../../configs/consts";
import { donePackage, removePackage } from "../../utils/api";
import { PackageSummary } from "./PackageSummary";

export const PackageSummaryContainer = (props: any) => {
  const toast = useToast();
  const { data, error } = useSelector(
    ({ detailPackage }: any) => detailPackage
  );

  const completePackage = async () => {
    const response = await donePackage(data.packageId);
    if (response.status === common.INCORRECT) {
      toast({
        title: "Hoàn Thành Đặt Hàng",
        description: "Cập Nhật Thất Bại",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Hoàn Thành Đặt Hàng",
        description: "Cập Nhật Thành Công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Router.push("/dashboard");
    }
  };

  const deletePackage = async () => {
    const response = await removePackage(data.packageId);
    if (response.status === common.INCORRECT) {
      toast({
        title: "Xóa Đặt Hàng",
        description: "Thất Bại",
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Xóa Đặt Hàng",
        description: "Thành Công",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      Router.push("/dashboard");
    }
  };

  return (
    <Flex width="full" flexDirection="row" justifyContent="flex-end">
      <PackageSummary
        address={data.address}
        phone={data.phone}
        total={data.total}
        name={data.name}
        deletePackage={deletePackage}
        completePackage={completePackage}
      />
    </Flex>
  );
};
