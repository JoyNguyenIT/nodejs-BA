import { prisma } from "config/client";
import { z } from "zod";

const isExistEmail = async (email: string) => {
    const isExist = await prisma.user.findUnique({
        where: {
            username: email,
        }
    });
    return isExist;
}

export const RegisterSchema = z.object({
    id: z.string().optional(),
    fullName: z.string().min(1, { message: "Full name is required" }),
    username: z.string().email({ message: "Email is not valid" })
        .refine(async (email) => {
            const isExist = await isExistEmail(email);
            return !isExist;
        }, {
            message: "Email already exists",
            path: ["email"],
        }),
    password: z.string()
        .min(3, { message: "Pasword must be at least 3 characters" })
        .max(20, { message: "Password must be at most 20 characters" }),
    // .refine((password) => /[A-Z]/.test(password), {
    //     message: "Password at least 3 characters",
    // })
    // .refine((password) => /[a-z]/.test(password), {
    //     message: "Password at least 3 characters",
    // })
    // .refine((password) => /[0-9]/.test(password), { message: "Password at least 3 characters" })
    // .refine((password) => /[!@#$%^&*]/.test(password), {
    //     message: "Password at least 3 characters",
    // }),
    cfpassword: z.string()
})
    .refine((data) => data.password === data.cfpassword, {
        message: "Password and Confirm Password do not match",
    });

export type TRegiserSchema = z.infer<typeof RegisterSchema>;