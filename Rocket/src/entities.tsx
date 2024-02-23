export interface UserDTO {
  id: number;
  name: string;
  document: string;
  login: string;
  phone: string;
  email: string;
  status: boolean;
  motherName:string;
  dateBirth: string;
  createdAt: string;
  updatedAt: string;
  generation: string;
}

export interface UserDTORequest {
  id: number;
  name: string;
  document: string;
  login: string;
  dateBirth: string;
  motherName: string;
  status: boolean;
  email: string;
}

export interface LoginRequest{
  userName: string;
  password: string;
}

export interface ResetPasswordRequest{
  login: string;
  motherName: string;
  document: string;
}