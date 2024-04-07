import { Button } from "@/components/ui/button";
import Empti from "@/public/empty.png";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  return (
    <main>
      <div className="flex  flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center ">
          <Image src={Empti} alt="empty cart" width={150} height={150} />
        </div>
        {/* <Button>
          <Link href="/">Shopping</Link>
        </Button> */}
      </div>
    </main>
  );
};

export default Page;
