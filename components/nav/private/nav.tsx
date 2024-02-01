"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "../../ui/button";
import Cartbar from "../cartbar";
import Avatars from "../avatar";

const Nav = () => {
  const { data: session } = useSession();
  const [showLoginButton, setShowLoginButton] = useState(false);

  useEffect(() => {
    if (!session) {
      setShowLoginButton(false);
    }
  }, [session]);

  return (
    <main>
      <div className="flex justify-between items-center pt-1 pb-2">
        <div>
          <Link href="/" className="font-bold text-xl ">
            eshop.com
          </Link>
        </div>
        <div className="md:flex gap-6 hidden">
          <Link href="/category/men">
            <Button variant="ghost">Man</Button>
          </Link>
          <Link href="/category/women">
            <Button variant="ghost">Women</Button>
          </Link>
          <Link href="/category/kid">
            <Button variant="ghost">Kid</Button>
          </Link>
          <Link href="/category/unisex">
            <Button variant="ghost">Unisex</Button>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Cartbar />
          <Avatars />
          {/* {session ? (
         
          ) : (
            showLoginButton && (
              <Button>
                <Link href="/auth/signin"></Link>
              </Button>
            )
          )} */}
        </div>
      </div>
    </main>
  );
};

export default Nav;
