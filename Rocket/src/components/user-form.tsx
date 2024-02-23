import { Button } from "./ui/button";
import { Check, X } from "lucide-react";
import * as Dialog from "@radix-ui/react-dialog";
import { UserDTORequest } from "../entities";
import React, { useState, useEffect } from "react";
import { UserService } from "../services/userservice";
import "./css/toast.css";
import { ToastComponent } from "./ui/toast";
interface Props {
  initialUser?: UserDTORequest;
  isMerge?: boolean;
}

export function UserForm({ initialUser, isMerge }: Props) {
  const userService = new UserService();
  const [userDTO, setUserDTO] = useState<UserDTORequest>();
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openToast, setOpenToast] = React.useState(false);
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (initialUser) {
      setUserDTO(initialUser);
    }
    const receivedDate = initialUser?.dateBirth;
    const formattedDate = receivedDate ? receivedDate.split("T")[0] : "";
    setFormattedDate(formattedDate);
  }, [initialUser]);

  const formatDate = (dateString) => {
    const formattedDate = format(new Date(dateString), "dd/MM/yyyy");
    return formattedDate;
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserDTO({
      ...userDTO,
      [name]: value,
    });
    setFormattedDate(e.target.value);
  };

  async function createUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isMerge) {
      const response = await userService.UpdateUser(userDTO);
      if (response.ok) {
        setStatus("Sucesso");
        setDescription("Usuário atualizado com sucesso!");
        setOpenToast(true);
      }
      return;
    }

    userService.CreateUser(userDTO);
    setStatus("Sucesso");
    setDescription("Usuário criado com sucesso!");
    setOpenToast(true);
  }

  async function ActiveDesactiveUser() {
    userDTO.status = !userDTO.status;
    setUserDTO({ ...userDTO });
  }

  return (
    <>
      <form onSubmit={createUser} className="w-full space-y-3">
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="name">
            Nome
          </label>
          <input
            value={userDTO?.name}
            onChange={handleChange}
            type="text"
            id="name"
            name="name"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="document">
            Documento
          </label>
          <input
            value={userDTO?.document}
            onChange={handleChange}
            type="text"
            id="document"
            name="document"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="login">
            Login
          </label>
          <input
            value={userDTO?.login}
            onChange={handleChange}
            type="text"
            id="login"
            name="login"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="email">
            E-mail
          </label>
          <input
            value={userDTO?.email}
            onChange={handleChange}
            type="text"
            id="email"
            name="email"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="phone">
            Telefone
          </label>
          <input
            value={userDTO?.phone}
            onChange={handleChange}
            type="text"
            id="phone"
            name="phone"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="motherName">
            Nome da mãe
          </label>
          <input
            value={userDTO?.motherName}
            onChange={handleChange}
            type="text"
            id="motherName"
            name="motherName"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm font-medium block" htmlFor="dateBirth">
            Data de Nascimento
          </label>
          <input
            value={formattedDate}
            onChange={handleChange}
            type="date"
            id="dateBirth"
            name="dateBirth"
            className="rounded-lg px-3 py-2 bg-red-300/50 w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            {isMerge && (
              <Button
                className="text-left cursor-pointer"
                onClick={ActiveDesactiveUser}
              >
                {userDTO?.status ? "Desativar" : "Ativar"}
              </Button>
            )}
          </div>
          <div className="flex items-center justify-end gap-2">
            <Dialog.Close asChild>
              <Button className="bg-white text-red-900 cursor-pointer">
                <X className="size-3" />
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" className="cursor-pointer">
              <Check className="size-3" />
              Save
            </Button>
          </div>
        </div>
      </form>

      <ToastComponent
        openToast={openToast}
        setOpenToast={setOpenToast}
        status={status}
        description={description}
      />
    </>
  );
}
