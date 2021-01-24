import Head from "next/head";
import Link from "next/link";

import { Heading } from "@chakra-ui/react";

export default function Work() {
  return (
    <>
      <Head>
        <title>Samuel Ping | Work Experience</title>
      </Head>
      <Heading>Work Experience</Heading>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
