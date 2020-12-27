import mongoose, { Schema } from "mongoose";
import { INameDoc } from "./ingredient";

const TagSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Tag = mongoose.model<INameDoc>("Tag", TagSchema);

export default Tag;
