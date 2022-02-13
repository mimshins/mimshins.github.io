import clx from "classnames";
import * as React from "react";
import classes from "./slide.module.scss";

interface SlideBaseProps {
  className?: string;
  children: React.ReactNode;
}

type SlideProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SlideBaseProps
> &
  SlideBaseProps;

const SlideBase = (props: SlideProps, ref: React.Ref<HTMLDivElement>) => {
  const { children, className, ...otherProps } = props;

  return (
    <div ref={ref} className={clx(className, classes.root)} {...otherProps}>
      {children}
    </div>
  );
};

const Slide = React.forwardRef(SlideBase) as typeof SlideBase;

export default Slide;
