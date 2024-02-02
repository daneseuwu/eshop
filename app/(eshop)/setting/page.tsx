import { auth } from "@/auth";
import Setting from "@/components/setting/setting";

const Page = async () => {
  const session = await auth();

  return <Setting user={session} />;
};

export default Page;
