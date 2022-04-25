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

  const btnRef = useRef();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  const toast = useToast();
  const router = useRouter();

  type CreateUserFormData = {
    name: string;
    email: string;
    password: string;
  };

  const createUserFormSchema = yup.object().shape({
    cargo: yup.string().required("Cargo obrigatório"),
    tipo: yup.string().required("Tipo obrigatório"),
    password: yup
      .string()
      .required("Senha obrigatória")
      .min(6, "No minimo 6 caracteres"),
    password_confirmation: yup
      .string()
      .oneOf([null, yup.ref("password")], "As senhas precisam ser iguais"),
  });

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema),
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (
    values
  ) => {
    await axios
      .post("http://161.35.102.170:5556/auth/signup", {
        name: values.name,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.status === "Usuário criado com sucesso!") {
          router.push("/users");
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

  function AddVaga() {
    return (
      <Box
        as="form"
        overflowY="scroll"
        flex="1"
        borderRadius={8}
        onSubmit={handleSubmit(handleCreateUser)}
      >
        <DrawerCloseButton bg="#e0e0e0" mt="2" mr="2" color="#000" />
        <VStack>
          <Input
            name="name"
            type="text"
            label="Cargo"
            error={formState.errors.cargo}
            {...register("cargo")}
          />
          <Input
            name="tipo"
            type="text"
            label="Tipo"
            error={formState.errors.email}
            {...register("tipo")}
          />

          <Input
            name="password"
            type="password"
            label="Senha"
            error={formState.errors.password}
            {...register("password")}
          />
          <Input
            name="password_confirmation"
            type="password"
            label="Confirmação de senha"
            error={formState.errors.password_confirmation}
            {...register("password_confirmation")}
          />
        </VStack>
      </Box>
    );
  }

  function AddVagaFooter() {
    return (
      <Button
        mt="2"
        w="100%"
        bg="facebook.400"
        isLoading={formState.isSubmitting}
        onClick={() => {}}
      >
        Adicionar
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
        {profileTab === "Dados" ? "Salvar" : "Fechar"}
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
          {profileTab !== "Dados" ? (
            <>
              <DrawerHeader color="#555">
                {drawer === "AddVaga" ? "Criar uma nova vaga" : drawer}
              </DrawerHeader>
              <Divider />
            </>
          ) : (
            <Flex
              onClick={() => {
                setProfileTab("");
                onClose();
              }}
              align="center"
              justify="center"
              p="2"
              h={43}
              w={43}
              mt="6"
              ml="5"
              borderRadius="12"
              bg="#d0d0d0"
            >
              <Icon as={RiArrowLeftFill} color="#333" />
            </Flex>
          )}

          <DrawerBody bg="#eee">
            {drawer === "Notificações" && <Notificacoes />}
            {drawer === "Perfil" && <Perfil />}
            {drawer === "AddVaga" && <AddVaga />}
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
