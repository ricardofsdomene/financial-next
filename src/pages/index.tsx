import { GetServerSideProps } from "next";

import {
  Box,
  Button,
  ButtonGroup,
  Editable,
  EditableInput,
  EditablePreview,
  Flex,
  Icon,
  IconButton,
  Img,
  Input,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  useDisclosure,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  SimpleGrid,
  Spinner,
  Text,
  useBreakpointValue,
  useEditableControls,
  useEditableState,
  useToast,
  Checkbox,
} from "@chakra-ui/react";

import React, { useContext, useEffect, useReducer, useState } from "react";
import { Filter } from "../components/Filter";
import { AuthContext } from "../contexts/AuthContext";
import { Header } from "../components/Header";
import { useRouter } from "next/router";
import axios from "axios";
import { api } from "../services/apiClient";
import {
  FiChevronDown,
  FiChevronUp,
  FiCheck,
  FiEdit2,
  FiTrash2,
} from "react-icons/fi";
import { RiCloseFill } from "react-icons/ri";
import { GoSettings } from "react-icons/go";
import { SearchBox } from "../components/Header/SearchBox";

export default function Index() {
  const { user, signOut } = useContext(AuthContext);

  const [vagas, setVagas] = useState([]);
  const [, forceUpdate] = useReducer((x) => x + 1, 0);

  const [showTipo, setShowTipo] = useState(true);
  const [tipo, setTipo] = useState("");

  const [showExperience, setShowExperience] = useState(false);
  const [experience, setExperience] = useState("");

  const [showFormato, setShowFormato] = useState(false);
  const [formato, setFormato] = useState("");

  const [showData, setShowData] = useState(false);
  const [data, setData] = useState("");

  const router = useRouter();
  const toast = useToast();

  const [isEditing, setIsEditing] = useState("");

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
    lg: true,
  });

  async function fetchVagas() {
    await api
      .get(`/core/vagas`)
      .then((response) => {
        setVagas(response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(() => {
    fetchVagas();
  }, []);

  function Tipo() {
    const tipos = ["tempo Integral", "meio periodo", "temporario", "outros"];

    return (
      <Flex flexDir="column" w="100%">
        <Flex
          onClick={() => setShowTipo(!showTipo)}
          cursor="pointer"
          flexDir="row"
          align="center"
          justifyContent="space-between"
          w="100%"
        >
          <Text color="#000" fontWeight="bold" fontSize="md">
            Tipo da vaga
          </Text>
          <Icon
            as={showTipo ? FiChevronUp : FiChevronDown}
            color="#000"
            size={20}
          />
        </Flex>

        {showTipo && (
          <>
            {tipos.map((item, i) => {
              return (
                <Flex
                  onClick={() => setTipo(item)}
                  cursor="pointer"
                  mt="3"
                  flexDir="row"
                  align="center"
                  w="100%"
                >
                  <Checkbox color="facebook.400" isChecked={item === tipo} />
                  <Text color="#333" ml="3" mt="0.5" fontSize="sm">
                    {item}
                  </Text>
                </Flex>
              );
            })}
          </>
        )}
      </Flex>
    );
  }

  function Experience() {
    const datas = [
      "primeiro estágio",
      "1 ano de experiência",
      "2 anos de experiência",
      "outros",
    ];

    return (
      <Flex flexDir="column" w="100%" mt="5">
        <Flex
          onClick={() => setShowExperience(!showExperience)}
          cursor="pointer"
          flexDir="row"
          align="center"
          justifyContent="space-between"
          w="100%"
        >
          <Text color="#000" fontWeight="bold" fontSize="md">
            Experiência
          </Text>
          <Icon
            as={showExperience ? FiChevronUp : FiChevronDown}
            color="#000"
            size={20}
          />
        </Flex>

        {showExperience && (
          <>
            {datas.map((item, i) => {
              return (
                <Flex
                  onClick={() => setExperience(item)}
                  cursor="pointer"
                  mt="4"
                  flexDir="row"
                  align="center"
                  w="100%"
                >
                  <Checkbox
                    color="facebook.400"
                    isChecked={item === experience}
                  />
                  <Text color="#333" ml="3" mt="0.5" fontSize="sm">
                    {item}
                  </Text>
                </Flex>
              );
            })}
          </>
        )}
      </Flex>
    );
  }

  function Formato() {
    const formatos = [
      "presencial",
      "remoto",
      "híbrido",
      "summer job",
      "estágio de férias",
    ];

    return (
      <Flex flexDir="column" w="100%" mt="5">
        <Flex
          onClick={() => setShowFormato(!showFormato)}
          cursor="pointer"
          flexDir="row"
          align="center"
          justifyContent="space-between"
          w="100%"
        >
          <Text color="#000" fontWeight="bold" fontSize="md">
            Formato
          </Text>
          <Icon
            as={showFormato ? FiChevronUp : FiChevronDown}
            color="#000"
            size={20}
          />
        </Flex>

        {showFormato && (
          <>
            {formatos.map((item, i) => {
              return (
                <Flex
                  onClick={() => setFormato(item)}
                  cursor="pointer"
                  mt="4"
                  flexDir="row"
                  align="center"
                  w="100%"
                >
                  <Checkbox color="facebook.400" isChecked={item === formato} />
                  <Text color="#333" ml="3" mt="0.5" fontSize="sm">
                    {item}
                  </Text>
                </Flex>
              );
            })}
          </>
        )}
      </Flex>
    );
  }

  function Data() {
    const datas = [
      "a qualquer momento",
      "últimas 24 horas",
      "última semana",
      "último mês",
    ];

    return (
      <Flex flexDir="column" w="100%" mt="5">
        <Flex
          onClick={() => {
            setShowData(!showData);
          }}
          cursor="pointer"
          flexDir="row"
          align="center"
          justifyContent="space-between"
          w="100%"
        >
          <Text color="#333" fontWeight="bold" fontSize="md">
            Data do anúncio
          </Text>
          <Icon
            as={showData ? FiChevronUp : FiChevronDown}
            color="#000"
            size={20}
          />
        </Flex>

        {showData && (
          <>
            {datas.map((item, i) => {
              return (
                <Flex
                  onClick={() => setData(item)}
                  cursor="pointer"
                  mt="4"
                  flexDir="row"
                  align="center"
                  w="100%"
                >
                  <Checkbox color="facebook.400" isChecked={item === data} />
                  <Text color="#333" ml="3" mt="0.5" fontSize="sm">
                    {item}
                  </Text>
                </Flex>
              );
            })}
          </>
        )}
      </Flex>
    );
  }

  function ListVagas() {
    function EditableControls({ param, value, edited }) {
      const {
        isEditing,
        getSubmitButtonProps,
        getCancelButtonProps,
        getEditButtonProps,
      } = useEditableControls();

      const { onSubmit, onCancel } = useEditableState();

      return isEditing ? (
        <ButtonGroup size="sm">
          <IconButton
            aria-label="Confirmar"
            bg="facebook.400"
            icon={<FiCheck color="#FFF" />}
            {...getSubmitButtonProps()}
            onClick={() => {}}
          />
          <IconButton
            aria-label="Cancelar"
            bg="tomato"
            icon={<RiCloseFill color="#FFF" />}
            {...getCancelButtonProps()}
          />
        </ButtonGroup>
      ) : (
        <Flex justifyContent="center">
          {param === "name" && (
            <IconButton
              onMouseOver={() => {}}
              disabled={edited}
              aria-label="Editar"
              bg="facebook.400"
              size="sm"
              icon={<FiEdit2 color="#FFF" />}
              {...getEditButtonProps()}
            />
          )}
          {param === "email" && (
            <IconButton
              onMouseOver={() => {}}
              disabled={edited}
              aria-label="Editar"
              bg="facebook.400"
              size="sm"
              icon={<FiEdit2 color="#FFF" />}
              {...getEditButtonProps()}
            />
          )}
        </Flex>
      );
    }

    return (
      <>
        {vagas.length === 0 ? (
          <Flex>
            <Text color="#000" fontSize="xl">
              Não conseguimos encontrar nenhuma vaga 😓
            </Text>
          </Flex>
        ) : (
          <SimpleGrid
            flex="1"
            gap="4"
            minChildWidth={320}
            alignItems="flex-start"
          >
            {vagas.map((vaga, id) => {
              return (
                <Box key={id} p={["6", "8"]} bg="#e0e0e0" borderRadius={8}>
                  {isEditing === vaga._id ? (
                    <>
                      <Flex
                        flexDir="row"
                        justifyContent="space-between"
                        align="center"
                      >
                        <Img
                          src="data:image/png;base64,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"
                          h="66"
                          w="66s"
                          borderRadius="5"
                          mb="4"
                        />
                        <div
                          onClick={() =>
                            deleteVaga(vaga._id).then(() => {
                              let vagasFiltered = vagas.filter(
                                (vaga) => vaga !== vaga._id
                              );
                              setVagas(vagasFiltered);
                            })
                          }
                          style={{
                            cursor: "pointer",
                            height: 40,
                            width: 40,
                            borderRadius: 5,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#d9d9d9",
                          }}
                        >
                          <Icon as={FiTrash2} fontSize={20} color="#000" />
                        </div>
                      </Flex>
                      <Text fontSize={["md", "lg"]} color="#555">
                        Empresa
                      </Text>
                      <Text mb="4" fontSize={["md", "lg"]} color="#000">
                        {vaga.empresa.name}
                      </Text>
                      <Text fontSize={["md", "lg"]} mt="2" color="#555">
                        Tipo
                      </Text>
                      <Editable
                        mt={-2}
                        textAlign="center"
                        defaultValue={vaga.tipo}
                        color="#000"
                        fontSize="md"
                        isPreviewFocusable={false}
                      >
                        <Flex
                          flexDir="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <EditablePreview />
                          <Input as={EditableInput} />
                          <div style={{ paddingBottom: 10 }}>
                            <EditableControls
                              value=""
                              param="email"
                              edited={false}
                            />
                          </div>
                        </Flex>
                      </Editable>
                      <Text fontSize={["md", "lg"]} color="#555">
                        Cargo
                      </Text>
                      <Editable
                        mt={-2}
                        textAlign="center"
                        defaultValue={vaga.cargo}
                        color="#000"
                        fontSize="md"
                        isPreviewFocusable={false}
                      >
                        <Flex
                          flexDir="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <EditablePreview />
                          <Input as={EditableInput} />
                          <div style={{ paddingBottom: 10 }}>
                            <EditableControls
                              value=""
                              param="email"
                              edited={false}
                            />
                          </div>
                        </Flex>
                      </Editable>
                      <Text fontSize={["md", "lg"]} mt="2" color="#555">
                        Descrição
                      </Text>
                      <Editable
                        textAlign="left"
                        defaultValue={vaga.descricao}
                        color="#000"
                        fontSize="md"
                        isPreviewFocusable={false}
                      >
                        <Flex
                          flexDir="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <EditablePreview />
                          <Input as={EditableInput} />
                          <div style={{ paddingBottom: 10 }}>
                            <EditableControls
                              value=""
                              param="email"
                              edited={false}
                            />
                          </div>
                        </Flex>
                      </Editable>
                      <Text fontSize={["md", "lg"]} mt="2" color="#555">
                        Formato
                      </Text>
                      <Editable
                        mt={-2}
                        textAlign="center"
                        defaultValue={vaga.formato}
                        color="#000"
                        fontSize="md"
                        isPreviewFocusable={false}
                      >
                        <Flex
                          flexDir="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <EditablePreview />
                          <Input as={EditableInput} />
                          <div style={{ paddingBottom: 10 }}>
                            <EditableControls
                              value=""
                              param="email"
                              edited={false}
                            />
                          </div>
                        </Flex>
                      </Editable>
                      <Text fontSize={["md", "lg"]} mt="2" color="#555">
                        Localidade
                      </Text>
                      <Editable
                        mt={-2}
                        textAlign="center"
                        defaultValue={vaga.localidade}
                        color="#000"
                        fontSize="md"
                        isPreviewFocusable={false}
                      >
                        <Flex
                          flexDir="row"
                          alignItems="center"
                          justifyContent="space-between"
                        >
                          <EditablePreview />
                          <Input as={EditableInput} />
                          <div style={{ paddingBottom: 10 }}>
                            <EditableControls
                              value=""
                              param="email"
                              edited={false}
                            />
                          </div>
                        </Flex>
                      </Editable>
                      <Flex flexDir="row" justifyContent="space-between">
                        <Button
                          onClick={() => {
                            router.push(`/vaga/${vaga._id}`);
                          }}
                          mt="6"
                          bg="facebook.400"
                          h="50"
                          w="100%"
                          mr="2"
                        >
                          <Text color="#FFF" fontSize="md">
                            Ver mais
                          </Text>
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing("");
                          }}
                          mt="6"
                          bg="green"
                          h="50"
                        >
                          <Icon as={FiCheck} color="#FFF" />
                        </Button>
                      </Flex>
                    </>
                  ) : (
                    <>
                      <Flex flexDir="row" justifyContent="space-between">
                        <Img
                          src="data:image/png;base64,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"
                          h="66"
                          w="66s"
                          borderRadius="5"
                          mb="4"
                        />
                        <div style={{ cursor: "pointer" }}>
                          <div
                            style={{
                              cursor: "pointer",
                              height: 40,
                              width: 40,
                              borderRadius: 5,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              backgroundColor: "#d9d9d9",
                            }}
                          >
                            <Icon as={FiTrash2} fontSize={20} color="#000" />
                          </div>
                        </div>
                      </Flex>
                      <Text fontSize={["md", "lg"]} color="#555">
                        Empresa
                      </Text>
                      <Text mb="4" fontSize={["md", "lg"]} color="#000">
                        {vaga.empresa.name}
                      </Text>
                      <Text fontSize={["md", "lg"]} color="#555">
                        Cargo
                      </Text>
                      <Text
                        mb="4"
                        fontSize={["xl", "2xl"]}
                        fontWeight="bold"
                        color="#333"
                      >
                        {vaga.cargo}
                      </Text>
                      <Flex flexDir="row" mt="6">
                        {vaga.tipo && (
                          <div
                            style={{
                              marginRight: 10,
                              backgroundColor: "#d9d9d9",
                              padding: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                              borderRadius: 5,
                            }}
                          >
                            <Text fontSize="xs" color="#333">
                              {vaga.tipo}
                            </Text>
                          </div>
                        )}
                        {vaga.formato && (
                          <div
                            style={{
                              marginRight: 10,
                              backgroundColor: "#d9d9d9",
                              padding: 10,
                              paddingLeft: 15,
                              paddingRight: 15,
                              borderRadius: 5,
                            }}
                          >
                            <Text fontSize="xs" color="#333">
                              {vaga.formato}
                            </Text>
                          </div>
                        )}
                      </Flex>
                      <Flex flexDir="row" justifyContent="space-between">
                        <Button
                          onClick={() => {
                            router.push(`/vaga/${vaga._id}`);
                          }}
                          mt="6"
                          bg="facebook.400"
                          h="50"
                          w="90%"
                          mr="2"
                        >
                          <Text color="#FFF" fontSize="md">
                            Ver mais
                          </Text>
                        </Button>
                        <Button
                          onClick={() => {
                            setIsEditing(vaga._id);
                          }}
                          mt="6"
                          bg="#d0d0d0"
                          h="50"
                        >
                          <Icon as={FiEdit2} color="#000" />
                        </Button>
                      </Flex>
                    </>
                  )}
                </Box>
              );
            })}
          </SimpleGrid>
        )}
      </>
    );
  }

  async function deleteVaga(id) {
    await api
      .delete(`http://localhost:5556/core/vaga/${id}`)
      .then((response) => {
        alert(response.data);
      });
  }

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    useEffect(() => {
      // only execute all the code below in client side
      if (typeof window !== "undefined") {
        // Handler to call on window resize

        // Add event listener
        window.addEventListener("resize", handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener("resize", handleResize);
      }
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Flex direction="column" h="100vh" bg="#eee">
        {!user ? (
          <Flex justify="center" align="center" h="100%">
            <Spinner size="xl" color="facebook.400" />
          </Flex>
        ) : (
          <>
            <Header />

            <Flex w="100vw" bg="#eee" p="4">
              <Flex flexDir="row" w="100%">
                {isWideVersion && <Filter />}
                <Flex
                  flexDir="column"
                  w={size.width >= 1000 ? "70%" : "100%"}
                  maxW={1440}
                >
                  {!isWideVersion && (
                    <Flex justifyContent="space-between" mb="7">
                      <SearchBox isWideVersion={isWideVersion} />
                      <Flex
                        onClick={() => onOpen()}
                        h={53}
                        w={55}
                        borderRadius="5"
                        justifyContent="center"
                        alignItems="center"
                        bg="#e9e9e9"
                        borderWidth={1}
                        borderColor="#d3d3d3"
                      >
                        <Icon as={GoSettings} fontSize={18} color="#333" />
                      </Flex>
                    </Flex>
                  )}
                  <ListVagas />
                </Flex>
                {size.width >= 1200 && (
                  <>
                    {isWideVersion && (
                      <Flex justifyContent="center" width="20%" px="4">
                        <Flex
                          width="100%"
                          borderRadius="12"
                          justifyContent="center"
                          alignItems="center"
                          bg="#e0e0e0"
                          p="4"
                        >
                          <Text color="#000">{size.width}</Text>
                        </Flex>
                      </Flex>
                    )}
                  </>
                )}
              </Flex>
            </Flex>
          </>
        )}
      </Flex>

      <Drawer isOpen={isOpen} placement="bottom" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton bg="#eee" mt="2" mr="2" color="#000" />
          <DrawerHeader color="#333" fontSize="xl">
            Filtre para encontrar sua vaga
          </DrawerHeader>

          <DrawerBody>
            <Tipo />
            <Experience />
            <Formato />
            <Data />
          </DrawerBody>

          <DrawerFooter>
            <Button w="100%" bg="facebook.400" mr={3} onClick={onClose}>
              Filtrar
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  return {
    props: {},
  };
};
