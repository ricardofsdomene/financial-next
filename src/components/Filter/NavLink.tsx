import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { FiChevronDown } from "react-icons/fi";

import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps {
  children: string;
  href: string;
}

export function NavLink({ children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink
        display="flex"
        flexDir="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontWeight="medium">
          {children}
        </Text>
        <Icon as={FiChevronDown} ml="20" fontSize={20} />
      </ChakraLink>
    </ActiveLink>
  );
}
