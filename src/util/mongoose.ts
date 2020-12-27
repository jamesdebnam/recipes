import { INameDoc } from "../models/ingredient";
import { Model } from "mongoose";
import User from "../models/user";

export async function saveUniqueDocuments(
  name: string,
  Document: Model<INameDoc>
): Promise<void> {
  const doc = await Document.findOne({ name: name.toLowerCase() });
  if (!doc) {
    const newDoc = new Document({ name: name.toLowerCase() });
    await newDoc.save();
  }
}

export async function getUserId(req: any): Promise<string> {
  const user = await User.findOne({ name: req.session.passport.user });
  if (!user) {
    throw new Error("No user found in database with session email");
  } else {
    return user._id;
  }
}
