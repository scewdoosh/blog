import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { decode, sign, verify } from "hono/jwt";
import { signupInput , signinInput } from '@marioduplin/medium-blog'

export const userRouter = new Hono<{
    Bindings:{
        DATABASE_URL:string;
        SECRET_JWT:string;
    }
}>();



userRouter.post('/signup',async (c)=>{
     
      const body = await c.req.json();
      const { success } = signupInput.safeParse(body)  
      if(!success){
        return c.json({
            message:"user inputs are not correct"
        })
      }
      console.log('BODY:', body);
    
      const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());
    
    
      try {
        const user = await prisma.user.create({
          data: {
            username: body.username,
            password: body.password,
            name : body.name
          }
        });
        const jwt = await sign({
          id: user.id,
        },c.env.SECRET_JWT)
    
        console.log(jwt)
        console.log({message: 'User created'});
        return c.text(jwt);
      }catch (e: any) {
      c.status(411)
      console.error('❌ Prisma Error:', e);
      return c.text('invalid from signup')
    }
})

userRouter.post('/signin', async (c)=>{
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body)
    if(!success){
      return c.json({
          message:"user inputs are not correct"
      })
    }
  console.log('BODY:', body);

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());


  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      }
    });
    if(!user){
      c.status(403);
      return c.text('Invalid user (from singin)')
    }
    const jwt = await sign({
      id: user.id,
    },c.env.SECRET_JWT)

    console.log(jwt)
    console.log({message: 'User created'});
    

    return c.text(jwt);
  }catch (e: any) {
  c.status(411)
  console.error('❌ Prisma Error:', e);
  return c.text('invalid')
}
})
