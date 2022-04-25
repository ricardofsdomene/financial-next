import React from "react";
import { Text, Flex, Button } from "@chakra-ui/react";

export default function NotFound() {
  return (
    <Flex
      flex="1"
      flexDir="row"
      justifyContent="center"
      alignItems="center"
      h="100vh"
      w="100vw"
      bg="#e0e0e0"
    >
      <Flex flexDir="column">
        <Text fontSize="5xl" color="#000">
          404
        </Text>
        <Text fontSize="2xl" color="#000">
          Algo deu
        </Text>
        <Text fontSize="3xl" fontWeight="bold" color="#000">
          errado
        </Text>
        <Button bg="green" w="300" justifyContent="center" alignItems="center">
          <Text fontSize="3xl" fontWeight="bold" color="#FFF">
            Voltar para a pagina inicial
          </Text>
        </Button>
      </Flex>
    </Flex>
  );
}
