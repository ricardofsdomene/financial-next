import { Box, Button, Flex, Icon, Input } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";

export function SearchBox({ isWideVersion }) {
  const [search, setSearch] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  return (
    <Flex
      as="label"
      h={53}
      w={!isWideVersion ? "90%" : 300}
      mr={!isWideVersion && 3}
      align="center"
      alignSelf="center"
      color="gray.200"
      bg="#e0e0e0"
      borderRadius="12"
    >
      <Input
        color="#333"
        variant="unstyled"
        fontSize="sm"
        px="4"
        mr="4"
        w="95%"
        placeholder="Buscar na plataforma"
        _placeholder={{ color: "gray.400" }}
        ref={searchInputRef}
      />
      <Button cursor="pointer" bg="#e9e9e9" borderWidth={1} borderColor="#d3d3d3" borderRadius="12" h="53" px="5" alignItems="center" justifyContent="center">
        <Icon as={RiSearchLine} color="#333" fontSize="20" />
      </Button>
    </Flex>
  );
}
