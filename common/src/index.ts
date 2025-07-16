import z, { strictObject } from "zod";

export const signupInput = z.object({
  username: z.string().email({message:"invalid email"}),
  password: z.string().min(6,{message:"invalid password must be >6"}),
  name: z.string().optional()
});


export const signinInput = z.object({
  username: z.string().email({message:"invalid email"}),
  password: z.string().min(6,{message:"invalid password must be >6"}),
});


export const createlogInput = z.object({
    title: z.string(),
    content : z.string(),
})


export const createlogOutput = z.object({
    title: z.string(),
    constant : z.string(),
    authorId :z.number()
})
export type SignupInput = z.infer<typeof signupInput>

export type SigninInput = z.infer<typeof signinInput>

export type createlogInput = z.Infer<typeof createlogInput>

export type createlogOutput = z.Infer<typeof createlogOutput>

