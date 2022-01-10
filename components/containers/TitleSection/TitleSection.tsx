import c from "classnames";
import * as React from "react";
import classes from "./TitleSection.module.scss";

interface TitleSectionBaseProps {
  className?: string;
  children: React.ReactNode;
}

type TitleSectionProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof TitleSectionBaseProps
> &
  TitleSectionBaseProps;

const TitleSectionBase = (
  props: TitleSectionProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, children, ...otherProps } = props;

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      {children}
    </div>
  );
};

const TitleSection = React.forwardRef(
  TitleSectionBase
) as typeof TitleSectionBase;

export default TitleSection;
