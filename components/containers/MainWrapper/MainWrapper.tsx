import c from "classnames";
import * as React from "react";
import classes from "./MainWrapper.module.scss";
import useMediaQuery from "@utilityjs/use-media-query";

export interface IMediaQueryContext {
  isDesktop: boolean;
  isTablet: boolean;
  isMobile: boolean;
}

export const MediaQueryContext = React.createContext<IMediaQueryContext>({
  isDesktop: false,
  isTablet: false,
  isMobile: false
});

interface MainWrapperProps {
  className?: string;
  children: React.ReactNode;
}

const MainWrapperBase = (
  props: MainWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { children, className, ...otherProps } = props;

  const [isDesktop, isTablet, isMobile] = useMediaQuery([
    "(min-width:1024px)",
    "(min-width:768px) and (max-width:1023.95px)",
    "(max-width:767.95px)"
  ]);

  const context = React.useMemo(
    () => ({ isDesktop, isTablet, isMobile }),
    [isDesktop, isTablet, isMobile]
  );

  return (
    <div
      ref={ref}
      id="main-wrapper"
      className={c(className, classes.root)}
      {...otherProps}
    >
      <MediaQueryContext.Provider value={context}>
        {children}
      </MediaQueryContext.Provider>
    </div>
  );
};

const MainWrapper = React.forwardRef(MainWrapperBase) as typeof MainWrapperBase;

export default MainWrapper;
