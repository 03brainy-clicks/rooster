import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blog = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
}>();

// * ------------  auth middleware --------------
blog.use("/*", async (c, next) => {
  try {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      c.status(401);
      return c.json({ message: "Unauthorized - Missing token" });
    }
    const secret = c.env.JWT_SECRET;
    const response = await verify(token, secret);
    if (response.id) {
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Forbidden - Invalid token" });
    }
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Internal Server Error" });
  }
});

// * ------------ get blogs --------------
blog.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.blog.findMany();
    c.status(200);
    return c.json({
    blogs: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to get blogs" });
  }
});

// * ------------ get specific blog --------------
blog.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const response = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });
    if (!response) {
      c.status(404);
      return c.json({
        message: "Blog post doesn't exist.",
      });
    }
    c.status(200);
    return c.json({
      blog: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to get specific blog" });
  }
});

// * ------------ add blog --------------
blog.post("/blog", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const postData = {
      title: body.title,
      content: body.content,
      published: body.published || false,
      author: { connect: { id: body.authorId } },
    };
    await prisma.blog.create({
      data: postData,
    });
    c.status(201);
    return c.json({ message: "Blog created successfully" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to create blog" });
  }
});

// * ------------ update blog --------------
blog.put("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    const response = await prisma.blog.findUnique({
      where: {
        id: id,
      },
    });

    if (!response) {
      c.status(404);
      return c.json({
        message: "Blog doesn't exist.",
      });
    }

    const body = await c.req.json();
    const updatedData = {
      title: body.title,
      content: body.content,
      published: body.published || false,
      author: { connect: { id: body.authorId } },
    };
    await prisma.blog.update({
      where: {
        id: id,
      },
      data: updatedData,
    });

    return c.json({ message: "Blog updated successfully" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to update blog" });
  }
});

// * ------------ delete blog --------------
blog.delete("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const id = c.req.param("id");
    await prisma.blog.delete({
      where: {
        id: id,
      },
    });

    c.status(200);
    return c.json({
      message: "Blogg Deleted Successfully",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to delete blog" });
  }
});

export default blog;
