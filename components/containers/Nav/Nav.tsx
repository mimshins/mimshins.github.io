import c from "classnames";
import { MediaQueryContext } from "components/containers/MainWrapper";
import Text from "components/shared/Text";
import Link from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import DarkModeSwitch from "../DarkModeSwitch";
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
      <span>{`[${number}]`}</span>
      <span>{`${title}`}</span>
    </Text>
  </Link>
);

const NavBase = (props: NavProps, ref: React.Ref<HTMLDivElement>) => {
  const { className, ...otherProps } = props;

  const { isDesktop } = React.useContext(MediaQueryContext);
  const router = useRouter();

  const activeLink = {
    "/": "HOME",
    "/about": "ABOUT",
    "/contact": "CONTACT"
  }[router.pathname];

  return (
    <div ref={ref} className={c(className, classes.root)} {...otherProps}>
      <nav className={classes.nav}>
        {createNavItem("/", "HOME", "01", classes, activeLink === "HOME")}
        {createNavItem(
          "/about",
          "ABOUT",
          "02",
          classes,
          activeLink === "ABOUT"
        )}
        {createNavItem(
          "/contact",
          "CONTACT",
          "03",
          classes,
          activeLink === "CONTACT"
        )}
      </nav>
      <DarkModeSwitch
        layout={isDesktop ? "horizontal" : "vertical"}
        className={classes.switch}
      />
    </div>
  );
};

const Nav = React.forwardRef(NavBase) as typeof NavBase;

export default Nav;
