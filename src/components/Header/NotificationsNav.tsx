import { Flex, HStack, Icon } from "@chakra-ui/react";
import { RiNotificationLine, RiUserAddLine } from "react-icons/ri";

export function Notifications() {
  return (
    <HStack
      spacing={["6", "8"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor={"#ccc"}
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        borderRadius={50}
        cursor="pointer"
        p="2"
        bg="#eaeaea"
      >
        <Icon as={RiNotificationLine} color="#777" fontSize={18} />
      </Flex>
    </HStack>
  );
}
