import Head from "next/head";
import NextLink from "next/link";

import { Container, Heading, Link, Text } from "@chakra-ui/react";

import AboutCard from "../components/AboutCard";
import { getFileContent } from "../lib/api";

export default function About({ aboutMe }) {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>

      <Heading>About Me</Heading>
      <AboutCard description={aboutMe} />

      <Link as={NextLink} href="/">
        <a>Back to home</a>
      </Link>
    </>
  );
}

export async function getStaticProps() {
  const aboutMeContent = getFileContent("about/about-me.md");
  return {
    props: {
      aboutMe: aboutMeContent.content,
    },
  };
}
