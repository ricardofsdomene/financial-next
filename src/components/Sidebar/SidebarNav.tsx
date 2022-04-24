import { Stack } from "@chakra-ui/react";
import {
  RiContactsLine,
  RiDashboardLine,
  RiGitMergeLine,
  RiInputMethodLine,
  RiStoreLine,
} from "react-icons/ri";
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start" bg="#e0e0e0">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/">
          Inicio
        </NavLink>
      </NavSection>
    </Stack>
  );
}
