import Head from "next/head";
import Link from "next/link";

export default function Work() {
  return (
    <>
      <Head>
        <title>Work Experience</title>
      </Head>
      <h1>Work Experience</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
