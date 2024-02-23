import React, { useState } from "react"; // Importe a interface UserDTO aqui
import { UserDTO } from "../../entities";

const UserList = ({ users }: { users: UserDTO[] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<UserDTO[]>([]);

  // Função para filtrar os usuários com base no termo de busca
  const handleSearch = (term: string) => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Atualiza os usuários filtrados sempre que o termo de busca muda
  React.useEffect(() => {
    handleSearch(searchTerm);
  }, [searchTerm, users]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
