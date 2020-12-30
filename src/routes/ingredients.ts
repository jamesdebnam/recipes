import express from "express";
import Ingredient from "../models/ingredient";
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const ingredients = await Ingredient.find({});
    if (!ingredients) {
      return res
        .status(404)
        .send({ status: "error", message: "No ingredients found" });
    }
    return res.status(200).send({ status: "ok", data: ingredients });
  } catch ({ message }) {
    return res.status(500).send({ status: "error", message });
  }
});

export default router;
