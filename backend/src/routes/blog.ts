import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";
import { createlogOutput , createlogInput } from '@marioduplin/medium-blog'

export const blogRouter = new Hono<{
Bindings:{
    DATABASE_URL:string;
    SECRET_JWT:string;
},
Variables:{
    userId:string;
}
}>();
blogRouter.use('/*', async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  console.log("before verify");

  try {
    const user = await verify(authHeader, c.env.SECRET_JWT);
    console.log("after verify:", user);

    if (user && typeof user === "object" && "id" in user) {
      c.set("userId", String(user.id));
      return await next();
    } else {
      c.status(403);
      return c.json({ message: "you are not logged in" });
    }
  } catch (e) {
    console.error("verify threw error:", e);
    c.status(403);
    return c.json({ message: "invalid token or you are not logged in" });
  }
});

blogRouter.post('/',async (c)=>{

    const body = await c.req.json();
    const { success } = createlogInput.safeParse(body);
    if(!success){
        c.status(411);
        return c.json({
            message:"blog inputs are not correct"
        })
    }
    const userId = c.get("userId");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog = await prisma.blog.create({
        data:{
            title: body.title,
            content : body.content,
            authorId: Number(userId)
        }
    })

    return c.json({
        id: blog.id
    })
})

//no pagination remember
blogRouter.put('/', async (c)=>{

    const body = await c.req.json();
    const { success } = createlogOutput.safeParse(body);
    if(!success){
    c.status(411);
    return c.json({
        message:"blog inputs are not correct"
    })
    }

    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const blog = await prisma.blog.update({
        where:{
            id:body.id
        },
        data:{
            title:body.title,
            content:body.content
        }
    })
    return c.text("updated successfully")
})

blogRouter.get('/bulk',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blogs = await prisma.blog.findMany({

            select :{
                content : true,
                title:true,
                id:true,
                author:{
                    select:{
                        name:true
                    }
                }
            }

        })
    return c.json({blogs})
    }catch(e){
        c.status(411);
        return c.json({
            message:"error while fetching rom blog/get"
        })
    }

})

blogRouter.get('/:id',async (c)=>{

    const id = c.req.param("id");
    const prisma = new PrismaClient({
        datasourceUrl : c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    try{
        const blog = await prisma.blog.findFirst({
                where:{
                    id:Number(id),
                },
                select:{
                    id:true,
                    title:true,
                    content:true,
                    author:{
                        select:{
                            name: true
                        }
                    }
                }
            })

    return c.json(blog)
    }catch(e){
        c.status(411);
        return c.json({
            message:"error while fetching rom blog/get"
        })
    }
    
})

