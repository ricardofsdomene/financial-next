import { createContext, ReactNode, useEffect, useState } from "react";
import { setCookie, parseCookies, destroyCookie } from "nookies";
import Router, { useRouter } from "next/router";
import { api } from "../services/apiClient";

import { BroadcastChannel } from "broadcast-channel";
import jwtDecode from "jwt-decode";
import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";

type User = {
  _id: string;
  name: string;
  email: string;
  permissions?: string[];
  roles?: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type SignUpCredentials = {
  name: string;
  email: string;
  password: string;
};

type TUpdate = {
  id: string;
  param: string;
  value: string;
};


type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
  updateName: (values: TUpdate) => Promise<any>;
  refresh: boolean;
  Refresh: (value: boolean) => void;
  search: string;
  Search: (value: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;
export function signOut() {
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  authChannel.postMessage("signOut");

  Router.push("/auth");
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>();
  const [refresh, setRefresh] = useState(false);
  const isAuthenticated = !!user;

  const [search, setSearch] = useState("");

  const db = {
    empresas: [
      {
        _id: "0",
        name: "emp1"
      },
      {
        id: "1",
        name: "emp2"
      }
    ],
    vagas: [
      {
        _id: "0",
        name: "vaga1"
      },
      {
        _id: "1",
        name: "vaga2"
      }
    ],
    users: [
      {
        _id: "0",
        name: "users1"
      },
      {
        _id: "1",
        name: "users2"
      }
    ]
  }

  function Search(value: string) {
    let arr = [];
    arr.push(value);
    let search = arr[0].toString();

    if (db.empresas.includes(search)) {
      console.log(db.empresas.includes(search))
    }
    if (db.vagas.includes(search)) {
      console.log(db.vagas.includes(search))
    }
    if (db.users.includes(search)) {
      console.log(db.users.includes(search))
    }
  }
 
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const { "nextauth.token": token } = parseCookies();

    if (!token) {
      router.push("/auth");
    } else if (token) {
      // Verify if token is valid
      // Verify _id permissions and roles 2Check

      const decoded: User = jwtDecode(token);

      api.get(`/auth/user/${decoded._id}`).then((res) => {
        if (!res.data) {
          destroyCookie(undefined, "nextauth.token");
          destroyCookie(undefined, "nextauth.refreshToken");
          router.push("/auth");
        } else {
          setUser(res.data);
        }
      });

      setCookie(undefined, "nextauth.token", token, {
        maxAge: 60 * 60 * 24 * 30, // 30 days
        path: "/",
      });
      api.defaults.headers["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  useEffect(() => {
    if (user) {
      if (user.email !== "ricardofsdomene@icloud.com") {
        if (router.pathname === "/dashboard") {
          router.push("/");
        }
      }

      if (router.pathname === "/auth") {
        router.push("/");
      }
    }
  }, [router, user]);

  useEffect(() => {
    authChannel = new BroadcastChannel("auth");

    authChannel.onmessage = (message) => {
      switch (message) {
        case "signOut":
          signOut();
          break;
        default:
          break;
      }
    };
  }, []);

  function Refresh(value) {
    setRefresh(value);
    setTimeout(() => {
      setRefresh(false);
    });
  }

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/auth/sessions", {
        email: email,
        password: password,
      });

      const { _id, name, token, refreshToken, permissions, roles } =
        response.data;

      if (response.data.error) {
        return response.data.message;
      } else {
        setCookie(undefined, "nextauth.token", token, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });
        setCookie(undefined, "nextauth.refreshToken", refreshToken, {
          maxAge: 60 * 60 * 24 * 30, // 30 days
          path: "/",
        });

        setUser({
          _id,
          name,
          email,
          permissions,
          roles,
        });

        api.defaults.headers["Authorization"] = `Bearer ${token}`;

        Router.push("/");

        return "Usuario autenticado com sucesso";
      }
    } catch (error) {
      return "Tente novamente mais tarde";
    }
  }

  async function signUp({ name, email, password }: SignUpCredentials) {
    try {
      const response = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      if (response.data.status === "Usuário criado com sucesso!") {
        const response = await api.post("/auth/sessions", {
          email: email,
          password: password,
        });

        const { _id, name, token, refreshToken, permissions, roles } =
          response.data;

        if (response.data.error) {
          return response.data.message;
        } else {
          setCookie(undefined, "nextauth.token", token, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });
          setCookie(undefined, "nextauth.refreshToken", refreshToken, {
            maxAge: 60 * 60 * 24 * 30, // 30 days
            path: "/",
          });

          setUser({
            _id,
            name,
            email,
            permissions,
            roles,
          });

          api.defaults.headers["Authorization"] = `Bearer ${token}`;

          Router.push("/");

          return "Usuario autenticado com sucesso";
        }
      } else {
        return "Dados invalidos";
      }
    } catch (error) {
      return "Tente novamente mais tarde";
    }
  }

  async function updateName({ id, param, value }: TUpdate) {
    try {
      const response: AxiosResponse = await api.put(
        `/auth/update/${id}/${param}/${value}`
      );

      if (response.data.Message === "Atualizado com sucesso") {
        console.log(response.data);
        setUser(response.data.user);
      } else {
        console.log(2);
      }
    } catch (error) {
      console.log(error);
    }
  }

  function signOut() {
    destroyCookie(undefined, "nextauth.token");
    destroyCookie(undefined, "nextauth.refreshToken");

    setUser(null);

    authChannel.postMessage("signOut");

    Router.push("/auth");
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        signUp,
        signOut,
        updateName,
        isAuthenticated,
        user,
        refresh,
        Refresh,
        search,
        Search,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
