import useMediaQuery from "@utilityjs/use-media-query";
import c from "classnames";
import platform from "platform";
import * as React from "react";
import classes from "./MainWrapper.module.scss";

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

const breakpoints = { lg: 1024, sm: 768 };

const MainWrapperBase = (
  props: MainWrapperProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { children, className, ...otherProps } = props;

  const [isDesktop] = useMediaQuery(`(min-width:${breakpoints.lg}px)`);
  const [isTablet] = useMediaQuery(
    `(min-width:${breakpoints.sm}px) and (max-width:${breakpoints.lg - 0.05}px)`
  );
  const [isMobile] = useMediaQuery(`(max-width:${breakpoints.sm - 0.05}px)`);

  // Force re-render on devices when 'portrait' and 'landscape' both land on single a breakpoint.
  const [orientationChange] = useMediaQuery(
    `screen and (orientation: landscape)`
  );

  const [isPageContentLoaded, setIsPageContentLoaded] = React.useState(false);
  const [disableOrientation, setDisableOrientation] = React.useState(false);

  React.useEffect(() => {
    const ua = platform.parse(window.navigator.userAgent);
    const osFamily = ua.os?.family?.toLowerCase();

    const tabletOrMobile = osFamily
      ? ["ios", "android"].includes(osFamily)
      : false;

    const orientation =
      window.innerWidth > window.innerHeight ? "landscape" : "portrait";

    const isValidTablet =
      window.innerWidth + window.innerHeight >= 2 * breakpoints.sm;

    setDisableOrientation(
      tabletOrMobile && orientation === "landscape" && !isValidTablet
    );
  }, [orientationChange]);

  const context = React.useMemo(
    () => ({ isDesktop, isTablet, isMobile }),
    [isDesktop, isTablet, isMobile]
  );

  React.useEffect(() => {
    const handleLoad = () => {
      requestAnimationFrame(
        () => void setTimeout(() => void setIsPageContentLoaded(true), 500)
      );
    };

    window.addEventListener("load", handleLoad);
    return () => void window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <div
      ref={ref}
      id="main-wrapper"
      className={c(className, classes.root)}
      {...otherProps}
    >
      <div
        id="page-suspend-overlay"
        className={!isPageContentLoaded ? "open" : ""}
      ></div>
      <div
        id="page-orientation-block"
        className={disableOrientation ? "open" : ""}
      >
        <strong>OOPS! LANDSCAPE IS BLOCKED!</strong>
        <br />
        <span>ROTATE YOUR DEVICE BACK TO PORTRAIT MODE!</span>
      </div>
      <MediaQueryContext.Provider value={context}>
        {children}
      </MediaQueryContext.Provider>
    </div>
  );
};

const MainWrapper = React.forwardRef(MainWrapperBase) as typeof MainWrapperBase;

export default MainWrapper;
