import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  tags: string[];
  steps: string[];
  ingredients: IRecipeIngredient[];
  image: string;
  serves: number;
  author: string;
}

export interface IRecipeIngredient {
  name: string;
  number: number;
  unit: string;
  note: string;
}

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  tags: [String],
  steps: [String],
  description: String,
  serves: Number,
  ingredients: [
    {
      name: String,
      number: Number,
      unit: String,
      note: String,
    },
  ],
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
