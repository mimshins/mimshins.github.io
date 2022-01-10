import c from "classnames";
import * as React from "react";
import type { MergeElementProps } from "types";
import classes from "./Text.module.scss";

interface BaseProps {
  className?: string;
  variant:
    | "h1"
    | "h2"
    | "h3"
    | "h4"
    | "h5"
    | "h6"
    | "body"
    | "bodySmall"
    | "subtitle"
    | "subtitleSmall"
    | "caption"
    | "captionSmall";
  weight?: "bold" | "medium" | "regular" | "light";
  children?: React.ReactNode;
}

type TextProps<T extends React.ElementType = "span"> = MergeElementProps<
  T,
  BaseProps & { as?: T }
>;

type Component = {
  <T extends React.ElementType = "span">(props: TextProps<T>): JSX.Element;
};

const TextBase = (props: TextProps, ref: React.Ref<HTMLSpanElement>) => {
  const {
    children,
    className,
    variant,
    weight,
    as: As = "span",
    ...otherProps
  } = props;

  return (
    <As
      ref={ref}
      className={c(className, classes.root, classes[variant], {
        [classes[weight as NonNullable<typeof weight>]]:
          typeof weight !== "undefined"
      })}
      {...otherProps}
    >
      {children}
    </As>
  );
};

const Text = React.forwardRef(TextBase) as Component;

export default Text;
