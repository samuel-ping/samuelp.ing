import Head from "next/head";
import Layout from "../components/layout";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>Samuel Ping</title>
      </Head>
      <section>
        <p>Hey! I'm Sam, a sophomore at Rutgers University- New Brunswick.</p>
        <p>This website is currently a work in progress!</p>
      </section>
    </Layout>
  );
}
