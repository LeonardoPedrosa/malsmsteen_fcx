import { LoginRequest, ResetPasswordRequest, UserDTORequest } from "../entities";

export class UserService {
  public async CreateUser(user: UserDTORequest): Promise<Response> {
    try {
      const response = await fetch("https://localhost:7278/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      return response;
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
      throw error; // Lança novamente o erro para que ele possa ser tratado pelo chamador da função
    }
  }

  public async UpdateUser(user: UserDTORequest): Promise<Response> {
    try {
      const response = await fetch("https://localhost:7278/api/user", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      return response;
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      throw error; // Lança novamente o erro para que ele possa ser tratado pelo chamador da função
    }
  }

  public async DeleteUser(id: number): Promise<Response> {
    try {
      const response = await fetch(`https://localhost:7278/api/user/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response;
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      throw error; // Lança novamente o erro para que ele possa ser tratado pelo chamador da função
    }
  }

  public async DeletSelectedUser(array: number[]): Promise<Response> {
    try {
      const response = await fetch("https://localhost:7278/api/user", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(array),
      });
      return response;
    } catch (error) {
      console.error("Erro ao remover usuário:", error);
      throw error; // Lança novamente o erro para que ele possa ser tratado pelo chamador da função
    }
  }

  public async GetUser(id: number) {
    try {
      const response = await fetch(`https://localhost:7278/api/user/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Erro ao obter usuário:", response.statusText);
      }
    } catch (error) {
      console.error("Erro ao obter usuário:", error);
    }
  }

  public async Login(loginRequest: LoginRequest) : Promise<Response> {
    try {
        const response = await fetch("https://localhost:7278/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginRequest),
        });
  
        return response;
      } catch (error) {
        console.error("Erro ao criar usuário:", error);
        throw error; // Lança novamente o erro para que ele possa ser tratado pelo chamador da função
      }
    }

    public async ResetPasswordAsync(resetPasswordRequest: ResetPasswordRequest) : Promise<Response> {
        try {
          const response = await fetch("https://localhost:7278/api/login/resetpassword", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(resetPasswordRequest),
          });

          return response;
        } catch (error) {
          console.error("Erro ao criar usuário:", error);
          throw error; // Lança novamente o erro para que ele possa ser tratado pelo chamador da função
        }
    }
}
