import { getAddress } from "@/actions/address/getAddress";
import { getCountries } from "@/actions/country/country";
import { auth } from "@/auth";
import AddressForm from "@/components/address/addressForm";
import { redirect } from "next/navigation";

const Page = async () => {
  const countries = await getCountries();
  const session = await auth();

  if (!session) {
    redirect("/auth/signin");
  }

  const userAddress = (await getAddress(session!.user!.id)) ?? undefined;

  return (
    <main>
      <AddressForm countries={countries} userStoredAddress={userAddress} />
    </main>
  );
};
export default Page;
