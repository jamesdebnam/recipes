import express from "express";
import Recipe from "../models/recipe";
const router = express.Router();

router
  .route("/")
  .get(async (req, res) => {
    try {
      const recipes = await Recipe.find({});
      if (!recipes) {
        return res
          .status(404)
          .send({ status: "error", message: "No recipes found" });
      }
      return res.status(200).send({ status: "ok", data: recipes });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  })
  .post(async (req, res) => {
    try {
      const newRecipe = new Recipe(req.body);
      await newRecipe.save();
      res.status(200).send({ status: "ok", data: newRecipe });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  });

router
  .route("/:id")
  .get(async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).send({
          status: "error",
          message: "No recipe with that _id found",
        });
      }
      return res.status(200).send({ status: "ok", data: recipe });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  })
  .patch(async (req, res) => {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({
        status: "error",
        message: "No recipe with that _id found",
      });
    }
    await Recipe.updateOne({ _id: req.params.id }, { $set: req.body });
  });

export default router;
