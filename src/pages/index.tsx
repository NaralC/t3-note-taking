import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";

import { api } from "@/utils/api";
import Header from "./components/header";

const Home: React.FC = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Flex flexDir={"column"} justify={"center"} align={"center"} h={"100vh"}>
        <Text>
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </Text>
      </Flex>
    </>
  );
};

export default Home;
