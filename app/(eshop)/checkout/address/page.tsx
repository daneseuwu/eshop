import { getAddress } from "@/actions/address/getAddress";
import { getCountries } from "@/actions/country/country";
import { auth } from "@/auth";
import AddressForm from "@/components/address/addressForm";

const Page = async () => {
  const countries = await getCountries();
  const session = await auth();

  const userAddress = (await getAddress(session!.user!.id)) ?? undefined;

  return (
    <main>
      <AddressForm countries={countries} userStoredAddress={userAddress} />;
    </main>
  )
}
  export default Page;
