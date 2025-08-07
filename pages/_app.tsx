import Layout from "@/components/layout/Layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Head>
        <title>CinePick</title>
        <meta name="description" content="Discover trending, top-rated, and similar movies." />
        <link rel="icon" href="/img/cp-img.png" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
