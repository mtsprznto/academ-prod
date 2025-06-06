import { z } from "zod";

export const formSchema = z.object({
    courseName: z.string().min(2).max(200),
    slug: z.string().min(2).max(200).regex(/^[a-zA-Z0-9-]+$/, "Slug cannot contain spaces or special characters"),
});