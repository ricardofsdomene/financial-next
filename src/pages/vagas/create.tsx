import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";

import axios from "axios";

import { Input } from "../../components/form/Input";
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

import Router from "next/router";

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

export default function CreateUser() {
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
          Router.push("/users");
        } else {
          alert("Tente novamente mais tarde");
        }
      })
      .catch((error) => {
        console.log("error:", error);
      })
      .finally(() => {
        //
      });
  };

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
        >
          <Heading size="lg" fontWeight="normal">
            Criar vaga
          </Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
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
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
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
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">
                  Cancelar
                </Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  );
}
