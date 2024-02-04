import z from "zod";

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

export default signupSchema;
