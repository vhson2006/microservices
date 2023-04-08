import { AccentMenuComponent } from "../../commons/menus/accent/AccentMenuComponent";
import { common } from "../../configs/consts";
import { logout } from "../../utils/api";

export const AccentMenuContainer = (props: any) => {
  const logoutHandler = async () => {
    const response = await logout();
    if (response.status === common.INCORRECT) {
      console.log(response.message);
    }
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  return <AccentMenuComponent logout={logoutHandler} />;
};
