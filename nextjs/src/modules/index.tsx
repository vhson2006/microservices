import dynamic from "next/dynamic";
export * from "../commons/languages/LangSwitcher";
export * from "./PublicAccess";
// export * from './AuthAccess'
export const PrivateAccess = dynamic(() => import("./PrivateAccess"), {
  ssr: false,
});
export const AuthAccess = dynamic(() => import("./AuthAccess"), { ssr: false });
