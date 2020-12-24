import mongoose, {Schema, Document} from 'mongoose';

export interface IIngredient extends Document {
    name: string;
}

const IngredientSchema = new Schema({
    name: {type:String, required: true, unique: true},
})

const Ingredient= mongoose.model<IIngredient>('User', IngredientSchema)

export default Ingredient;
