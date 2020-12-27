import mongoose, { Schema, Document } from "mongoose";

export interface IRecipe extends Document {
  name: string;
  tags: string[];
  steps: string[];
  ingredients: IRecipeIngredient[];
  image: string;
  author: string;
}

export interface IRecipeIngredient {
  name: string;
  number: number;
  note: string;
}

const RecipeSchema = new Schema({
  name: { type: String, required: true },
  tags: [String],
  steps: [String],
  description: String,
  ingredients: [
    {
      name: String,
      number: Number,
      note: String,
    },
  ],
  image: String,
  author: { type: Schema.Types.ObjectId, ref: "User" },
});

const Recipe = mongoose.model<IRecipe>("Recipe", RecipeSchema);

export default Recipe;
