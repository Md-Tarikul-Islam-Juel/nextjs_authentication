export interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Tokens {
    accessToken: string;
    refreshToken: string;
  }
  
  export interface LoginResponse {
    success: boolean;
    message: string;
    tokens: Tokens;
    data: {
      user: User;
    };
  }
  