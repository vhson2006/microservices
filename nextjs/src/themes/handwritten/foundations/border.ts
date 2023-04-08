import {
  blackBorderUrl,
  blackRoundedBorderCssUrl,
  circle20Url,
  circle64Url,
  whiteBorderUrl,
} from "./images/border-data-images";
export interface BorderImageOptions {
  borderTopWidth?: number;
  borderRightWidth?: number;
  borderBottomWidth?: number;
  borderLeftWidth?: number;
}

export const getLightModeBorderImage = (options: BorderImageOptions = {}) => {
  const {
    borderTopWidth = 5,
    borderRightWidth = 5,
    borderBottomWidth = 5,
    borderLeftWidth = 5,
  } = options;

  return `url(${blackBorderUrl}) ${borderTopWidth} ${borderRightWidth} ${borderBottomWidth} ${borderLeftWidth} repeat`;
};
export const getDarkModeBorderImage = (options: BorderImageOptions = {}) => {
  const {
    borderTopWidth = 5,
    borderRightWidth = 5,
    borderBottomWidth = 5,
    borderLeftWidth = 5,
  } = options;

  return `url(${whiteBorderUrl}) ${borderTopWidth} ${borderRightWidth} ${borderBottomWidth} ${borderLeftWidth} repeat`;
};

export const getFilledBorderImageStyles = (
  background:
    | "bg-muted"
    | "accent"
    | "on-accent"
    | "muted"
    | "inherit" = "inherit",
  cover = false
) => {
  return {
    position: "relative",
    borderRadius: "unset",
    _after: {
      content: '""',
      position: "absolute",
      top: cover ? "-6px" : "0px",
      right: cover ? "-6px" : "0px",
      bottom: "5px",
      left: cover ? "-6px" : "0px",
      mask: `url(${blackBorderUrl})`,
      maskSize: cover ? "cover" : undefined,
      maskRepeat: "no-repeat",
      background,
    },
    _before: {
      mask: `url(${blackBorderUrl})`,
      maskSize: cover ? "cover" : undefined,
      maskRepeat: "no-repeat",
      background,
      position: "absolute",
      transform: "rotate(180deg)",
      top: "5px",
      bottom: cover ? "-6px" : "0px",
      left: cover ? "-6px" : "0px",
      right: cover ? "-6px" : "0px",
      content: '""',
    },
  };
};

export const getRoundedFilledBorderImageStyles = () => {
  return {
    position: "relative",
    borderRadius: "base",
    _after: {
      content: '""',
      position: "absolute",
      top: "-1px",
      right: "-1px",
      bottom: "5px",
      left: "-1px",
      mask: blackRoundedBorderCssUrl,
      maskSize: "cover",
      maskRepeat: "no-repeat",
      background: "inherit",
    },
    _before: {
      mask: blackRoundedBorderCssUrl,
      maskSize: "cover",
      maskRepeat: "no-repeat",
      background: "inherit",
      position: "absolute",
      transform: "rotate(180deg)",
      top: "5px",
      bottom: "-1px",
      left: "-1px",
      right: "-1px",
      content: '""',
    },
  };
};

export const getAccentBorderLineStyles = () => {
  return {
    position: "relative",
    bg: "unset",

    _before: {
      mask: `url(${blackBorderUrl})`,
      maskSize: "auto",
      maskRepeat: "repeat-x",
      background: "accent",
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      content: '""',
    },
  };
};
export const getBorderLineStyles = (
  background: "bg-muted" | "accent" | "subtle" | "on-accent" = "bg-muted"
) => {
  return {
    position: "relative",
    bg: "unset",

    _before: {
      minHeight: "3px",
      mask: `url(${blackBorderUrl})`,
      maskSize: "auto",
      maskRepeat: "repeat-x",
      background,
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      content: '""',
    },
  };
};
export const getCircleBorderLineStyles = (
  background: "bg-muted" | "accent" | "on-accent" = "bg-muted",
  size: "64" | "20" = "64"
) => {
  return {
    position: "relative",
    bg: "unset",

    _before: {
      minHeight: "3px",
      mask: `url(${size === "20" ? circle20Url : circle64Url})`,
      maskSize: "cover",
      maskRepeat: "repeat-x",
      background,
      position: "absolute",
      top: "0",
      right: "0",
      bottom: "0",
      left: "0",
      content: '""',
    },
  };
};

export const getCircleBorderStyles = (
  size: "64" | "20" = "64",
  background = "inherit"
) => {
  return {
    position: "relative",
    borderRadius: "full",
    margin: "1px", // parent needs to be 2px smaller

    _after: {
      position: "absolute",
      content: '""',
      mask: `url(${size === "20" ? circle20Url : circle64Url})`,
      maskSize: "cover",
      maskRepeat: "no-repeat",
      background,
      width: "100%",
      height: "100%",
    },
  };
};
