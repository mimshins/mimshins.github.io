import useControlledProp from "@utilityjs/use-controlled-prop";
import useIsMounted from "@utilityjs/use-is-mounted";
import useOnChange from "@utilityjs/use-on-change";
import useResizeSensor from "@utilityjs/use-resize-sensor";
import clx from "classnames";
import * as React from "react";
import { isFragment } from "react-is";
import Slide from "./Slide";
import classes from "./slider.module.scss";

interface SliderBaseProps {
  className?: string;
  defaultSlideIndex?: number;
  slideIndex?: number;
  children: React.ReactNode;
}

type SliderProps = Omit<
  Omit<React.ComponentPropsWithRef<"div">, "defaultChecked" | "defaultValue">,
  keyof SliderBaseProps
> &
  SliderBaseProps;

const clamp = (number: number, min: number, max: number): number =>
  Math.max(Math.min(number, max), min);

const Slider = (props: SliderProps) => {
  const {
    className,
    defaultSlideIndex,
    children: childrenProp,
    slideIndex: slideIndexProp,
    ...otherProps
  } = props;

  const resizeSensor = useResizeSensor({ mode: "debounce" });
  const isMounted = useIsMounted();

  const parentRef = React.useRef<HTMLDivElement>();
  const frameRef = React.useRef<HTMLDivElement | null>(null);

  const [slideIndex] = useControlledProp(slideIndexProp, defaultSlideIndex, 0);

  const [dx, setDx] = React.useState(0);
  const [boundry, setBoundry] = React.useState({ min: 0, max: 0 });

  const defaultTransition = React.useRef("transform 240ms ease");
  const [activeTransition, setActiveTransition] = React.useState(
    defaultTransition.current
  );

  const enableTransition = (): void =>
    void setActiveTransition(defaultTransition.current);

  const disableTransition = (): void => void setActiveTransition("");

  const slideMap = new Map<number, HTMLDivElement>();

  let childIdx = 0;
  const children = React.Children.map(childrenProp, child => {
    if (!React.isValidElement(child)) return null;
    if (isFragment(child)) return null;
    if ((child as React.ReactElement).type !== Slide) return null;

    return React.cloneElement(child as React.ReactElement, {
      ref: (node: HTMLDivElement | null) =>
        void (node && slideMap.set(childIdx++, node))
    });
  });

  const updateBoundry = (parentWidth: number) => {
    let maxWidth = 0;
    slideMap.forEach(
      node => void (maxWidth += node.getBoundingClientRect().width)
    );

    const min = 0;
    const max = Math.abs(parentWidth - maxWidth);

    setBoundry({ min, max });

    return { min, max };
  };

  const goToSlide = (
    idx: number,
    bindingData?: {
      boundryMin: number;
      boundryMax: number;
      parentWidth: number;
      forceDisableTransition: boolean;
    }
  ) => {
    const _idx = clamp(idx, 0, slideMap.size - 1);
    const deltaIdx = Math.abs(_idx - slideIndex);

    const {
      boundryMax = boundry.max,
      boundryMin = boundry.min,
      parentWidth = resizeSensor.width,
      forceDisableTransition = false
    } = bindingData || {};

    if (forceDisableTransition || (deltaIdx !== 1 && deltaIdx !== 0)) {
      disableTransition();
      setTimeout(enableTransition, 240);
    } else enableTransition();

    const sign = -1;
    const newDx = sign * clamp(_idx * parentWidth, boundryMin, boundryMax);

    setDx(newDx);
  };

  useOnChange(slideIndex, current => void (isMounted() && goToSlide(current)));
  useOnChange(resizeSensor.width, currentWidth => {
    if (!currentWidth || !isMounted()) return;

    const { min, max } = updateBoundry(currentWidth);
    goToSlide(slideIndex, {
      parentWidth: currentWidth,
      forceDisableTransition: true,
      boundryMax: max,
      boundryMin: min
    });
  });

  const inlineStyle = React.useMemo<React.CSSProperties>(() => {
    const transform = `translate3d(${dx}px, 0, 0)`;

    return {
      WebkitTransition: activeTransition,
      MozTransition: activeTransition,
      OTransition: activeTransition,
      transition: activeTransition,
      WebkitTransform: transform,
      msTransform: transform,
      transform
    };
  }, [dx, activeTransition]);

  const registerParentRef = (node: HTMLDivElement | null) => {
    if (node) {
      parentRef.current = node;
      resizeSensor.registerNode(node);
    }
  };

  return (
    <div
      ref={registerParentRef}
      className={clx(className, classes.root)}
      {...otherProps}
    >
      <div className={classes.slides}>
        <div className={classes.slidesContainer}>
          <div
            className={classes.slidesFrame}
            ref={frameRef}
            style={inlineStyle}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
