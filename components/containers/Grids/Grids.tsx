import useResizeSensor from "@utilityjs/use-resize-sensor";
import c from "classnames";
import {
  IMediaQueryContext,
  MediaQueryContext
} from "components/containers/MainWrapper";
import * as React from "react";
import { useIsomorphicLayoutEffect } from "utils";
import classes from "./Grids.module.scss";

interface GridsBaseProps {
  className?: string;
}

type GridsProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof GridsBaseProps
> &
  GridsBaseProps;

const calcGridsMeta = (mediaQuery: IMediaQueryContext) => {
  const pxToRem = (size: number) => `${size / 16}rem`;

  const { isMobile, isTablet, isDesktop } = mediaQuery;

  return {
    leftEdge: {
      position: {
        left: pxToRem(isMobile ? 16 : 48),
        top: 0,
        bottom: 0
      },
      visible: true
    },
    rightEdge: {
      position: {
        right: pxToRem(isMobile ? 16 : 48),
        top: 0,
        bottom: 0
      },
      visible: true
    },
    bottomEdge: {
      position: {
        left: 0,
        right: 0,
        bottom: pxToRem(isMobile ? 16 : 48)
      },
      visible: true
    },
    topEdge: {
      position: {
        left: 0,
        right: 0,
        top: pxToRem(isMobile ? 16 : 48)
      },
      visible: true
    },
    titleLeftEdge: {
      position: {
        left: pxToRem(isDesktop ? 231 : isTablet ? 139 : 107),
        top: 0,
        bottom: 0
      },
      visible: true
    },
    navRightEdge: {
      position: {
        left: pxToRem(isTablet ? 107 : 75),
        top: 0,
        bottom: 0
      },
      visible: !isDesktop
    },
    boxOfGrids: {
      position: {
        left: pxToRem(540),
        top: pxToRem(48),
        bottom: pxToRem(48),
        right: pxToRem(48)
      },
      visible: isDesktop
    }
  };
};

const createBoxGrids = (width: number, height: number) => {
  if (!width || !height) return;

  const pxToRem = (size: number) => `${size / 16}rem`;

  const rowCount = 8;
  const colCount = 8;

  const cellWidth = width / rowCount;
  const cellHeight = height / colCount;

  if (typeof document !== "undefined") {
    document.documentElement.style.setProperty(
      `--cell-width`,
      pxToRem(cellWidth)
    );
    document.documentElement.style.setProperty(
      `--cell-height`,
      pxToRem(cellHeight)
    );
  }

  const rows = Array(rowCount)
    .fill(undefined)
    .map((_, index) => {
      if (index === 0) return;

      const top = index * cellHeight;

      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty(
          `--row-${index}-relative-y`,
          pxToRem(top)
        );
      }

      return (
        index > 0 && (
          <div style={{ top, left: 0, right: 0 }} key={`row-${index}`} />
        )
      );
    });

  const cols = Array(colCount)
    .fill(undefined)
    .map((_, index) => {
      if (index === 0) return;

      const left = index * cellWidth;

      if (typeof document !== "undefined") {
        document.documentElement.style.setProperty(
          `--col-${index}-relative-x`,
          pxToRem(left)
        );
      }

      return <div style={{ left, top: 0, bottom: 0 }} key={`col-${index}`} />;
    });

  return rows.concat(cols);
};

const GridsBase = (props: GridsProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const { width, height, registerNode } = useResizeSensor({
    mode: "debounce",
    rate: 125
  });

  const mediaQuery = React.useContext(MediaQueryContext);
  const {
    boxOfGrids,
    navRightEdge,
    titleLeftEdge,
    bottomEdge,
    rightEdge,
    leftEdge,
    topEdge
  } = calcGridsMeta(mediaQuery);

  useIsomorphicLayoutEffect(() => {
    document.documentElement.style.setProperty(
      "--top-edge-position",
      topEdge.position.top
    );
    document.documentElement.style.setProperty(
      "--left-edge-position",
      leftEdge.position.left
    );
    document.documentElement.style.setProperty(
      "--right-edge-position",
      rightEdge.position.right
    );
    document.documentElement.style.setProperty(
      "--bottom-edge-position",
      bottomEdge.position.bottom
    );
    document.documentElement.style.setProperty(
      "--title-leftEdge-position",
      titleLeftEdge.position.left
    );
    document.documentElement.style.setProperty(
      "--nav-rightEdge-position",
      navRightEdge.position.left
    );
    document.documentElement.style.setProperty(
      "--box-leftEdge-position",
      boxOfGrids.position.left
    );
  });

  const boxGrids = React.useMemo(
    () => createBoxGrids(width, height),
    [width, height]
  );

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      {leftEdge.visible && (
        <div
          id="left-edge"
          style={leftEdge.position}
          className={classes.grid}
        ></div>
      )}
      {rightEdge.visible && (
        <div
          id="right-edge"
          style={rightEdge.position}
          className={classes.grid}
        ></div>
      )}
      {bottomEdge.visible && (
        <div
          id="bottom-edge"
          style={bottomEdge.position}
          className={classes.grid}
        ></div>
      )}
      {topEdge.visible && (
        <div
          id="top-edge"
          style={topEdge.position}
          className={classes.grid}
        ></div>
      )}
      {titleLeftEdge.visible && (
        <div
          id="title-left-edge"
          style={titleLeftEdge.position}
          className={classes.grid}
        ></div>
      )}
      {navRightEdge.visible && (
        <div
          id="nav-right-edge"
          style={navRightEdge.position}
          className={classes.grid}
        ></div>
      )}
      {boxOfGrids.visible && (
        <div
          ref={registerNode}
          id="box-of-grids"
          style={boxOfGrids.position}
          className={classes.box}
        >
          {boxGrids}
        </div>
      )}
    </div>
  );
};

const Grids = React.forwardRef(GridsBase) as typeof GridsBase;

export default Grids;
