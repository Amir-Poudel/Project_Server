import { z } from "zod";

export const registerUserSchema = z.object({
  body: z.object({
    full_name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "full_name is required"
            : "full_name must be a string",
      })
      .min(1, "full_name is required")
      .max(100, "full_name can not exceed 100 characters"),

    user_name: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "user_name is required"
            : "user_name must be a string",
      })
      .min(1, "user_name is required")
      .max(100, "user_name can not exceed 100 characters"),
    email: z.email("Invalid email").min(1, "email is required"),
    password: z
      .string({
        error: (issue) =>
          issue.input === undefined
            ? "password is required"
            : "password must be string",
      })
      .min(6, "minimun 6 characters required"),
  }),
});

//login schema
//email, password
export const loginSchema = z.object({
  body: z.object({
    email: z.email({
      error: (issue) =>
        issue.input === undefined ? "email is required" : "Invalid email",
    }),
    password: z.string({
      error: (issue) =>
        issue.input === undefined
          ? "password is required"
          : "password must be a string",
    }),
  }),
});
