"use client";
import { CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User } from "@/interfaces/user.interface";
import { useForm } from "react-hook-form";
import z from "zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const userSchema = z.object({
  firstname: z.string().min(3, {
    message: "First name must be at least 3 characters",
  }),
  lastname: z.string().min(3, {
    message: "Last name must be at least 3 characters",
  }),
  email: z.string().email().min(3, {
    message: "Email must be at least 3 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 6 characters",
  }),
});

interface Props {
  user: {
    user: User;
  };
}

const Setting = ({ user }: Props) => {
  const { register } = useForm<z.infer<typeof userSchema>>({
    defaultValues: {
      firstname: user.user.firstname,
      lastname: user.user.lastname,
      email: user.user.email,
    },
  });

  return (
    <main>
      <div className="flex items-center justify-center">
        <div className="w-[800px] rounded-xl ">
          <CardContent className="py-5">
            <form>
              <div className="flex place-items-center gap-2 pb-12">
                <Avatar>
                  <AvatarImage src={user.user.firstname} alt="avatar"  />
                  <AvatarFallback>
                    {user?.user.firstname[0]}
                    {user?.user.lastname[0]}
                  </AvatarFallback>
                </Avatar>

                <div className="flex flex-col">
                  <Label className="text-sm">
                    {user.user.firstname} {user.user.lastname}
                  </Label>
                  <Label className="text-xs">{user.user.email}</Label>
                </div>
              </div>

              <div className="flex  gap-2">
                <div className="mb-3 w-full">
                  <Label>Firstname</Label>
                  <Input
                    type="text"
                    {...register("firstname", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                  />
                </div>
                <div className="mb-3 w-full">
                  <Label>Lastname</Label>
                  <Input
                    type="text"
                    {...register("lastname", {
                      required: {
                        value: true,
                        message: "Email is required",
                      },
                    })}
                  />
                </div>
              </div>

              <div className="mb-3">
                <Label>Email</Label>
                <Input
                  type="email"
                  {...register("email", {
                    required: {
                      value: true,
                      message: "Email is required",
                    },
                  })}
                />
              </div>
            </form>
          </CardContent>
        </div>
      </div>
    </main>
  );
};

export default Setting;
