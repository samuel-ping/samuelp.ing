import Head from "next/head";
import Link from "next/link";

export default function Involvement() {
  return (
    <>
      <Head>
        <title>Involvement</title>
      </Head>
      <h1>Involvement</h1>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
