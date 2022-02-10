import Switch, { type SwitchProps } from "components/shared/Switch";
import * as React from "react";

interface DarkModeSwitchProps {
  className?: string;
  layout?: SwitchProps["layout"];
}

const DarkModeSwitchBase = (
  props: DarkModeSwitchProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, layout = "horizontal" } = props;

  return (
    <Switch
      className={className}
      ref={ref}
      layout={layout}
      id="dark-mode-switch"
      label={layout === "horizontal" ? "DARK MODE" : "DARK\nMODE"}
    />
  );
};

const DarkModeSwitch = React.forwardRef(
  DarkModeSwitchBase
) as typeof DarkModeSwitchBase;

export default DarkModeSwitch;
