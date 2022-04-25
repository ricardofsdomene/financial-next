import {
  Input as ChakraInput,
  Flex,
  Text,
  Icon,
  Stack,
  HStack,
  Box,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  Avatar,
  Editable,
  EditablePreview,
  useDisclosure,
  useEditableControls,
  ButtonGroup,
  IconButton,
  EditableInput,
  Button,
  useEditableState,
  useToast,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Heading,
  VStack,
  Divider,
  FormLabel,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { FiCheck, FiEdit2 } from "react-icons/fi";

import { Input } from "../components/form/Input";

import InputMask from "react-input-mask";
import styled from "styled-components";

import {
  RiBookmarkFill,
  RiCloseFill,
  RiNotificationLine,
  RiSearchLine,
  RiArrowLeftFill,
  RiLogoutBoxRLine,
  RiSettings5Line,
  RiArrowDropDownFill,
  RiUserAddLine,
  RiUserFill,
  RiShieldUserLine,
} from "react-icons/ri";

import { AuthContext } from "../contexts/AuthContext";
import { Logo } from "./Header/Logo";
import { Notifications } from "./Header/NotificationsNav";
import { Profile } from "./Header/Profile";
import { SearchBox } from "./Header/SearchBox";
import { api } from "../services/apiClient";
import Link from "next/link";

import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useRouter } from "next/router";

export function Header() {
  const { user, updateName, signOut } = useContext(AuthContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [drawer, setDrawer] = useState("Notificações");
  const [profileTab, setProfileTab] = useState("");

  const [alert, setAlert] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

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

  const btnRef = useRef();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const toast = useToast();
  const router = useRouter();

  type CreateVagaFormData = {
    cargo: string;
    tipo: string;
    formato: string;
    descricao: string;
    localidade: string;
    beneficios: string[];
    habilidades: string[];
    requisitos: string[];
  };

  const createVagaFormSchema = yup.object().shape({
    cargo: yup.string().required("Cargo obrigatório"),
    tipo: yup.string().required("Tipo obrigatório"),
    formato: yup.string().required("Formato obrigatório"),
    descricao: yup.string().required("Descrição obrigatória"),
    localidade: yup.string().required("Localidade obrigatório"),
    beneficios: yup.array(),
    habilidades: yup.array(),
    requisitos: yup.array(),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createVagaFormSchema),
  });

  const handleCreateVaga: SubmitHandler<CreateVagaFormData> = async (
    values
  ) => {
    await api
      .post("/core/vaga", {
        empresa: {
          name: "My company",
          _id: "0",
          avatar:
            "https://www.latinfinance.com/media/3939/btg-pactual.png?width=1200",
        },
        cargo: values.cargo,
        tipo: values.tipo,
        descricao: values.descricao,
        formato: values.formato,
        requisitos: values.requisitos,
        habilidades: values.habilidades,
        beneficios: values.beneficios,
        localidade: values.localidade,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Vaga adicionada com sucesso!") {
          console.log(response.data.vaga);
        } else {
          console.log("Tente novamente mais tarde");
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        //
      });
  };

  useEffect(() => {
    if (alert) {
      toast({
        description: alert,
        status: "error",
        duration: 9000,
        isClosable: false,
      });
    }
  }, [alert]);

  useEffect(() => {
    setTimeout(() => {
      localStorage.setItem("nameEdited", "false");
      localStorage.setItem("emailEdited", "false");
    }, 600000); // 10 minutos
  }, []);

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
          onClick={() => {
            updateName({ id: user._id, param, value });
            onSubmit();
            {
              param === "name" && localStorage.setItem("nameEdited", "true");
            }
            {
              param === "email" && localStorage.setItem("emailEdited", "true");
            }
          }}
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
            onMouseOver={() => {
              if (localStorage.getItem("nameEdited") === "true") {
                setAlert("Voce so pode editar seu nome uma vez por semana");
              }
            }}
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
            onMouseOver={() => {
              if (localStorage.getItem("emailEdited") === "true") {
                setAlert("Voce so pode editar seu email uma vez por semana");
              }
            }}
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

  function Header() {
    return (
      <Flex
        mx="auto"
        as="header"
        w="100%"
        bg="#eee"
        py="2.5"
        pr="6"
        justifyContent="space-between"
        pl={!isWideVersion ? "6" : "4"}
        align="center"
      >
        <Logo />

        {isWideVersion && <SearchBox isWideVersion={isWideVersion} />}

        {isWideVersion && (
          <Flex ml="10">
            <Text color="#777" mr="3" cursor="pointer" fontSize="sm">
              Controle de Usuários
            </Text>
            <Text color="#777" mr="3" cursor="pointer" fontSize="sm">
              Controle de Empresas
            </Text>
          </Flex>
        )}

        <Flex align="center" ml="auto">
          <Menu>
            <MenuButton
              boxShadow="none"
              border="0px"
              h={43}
              px="4"
              borderRadius="5"
              as={Button}
              bg="#e0e0e0"
              rightIcon={<RiArrowDropDownFill color="#000" fontSize={20} />}
              mr="2"
            >
              <Text color="#333" fontSize="sm">
                Ações
              </Text>
            </MenuButton>
            <MenuList bg="#eee">
              <MenuItem
                onClick={() => {
                  setDrawer("AddVaga");
                  onOpen();
                }}
                color="#333"
                fontSize="sm"
              >
                Adicionar vaga
              </MenuItem>
              <MenuItem color="#333" fontSize="sm">
                Adicionar empresa
              </MenuItem>
            </MenuList>
          </Menu>
          <Flex
            mr="4"
            borderRightWidth={1}
            borderColor={"#ccc"}
            onClick={() => {
              setDrawer("Notificações");
              onOpen();
            }}
          >
            <Flex
              alignItems="center"
              justifyContent="center"
              borderRadius="5"
              h={43}
              width={43}
              cursor="pointer"
              p="2"
              mr="4"
              bg="#e0e0e0"
            >
              <Icon as={RiNotificationLine} color="#333" fontSize={18} />
            </Flex>
          </Flex>
          <Menu>
            <MenuButton>
              <Profile showProfileData={isWideVersion} />
            </MenuButton>
            <MenuList bg="#eee">
              <MenuItem
                onClick={() => {
                  onOpen();
                  setDrawer("Perfil");
                  setProfileTab("Dados");
                }}
                color="#333"
                fontSize="sm"
              >
                <Icon as={RiShieldUserLine} fontSize={18} color="#333" mr="2" />
                Meu perfil
              </MenuItem>
              <Link href="/vagas/create" passHref>
                <MenuItem color="#333" fontSize="sm">
                  <Icon
                    as={RiSettings5Line}
                    fontSize={18}
                    color="#333"
                    mr="2"
                  />
                  Ajustes
                </MenuItem>
              </Link>
              <MenuItem onClick={() => signOut()} color="#333" fontSize="sm">
                <Icon as={RiLogoutBoxRLine} fontSize={18} color="#333" mr="2" />
                Log out
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    );
  }

  function Perfil() {
    return (
      <div>
        {profileTab === "Dados" ? (
          <div
            style={{
              display: "flex",
              paddingTop: 30,
              flexDirection: "column",
              height: "100%",
            }}
          >
            <Text
              onClick={() => localStorage.setItem("nameEdited", "false")}
              fontSize="2xl"
              color="facebook.400"
            >
              Seu nome
            </Text>
            <Editable
              textAlign="center"
              defaultValue={user.name}
              color="facebook.300"
              fontSize="md"
              isPreviewFocusable={false}
            >
              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <EditablePreview />
                <ChakraInput
                  as={EditableInput}
                  onChange={(e) => setName(e.target.value)}
                />
                <div style={{ width: 20 }} />
                <div style={{ paddingBottom: 10 }}>
                  {localStorage.getItem("nameEdited") === "true" ? (
                    <EditableControls param="name" value={name} edited={true} />
                  ) : (
                    <EditableControls
                      param="name"
                      value={name}
                      edited={false}
                    />
                  )}
                </div>
              </Flex>
            </Editable>
            <Text fontSize="2xl" mt="4" color="facebook.400">
              Seu e-mail
            </Text>
            <Editable
              textAlign="center"
              defaultValue={user.email}
              color="facebook.300"
              fontSize="md"
              isPreviewFocusable={false}
            >
              <Flex
                flexDir="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <EditablePreview />
                <ChakraInput
                  as={EditableInput}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div style={{ width: 20 }} />
                <div style={{ paddingBottom: 10 }}>
                  {localStorage.getItem("emailEdited") === "true" ? (
                    <EditableControls
                      param="email"
                      value={email}
                      edited={true}
                    />
                  ) : (
                    <EditableControls
                      param="email"
                      value={email}
                      edited={false}
                    />
                  )}
                </div>
              </Flex>
            </Editable>
          </div>
        ) : (
          <>
            <Button
              w={120}
              h={120}
              mr="2"
              bg="#d0d0d0"
              cursor="pointer"
              onClick={() => setProfileTab("Dados")}
              borderRadius="5"
              justifyContent="flex-end"
            >
              <Text color="#fff">Minha conta</Text>
            </Button>
          </>
        )}
      </div>
    );
  }

  function Notificacoes() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Text color="#333" textAlign="center">
          Você ainda não possui nenhuma notificação
        </Text>
      </div>
    );
  }

  function SelectEmpresa() {
    const [empresas, setEmpresas] = useState([]);

    useEffect(() => {
      getEmpresas();
    }, []);

    async function getEmpresas() {
      await api.get("/empresa/empresas").then((res) => {
        setEmpresas(res.data.docs);
      });
    }

    return (
      <Flex flexDir="column">
        <Flex
          mt="1"
          as="label"
          h={43}
          w="100%"
          mr={!isWideVersion && 3}
          align="center"
          alignSelf="center"
          color="gray.200"
          bg="#e0e0e0"
          borderRadius="5"
        >
          <ChakraInput
            color="#333"
            variant="unstyled"
            fontSize="sm"
            px="4"
            mr="4"
            w="95%"
            placeholder="Buscar na plataforma"
            _placeholder={{ color: "gray.400" }}
          />
          <Button
            cursor="pointer"
            bg="#e9e9e9"
            borderWidth={1}
            borderColor="#d3d3d3"
            borderRadius="5"
            h="43"
            px="5"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={RiSearchLine} color="#333" fontSize="20" />
          </Button>
        </Flex>
        <Flex flexDir="column" mt="3">
          {empresas.map((e, i) => {
            return (
              <Flex
                borderRadius="5"
                align="center"
                px="5"
                justify="center"
                key={i}
                cursor="pointer"
                width="100%"
                height="43"
                bg="#e0e0e0"
                justifyContent="space-between"
              >
                {/* <Image src={e.avatar} width="33" height="33" /> */}
                <Text color="#000">{e.name}</Text>
              </Flex>
            );
          })}
        </Flex>
      </Flex>
    );
  }

  function AddVagaFooter() {
    return (
      <Button
        width="100%"
        onClick={() => {
          handleCreateVaga({
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
        bg="facebook.400"
      >
        <Text color="#FFF">Adicionar vaga</Text>
      </Button>
    );
  }

  function NotificacoesFooter() {
    return (
      <Button w="100%" variant="outline" bg="facebook.400" onClick={onClose}>
        Fechar
      </Button>
    );
  }

  function PerfilFooter() {
    return (
      <Button
        mt="2"
        w="100%"
        bg="facebook.400"
        onClick={() => {
          if (profileTab === "Dados") {
            onClose();
            setProfileTab("");
          }
          onClose();
        }}
      >
        Fechar
      </Button>
    );
  }

  return (
    <>
      <Header />

      <Drawer
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setProfileTab("");
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#eee">
          <DrawerHeader color="#555">
            {drawer === "SelectEmpresa" && (
              <Flex
                style={{ height: 35, width: 35 }}
                onClick={() => {
                  setDrawer("AddVaga");
                }}
                borderRadius="5"
                p="4"
                mb="3"
                justifyContent="center"
                alignItems="center"
                bg="#e0e0e0"
              >
                <Icon as={RiArrowLeftFill} color="#000" fontSize={16} />
              </Flex>
            )}
            {drawer === "AddVaga"
              ? "Criar uma nova vaga"
              : drawer === "SelectEmpresa"
              ? "Selecionar empresa"
              : drawer}
          </DrawerHeader>
          <Divider />
          <DrawerBody bg="#eee">
            {drawer === "Notificações" && <Notificacoes />}
            {drawer === "Perfil" && <Perfil />}
            {drawer === "SelectEmpresa" && <SelectEmpresa />}
            {drawer === "AddVaga" && (
              <Box
                as="form"
                overflowY="scroll"
                flex="1"
                borderRadius={8}
                onSubmit={handleSubmit(handleCreateVaga)}
              >
                <DrawerCloseButton bg="#e0e0e0" mt="2" mr="2" color="#000" />
                <VStack>
                  {/* <Input
                   name="name"
                   type="text"
                   label="Cargo"
                   error={formState.errors.cargo}
                   {...register("cargo")}
                 /> */}
                  <div style={{ height: 10 }} />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Empresa
                  </FormLabel>
                  <ChakraInput
                    onClick={() => setDrawer("SelectEmpresa")}
                    mb="3"
                    cursor="pointer"
                    placeholder="Selecionar empresa"
                    color="#000"
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Cargo
                  </FormLabel>
                  <ChakraInput
                    mb="3"
                    color="#000"
                    onChange={(e) => setCargo(e.target.value)}
                  />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Tipo
                  </FormLabel>
                  <ChakraInput
                    mb="3"
                    color="#000"
                    onChange={(e) => setTipo(e.target.value)}
                  />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Descrição
                  </FormLabel>
                  <ChakraInput
                    mb="3"
                    color="#000"
                    onChange={(e) => setDescricao(e.target.value)}
                  />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Formato
                  </FormLabel>
                  <ChakraInput
                    mb="3"
                    color="#000"
                    onChange={(e) => setFormato(e.target.value)}
                  />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Localidade
                  </FormLabel>
                  <ChakraInput
                    mb="3"
                    color="#000"
                    onChange={(e) => setLocalidade(e.target.value)}
                  />
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Requisitos
                  </FormLabel>
                  <ChakraInput
                    ref={requisitoRef}
                    mb="3"
                    color="#000"
                    onChange={(e) => setRequisito(e.target.value)}
                  />
                  <Button
                    mt="3"
                    mb="3"
                    width="100%"
                    onClick={() => {
                      requisitoRef.current.value = "";
                      setRequisitos([...requisitos, requisito]);
                    }}
                    bg="#e0e0e0"
                  >
                    <Text color="#000">Adicionar requisito</Text>
                  </Button>
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Habilidades
                  </FormLabel>
                  <ChakraInput
                    mt="5"
                    ref={habilidadeRef}
                    color="#000"
                    onChange={(e) => setHabilidade(e.target.value)}
                    mb="3"
                  />
                  <Button
                    mb="3"
                    width="100%"
                    onClick={() => {
                      habilidadeRef.current.value = "";
                      setHabilidades([...habilidades, habilidade]);
                    }}
                    bg="#e0e0e0"
                  >
                    <Text color="#000">Adicionar habilidade</Text>
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
                  <FormLabel color="#333" width="100%" textAlign="left" mt="3">
                    Beneficios
                  </FormLabel>
                  <ChakraInput
                    placeholder="Beneficios"
                    color="#000"
                    ref={beneficioRef}
                    onChange={(e) => setBeneficio(e.target.value)}
                    mb="3"
                  />
                  <Button
                    width="100%"
                    mb="3"
                    onClick={() => {
                      setBeneficios([...beneficios, beneficio]);
                      beneficioRef.current.value = "";
                    }}
                    bg="#e0e0e0"
                  >
                    <Text color="#000">Adicionar beneficio</Text>
                  </Button>
                </VStack>
              </Box>
            )}
          </DrawerBody>

          <DrawerFooter flexDir="column">
            {drawer === "AddVaga" && <AddVagaFooter />}
            {drawer === "Notificações" && <NotificacoesFooter />}
            {drawer === "Perfil" && <PerfilFooter />}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
