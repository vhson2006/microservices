import { SpaceProps, StackProps, TextProps } from "@chakra-ui/react";

export interface PageProps {
  isServer: boolean;
}

export type FormatPriceOptions = { locale?: string; currency?: string };

export type PackageItemData = {
  id: string;
  price: number;
  title: string;
  quantity: number;
  image: string;
  isInStock?: boolean;
  isBestSeller?: boolean;
  variants?: Array<{ name: string; value: string | number }>;
};

export type PackageItemProps = PackageItemData &
  FormatPriceOptions & {
    onChangeQuantity?: (quantity: number) => void;
    onClickDelete?: () => void;
    onClickSaveForLater?: () => void;
  };

export type OrderSummaryItemProps = {
  label: string;
  value?: string;
  children?: React.ReactNode;
};

export interface PriceTagProps {
  currency: string;
  price: number;
  salePrice?: number;
  rootProps?: StackProps;
  priceProps?: TextProps;
  salePriceProps?: TextProps;
}

export type ProductMetaProps = {
  title: string;
  image: string;
  isInStock?: boolean;
  isBestSeller?: boolean;
  variants?: PackageItemData["variants"];
};

export interface PriceProps {
  children?: React.ReactNode;
  isOnSale?: boolean;
  textProps?: TextProps;
}

export interface Props {
  defaultValue?: number;
  max?: number;
  size?: "sm" | "md" | "lg" | "xl";
  rootProps?: StackProps;
}

export interface StatProps extends StackProps {
  label: string;
  value: string;
}

export interface PriceTagProps {
  currency: string;
  price: number;
  salePrice?: number;
  rootProps?: StackProps;
  priceProps?: TextProps;
  salePriceProps?: TextProps;
}

export interface PriceProps {
  children?: React.ReactNode;
  isOnSale?: boolean;
  textProps?: TextProps;
}

export interface ReduxAction {
  type: string;
  payload: any;
  data: any;
  error: any;
}

export interface FetchParameter {
  url: string;
  method: string;
  data: any;
  timeout: number;
}

export interface RequestParameter {
  url: string;
  method: string;
  queryParams?: any;
  bodyObj?: any;
}

export interface ITags {
  tags: Array<string>;
  marginTop?: SpaceProps["marginTop"];
}

export interface BlogAuthorProps {
  date: Date;
  name: string;
}
