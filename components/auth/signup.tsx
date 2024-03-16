"use client";

import Link from "next/link";
import { Button } from "../ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useTransition } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { signup } from "@/actions/auth/signup";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const signupSchema = z.object({
  name: z.string().min(3, {
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

export const Signup = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signupSchema>>({
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof signupSchema>) => {
    startTransition(async () => {
      await signup(values).then((data) => {
        if (data.success) {
          toast.success(data.success);
          setTimeout(() => {
            if (data.success) {
              router.push("/auth/signin");
            }
          }, 2000);
        } else if (data.error) {
          toast.error(data.error);
        }
      });
    });
  };
  return (
    <div className="flex justify-center items-center h-screen relative">
      <div className="w-96 border rounded-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Signup</CardTitle>
        </CardHeader>
        <CardContent className="py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex gap-2">
              <div className="mb-3">
                <Label>Firstname</Label>
                <Input
                  disabled={isPending}
                  type="text"
                  placeholder="Jon"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Firstname is required",
                    },
                  })}
                />
                {errors.name && (
                  <span className="text-red-400 text-xs">
                    {errors.name?.message}
                  </span>
                )}
              </div>
              <div className="mb-3">
                <Label>Lastname</Label>
                <Input
                  disabled={isPending}
                  type="text"
                  placeholder="Doe"
                  {...register("lastname", {
                    required: {
                      value: true,
                      message: "Lastname is required",
                    },
                  })}
                />
                {errors.lastname && (
                  <span className="text-red-400 text-xs">
                    {errors.lastname?.message}
                  </span>
                )}
              </div>
            </div>

            <div className="mb-3">
              <Label>Email</Label>
              <Input
                disabled={isPending}
                type="email"
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
              Signup
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex  flex-col justify-center text-center text-xs">
          <Link href="/auth/signin" className=" hover:underline">
            <span>I ready a account?</span>
          </Link>
        </CardFooter>
    
      </div>
    </div>
  );
};
