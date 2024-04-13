import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";
import { SigninSchema, SignupSchema } from "@hustler07/common/dist";

const user = new Hono<{
  Bindings: {
    JWT_SECRET: string;
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

// * ------------ Signup --------------
user.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = SignupSchema.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ message: "Bad Request" });
    }
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: body.password,
        username: body.username,
        name: body.name,
        designation: body.designation,
      },
    });

    const secret = c.env.JWT_SECRET;
    const token = await sign({ id: user.id }, secret);
    c.status(201);
    return c.json({ message: "User created successfully" });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to Signup" });
  }
});

// * ------------ Signin --------------
user.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = SigninSchema.safeParse(body);
    if (!success) {
      c.status(400);
      return c.json({ message: "Bad Request" });
    }
    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
        password: body.password,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid Credentials" });
    }

    const secret = c.env.JWT_SECRET;
    const token = await sign({ id: user.id }, secret);

    return c.json({
      token: token,
      message: "Sign in successful",
      username: user.username,
      email: user.email,
      name: user.name,
      designation: user.designation,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to Signin" });
  }
});

// * ----------- Auth  Middleware ------------------
user.use("/user/*", async (c, next) => {
  console.log("Middle ware called");
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

// * ------------- User Details ----------------
user.get("/user/:username", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const username = c.req.param("username");
    const response = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    
    if (!response) {
      c.status(404);
      return c.json({
        message: "User doesn't exist.",
      });
    }
    c.status(200);
    const data = {
      name: response.name,
      designation: response.designation,
      description: response.description,
      username: response.username,
      email: response.email,
      image: response.image,
    };

    return c.json({
      user: data,
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to get user details." });
  }
});

// * ------------- Update User Details -------------
user.put("/user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const updatedData = {
      username: body.username,
      email: body.email,
      name: body.name,
      designation: body.designation,
      description: body.description,
      image: body.image,
    };
    c.status(200);
    const response = await prisma.user.update({
      where: {
        username: body.username,
      },
      data: updatedData,
    });

    return c.json({
      message: "User details updated.",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to update user." });
  }
});

// * ------------  Delete user ----------------
user.delete("/user", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const id = c.get("userId");
    console.log(id);
    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }

    c.status(200);
    const response = await prisma.user.delete({
      where: {
        id: user.id,
      },
    });
    return c.json({
      message: "User Deleted.",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to delete user." });
  }
});

// * ---------------- Reset User Password -------------
user.put("/user/resetpassword", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const user = await prisma.user.findUnique({
      where: {
        username: body.username,
        password: body.currentPassword,
      },
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Invalid Credentials" });
    }

    const response = await prisma.user.update({
      where: {
        username: body.username,
        password: body.currentPassword,
      },
      data: {
        password: body.newPassword,
      },
    });

    return c.json({
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.error(error);
    c.status(500);
    return c.json({ message: "Failed to Signin" });
  }
});

export default user;
