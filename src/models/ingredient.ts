import mongoose, { Schema, Document } from "mongoose";

export interface INameDoc extends Document {
  name: string;
}

const IngredientSchema = new Schema({
  name: { type: String, required: true, unique: true },
});

const Ingredient = mongoose.model<INameDoc>("Ingredient", IngredientSchema);

export default Ingredient;
