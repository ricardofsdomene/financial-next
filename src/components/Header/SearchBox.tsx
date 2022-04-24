import { Box, Flex, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox() {
  const [search, setSearch] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      h={43}
      px="1"
      ml="6"
      pr="4"
      w="300"
      align="center"
      alignSelf="center"
      color="gray.200"
      bg="#e0e0e0"
      borderRadius="full"
    >
      <Input
        color="#333"
        variant="unstyled"
        fontSize="sm"
        px="4"
        mr="4"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
        ref={searchInputRef}
      />
      <Flex cursor="pointer" align="center" justify="center">
        <Icon as={RiSearchLine} color="#333" fontSize="20" />
      </Flex>
    </Flex>
  );
}
