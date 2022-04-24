import { Button, Flex, Input, Text, useToast } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { api } from "../../services/apiClient";

export default function CRUD() {
  const [vagas, setVagas] = useState([]);
  const [response, setResponse] = useState({});

  // addVaga params
  const [cargo, setCargo] = useState("");
  const [tipo, setTipo] = useState("");
  const [descricao, setDescricao] = useState("");
  const [formato, setFormato] = useState("");
  const [localidade, setLocalidade] = useState("");

  const [requisito, setRequisito] = useState("");
  const [requisitos, setRequisitos] = useState([]);
  const [habilidade, setHabilidade] = useState("");
  const [habilidades, setHabilidades] = useState([]);
  const [beneficio, setBeneficio] = useState("");
  const [beneficios, setBeneficios] = useState([]);

  const requisitoRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const habilidadeRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const beneficioRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const toast = useToast();

  async function deleteVagaById(id) {
    api.delete(`/core/vaga/${id}`).then((res) => {
      toast({
        title: "Vaga delatada com sucesso!",
        status: "success",
        duration: 2000,
      });
      getVagas();
    });
  }

  async function getVagas() {
    api.get("/core/vagas/").then((res) => {
      setVagas(res.data);
    });
  }

  async function addVaga({
    empresa,
    cargo,
    tipo,
    descricao,
    formato,
    requisitos,
    habilidades,
    beneficios,
    localidade,
  }) {
    await api
      .post("/core/vaga", {
        empresa,
        cargo,
        tipo,
        descricao,
        formato,
        requisitos,
        habilidades,
        beneficios,
        localidade,
      })
      .then((res) => {
        setResponse(res.data);
      });
  }

  useEffect(() => {
    getVagas();
  }, []);

  const empresa = {
    name: "Minha",
    description: "Empresa",
    avatar: "https://github.com/ricardofsdomene.png",
  };

  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100vw"
      justify="center"
      align="center"
      bg="#333"
    >
      <Input
        placeholder="Cargo"
        w="300"
        mb="3"
        onChange={(e) => setCargo(e.target.value)}
      />
      <Input
        placeholder="Tipo"
        w="300"
        mb="3"
        onChange={(e) => setTipo(e.target.value)}
      />
      <Input
        placeholder="Descricao"
        w="300"
        mb="3"
        onChange={(e) => setDescricao(e.target.value)}
      />
      <Input
        placeholder="Formato"
        w="300"
        mb="3"
        onChange={(e) => setFormato(e.target.value)}
      />
      <Input
        placeholder="Localidade"
        w="300"
        mb="3"
        onChange={(e) => setLocalidade(e.target.value)}
      />
      <Input
        ref={requisitoRef}
        placeholder="Requisitos"
        w="300"
        mb="3"
        onChange={(e) => setRequisito(e.target.value)}
      />
      <Button
        mb="3"
        onClick={() => {
          requisitoRef.current.value = "";
          setRequisitos([...requisitos, requisito]);
        }}
        bg="#FFF"
      >
        <Text color="#000">Adicionar Requisito</Text>
      </Button>
      <Input
        placeholder="Habilidades"
        ref={habilidadeRef}
        onChange={(e) => setHabilidade(e.target.value)}
        w="300"
        mb="3"
      />
      <Button
        mb="3"
        onClick={() => {
          habilidadeRef.current.value = "";
          setHabilidades([...habilidades, habilidade]);
        }}
        bg="#FFF"
      >
        <Text color="#000">Adicionar Habilidade</Text>
      </Button>
      {beneficios && (
        <>
          {beneficios.map((beneficio, i) => {
            return (
              <Text mr="4" color="#000">
                {beneficio}
              </Text>
            );
          })}
        </>
      )}
      <Input
        placeholder="Beneficios"
        ref={beneficioRef}
        onChange={(e) => setBeneficio(e.target.value)}
        w="300"
        mb="3"
      />
      <Button
        mb="3"
        onClick={() => {
            setBeneficios([...beneficios, beneficio]);
            beneficioRef.current.value = "";
        }}
        bg="#FFF"
      >
        <Text color="#000">Adicionar Beneficio</Text>
      </Button>
      <Button
        onClick={() => {
          addVaga({
            empresa,
            cargo,
            tipo,
            descricao,
            formato,
            requisitos,
            habilidades,
            beneficios,
            localidade,
          });
        }}
        bg="#FFF"
      >
        <Text color="#000">Adicionar vaga</Text>
      </Button>
      <Text mt="5" color="#FFF">
        Vagas
      </Text>
      {vagas.length > 0 && (
        <>
          {vagas.map((vaga, i) => {
            return (
              <>
                <Text mr="4">{vaga.cargo}</Text>
                <Button
                  onClick={() => {
                    deleteVagaById(vaga._id);
                  }}
                  bg="#FFF"
                >
                  <Text color="#000">Remover vaga {vaga.cargo}</Text>
                </Button>
              </>
            );
          })}
        </>
      )}
      <Text color="#FFF">{JSON.stringify(response)}</Text>
    </Flex>
  );
}
