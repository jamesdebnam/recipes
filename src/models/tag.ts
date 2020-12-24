import mongoose, {Schema, Document} from 'mongoose';

export interface ITag extends Document {
    name: string;
}

const TagSchema = new Schema({
    name: {type:String, required: true, unique: true},
})

const Tag= mongoose.model<ITag>('User', TagSchema)

export default Tag;
