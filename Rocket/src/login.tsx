import React, { useState } from "react";
import "./components/css/login.css";
import { Button } from "./components/ui/button";
import { UserService } from "./services/userservice";
import { LoginRequest, ResetPasswordRequest } from "./entities";
import { ToastComponent } from "./components/ui/toast";
import "./components/css/toast.css";
import { handleLogin } from "./components/util/authutils";

interface Props {
  onLogin?: boolean;
}

export function Login({ onLogin }): Props {
  const [loginRequest, setLoginRequest] = useState<LoginRequest>({
    userName: "",
    password: "",
  });
  const [resetRecoverPassword, setResetRecoverPassword] = useState<ResetPasswordRequest>({
    login: "",
    motherName: "",
    document: "",
  });
  const userService = new UserService();
  const [openToast, setOpenToast] = React.useState(false);
  const [openRecoverPassword, setOpenRecoverPassword] = React.useState(false);

  const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      loginRequest?.userName === undefined ||
      loginRequest?.password === undefined
    ) {
      setOpenToast(true);
    }

    const response = await userService.Login(loginRequest);
    if (response.ok) {
      handleLogin(loginRequest);
      onLogin(true);
      return;
    }
    setOpenToast(true);
  };

  const recoverPassword = async () => {
    setOpenRecoverPassword(true);
  };

  const sendRequestRecoverPassword = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    console.log(resetRecoverPassword);
    if (
      resetRecoverPassword?.login === undefined ||
      resetRecoverPassword?.motherName === undefined ||
      resetRecoverPassword?.document === undefined
    ) {
      setOpenToast(true);
    }
    const response = await userService.ResetPasswordAsync(resetRecoverPassword);
    if (response.ok) {
      onLogin(true);
      return;
    }
  };

  return (
    <>
      {!openRecoverPassword && (
        <form onSubmit={loginUser} className="w-full space-y-3 mt-10">
          <div className="block w-full max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 p-6">
            <div>
              <label className="text-sm font-medium block" htmlFor="login">
                Usuário
              </label>
              <input
                value={loginRequest?.userName}
                onChange={(e) =>
                  setLoginRequest({
                    ...loginRequest,
                    userName: e.target.value as string,
                  })
                }
                type="text"
                id="login"
                name="login"
                className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium block" htmlFor="password">
                Senha
              </label>
              <input
                value={loginRequest?.password}
                onChange={(e) =>
                  setLoginRequest({
                    ...loginRequest,
                    password: e.target.value,
                  })
                }
                type="password"
                id="password"
                name="password"
                className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
              />
            </div>
            <div className="flex items-center justify-between">
              <Button className="w-max block cursor-pointer" type="submit">
                Login
              </Button>
              <p
                className="cursor-pointer text-sm underline"
                onClick={recoverPassword}
              >
                Recuperar senha
              </p>
            </div>
          </div>
        </form>
      )}

      {openRecoverPassword && (
        <form
          onSubmit={sendRequestRecoverPassword}
          className="w-full space-y-3 mt-10"
        >
          <div className="block w-full max-w-sm mx-auto bg-white rounded-xl shadow-md space-y-2 p-6">
            <div>
              <label className="text-sm font-medium block" htmlFor="login">
                Usuário
              </label>
              <input
                value={resetRecoverPassword?.login}
                onChange={(e) =>
                  setResetRecoverPassword({
                    ...resetRecoverPassword,
                    login: e.target.value as string,
                  })
                }
                type="text"
                id="login"
                name="login"
                className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium block" htmlFor="document">
                Documento
              </label>
              <input
                value={resetRecoverPassword?.document}
                onChange={(e) =>
                  setResetRecoverPassword({
                    ...resetRecoverPassword,
                    document: e.target.value,
                  })
                }
                type="text"
                id="document"
                name="document"
                className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
              />
            </div>
            <div className="space-y-1">
              <label className="text-sm font-medium block" htmlFor="motherName">
                Nome da mãe
              </label>
              <input
                value={resetRecoverPassword?.motherName}
                onChange={(e) =>
                  setResetRecoverPassword({
                    ...resetRecoverPassword,
                    motherName: e.target.value,
                  })
                }
                type="text"
                id="motherName"
                name="motherName"
                className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
              />
            </div>
            <Button
              className="w-max block cursor-pointer text-right"
              type="submit"
            >
              Enviar
            </Button>
          </div>
        </form>
      )}

      <ToastComponent
        openToast={openToast}
        setOpenToast={setOpenToast}
        status="Atenção"
        description="Usuário ou senha inválidos"
      />
    </>
  );
}
