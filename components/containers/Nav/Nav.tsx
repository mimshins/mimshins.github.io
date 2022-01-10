import c from "classnames";
import Text from "components/shared/Text";
import Link from "next/link";
import * as React from "react";
import classes from "./Nav.module.scss";

interface NavProps {
  className?: string;
}

const createNavItem = (
  href: string,
  title: string,
  number: string,
  classNames: typeof classes,
  isActive: boolean
) => (
  <Link href={href} passHref>
    <Text
      variant="bodySmall"
      as="a"
      title={title}
      className={c(classNames.navItem, { [classes.active]: isActive })}
    >
      [{number}] {title}
    </Text>
  </Link>
);

const NavBase = (props: NavProps, ref: React.Ref<HTMLElement>) => {
  const { className, ...otherProps } = props;

  const [activeLink] = React.useState("HOME");

  return (
    <nav ref={ref} className={c(className, classes.root)} {...otherProps}>
      {createNavItem("/", "HOME", "01", classes, activeLink === "HOME")}
      {createNavItem("/", "ABOUT", "02", classes, activeLink === "ABOUT")}
      {createNavItem("/", "CONTACT", "03", classes, activeLink === "CONTACT")}
    </nav>
  );
};

const Nav = React.forwardRef(NavBase) as typeof NavBase;

export default Nav;
