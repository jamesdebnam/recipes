import mongoose, {Schema, Document} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import {validateEmail} from "../util/schemaValidation";

export interface IUser extends Document {
    firstName:string;
    lastName: string;
    email:string;
}

const User = new Schema({
    firstName: {
        type: String,
        required:[ true,'First name required']
    },
    lastName: {
        type: String,
        required: [true, 'Last name required']
    },
    email: {
        type: String,
        required: [true, 'Email required'],
        unique: true
    }

})

User.path('email').validate(validateEmail)
