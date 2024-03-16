"use client";

import Link from "next/link";
import { CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import Social from "./social";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useTransition } from "react";
import { signin } from "@/actions/auth/signin";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
const signinSchema = z.object({
  email: z.string().email().min(3, {
    message: "Email must be at least 3 characters",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 6 characters",
  }),
});

const Signin = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signinSchema>>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof signinSchema>) => {
    startTransition(async () => {
      await signin(values).then((data) => {
        if (data?.ok) {
          toast.success("Signin success");
          router.push("/");
        }
        if (data?.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-96 border rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Signin</CardTitle>
        </CardHeader>
        <CardContent className="py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <Label>Email</Label>
              <Input
                disabled={isPending}
                type="email"
                autoComplete="email"
                placeholder="jdoe@domain.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                })}
              />
              {errors.email && (
                <span className="text-red-400 text-xs">
                  {errors.email?.message}
                </span>
              )}
            </div>
            <div className="mb-3">
              <Label>Password</Label>
              <Input
                disabled={isPending}
                type="password"
                autoComplete="current-password"
                placeholder="********"
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                })}
              />
              {errors.password && (
                <span className="text-red-400 text-xs">
                  {errors.password?.message}
                </span>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              Signin
            </Button>
          </form>
        </CardContent>
        <Social />
        <CardFooter className="flex  flex-col justify-center text-center text-xs">
          <Link href="/auth/signup" className=" hover:underline">
            <span>You do not have an account?</span>
          </Link>
        </CardFooter>
      </div>
    </div>
  );
};

export default Signin;
