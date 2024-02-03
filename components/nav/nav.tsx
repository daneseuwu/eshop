import { auth } from "@/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import Cartbar from "./cartbar";
import Avatars from "./avatar";

const Nav = async () => {
  const isauthenticated = await auth();

  return (
    <main>
      <div className="flex justify-between items-center pt-1 pb-2">
        <div>
          <Link href="/" className="font-bold text-xl ">
            eshop.com
          </Link>
        </div>
        <div className="md:flex gap-6 hidden">
          <Link href="/gender/men">
            <Button variant="ghost">Man</Button>
          </Link>
          <Link href="/gender/women">
            <Button variant="ghost">Women</Button>
          </Link>
          <Link href="/gender/kid">
            <Button variant="ghost">Kid</Button>
          </Link>
          <Link href="/gender/unisex">
            <Button variant="ghost">Unisex</Button>
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4">
          <Cartbar />

          {isauthenticated ? (
            <Avatars />
          ) : (
            <Button size="sm">
              <Link href="/auth/signin">Signin</Link>
            </Button>
          )}
        </div>
      </div>
    </main>
  );
};

export default Nav;
