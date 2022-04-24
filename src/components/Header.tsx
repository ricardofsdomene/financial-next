import {
  Flex,
  Input,
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
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { FiCheck, FiEdit2 } from "react-icons/fi";

import InputMask from "react-input-mask";
import styled from "styled-components";

import {
  RiBookmarkFill,
  RiCloseFill,
  RiNotificationLine,
  RiSearchLine,
  RiArrowLeftFill,
  RiArrowDropDownFill,
  RiUserAddLine,
  RiUserFill,
} from "react-icons/ri";

import { AuthContext } from "../contexts/AuthContext";
import { Logo } from "./Header/Logo";
import { Notifications } from "./Header/NotificationsNav";
import { Profile } from "./Header/Profile";
import { SearchBox } from "./Header/SearchBox";
import { api } from "../services/apiClient";
import Link from "next/link";

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

  return (
    <>
      <Flex
        as="header"
        w="100%"
        borderBottom="1px solid #e0e0e0"
        bg="#eee"
        py="2.5"
        pr="6"
        justifyContent="space-between"
        pl={!isWideVersion ? "6" : "4"}
        align="center"
      >
        <Logo />

        {isWideVersion && <SearchBox />}

        {isWideVersion && (
          <Flex ml="5">
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
              borderRadius="full"
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
              <Link href="/vagas/create" passHref>
                <MenuItem color="#333" fontSize="sm">
                  Adicionar vaga
                </MenuItem>
              </Link>
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
              borderRadius={50}
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
          <div
            onClick={() => {
              setDrawer("Perfil");
              onOpen();
            }}
            style={{ cursor: "pointer" }}
          >
            <Profile showProfileData={isWideVersion} />
          </div>
        </Flex>
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={() => {
          onClose();
          setProfileTab("");
        }}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg="#e0e0e0">
          {profileTab !== "Dados" ? (
            <DrawerHeader fontSize="3xl" color="facebook.300">
              Olá
            </DrawerHeader>
          ) : (
            <Flex
              onClick={() => setProfileTab("")}
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

          <DrawerBody bg="#e0e0e0">
            {drawer === "Notificações" && (
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
            )}
            {drawer === "Perfil" && (
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
                      onClick={() =>
                        localStorage.setItem("nameEdited", "false")
                      }
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
                        <Input
                          as={EditableInput}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <div style={{ width: 20 }} />
                        <div style={{ paddingBottom: 10 }}>
                          {localStorage.getItem("nameEdited") === "true" ? (
                            <EditableControls
                              param="name"
                              value={name}
                              edited={true}
                            />
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
                        <Input
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
                      bg="facebook.400"
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
            )}
          </DrawerBody>

          {drawer === "AddUser" && (
            <DrawerFooter>
              <Button variant="outline" mr={3} bg="tomato" onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="blue">Save</Button>
            </DrawerFooter>
          )}
          {drawer === "Notificações" && (
            <DrawerFooter>
              <Button
                w="100%"
                variant="outline"
                bg="facebook.400"
                onClick={onClose}
              >
                Fechar
              </Button>
            </DrawerFooter>
          )}
          {drawer === "Perfil" && (
            <>
              <DrawerFooter></DrawerFooter>
              <DrawerFooter flexDir="column">
                <Button mt={-5} w="100%" bg="tomato" onClick={signOut}>
                  Sair da sua conta
                </Button>
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
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
}
