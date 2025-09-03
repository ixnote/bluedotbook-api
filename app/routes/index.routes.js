import { isAuthenticated } from "../shared/middleware/auth.jwt.js";
import authRouter from "./auth.routes.js";
import productRouter from "./product.routes.js";
import cartRouter from "./cart.routes.js";
import userRouter from "./user.routes.js";

export default function (app) {
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v1/products", productRouter);
  app.use("/api/v1/cart", [isAuthenticated], cartRouter);
  app.use("/api/v1/users", [isAuthenticated], userRouter);
}
