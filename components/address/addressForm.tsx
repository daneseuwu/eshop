"use client";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "../ui/button";
import { Country } from "@/interfaces/country.interface";
import { useForm } from "react-hook-form";
import { useAddressStore } from "@/store/address/address";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { setUserAddress } from "@/actions/address/address";
import { deleteAddress } from "@/actions/address/deleteAddress";
import { Address } from "@/interfaces/address.interface";
import { useRouter } from "next/navigation";
import Title from "../title/title";

interface AddressForm {
  firstname: string;
  lastname: string;
  address: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  instructions: string;
  remember: boolean;
}
interface Props {
  countries: Country[];
  userStoredAddress?: Partial<Address>;
}
const AddressForm = ({ countries, userStoredAddress = {} }: Props) => {
  const {
    handleSubmit,
    register,
    formState: { isValid },
    reset,
  } = useForm<AddressForm>({
    defaultValues: {
      ...userStoredAddress,
      remember: false,
    },
  });

  const { data: session } = useSession({
    required: true,
  });

  const setaddress = useAddressStore((state) => state.setAddress);
  const getaddress = useAddressStore((state) => state.address);

  const router = useRouter();

  useEffect(() => {
    if (getaddress.firstname) {
      reset(getaddress);
    }
  }, [getaddress, reset]);

  const onSubmit = (data: AddressForm) => {
    const { remember, ...restAddress } = data;
    setaddress(restAddress);

    if (remember) {
      //server action
      setUserAddress(restAddress, session!.user?.id);
    } else {
      deleteAddress(session!.user?.id);
    }
    router.push("/checkout");
  };

  return (
    <div className="flex items-center justify-center w-full">
      <div className="rounded-xl border">
        <CardContent className="py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label>Firstname</Label>
                <Input
                  type="text"
                  placeholder="Jonh"
                  {...register("firstname", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <Label>Lastname</Label>
                <Input
                  type="text"
                  placeholder="Doe"
                  {...register("lastname", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label>Address</Label>
                <Input
                  type="text"
                  placeholder="Los Angeles , EUU"
                  {...register("address", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <Label>Postal</Label>
                <Input
                  type="number"
                  placeholder="85730"
                  {...register("postalCode", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label>City</Label>
                <Input
                  type="text"
                  placeholder="Santa Tecla"
                  {...register("city", {
                    required: true,
                  })}
                />
              </div>
              <div>
                <Label>State</Label>
                <Input
                  type="text"
                  placeholder="85730"
                  {...register("state", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 md:grid-cols-2">
              <div>
                <Label>Country</Label>
                <select
                  {...register("country", { required: true })}
                  className="block w-full rounded-md border  border-gray-200 py-2 text-sm shadow-sm focus:outline-none"
                >
                  <option value="">Select</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Phone</Label>
                <Input
                  type="text"
                  placeholder="85730"
                  {...register("phone", {
                    required: true,
                  })}
                />
              </div>
            </div>

            <div className="mb-3">
              <Label>Instructions</Label>
              <Textarea rows={4} {...register("instructions")} />
            </div>

            <div className="items-top mb-3 flex space-x-2">
              <input type="checkbox" {...register("remember")} />
              <div className="grid gap-1.5 leading-none">
                <Label>Remember address?</Label>
              </div>
            </div>

            <div className="text-center">
              <Button type="submit" disabled={!isValid} className="w-full">
                Next
              </Button>
            </div>
          </form>
        </CardContent>
      </div>
    </div>
  );
};

export default AddressForm;
