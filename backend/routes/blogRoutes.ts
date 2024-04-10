import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

const blog = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

// * ------------  auth middleware --------------
blog.use("/*", async (c, next) => {
  try {
    const header = c.req.header("Authorization") || "";
    const token = header.split(" ")[1];
    if (!token) {
      c.status(401);
      return c.json({ message: "Unauthorized - Missing token." });
    }
    const secret = c.env.JWT_SECRET;
    const response = await verify(token, secret);
    if (response.id) {
      c.set("userId", response.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "Forbidden - Invalid token." });
    }
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Internal Server Error." });
  }
});

// * ------------ get blogs --------------
blog.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const response = await prisma.blog.findMany({
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blogs: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to get blogs." });
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
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
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
    return c.json({ message: "Failed to get specific blog." });
  }
});

// * ------------ add blog --------------
blog.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const postData = {
      title: body.title,
      tag: body.tag,
      content: body.content,
      image: body.image,
      date: body.date,
      published: body.published || false,
      author: { connect: { id: c.get("userId") } },
    };
    await prisma.blog.create({
      data: postData,
    });
    c.status(201);
    return c.json({ message: "Blog created successfully." });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to create blog." });
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
      image: body.image,
      author: { connect: { id: c.get("userId") } },
    };
    await prisma.blog.update({
      where: {
        id: id,
      },
      data: updatedData,
    });

    return c.json({ message: "Blog updated successfully." });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to update blog." });
  }
});

// * ------------ publish blog --------------
blog.put("/publish/:id", async (c) => {
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

    await prisma.blog.update({
      where: {
        id: id,
      },
      data: {
        published: true,
      },
    });

    return c.json({ message: "Blog published successfully." });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to publish blog." });
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
      message: "Blogg Deleted Successfully.",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to delete blog." });
  }
});

// * ------------ search by tag --------------
blog.get("/search/tag/:tag", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const tag = c.req.param("tag");
    const response = await prisma.blog.findMany({
      where: {
        tag: {
          contains: tag,
        },
      },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blogs: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to search blogs by tag." });
  }
});

// * ------------ search by username --------------
blog.get("/search/username/:username", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const username = c.req.param("username");
    const response = await prisma.blog.findMany({
      where: {
        author: {
          username: {
            contains: username,
          },
        },
      },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blogs: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to search blogs by username." });
  }
});

// * ------------ search by title --------------
blog.get("/search/title/:title", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const title = c.req.param("title");
    const response = await prisma.blog.findMany({
      where: {
        title: {
          contains: title,
        },
      },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blogs: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to search blogs by title." });
  }
});

// * ------------ search by date --------------
blog.get("/search/date/:date", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const date = c.req.param("date");
    const response = await prisma.blog.findMany({
      where: {
        date: {
          contains: date,
        },
      },
      include: {
        author: {
          select: {
            username: true,
            name: true,
          },
        },
      },
    });
    c.status(200);
    return c.json({
      blogs: response,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to search blogs by date." });
  }
});

export default blog;
