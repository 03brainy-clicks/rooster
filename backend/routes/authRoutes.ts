import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";

const user = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

// * ------------ signup --------------
user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.username,
      },
    });

    const secret = c.env.JWT_SECRET;
    const token = await sign({ id: user.id }, secret);
    c.status(201);
    return c.json({ token: token, message: "User created successfully" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to Signup" });
  }
});

// * ------------ signin --------------
user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }

    const secret = c.env.JWT_SECRET;
    const token = await sign({ id: user.id }, secret);

    return c.json({ token: token, message: "Sign in successful" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to Signin" });
  }
});

export default user;
