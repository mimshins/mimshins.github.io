import c from "classnames";
import Text from "components/shared/Text";
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
      <img
        className={classes.image}
        src="/static/media/mimshins-type.svg"
        alt="MIMSHINS Logo Type"
        title="MIMSHINS Logo Type"
      />
    </header>
  );
};

export default Branding;
