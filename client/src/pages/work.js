import Head from "next/head";
import Link from "next/link";
import Layout from "../components/layout";

export default function Work() {
  return (
    <Layout>
      <Head>
        <title>Work Experience</title>
      </Head>
      <h1>Work Experience</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </Layout>
  );
}
