import Head from "next/head";
import Layout, { siteTitle } from "../components/layout";
import utilStyles from "../styles/utils.module.css";

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hey! I'm Sam, a sophomore at Rutgers University- New Brunswick.</p>
        <p>This website is currently a work in progress!</p>
      </section>
    </Layout>
  );
}
