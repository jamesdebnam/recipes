import express, { Request } from "express";
import Recipe, { IRecipeIngredient } from "../models/recipe";
import { getUserId, saveUniqueDocuments } from "../util/mongoose";
import Ingredient from "../models/ingredient";
import Tag from "../models/tag";
import { isLoggedIn, validateProtectedRecipe } from "../util/schemaValidation";

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
      if (!isLoggedIn(req)) {
        return res
          .status(401)
          .send({ status: "error", message: "user is not logged in." });
      }
      const { ingredients, tags } = req.body;
      ingredients.forEach((item: IRecipeIngredient) =>
        saveUniqueDocuments(item.name, Ingredient)
      );
      tags.forEach((item: string) => saveUniqueDocuments(item, Tag));
      const author = await getUserId(req);
      const newRecipe = new Recipe({ ...req.body, author });
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
    try {
      await validateProtectedRecipe(req);
      const updatedRecipe = await Recipe.updateOne(
        { _id: req.params.id },
        { $set: req.body }
      );
      return res.status(200).send({ status: "ok", data: updatedRecipe });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  })
  .delete(async (req, res) => {
    try {
      await validateProtectedRecipe(req);
      await Recipe.deleteOne({ _id: req.params.id });
      return res.status(200).send({ status: "ok" });
    } catch ({ message }) {
      return res.status(500).send({ status: "error", message });
    }
  });

export default router;
