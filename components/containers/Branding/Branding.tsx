import c from "classnames";
import { Text, LogoType } from "components/shared";
import * as React from "react";
import classes from "./Branding.module.scss";

interface BrandingProps {
  className?: string;
}

const Branding = (props: BrandingProps) => {
  const { className, ...otherProps } = props;

  return (
    <header className={c(className, classes.root)} {...otherProps}>
      <Text
        className={classes.label}
        as="span"
        variant="captionSmall"
        weight="medium"
      >
        THE POPTFOLIO OF
        <br />
        MOSTAFA SHAMSITABAR
      </Text>
      <LogoType className={classes.image} />
    </header>
  );
};

export default Branding;
