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
        src="http://192.168.1.60:5556/assets/white-logo.png"
        w="45"
        h="45"
        mr="2"
      />
    </Flex>
  );
}
