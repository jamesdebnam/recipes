import { Request } from "express";
import Recipe from "../models/recipe";
import { getUserId } from "./mongoose";
import User from "../models/user";
import logger from "loglevel";

declare module "express-session" {
  interface Session {
    passport: { user: string };
  }
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(email);
}

export function isLoggedIn(req: Request): boolean {
  console.log(req.session);
  return !!req.session.passport?.user;
}

export async function validateProtectedRecipe(req: Request): Promise<void> {
  if (!isLoggedIn(req)) {
    throw new Error("user is not logged in.");
  }
  const recipe = await Recipe.findById(req.params.id);
  const userId = await getUserId(req);
  if (!recipe) {
    throw new Error("No recipe with that _id found");
  } else if (userId !== recipe.author) {
    throw new Error("Current user is not authorized to edit this recipe");
  }
}

export async function validateProtectedUser(req: Request): Promise<void> {
  if (!isLoggedIn(req)) {
    throw new Error("user is not logged in.");
  }
  const userId = await getUserId(req);
  if (`${userId}` !== req.params.id) {
    throw new Error(`Current user is not authorized to edit this recipe`);
  }
}
