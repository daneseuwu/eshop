// export interface User {
//   name: string;
//   lastname: string;
//   email: string;
//   password: string;
//   rol: "admin" | "user";
// }

export interface userInterface {
  id: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  emailVerified?: Date | null;
  rol: "admin" | "user";
  image?: string | null;
}
