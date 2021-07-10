import express from "express";
import usersRouter from "./users";
// import recipesRouter from "./recipes";
// import tagsRouter from "./tags";
// import ingredientsRouter from "./ingredients";

function getRoutes() {
  const router = express.Router();
  router.use("/users", usersRouter);
  // router.use("/recipes", recipesRouter);
  // router.use("/tags", tagsRouter);
  // router.use("/ingredients", ingredientsRouter);
  return router;
}
export { getRoutes };
