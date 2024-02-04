import { auth } from "@/auth";
import Setting from "@/components/setting/setting";

const Page = async () => {
  
  const session = await auth();
  
  const user = {
    name: session?.user.name,
    lastname: session?.user.lastname,
    email: session?.user.email,
    image: session?.user.image,
  };

  return <Setting user={user} />;
};

export default Page;
