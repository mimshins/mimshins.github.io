import { NextComponentType, NextPageContext } from "next";
import { AppProps } from "next/app";
import * as React from "react";

export type Layout = (page: React.ReactNode) => React.ReactNode;

export type GetLayout = () => Layout;

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

// eslint-disable-next-line @typescript-eslint/ban-types
export type EmptyIntersectionObject = {};

export type MergeElementProps<
  T extends React.ElementType,
  P = EmptyIntersectionObject
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;
