"use client";
import { useSession } from "next-auth/react";

const Nosession = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <main>
        <div className="flex justify-center items-center  h-screen">
          no session
        </div>
      </main>
    );
  }
};

export default Nosession;
