import { Hono } from 'hono'
import { userRouter  } from './routes/user'
import { blogRouter } from './routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    SECRET_JWT: string;
    DATABASE_URL: string;
  }}>()
app.use("/*",cors())
 app.route("/api/v1/user",userRouter);
 app.route("/api/v1/blog",blogRouter)

// app.post('/api/v1/user/signup', async (c) => {
  
// });

// app.post('/api/v1/user/signin',async (c,next) => {
   
// })

export default app
