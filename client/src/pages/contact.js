import Head from "next/head";
import Link from "next/link";

import { Heading } from "@chakra-ui/react";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Samuel Ping | Contact Me</title>
      </Head>
      <Heading>Contact Me</Heading>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
