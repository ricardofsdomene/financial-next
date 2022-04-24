import { Avatar, Box, Flex, Icon, Text, useDisclosure } from "@chakra-ui/react";
import { useContext } from "react";
import { FiChevronLeft, FiChevronUp } from "react-icons/fi";
import { AuthContext } from "../../contexts/AuthContext";

interface ProfileProps {
  showProfileData?: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  const { user } = useContext(AuthContext);
  const { onOpen } = useDisclosure();

  return (
    <Flex align="center" alignContent="center">
      {showProfileData && (
        <>
          {user && (
            <Flex mr="4" flexDir="column" textAlign="left" pr="3">
              <Text color="#000" fontSize="sm">
                {user.name.split(" ")[0] +
                  " " +
                  user.name.split(" ")[user.name.split(" ").length - 1]}
              </Text>
              <Text color="#555" fontSize="xs">
                {user.email}
              </Text>
            </Flex>
          )}
        </>
      )}
      <Avatar
        h={43}
        w={43}
        name="Ricardo Fonseca"
        src="https://github.com/0xrfsd.png"
      />
    </Flex>
  );
}
