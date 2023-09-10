import { api } from "@/utils/api";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { useSession, signIn, signOut } from "next-auth/react";

const Header: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <Flex
      justify={"space-between"}
      align={"center"}
      w={"100vw"}
      p={"5"}
      as="section"
      boxShadow={"lg"}
    >
      <div>
        <p>{sessionData && <span>Notes for {sessionData.user?.name}</span>}</p>
      </div>
      <Flex flexDir={"row"} gap={3}>
        <Image
          width={"10"}
          rounded={"full"}
          src={sessionData?.user?.image ?? ""}
          alt={sessionData?.user?.name ?? ""}
        />
        <Button
          _active={{ transform: "scale(0.95)" }}
          shadow={"lg"}
          onClick={sessionData ? () => void signOut() : () => void signIn()}
        >
          {sessionData ? "Sign out" : "Sign in"}
        </Button>
      </Flex>
    </Flex>
  );
};

export default Header;
