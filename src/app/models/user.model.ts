
export interface User {
  id: number;
  fullName: string;
  email: string;
  password?: string;

}
interface SocialNetwork {
  nombreApp: string;
  usuarioApp: string;
}



interface UserData {
  user: User;

}

interface ApiResponse {
  content: UserData[];
  size: number;
  totalElements: number;
  totalPages: number;
  number: number;
  _links: any;
}
