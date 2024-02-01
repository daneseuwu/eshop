export interface User {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  rol: "admin" | "user";
}

export interface userInterface {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  emailVerified?: Date | null;
  rol: string;
  image?: string | null;
}
