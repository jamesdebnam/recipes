export interface User {
  id: number;
  hash: string;
  salt: string;
  first_name: string;
  last_name: string;
  email: string;
  isAdmin: boolean;
  custom_groups: Recipe[];
}

export interface Recipe {
  id: number;
  name: string;
  tags: { name: string }[];
  steps: string[];
  description: string;
  ingredients: RecipeIngredient[];
  image: string;
  serves: number;
}

export interface RecipeIngredient {
  name: string;
  number: number;
  unit: string;
  note: string;
}
