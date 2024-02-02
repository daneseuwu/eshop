import Empty from "@/public/empty.png";
import Image from "next/image";

const Page = () => {
  return (
    <main>
      <div className="flex h-screen items-center justify-center">
        <div className="flex flex-col items-center justify-center ">
          <Image src={Empty} alt="empty cart" width={150} height={150} />
        </div>
      </div>
    </main>
  );
};

export default Page;
