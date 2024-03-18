import { Hono } from "hono";
import AuthRoutes from "../routes/authRoutes";
import BlogRoutes from "../routes/blogRoutes";
import { cors } from "hono/cors";

type BindingType = {
  JWT_SECRET: string;
  DATABASE_URL: string;
};

const app = new Hono<{  
  Bindings: BindingType;
  Variables: {
    userId: string;
  };
}>();

app.use("/*", cors());
app.route("/api/v1/blog", BlogRoutes);
app.route("/api/v1/auth", AuthRoutes);

export default app;
