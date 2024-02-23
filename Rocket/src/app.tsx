import { Button } from "./components/ui/button";
import { Control, Input } from "./components/ui/input";
import { Plus, Search, FileDown, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table";
//import { Pagination } from "./components/pagination";
import { useQuery } from "@tanstack/react-query";
//import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { UserForm } from "./components/user-form";
import { UserDTO, UserDTORequest } from "./entities";
import { useEffect, useState } from "react";
import React from "react";
import { UserService } from "./services/userservice";
import { ToastComponent } from "./components/ui/toast";

export function App() {
  //const [filter, setFilter] = useState('');
  const [selectedUser, setSelectedUser] = useState<UserDTORequest | undefined>(
    undefined
  );
  const [open, setOpen] = React.useState(false);
  const userService = new UserService();
  const [users, setUsers] = useState<UserDTO[] | undefined>(undefined);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [status, setStatus] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [openToast, setOpenToast] = React.useState(false);
  const [isMerge, setIsMerge] = useState(false);

  const handleRowClick = (user: UserDTORequest) => {
    setOpen(true);
    setSelectedUser(user);
  };

  useEffect(() => {
    console.log("selectedUsers atualizado:", selectedUsers);
  }, [selectedUsers]);

  const { isLoading } = useQuery<UserDTO[]>({
    queryKey: ["get-users"],
    queryFn: async () => {
      const response = await fetch("https://localhost:7278/api/user");
      const data = await response.json();
      setUsers(data);
      return data;
    },
  });

  if (isLoading) {
    return null;
  }

  async function removeUser(id: number) {
    const response = await userService.DeleteUser(id);
    if (response.ok) {
      setStatus("Sucesso");
      setDescription("Usuário removido com sucesso!");
      const updatedUsers = users?.filter((user) => user.id !== id);
      setUsers(updatedUsers);
      setOpenToast(true);
    }
  }

  async function removeAllSelected() {
    const response = await userService.DeletSelectedUser(selectedUsers);
    if (response.ok) {
      setUsers(users?.filter((user) => !selectedUsers.includes(user.id)));
      setSelectedUsers([]);
      setStatus("Sucesso");
      setDescription("Usuário removido com sucesso!");
      setOpenToast(true);
    }
  }

  const handleCheckboxChange = (userId: number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers((prevSelectedUsers) => [...prevSelectedUsers, userId]);
    }
  };

  return (
    <>
      <ToastComponent
        openToast={openToast}
        setOpenToast={setOpenToast}
        status={status}
        description={description}
      />
      
      <main className="py-10 max-w-6xl mx-auto space-y-5 mb-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold">Lista de usuários</h1>
            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsMerge(false);
                    setSelectedUser((newUserDTO) => ({
                      ...newUserDTO,
                      id: 0,
                      name: "",
                      document: "",
                      login: "",
                      dateBirth: "",
                      motherName: "",
                      status: true,
                      email: "",
                    }));
                  }}
                >
                  <Plus className="size-3" />
                  Novo Usuário
                </Button>
              </Dialog.Trigger>

              <Dialog.Portal>
                <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-50" />
                <Dialog.Content className="fixed space-y-5 p-6 top-0 bottom-0 left-0 h-screen min-w-[420px] z-10 bg-white border-r border-red-900">
                  <div className="space-y-2">
                    <Dialog.Title className="text-xl font-bold">
                      Adicionar novo usuário
                    </Dialog.Title>
                    <Dialog.Description className="text-sm text-red-900">
                      Com este formulário você poderá adicionar novos usuários.
                    </Dialog.Description>
                  </div>
                  <UserForm initialUser={selectedUser} isMerge={isMerge} />
                  <Dialog.Close />
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="text-right">
            <Button>
              <FileDown className="size-3" />
              Exportar
            </Button>
          </div>
        </div>

        <div className="flex justify-between">
          <Button
            onClick={removeAllSelected}
            disabled={selectedUsers.length === 0}
          >
            Remover usuarios
          </Button>
          <Input variant="filter">
            <Search className="size-3" />
            <Control placeholder="Search" />
          </Input>
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              <TableHead>Nome</TableHead>
              <TableHead>CPF</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Situação</TableHead>
              <TableHead>Dt. Nascimento</TableHead>
              <TableHead>Geração</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users?.map((user) => {
              return (
                <TableRow
                  key={user?.id}
                  onClick={(e) => {
                    if (user) {
                      e.preventDefault();
                      setIsMerge(true);
                      handleRowClick(user);
                    }
                  }}
                >
                  <TableCell>
                    <input
                      type="checkbox"
                      id={`checkbox-${user?.id}`}
                      onChange={() => handleCheckboxChange(user.id)}
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                      checked={selectedUsers.includes(user.id)}
                    />
                  </TableCell>
                  <TableCell>{user?.name}</TableCell>
                  <TableCell>{user?.document}</TableCell>
                  <TableCell>{user?.email}</TableCell>
                  <TableCell>{user?.phone}</TableCell>
                  <TableCell>
                    {user?.status ? "Ativado" : "Desativado"}
                  </TableCell>
                  <TableCell>{user?.dateBirth}</TableCell>
                  <TableCell>{user?.generation}</TableCell>
                  <TableCell className="text-right">
                    <Button
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeUser(user?.id);
                      }}
                    >
                      <X className="size-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {/* <Pagination items={20} page={1} pages={2} /> */}
      </main>
    </>
  );
}
