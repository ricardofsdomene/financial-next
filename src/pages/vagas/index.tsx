import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  Text,
  Checkbox,
  useBreakpointValue,
  Spinner,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { RiAddLine, RiCloseCircleFill } from "react-icons/ri";
import { useQuery } from "react-query";

import dateformat, { i18n } from "dateformat";

import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import { api } from "../../services/apiClient";
import { AuthContext } from "../../contexts/AuthContext";

export default function UserList() {
  const { refresh } = useContext(AuthContext);
  const [page, setPage] = useState(1);

  const [vagas, setVagas] = useState([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [selected, setSelected] = useState([]);

  i18n.dayNames = [
    "Dom",
    "Seg",
    "Ter",
    "Qua",
    "Qui",
    "Sex",
    "Sáb",
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];

  i18n.monthNames = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  async function getVagas() {
    await api.get("/core/vagas").then((res) => {
      setVagas(res.data.docs);
    });
  }

  useEffect(() => {
    getVagas();
  }, [refresh]);

  const toast = useToast();

  async function deleteVaga(id) {
    await api
      .delete(`/core/vaga/${id}`)
      .then(() => {
        toast({
          title: "Deletada com sucesso",
          status: "success",
          duration: 1000,
          isClosable: true,
        });
      })
      .finally(() => {
        getVagas();
      });
  }

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my={["6"]} maxWidth={1480} mx="auto" px="2">
        <Box flex="1" borderRadius={8} bg="#eee" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" color="#333" fontWeight="normal">
              Vagas
            </Heading>

            <Flex>
              {selected.length > 0 && (
                <Button
                  onClick={() => {
                    onOpen();
                  }}
                  cursor="pointer"
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  leftIcon={<Icon as={RiCloseCircleFill} fontSize="20" />}
                >
                  Deletar {selected.length}
                </Button>
              )}
            </Flex>
          </Flex>

          {!vagas ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px="6" color="gray.300" width="8">
                      <Checkbox colorScheme="pink" disabled />
                    </Th>
                    <Th fontSize="md">Empresa</Th>
                    <Th fontSize="md">Tipo</Th>
                    <Th fontSize="md">Cargo</Th>
                    <Th fontSize="md">Formato</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                    <Th width="8"></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {vagas.map((vaga, i) => {
                    return (
                      <Tr key={i}>
                        <Td px={["6"]}>
                          <Checkbox
                            colorScheme="pink"
                            onChange={(e) => {
                              if (selected.includes(vaga._id)) {
                                let filtered = selected.filter(
                                  (item) => item !== vaga._id
                                );
                                setSelected(filtered);
                              } else {
                                setSelected([...selected, vaga._id]);
                              }
                            }}
                          />
                        </Td>
                        <Td>
                          <Box>
                            <Text fontWeight="bold" color="#333">
                              {vaga.empresa.name}
                            </Text>
                          </Box>
                        </Td>
                        <Td>
                          <Box>
                            <Text color="#333">{vaga.tipo}</Text>
                          </Box>
                        </Td>
                        <Td>
                          <Box>
                            <Text color="#333">{vaga.cargo}</Text>
                          </Box>
                        </Td>
                        <Td>
                          <Box>
                            <Text color="#333">{vaga.formato}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && (
                          <Td color="#333">
                            {dateformat(
                              vaga.createdAt,
                              "ddd dd mmm yyyy HH:MM:ss"
                            )}
                          </Td>
                        )}
                      </Tr>
                    );
                  })}
                </Tbody>
              </Table>

              {/* <Pagination
                totalCountOfRegisters={data.length}
                currentPage={page}
                onPageChange={setPage}
              /> */}
            </>
          )}
        </Box>
      </Flex>
      <Modal isCentered={true} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="md" fontWeight="bold" color="#333">
            <Text fontSize="2xl" fontWeight="bold" color="#000">
              Você tem certeza?
            </Text>
            <Text fontSize="md" color="#333">
              Sua ação será irreversivel
            </Text>
          </ModalHeader>
          <ModalCloseButton bg="#eee" color="#333" />
          <ModalBody></ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Cancelar
            </Button>
            <Button
              onClick={() => {
                selected.map((s, i) => {
                  deleteVaga(s);
                });
                onClose();
                setSelected([]);
              }}
              bg="tomato"
              color="#FFF"
            >
              Deletar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
