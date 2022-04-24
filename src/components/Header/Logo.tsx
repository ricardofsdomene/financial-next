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
        src="https://o.remove.bg/downloads/148544c2-5f48-4644-be6e-3c3c308b5a0d/261881421_1064345797700830_7399230850028812294_n-removebg-preview.png"
        w="45"
        h="45"
      />
    </Flex>
  );
}
