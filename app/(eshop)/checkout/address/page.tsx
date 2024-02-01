import { getAddress } from "@/actions/address/getAddress";
import { getCountries } from "@/actions/country/country";
import { auth } from "@/auth";
import AddressForm from "@/components/address/addressForm";

const Page = async () => {
  const countries = await getCountries();
  const session = await auth();

  if (!session?.user) {
    <span>sin session de usuario</span>;
  }

  const userAddress = (await getAddress(session!.user!.id)) ?? undefined;

  return <AddressForm countries={countries} userStoredAddress={userAddress} />;
};

export default Page;
