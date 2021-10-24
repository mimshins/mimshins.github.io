import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import * as React from "react";

export type GetLayout = () => (page: React.ReactNode) => React.ReactNode;

export type NextComponentTypeWithLayout<P = Record<string, never>> =
  NextComponentType<NextPageContext, unknown, P> & {
    getLayout?: GetLayout;
  };

export type NextPageWithLayout<
  P = Record<string, never>,
  IP = P
> = NextComponentType<NextPageContext, IP, P> & {
  getLayout?: GetLayout;
};

export type AppPropsWithLayout<P = Record<string, never>> = AppProps<P> & {
  Component: NextComponentTypeWithLayout<P>;
};
