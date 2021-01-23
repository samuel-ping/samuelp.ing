import Head from "next/head";
import NextLink from "next/link";

import { Container, Heading, Link, Text } from "@chakra-ui/react";

import { getFileContent } from "../lib/api";

export default function About({ aboutMe }) {
  return (
    <>
      <Head>
        <title>About Me</title>
      </Head>
      <Heading>About Me</Heading>
      <Text>
        {aboutMe}
        {"\n"}hello
      </Text>
      <h2>
        <Link as={NextLink} href="/">
          <a>Back to home</a>
        </Link>
      </h2>
    </>
  );
}

export async function getStaticProps() {
  const aboutMeContent = getFileContent("about-me.md");
  console.log(aboutMeContent.data);
  return {
    props: {
      aboutMe: aboutMeContent.data.description,
    },
  };
}
