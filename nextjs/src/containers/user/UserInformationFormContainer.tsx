import { useToast } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { UserInformationForm } from "../../components/user/UserInformation";
import { common } from "../../configs/consts";
import { updateUserInfo } from "../../utils/api";
import useTranslation from "next-translate/useTranslation";

export const UserInformationFormContainer = (props: any) => {
  const toast = useToast();
  const { t } = useTranslation("common");
  const { data, error } = useSelector(({ user }: any) => user);

  const updateProfile = async (data: any) => {
    const { email, ...rest } = data;
    const response = await updateUserInfo(rest);
    if (response.status === common.INCORRECT) {
      toast({
        title: t("user#update#message#title"),
        description: t("user#update#message#fail"),
        status: "error",
        duration: 9000,
        isClosable: true,
      });
    } else {
      toast({
        title: t("user#update#message#title"),
        description: t("user#update#message#success"),
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  };
  return <UserInformationForm data={data} updateProfile={updateProfile} />;
};
