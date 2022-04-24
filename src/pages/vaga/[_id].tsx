import { GetServerSideProps } from "next";

import {
  Box,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Flex,
  Img,
  SimpleGrid,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";

import React, { useContext, useEffect, useState } from "react";
import { Sidebar } from "../../components/Sidebar";
import { AuthContext } from "../../contexts/AuthContext";
import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import axios from "axios";

export default function Index() {
  const { user } = useContext(AuthContext);

  const router = useRouter();
  const { _id } = router.query;

  const [empresaName, setEmpresaName] = useState("");
  const [empresaId, setEmpresaId] = useState("");
  const [empresaAvatar, setEmpresaAvatar] = useState("");
  const [createdAt, setCreatedAt] = useState("");
  const [tipo, setTipo] = useState("");
  const [cargo, setCargo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [formato, setFormato] = useState("");
  const [localidade, setLocalidade] = useState("");
  const [requisitos, setRequisitos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [beneficios, setBeneficios] = useState([]);

  async function fetchVaga() {
    await axios
      .get(`http://localhost:5556/core/vaga/${_id}`)
      .then((response) => {
        console.log(response.data);
        setDescricao(response.data.descricao);
        setEmpresaName(response.data.empresa.name);
        setEmpresaAvatar(response.data.empresa.avatar);
        setEmpresaId(response.data.empresa._id);
        setCreatedAt(response.data.createdAt);
        setTipo(response.data.tipo);
        setCargo(response.data.cargo);
        setFormato(response.data.formato);
        setLocalidade(response.data.localidade);
        setRequisitos(response.data.requisitos);
        setHabilidades(response.data.habilidades);
        setBeneficios(response.data.beneficios);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }

  useEffect(() => {
    fetchVaga();
  }, []);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex direction="column" h="100vh">
      <Header />

      <Flex w="100vw" maxWidth={1480} mx="auto" px="6" pb="6">
        <Flex flexDir="column" w="100%">
          <Breadcrumb mb="4" mt={-3}>
            <BreadcrumbItem cursor="pointer" color="#EEE">
              <Text color="#EEE" fontSize="lg">
                Vaga
              </Text>
            </BreadcrumbItem>

            <BreadcrumbItem color="#EEE" isCurrentPage>
              <Text color="#FFF" fontSize="lg" fontWeight="bold">
                {cargo + " em " + empresaName}
              </Text>
            </BreadcrumbItem>
          </Breadcrumb>
          <Box p={["6", "8"]} bg="gray.800" borderRadius={8}>
            <Flex flexDir="row" justifyContent="space-between">
              <Img
                src="data:image/png;base64,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"
                h="66"
                w="66s"
                borderRadius="5"
                mb="4"
              />
              <div style={{ cursor: "pointer" }}>
                <Text fontSize="2xl" mb="4">
                  ...
                </Text>
              </div>
            </Flex>
            <Text fontSize="4xl" color="facebook.200">
              {cargo}
            </Text>
            <Flex>
              <Text mb="4" fontSize="4xl" color="facebook.200">
                em
              </Text>
              <Text
                mb="4"
                ml="2"
                fontSize="4xl"
                color="facebook.200"
                fontWeight="bold"
              >
                {empresaName}
              </Text>
            </Flex>
            <Text fontSize="xl" color="#FFF">
              {descricao}
            </Text>
            <Text mt="6" fontSize="xs" color="facebook.200">
              Tags
            </Text>
            <Flex flexDir="row" mt="2">
              {tipo && (
                <div
                  style={{
                    marginRight: 10,
                    backgroundColor: "#FFF",
                    padding: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text fontSize="xs" color="#333">
                    {tipo}
                  </Text>
                </div>
              )}
              {formato && (
                <div
                  style={{
                    marginRight: 10,
                    backgroundColor: "#FFF",
                    padding: 10,
                    paddingLeft: 15,
                    paddingRight: 15,
                    borderRadius: 5,
                  }}
                >
                  <Text fontSize="xs" color="#333">
                    {formato}
                  </Text>
                </div>
              )}
            </Flex>
            <Text mt="6" fontSize="xs" color="facebook.200">
              Requisitos
            </Text>
            <Flex flexDir="row" mt="2">
              {requisitos && (
                <>
                  {requisitos.map((item, i) => {
                    return (
                      <div
                        style={{
                          marginRight: 10,
                          backgroundColor: "#FFF",
                          padding: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          borderRadius: 5,
                        }}
                      >
                        <Text fontSize="xs" color="#333">
                          {item}
                        </Text>
                      </div>
                    );
                  })}
                </>
              )}
            </Flex>
            <Text mt="6" fontSize="xs" color="facebook.200">
              Beneficios
            </Text>
            <Flex flexDir="row" mt="2">
              {beneficios && (
                <>
                  {beneficios.map((item, i) => {
                    return (
                      <div
                        style={{
                          marginRight: 10,
                          backgroundColor: "#FFF",
                          padding: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          borderRadius: 5,
                        }}
                      >
                        <Text fontSize="xs" color="#333">
                          {item}
                        </Text>
                      </div>
                    );
                  })}
                </>
              )}
            </Flex>
            <Text mt="6" fontSize="xs" color="facebook.200">
              Habilidades
            </Text>
            <Flex flexDir="row" mt="2">
              {habilidades && (
                <>
                  {habilidades.map((item, i) => {
                    return (
                      <div
                        style={{
                          marginRight: 10,
                          backgroundColor: "#FFF",
                          padding: 10,
                          paddingLeft: 15,
                          paddingRight: 15,
                          borderRadius: 5,
                        }}
                      >
                        <Text fontSize="xs" color="#333">
                          {item}
                        </Text>
                      </div>
                    );
                  })}
                </>
              )}
            </Flex>
            <Flex flexDir="row" mt="6" justifyContent="space-between">
              <Button bg="facebook.400" h="50" w="100%">
                <Text color="#FFF" fontSize="md">
                  Aplicar agora
                </Text>
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
