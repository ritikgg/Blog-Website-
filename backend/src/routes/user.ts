import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@ritik_25/medium-common-v2";
    
export const userRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_SECRET: string
  
    }
  }>()

  userRouter.post('/signup', async(c) => {
    const body = await c.req.json();
    const { success } = signupInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        msg: "Inputs are not correct"
      });
    }
    
    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        }
      }
    }).$extends(withAccelerate())
  
    try {
      const user = await prisma.user.create({
        data: {
          username: body.username,
          password: body.password
        }
      });
      const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
      return c.json({ jwt });
    } catch (e) {
      console.log(e);
      
      c.status(403);
      return c.json({ error: "error while signing up" })
    }
  })
  
  userRouter.post('/signin', async(c) => {
    const body = await c.req.json();
    const { success } = signinInput.safeParse(body);
    if(!success) {
      c.status(411);
      return c.json({
        msg: "Inputs are not correct"
      });
    }

    const prisma = new PrismaClient({
      datasources: {
        db: {
          url: c.env.DATABASE_URL,
        }
      }
    }).$extends(withAccelerate())
  
    try {
    const user = await prisma.user.findFirst({
      where:{
        username: body.username
      }
    });
    if(!user){
      c.status(403);
      return c.json({error: "user not found"});
    }
  
    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    
    return c.json({msg: "logged in", jwt})
  }catch(e){
    console.log(e);
    return c.json({
      msg: "login failed"
    })
    
  }
  })