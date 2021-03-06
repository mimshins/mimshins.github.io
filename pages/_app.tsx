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

  const setPageLoading = usePageState(state => state.setPageLoading);
  const isDarkMode = usePageState(state => state.isDarkMode);

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

  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.className = "dark-mode";
    } else document.documentElement.className = "";
  }, [isDarkMode]);

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
      </Head>
      <MainWrapper className={c({ "dark-mode": isDarkMode })}>
        {withPageLayout(<Page {...pageProps} />)}
      </MainWrapper>
    </React.Fragment>
  );
};

export default App;
