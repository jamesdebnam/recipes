import mongoose, {Schema, Document, Model, PassportLocalSchema, PassportLocalDocument} from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';
import {validateEmail} from "../util/schemaValidation";

export interface IUser extends PassportLocalDocument {
  firstName: string;
  lastName: string;
  email: string;
  recipes: string[];
  getUserObj: () => IUser;
  salt?: string;
  hash?: string
}

const UserSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'First name required']
  },
  lastName: {
    type: String,
    required: [true, 'Last name required']
  },
  email: {
    type: String,
    required: [true, 'Email required'],
    unique: true
  },
  starredRecipes: [{
    recipeId: {type: Schema.Types.ObjectId, ref: 'Recipes'},
    userTags: [{type: Schema.Types.ObjectId, ref: 'Tags'}]
  }],
  recipes: [{type: Schema.Types.ObjectId, ref: 'Recipes'}]
})

UserSchema.path('email').validate(validateEmail, 'Not a valid email', 'Invalid Email')

UserSchema.plugin(passportLocalMongoose, {usernameField: 'email', passwordField: 'password', passReqToCallback: true})

UserSchema.methods.getUserObj = function () {
  const doc: IUser = {...this._doc};
  delete doc.salt;
  delete doc.hash;
  return doc;
}

const User: mongoose.PassportLocalModel<IUser> = mongoose.model('User', UserSchema as PassportLocalSchema)


export default User;
