import useControlledProp from "@utilityjs/use-controlled-prop";
import c from "classnames";
import * as React from "react";
import Text from "../Text";
import classes from "./Switch.module.scss";

interface SwitchBaseProps {
  id: string;
  label: string;
  className?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  layout?: "vertical" | "horizontal";
  onChange?: (checked: boolean) => void;
}

export type SwitchProps = Omit<
  React.ComponentPropsWithRef<"div">,
  keyof SwitchBaseProps
> &
  SwitchBaseProps;

const SwitchBase = (props: SwitchProps, ref: React.Ref<HTMLDivElement>) => {
  const {
    label,
    id,
    checked,
    defaultChecked,
    onChange,
    className,
    layout = "horizontal",
    ...otherProps
  } = props;

  const [isChecked, setIsChecked] = useControlledProp(
    checked,
    defaultChecked,
    false
  );

  const emitChange = () => {
    if (onChange) onChange(!isChecked);
    setIsChecked(!isChecked);
  };

  return (
    <div
      id={id}
      ref={ref}
      className={c(className, classes.root, classes[layout], {
        [classes.active]: isChecked
      })}
      {...otherProps}
    >
      <div
        id={`${id}-input`}
        role="switch"
        aria-labelledby={`${id}-label`}
        aria-checked={isChecked}
        className={classes.input}
        onClick={() => void emitChange()}
      >
        <div className={classes.indicator}></div>
      </div>
      <Text
        as="label"
        weight="medium"
        variant="captionSmall"
        onClick={() => void emitChange()}
        id={`${id}-label`}
        className={c(classes.label, "disable-user-select")}
        htmlFor={`${id}-input`}
      >
        {label}
      </Text>
    </div>
  );
};

const Switch = React.forwardRef(SwitchBase) as typeof SwitchBase;

export default Switch;
