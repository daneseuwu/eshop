"use client";
import { SessionProvider } from "next-auth/react";
interface Props {
  children: React.ReactNode;
}


const NextauthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default NextauthProvider;
