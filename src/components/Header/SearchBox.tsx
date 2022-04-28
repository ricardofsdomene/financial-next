import { Box, Button, Flex, Icon, Input, Text } from "@chakra-ui/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { AuthContext } from "../../contexts/AuthContext";

export function SearchBox({ isWideVersion }) {
  
  const { Search } = useContext(AuthContext);
  
  const [search, setSearch] = useState("");

  const searchInputRef = useRef<HTMLInputElement>(null);

  const db = {
    vagas: [
      {
        _id: 0,
        name: "Vaga 1",
      },
      {
        _id: 1,
        name: "Vaga 2",
      },
    ],
    empresas: [
      {
        _id: 0,
        name: "Empresa 1",
      },
      {
        _id: 1,
        name: "Empresa 2",
      },
    ],
    users: [
      {
        _id: 0,
        name: "User 1",
      },
      {
        _id: 1,
        name: "User 2",
      },
    ],
  };

  // const [searchParam, setSearchParam] = useState("");

  // const handleSearch = () => {
  //   if (!searchParam) {
  //     console.log("Nao foi possivel iniciar a busca");
  //   } else {
  //   }
  // };

  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    Search(search);
  }, [search])


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
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setSearch(e.target.value);
          setShowResults(true);
        }}
        onBlur={() => {
          setShowResults(false);
        }}
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
      <Button
        cursor="pointer"
        bg="#e9e9e9"
        borderWidth={1}
        borderColor="#d3d3d3"
        borderRadius="12"
        h="53"
        px="5"
        alignItems="center"
        justifyContent="center"
      >
        <Icon as={RiSearchLine} color="#333" fontSize="20" />
      </Button>
    </Flex>
  );
}
