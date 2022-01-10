import {
  Branding,
  DarkModeSwitch,
  Grids,
  Nav,
  TitleSection
} from "components/containers";
import * as React from "react";
import classes from "./MainLayout.module.scss";

interface MainLayoutProps {
  titleSectionContent: React.ReactNode;
  children: React.ReactNode;
}

const MainLayout = (props: MainLayoutProps) => {
  const { titleSectionContent, children } = props;

  return (
    <div id="layout" className={classes.root}>
      <Grids className={classes.grids} />
      <Branding className={classes.branding} />
      <div className={classes.navbar}>
        <Nav className={classes.nav} />
        <DarkModeSwitch className={classes.switch} />
      </div>
      <TitleSection className={classes.title}>
        {titleSectionContent}
      </TitleSection>
      <main id="main" className={classes.main}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
