import c from "classnames";
import * as React from "react";
import classes from "./Statue.module.scss";

interface StatueBaseProps {
  className?: string;
}

type StatueProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof StatueBaseProps
> &
  StatueBaseProps;

const StatueBase = (props: StatueProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <div className={classes.container}>
        <img
          src="/static/media/ares.png"
          alt="Ares' Statue"
          className={classes.image}
        />
      </div>
    </div>
  );
};

const Statue = React.forwardRef(StatueBase) as typeof StatueBase;

export default Statue;
