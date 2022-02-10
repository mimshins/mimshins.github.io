import { MainLayout } from "components/layouts";
import { Statue } from "components/partials/home";
import { Text } from "components/shared";
import Head from "next/head";
import classes from "public/static/styles/home.module.scss";
import type { Layout, NextPageWithLayout } from "types.d";
import { setCanonicalMeta, setTitleMeta } from "utils";

const HomePage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        {setTitleMeta(
          "[ HOME ] Mimshins: Creative experience designer and developer."
        )}
        {setCanonicalMeta("https://mimsh.in")}
      </Head>
      <Statue />
      <div className={classes.reference}>
        <img src="/static/media/arrow.svg" aria-hidden="true" />
        ART REFERENCE:
        <br />
        [BEHANCE] 4AM SAATCHI & SAATCHI
      </div>
      <div className={classes.slogan}>
        <img src="/static/media/cross.svg" aria-hidden="true" />
        <strong>ARES</strong>
        <br />
        <small>IMPLEMENTATION</small>
        <br />
        <p>
          ARES IS ASSOCIATED WITH CONSTRUCTION, DUE TO HIS STRATEGIC CAPACITY
          AND MILITARY INTELLIGENCE IN THE BATTLEFIELD.
        </p>
      </div>
    </>
  );
};

const PageLayout: Layout = page => (
  <MainLayout
    titleSectionContent={
      <>
        <Text as="h1" variant="h4" className={classes.title}>
          CREATIVE
          <br />
          EXPERIENCE DESIGNER
          <br />
          AND DEVELOPER.
        </Text>
        <Text
          as="span"
          variant="h6"
          weight="regular"
          className={classes.subtitle}
        >
          BASED IN
          <br />
          TEHRAN, IRAN
        </Text>
      </>
    }
  >
    {page}
  </MainLayout>
);

HomePage.getLayout = () => PageLayout;

export default HomePage;
