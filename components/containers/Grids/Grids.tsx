import c from "classnames";
import * as React from "react";
import classes from "./Grids.module.scss";

interface GridsBaseProps {
  className?: string;
}

type GridsProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof GridsBaseProps
> &
  GridsBaseProps;

const GridsBase = (props: GridsProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <div className={classes.leftEdge}></div>
      <div className={classes.titleEdge}></div>
      <div className={classes.mainLeftEdge}></div>
      <div className={classes.mainRightEdge}></div>
      <div className={classes.mainBottomEdge}></div>
      <div className={classes.mainTopEdge}></div>
    </div>
  );
};

const Grids = React.forwardRef(GridsBase) as typeof GridsBase;

export default Grids;
