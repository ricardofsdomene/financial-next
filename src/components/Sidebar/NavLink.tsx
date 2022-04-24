import { Icon, Link as ChakraLink, Text } from "@chakra-ui/react";
import { ElementType } from "react";
import { RiDashboardLine } from "react-icons/ri";

import Link from "next/link";
import { ActiveLink } from "../ActiveLink";

interface NavLinkProps {
  icon: ElementType;
  children: string;
  href: string;
}

export function NavLink({ icon, children, href, ...rest }: NavLinkProps) {
  return (
    <ActiveLink href={href} passHref>
        <ChakraLink display="flex" alignItems="center">
      <Icon as={icon} fontSize={20} />
      <Text fontWeight="medium" ml="4">
        {children}
      </Text>
    </ChakraLink>
    </ActiveLink>
  );
}
