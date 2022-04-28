import {
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  Img,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  useBreakpointValue,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Auth() {
  const { user, signIn, signUp, refresh } = useContext(AuthContext);

  const router = useRouter();
  const toast = useToast();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const { isOpen, onOpen, onClose } = useDisclosure();
  const size = useWindowSize();

  const [login, setLogin] = useState(false);

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function useWindowSize() {
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      if (typeof window !== "undefined") {
        window.addEventListener("resize", handleResize);

        handleResize();

        return () => window.removeEventListener("resize", handleResize);
      }
    }, []);
    return windowSize;
  }

  return (
    <Flex maxH={size.height} h="100vh" bg="#eee">
      {user ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner size="xl" color="facebook.400" />
        </Flex>
      ) : (
        <>
          <Flex zIndex="1" flexDir="row" justifyContent="space-between">
            {isWideVersion && (
              <Flex
                flexDir="column"
                bg="#7034C6"
                h="100vh"
                w={isWideVersion ? "50vw" : "100vw"}
                justifyContent="center"
                alignItems="center"
              >
                <Text fontSize="6xl" width={350} fontWeight="bold" color="#FFF">
                  FinancialCo
                </Text>
                <Text fontSize="lg" mt={-3} width={350} color="#FFF">
                  A plataforma do mercado financeiro.
                </Text>
              </Flex>
            )}
            {login ? (
              <Flex
                style={{ padding: 10 }}
                flexDir="column"
                bg="#eee"
                h="100vh"
                w={isWideVersion ? "50vw" : "100vw"}
                justifyContent="center"
                alignItems="center"
              >
                <Flex flexDir="column" mt={isWideVersion ? 0 : -20}>
                  <Image
                    mt={-10}
                    ml={-8}
                    src="http://161.35.102.170:5556/images/logo.png"
                    width={100}
                    height={100}
                  />
                  <Text
                    fontSize={["2xl", "3xl", "4xl"]}
                    fontWeight="bold"
                    color="#333"
                  >
                    Entrar na sua conta
                  </Text>
                  <Text fontSize={["md", "lg"]} color="#333" mb={3}>
                    Estavamos esperando por voce
                  </Text>
                  <Text color="#333" fontWeight="bold" mt="3">
                    Email
                  </Text>
                  <Input
                    height={50}
                    borderRadius="full"
                    bg="#fff"
                    mt="2"
                    color="#333"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#333" fontWeight="bold" mt="3">
                      Sua senha
                    </Text>
                    <Text color="#7034C6" fontWeight="bold" mt="3" mr="3">
                      Esqueceu sua senha?
                    </Text>
                  </Flex>
                  <Input
                    height={50}
                    borderRadius="full"
                    bg="#fff"
                    type="password"
                    mt="2"
                    color="#333"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Text color="#333" mt="6" fontSize="xs">
                    Ao clicar em Continuar você concorda com os termos de uso e
                    politica de privacidade.
                  </Text>
                  <Button
                    onClick={() => {
                      signIn({ email, password }).then((res) => {
                        let desc = JSON.stringify(res).replace(/['"]+/g, "");
                        if (desc === "Usuario autenticado com sucesso") {
                          toast({
                            description: desc,
                            status: "success",
                            duration: 2000,
                          });
                        } else {
                          toast({
                            description: desc,
                            status: "error",
                            duration: 2000,
                          });
                        }
                      });
                    }}
                    height={50}
                    mt="3"
                    bg="#7034C6"
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text color="#FFF" fontSize="lg">
                      Continuar
                    </Text>
                  </Button>
                  <Button
                    onClick={() => {
                      setLogin(!login);
                    }}
                    height={50}
                    mt="2"
                    bg="transparent"
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text color="#7034C6" fontSize="lg">
                      Clique aqui se voce ainda nao e registrado
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            ) : (
              <Flex
                style={{ padding: 10 }}
                flexDir="column"
                bg="#eee"
                h="100vh"
                w={isWideVersion ? "50vw" : "100vw"}
                justifyContent="center"
                alignItems="center"
              >
                <Flex flexDir="column" mt={isWideVersion ? 0 : -20}>
                  <Image
                    mt={-10}
                    ml={-8}
                    src="http://161.35.102.170:5556/images/logo.png"
                    width={100}
                    height={100}
                  />
                  <Text
                    fontSize={["2xl", "3xl", "4xl"]}
                    fontWeight="bold"
                    color="#333"
                  >
                    Vamos criar sua conta
                  </Text>
                  <Text fontSize={["md", "lg"]} color="#333" mb={3}>
                    Estavamos esperando por voce
                  </Text>
                  <Text color="#333" fontWeight="bold" mt="3">
                    Nome Completo
                  </Text>
                  <Input
                    height={50}
                    borderRadius="full"
                    bg="#fff"
                    mt="2"
                    color="#333"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <Text color="#333" fontWeight="bold" mt="3">
                    Email
                  </Text>
                  <Input
                    height={50}
                    borderRadius="full"
                    bg="#fff"
                    mt="2"
                    color="#333"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <Flex justifyContent="space-between">
                    <Text color="#333" fontWeight="bold" mt="3">
                      Senha (8 ou mais caracteres)
                    </Text>
                    {login && (
                      <Text color="#7034C6" fontWeight="bold" mt="3" mr="3">
                        Esqueceu sua senha?
                      </Text>
                    )}
                  </Flex>
                  <Input
                    height={50}
                    borderRadius="full"
                    bg="#fff"
                    type="password"
                    mt="2"
                    color="#333"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Text color="#333" mt="6" fontSize="xs">
                    Ao clicar em Continuar você concorda com os termos de uso e
                    politica de privacidade.
                  </Text>
                  <Button
                    onClick={() => {
                      signUp({ name, email, password }).then((res) => {
                        let desc = JSON.stringify(res).replace(/['"]+/g, "");
                        if (desc === "Usuario autenticado com sucesso") {
                          toast({
                            description: desc,
                            status: "success",
                            duration: 2000,
                          });
                        } else {
                          toast({
                            description: desc,
                            status: "error",
                            duration: 2000,
                          });
                        }
                      });
                    }}
                    height={50}
                    mt="3"
                    bg="#7034C6"
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text color="#FFF" fontSize="lg">
                      Continuar
                    </Text>
                  </Button>
                  <Button
                    onClick={() => {
                      setLogin(true);
                    }}
                    height={50}
                    mt="2"
                    bg="transparent"
                    borderRadius="full"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <Text color="#7034C6" fontSize="lg">
                      Clique aqui se voce ja possui conta
                    </Text>
                  </Button>
                </Flex>
              </Flex>
            )}
          </Flex>
        </>
      )}
    </Flex>
  );
}
