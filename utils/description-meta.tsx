const setDescriptionMeta = (description: string) => (
  <>
    <meta name="description" content={description} />
    <meta name="og:description" content={description} />
  </>
);

export default setDescriptionMeta;
