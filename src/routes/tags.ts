import express from "express";
import Tag from "../models/tag";
const router = express.Router();

router.route("/").get(async (req, res) => {
  try {
    const tags = await Tag.find({});
    if (!tags) {
      return res
        .status(404)
        .send({ status: "error", message: "No tags found" });
    }
    return res.status(200).send({ status: "ok", data: tags });
  } catch ({ message }) {
    return res.status(500).send({ status: "error", message });
  }
});

export default router;
