import useTranslation from "next-translate/useTranslation";
import Head from "next/head";
import React from "react";

export const SeoHead = (props: any) => {
  const { title, description } = props;
  const { t, lang } = useTranslation("common");

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />

      <link rel="shortcut icon" href="/favicon.ico" />
      <meta httpEquiv="content-language" content={lang} />
      <meta httpEquiv="content-type" content="text/html; charset=UTF-8" />

      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="geo.placename" content="Ho Chi Minh, Việt Nam" />
      <meta name="geo.position" content="10.822;106.6257" />
      <meta name="geo.region" content="VN-Hochiminh" />
      <meta name="ICBM" content="10.822;106.6257" />

      <meta name="twitter:image" content="/introduction.jpg" />

      <meta property="og:type" content="article" />
      <meta property="og:site_name" content="TCG Player Online" />

      <meta property="og:image" content="/introduction.jpg" />
      <meta property="fb:app_id" content="456616084420060" />
    </Head>
  );
};
