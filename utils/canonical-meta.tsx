const setCanonicalMeta = (canonical: string) => (
  <>
    <link rel="canonical" href={canonical} />
    <meta name="og:url" content={canonical} />
  </>
);

export default setCanonicalMeta;
