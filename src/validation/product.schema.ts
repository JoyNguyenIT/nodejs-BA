import { z } from "zod";

export const ProductSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, { message: "Name is required" }),
    price: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),
    detailDesc: z.string().min(1, { message: "Description is required" }),
    shortDesc: z.string().min(1, { message: "Short description is required" }),
    quantity: z.string()
        .transform((val) => (val === "" ? 0 : Number(val)))
        .refine((num) => num > 0, {
            message: "Số tiền tối thiểu là 1",
        }),
    sold: z.string().default("0")
        .transform((val) => (val === "" ? 0 : Number(val))),
    factory: z.string().min(1, { message: "Name is required" }),
    target: z.string().min(1, { message: "Name is required" }),
});

export type TProductSchema = z.infer<typeof ProductSchema>;

