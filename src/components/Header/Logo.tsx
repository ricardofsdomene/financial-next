import { Text, Flex, Image } from "@chakra-ui/react";
import { useRouter } from "next/router";

// ...later
export function Logo() {
  const router = useRouter();

  return (
    <Flex
      cursor="pointer"
      onClick={() => {
        router.push("/");
      }}
      flexDir="row"
      align="flex-end"
    >
      <Image
        src="http://161.35.102.170:5556/images/logo.png"
        w="45"
        h="45"
        mr="2"
      />
    </Flex>
  );
}
