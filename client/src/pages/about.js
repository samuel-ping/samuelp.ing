import Head from "next/head";
import NextLink from "next/link";

import {
  Avatar,
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";

import AboutCard from "../components/AboutCard";
import { getFileContent } from "../lib/api";

export default function About({ aboutMe }) {
  return (
    <>
      <Head>
        <title>Samuel Ping | About Me</title>
      </Head>
      <Box
        height="100%"
        // justify="center"
        align="center"
        // justifyContent="center"
        // alignItems="center"
      >
        <Heading>About Me</Heading>
        <Avatar size="2xl" />
        <AboutCard description={aboutMe} />
        <Link as={NextLink} href="/">
          <a>Back to home</a>
        </Link>
      </Box>
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
