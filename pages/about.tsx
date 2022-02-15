import { MainLayout } from "components/layouts";
import { Slide, Slider } from "components/partials/about";
import { Arrow, ArrowRight, Text } from "components/shared";
import Head from "next/head";
import Link from "next/link";
import classes from "public/static/styles/about.module.scss";
import * as React from "react";
import type { Layout, NextPageWithLayout } from "types.d";
import { setCanonicalMeta, setTitleMeta } from "utils";

const AboutPage: NextPageWithLayout = () => {
  const [slideIdx, setSlideIdx] = React.useState(0);

  return (
    <>
      <Head>
        {setTitleMeta(
          "ABOUT | Mimshins: Creative experience designer and developer."
        )}
        {setCanonicalMeta("https://mimsh.in/about")}
      </Head>
      <div className={classes.fullstack}>
        <div>
          SPECIALIZING IN REFINED
          <br />
          DIGITAL EXPERIENCES.
        </div>
        <Text variant="h5" as="h2">
          FULL-STACK
          <br />
          JAVASCRIPT ENGINEER
        </Text>
        <Text variant="subtitle" as="p" weight="regular">
          WHO WORKS AT THE INTERSECTION OF DESIGN & TECHNOLOGY.
          <br />
          <br />
          I BUILD PRODUCT THAT SUPPORTS THE USER/CUSTOMER EXPERIENCE;
          <br />
          <br />
          <Text variant="subtitle" as="strong" weight="medium">
            MOSTLY I SOLVE PROBLEMS.
          </Text>
          <br />
          <br />I HAVE A MINIMALISTIC YET MODERN & FUTURISTIC DESIGN STYLE.
        </Text>
      </div>
      <div className={classes.currently}>
        <Text variant="h5" as="h2">
          CURRENTLY:
          <br />
          <span>UX CORE ENGINEER</span>
        </Text>
        <Text variant="subtitle" as="p" weight="regular">
          CREATING TOOLS & DEVELOPING{" "}
          <a
            className={classes.link}
            href="https://sonnat.dev"
            target="_blank"
            rel="noopener noreferrer"
          >
            SONNAT DESIGN SYSTEM
          </a>{" "}
          AT{" "}
          <a
            className={classes.link}
            href="https://divar.ir"
            target="_blank"
            rel="noopener noreferrer"
          >
            DIVAR
          </a>
          .
        </Text>
      </div>
      <div className={classes.letsPlay}>
        <Arrow />
        <Text variant="captionSmall" as="p">
          I&apos;M ALWAYS LOOKING FOR NEW PEOPLE TO PUSH ME TO BE MORE CREATIVE.
          AFTER ALL &quot;PLAYING NEW&quot; MEANS FINDING NEW WAYS TO REDEFINE
          THE DIGITAL AND VISUAL LANDSCAPE.
          <br />
          <br />
          WANNA PLAY?
          <br />
          <Link passHref href="/contact">
            <a className={classes.link}>LET&apos;S CHAT</a>
          </Link>
        </Text>
      </div>
      <div className={classes.tools}>
        <Text variant="h5" as="h2">
          TOOLS & TECHNOLOGIES
        </Text>
        <Text variant="subtitle" as="p" weight="regular">
          <span>AS A DEVELOPER:</span>
          REACTJS, TYPESCRIPT, NODEJS,
          <br />
          SOCKETIO, THREEJS, GIT, CI/CD
          <br />
          <br />
          <span>AS A DESIGNER:</span>
          FIGMA, SKETCH, PHOTOSHOP, ILLUSTRATOR, XD
        </Text>
      </div>
      <div className={classes.advocacy}>
        <Text variant="caption" as="p">
          OPEN-SOURCE
          <br />
          ADVOCATE
        </Text>
      </div>
      <div className={classes.sliderWrapper}>
        <div className={classes.sliderControls}>
          <div>0{slideIdx}/02</div>
          <div
            className={classes.sliderNext}
            role="button"
            onClick={() => void setSlideIdx(idx => (idx + 1) % 3)}
          >
            <span>NEXT</span>
            <ArrowRight />
          </div>
        </div>
        <Slider slideIndex={slideIdx}>
          <Slide>
            <Text variant="subtitle" as="h2">
              FULL-STACK
              <br />
              JAVASCRIPT ENGINEER
            </Text>
            <Text variant="bodySmall" as="p" weight="regular">
              WHO WORKS AT THE INTERSECTION OF DESIGN & TECHNOLOGY.
              <br />
              <br />
              I BUILD PRODUCT THAT SUPPORTS THE USER/CUSTOMER EXPERIENCE;
              <br />
              <br />
              <Text variant="bodySmall" as="strong" weight="medium">
                MOSTLY I SOLVE PROBLEMS.
              </Text>
              <br />
              <br />I HAVE A MINIMALISTIC YET MODERN & FUTURISTIC DESIGN STYLE.
            </Text>
          </Slide>
          <Slide>
            <Text variant="subtitle" as="h2">
              CURRENTLY:
              <br />
              <span>UX CORE ENGINEER</span>
            </Text>
            <Text variant="bodySmall" as="p" weight="regular">
              CREATING TOOLS & DEVELOPING{" "}
              <a
                className={classes.link}
                href="https://sonnat.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                SONNAT DESIGN SYSTEM
              </a>{" "}
              AT{" "}
              <a
                className={classes.link}
                href="https://divar.ir"
                target="_blank"
                rel="noopener noreferrer"
              >
                DIVAR
              </a>
              .
            </Text>
          </Slide>
          <Slide>
            <Text variant="subtitle" as="h2">
              TOOLS & TECHNOLOGIES
            </Text>
            <Text variant="bodySmall" as="p" weight="regular">
              <span>AS A DEVELOPER:</span>
              REACTJS, TYPESCRIPT, NODEJS,
              <br />
              SOCKETIO, THREEJS, GIT, CI/CD
              <br />
              <br />
              <span>AS A DESIGNER:</span>
              FIGMA, SKETCH, PHOTOSHOP, ILLUSTRATOR, XD
            </Text>
          </Slide>
        </Slider>
      </div>
    </>
  );
};

const PageLayout: Layout = page => (
  <MainLayout
    titleSectionContent={
      <>
        <Text as="h1" variant="h4" className={classes.title}>
          MY NAME IS
          <br />
          MOSTAFA SHAMSITABAR
        </Text>
        <Text
          as="span"
          variant="h6"
          weight="regular"
          className={classes.subtitle}
        >
          A MULTI-DISCIPLINARY
          <br />
          DESIGNER & DEVELOPER.
        </Text>
      </>
    }
  >
    {page}
  </MainLayout>
);

AboutPage.getLayout = () => PageLayout;

export default AboutPage;
