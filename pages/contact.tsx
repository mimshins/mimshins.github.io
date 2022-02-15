import { MainLayout } from "components/layouts";
import { Text } from "components/shared";
import Head from "next/head";
import classes from "public/static/styles/contact.module.scss";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types.d";
import { setCanonicalMeta, setTitleMeta } from "utils";

const ContactPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        {setTitleMeta(
          "CONTACT | Mimshins: Creative experience designer and developer."
        )}
        {setCanonicalMeta("https://mimsh.in/contact")}
      </Head>
      <div className={classes.getInTouch}>
        <img
          src="/static/media/arrow.svg"
          alt="Arrow"
          role="presentation"
          aria-hidden="true"
        />
        <Text as="h2" variant="h5" weight="light">
          GET IN TOUCH
        </Text>
        <br />
        <Text
          className={classes.link}
          as="a"
          variant="h3"
          href="mailto:hello@mimsh.in"
        >
          HELLO[at]
          <br />
          MIMSH.IN
        </Text>
      </div>
      <div className={classes.follow}>
        <img
          src="/static/media/arrow.svg"
          alt="Arrow"
          role="presentation"
          aria-hidden="true"
        />
        <Text as="h2" variant="h5" weight="light">
          FOLLOW ME
        </Text>
        <br />
        <Text
          className={classes.link}
          as="a"
          variant="h3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.instagram.com/mim.shins"
        >
          INSTAGRAM
        </Text>
        <br />
        <Text
          className={classes.link}
          as="a"
          variant="h3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.linkedin.com/in/mostafa-shamsitabar-b4696999"
        >
          LINKEDIN
        </Text>
        <br />
        <Text
          className={classes.link}
          as="a"
          variant="h3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://twitter.com/mimshins"
        >
          TWITTER
        </Text>
        <br />
        <Text
          className={classes.link}
          as="a"
          variant="h3"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/mimshins"
        >
          GITHUB
        </Text>
      </div>
      <div className={classes.byMe}>
        <img
          src="/static/media/cross.svg"
          alt="Cross"
          role="presentation"
          aria-hidden="true"
        />
        <Text as="p" variant="caption">
          DESIGN & DEVELOPED BY
          <br />
          <strong>MOSTAFA SHAMSITABAR</strong>
        </Text>
      </div>
    </>
  );
};

const PageLayout: Layout = page => (
  <MainLayout
    titleSectionContent={
      <>
        <Text
          as="span"
          variant="h6"
          weight="regular"
          className={classes.subtitle}
        >
          SERVICES:
        </Text>
        <Text as="h1" variant="h4" className={classes.title}>
          TECHNICAL
          <br />
          DIRECTION/CONSULTING
          <br />
          FRONT-END DEVELOPMENT
        </Text>
        <Text
          as="span"
          variant="h6"
          weight="regular"
          className={classes.subtitle}
        >
          AVAILABILITY:
        </Text>
        <Text as="div" variant="h4" className={classes.title}>
          REMOTELY
        </Text>
      </>
    }
  >
    {page}
  </MainLayout>
);

ContactPage.getLayout = () => PageLayout;

export default ContactPage;
