import c from "classnames";
import MainWrapper from "components/containers/MainWrapper";
import Head from "next/head";
import "public/static/styles/global.scss";
import "public/static/styles/normalize.scss";
import * as React from "react";
import smoothScroll from "smoothscroll-polyfill";
import { usePageState } from "store";
import type { AppPropsWithLayout } from "types";
import { setDescriptionMeta, setKeywordsMeta, setTitleMeta } from "utils";

const App = (props: AppPropsWithLayout): React.ReactNode => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { Component: Page, pageProps, router } = props;

  const getPageLayout =
    Page.getLayout || (() => (page: React.ReactNode) => page);

  const withPageLayout = getPageLayout();

  // const isPageLoading = usePageState(state => state.isPageLoading);
  const setPageLoading = usePageState(state => state.setPageLoading);

  const isDarkMode = usePageState(state => state.isDarkMode);
  // const setIsDarkMode = usePageState(state => state.setIsDarkMode);

  React.useEffect(() => {
    const routeChangeStart = () => setPageLoading(true);
    const routeChangeComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", routeChangeStart);
    router.events.on("routeChangeComplete", routeChangeComplete);
    router.events.on("routeChangeError", routeChangeComplete);

    return () => {
      router.events.off("routeChangeStart", routeChangeStart);
      router.events.off("routeChangeComplete", routeChangeComplete);
      router.events.off("routeChangeError", routeChangeComplete);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => void smoothScroll.polyfill(), []);

  return (
    <React.Fragment>
      <Head>
        {setTitleMeta("MIMSHINS: Creative experience designer and developer.")}
        {setDescriptionMeta(
          "Mostafa Shamsitabar - Creative experience designer and developer."
        )}
        {setKeywordsMeta([
          "mostafa shamsitabar",
          "mimshins",
          "design",
          "develop",
          "ux engineer",
          "developer experience engineer",
          "dx engineer",
          "reactjs",
          "senior react engineer"
        ])}
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=5.0, minimum-scale=1.0"
          key="viewport"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <MainWrapper className={c({ "dark-mode": isDarkMode })}>
        {withPageLayout(<Page {...pageProps} />)}
      </MainWrapper>
    </React.Fragment>
  );
};

export default App;