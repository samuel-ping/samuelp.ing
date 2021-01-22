import Head from "next/head";
import { Heading } from "@chakra-ui/react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Samuel Ping</title>
      </Head>
      <Heading>Hey! I'm Sam,</Heading>
      <section>
        <p>a sophomore at Rutgers University- New Brunswick.</p>
        <p>This site is still a work in progress!</p>
      </section>
    </>
  );
}
