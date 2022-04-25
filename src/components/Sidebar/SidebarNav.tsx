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
    <Stack spacing="12" align="flex-start" p="4">
      <NavSection title="GERAL">
        <NavLink icon={RiDashboardLine} href="/">
          Inicio
        </NavLink>
      </NavSection>
      <NavSection title="CONTROLE">
        <NavLink icon={RiDashboardLine} href="/dashboard/vagas">
          Vagas
        </NavLink>
        <NavLink icon={RiDashboardLine} href="/dashboard/empresas">
          Empresas
        </NavLink>
        <NavLink icon={RiDashboardLine} href="/dashboard/usuarios">
          Usuarios
        </NavLink>
      </NavSection>
    </Stack>
  );
}
