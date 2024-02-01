import { auth } from "@/auth";
import { redirect } from "next/navigation";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout = async ({ children }: Props) => {
  const session = await auth();

  if (session?.user.rol !== "admin") {
    redirect("/auth/signin");
  }
  
  return <div>{children}</div>;
};

export default Layout;
