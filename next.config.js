const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["jsx", "js", "mdx", "md", "ts", "tsx"],
  reactStrictMode: true,
  trailingSlash: false,
  pwa: {
    dest: "public",
    dynamicStartUrl: false,
    disable: process.env.NODE_ENV === "development"
  }
};

module.exports = withPWA(nextConfig);
