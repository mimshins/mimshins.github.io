import c from "classnames";
import * as React from "react";
import classes from "./MainWrapper.module.scss";

interface MainWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MainWrapperBase = (
  props: MainWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { children, className, ...otherProps } = props;

  return (
    <div
      ref={ref}
      id="main-wrapper"
      className={c(className, classes.root)}
      {...otherProps}
    >
      {children}
    </div>
  );
};

const MainWrapper = React.forwardRef(MainWrapperBase) as typeof MainWrapperBase;

export default MainWrapper;
