import Head from "next/head";
import Link from "next/link";

import { Heading } from "@chakra-ui/react";

export default function Involvement() {
  return (
    <>
      <Head>
        <title>Involvement</title>
      </Head>
      <Heading>Involvement</Heading>
      <h2>
        <Link href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}
