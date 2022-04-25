import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Icon,
  Stack,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useSidebarDrawer } from "../../contexts/SidebarDrawerContext";
import { SidebarNav } from "./SidebarNav";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useState } from "react";

export function Filter() {
  const { isOpen, onClose } = useSidebarDrawer();

  const [showTipo, setShowTipo] = useState(true);
  const [tipo, setTipo] = useState("");

  const [showExperience, setShowExperience] = useState(true);
  const [experience, setExperience] = useState("");

  const [showFormato, setShowFormato] = useState(true);
  const [formato, setFormato] = useState("");

  const [showData, setShowData] = useState(true);
  const [data, setData] = useState("");

  const [showEmpresa, setShowEmpresa] = useState(true);
  const [empresa, setEmpresa] = useState("BTG Pactual");

  const isDrawerSidebar = useBreakpointValue({
    base: true,
    lg: false,
  });

  if (isDrawerSidebar) {
    return (
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="gray.800" p="4">
            <DrawerCloseButton mt="6" />
            <DrawerHeader>Navegacao</DrawerHeader>
            <DrawerBody>
              <SidebarNav />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    );
  }

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
          <Text color="#000" fontWeight="bold" fontSize="lg">
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
      <Flex flexDir="column" w="100%">
        <Flex
          onClick={() => setShowExperience(!showExperience)}
          cursor="pointer"
          flexDir="row"
          align="center"
          justifyContent="space-between"
          w="100%"
        >
          <Text color="#000" fontWeight="bold" fontSize="lg">
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
      <Flex flexDir="column" w="100%">
        <Flex
          onClick={() => setShowFormato(!showFormato)}
          cursor="pointer"
          flexDir="row"
          align="center"
          justifyContent="space-between"
          w="100%"
        >
          <Text color="#000" fontWeight="bold" fontSize="lg">
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
      <Flex flexDir="column" w="100%">
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
          <Text color="#333" fontWeight="bold" fontSize="lg">
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

  return (
    <Flex
      flexDir="column"
      as="aside"
      justifyContent="space-between"
      pr="4"
      pl="4"
      bg="#eee"
      overflowY="scroll"
      w="64"
      mr="8"
      h="90vh"
    >
      <Stack spacing="12" align="flex-start" justifyContent="space-between">
        <>
          <Tipo />
          <Experience />
          <Formato />
          <Data />
        </>
      </Stack>
    </Flex>
  );
}