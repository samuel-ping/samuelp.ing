import Head from "next/head";
import Link from "next/link";

import { Heading } from "@chakra-ui/react";

export default function About() {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>
      <Heading>About Me</Heading>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
