
import Empty from "@/public/empty.png";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col justify-center items-center ">
        <Image src={Empty} alt="empty cart" width={150} height={150} />
      </div>
    </div>
  );
};

export default Page;
