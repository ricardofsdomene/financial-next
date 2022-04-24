import {
  Button,
  Divider,
  Flex,
  Heading,
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
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

export default function Auth() {
  const { user, signIn, signUp } = useContext(AuthContext);

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
    <Flex
      align="center"
      justify="center"
      mx="auto"
      h={size.height}
      py="10"
      maxW={isWideVersion ? 1480 : 350}
    >
      {user ? (
        <Flex justify="center" align="center" h="100%">
          <Spinner size="xl" color="facebook.400" />
        </Flex>
      ) : (
        <>
          <Flex
            zIndex="1"
            flexDir="column"
            justifyContent="space-between"
            h="100%"
          >
            <Flex flexDir="column">
              <Text fontSize="4xl" color="#000" fontFamily="sans-serif">
                Seja bem-vindo(a) ao seu Portal Financeiro
              </Text>
              <Text fontSize="lg" fontFamily="sans-serif" color="#333">
                Em seguida, você irá fornecer alguns dados sobre você, suas
                informações de contato.
              </Text>
            </Flex>

            <Flex flexDir="column">
              <Flex flexDir="row" mt="4" align="center">
                <Text fontSize="lg" color="#333" fontFamily="sans-serif">
                  Se você já possui conta
                </Text>
                <Text
                  onClick={() => {
                    setLogin(true);
                    onOpen();
                  }}
                  fontSize="lg"
                  ml="1.5"
                  color="facebook.400"
                  cursor="pointer"
                  fontFamily="sans-serif"
                >
                  entrar agora
                </Text>
              </Flex>
              <Button as={Flex} flexDir="row" mt="5" bg="#FFF" p="7">
                <Img
                  src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-suite-everything-you-need-know-about-google-newest-0.png"
                  h="30"
                  w="30"
                />
                <Text fontSize="md" color="#000" fontFamily="sans-serif" ml="3">
                  Continuar com Google
                </Text>
              </Button>
              <Text
                fontSize="sm"
                w="100%"
                color="#333"
                textAlign="center"
                mt="3"
              >
                ou
              </Text>
              <Button
                as={Flex}
                onClick={onOpen}
                flexDir="row"
                mt="3"
                bg="facebook.400"
                p="7"
              >
                <Text fontSize="md" color="#FFF" fontFamily="sans-serif" ml="3">
                  Continuar com e-mail
                </Text>
              </Button>
            </Flex>
          </Flex>

          <Modal
            isOpen={isOpen}
            onClose={() => {
              setEmail("");
              setPassword("");
              setName("");
              setLogin(false);
              onClose();
            }}
            isCentered={isWideVersion}
            size={isWideVersion ? "md" : "xs"}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader color="#000">
                {login ? "Entrar agora" : "Conecte-se agora"}
              </ModalHeader>
              <ModalCloseButton bg="#eee" color="#000" />
              <ModalBody>
                {!login && (
                  <>
                    <Text color="green.800">Nome Completo</Text>
                    <Input
                      borderRadius="5"
                      bg="#fff"
                      color="#333"
                      onChange={(e) => setName(e.target.value)}
                    />
                  </>
                )}
                <Text color="green.800" mt="3">
                  Email
                </Text>
                <Input
                  borderRadius="5"
                  bg="#fff"
                  color="#333"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Text color="green.800" mt="3">
                  {login ? "Sua senha" : "Senha (8 ou mais caracteres)"}
                </Text>
                <Input
                  borderRadius="5"
                  bg="#fff"
                  type="password"
                  color="#333"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Text color="green.800" mt="3" fontSize="xs">
                  Ao clicar em continuar você concorda com os termos de uso e
                  politica de privacidade.
                </Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  onClick={() => {
                    if (login) {
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
                    } else {
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
                    }
                  }}
                  bg="facebook.400"
                  w="100%"
                >
                  Continuar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      )}
    </Flex>
  );
}
