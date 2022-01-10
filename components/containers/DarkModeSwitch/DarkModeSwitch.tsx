import c from "classnames";
import { Switch } from "components/shared";
import * as React from "react";
import classes from "./DarkModeSwitch.module.scss";

interface DarkModeSwitchProps {
  className?: string;
}

const DarkModeSwitchBase = (
  props: DarkModeSwitchProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className } = props;

  return (
    <Switch
      className={c(className, classes.root)}
      ref={ref}
      id="dark-mode-switch"
      label="DARK MODE"
    />
  );
};

const DarkModeSwitch = React.forwardRef(
  DarkModeSwitchBase
) as typeof DarkModeSwitchBase;

export default DarkModeSwitch;
