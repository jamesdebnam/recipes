import mongoose, {Schema, Document} from 'mongoose';

export interface IRecipe extends Document {
  name: string;
  tags: string[];
  steps: string[];
  ingredients: string[];
  image: string;
}

const RecipeSchema = new Schema({
  name: {type: String, required: true},
  tags: [{type: Schema.Types.ObjectId, ref: 'Tags'}],
  steps: [String],
  description: String,
  ingredients: [{
    number: Number,
    ingredient: String
  }],
  image: String
})

const Recipe = mongoose.model<IRecipe>('User', RecipeSchema)

export default Recipe;

