const setKeywordsMeta = (keywords: string[]) => (
  <meta name="keywords" content={keywords.join(", ")} />
);

export default setKeywordsMeta;
