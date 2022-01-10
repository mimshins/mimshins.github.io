const setTitleMeta = (title: string) => (
  <>
    <title>{title}</title>
    <meta name="og:title" content={title} />
  </>
);

export default setTitleMeta;
