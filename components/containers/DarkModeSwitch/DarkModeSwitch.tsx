import Switch, { type SwitchProps } from "components/shared/Switch";
import * as React from "react";
import { usePageState } from "store";

interface DarkModeSwitchProps {
  className?: string;
  layout?: SwitchProps["layout"];
}

const DarkModeSwitchBase = (
  props: DarkModeSwitchProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const { className, layout = "horizontal" } = props;

  const setIsDarkMode = usePageState(state => state.setIsDarkMode);
  const isDarkMode = usePageState(state => state.isDarkMode);

  return (
    <Switch
      className={className}
      ref={ref}
      checked={isDarkMode}
      onChange={checked => void setIsDarkMode(checked)}
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
