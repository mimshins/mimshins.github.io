import { Branding, Grids, Nav, TitleSection } from "components/containers";
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
      <Grids />
      <Branding />
      <Nav />
      <TitleSection>{titleSectionContent}</TitleSection>
      <main id="main" className={classes.main}>
        {children}
      </main>
    </div>
  );
};

export default MainLayout;
