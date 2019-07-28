import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {Subject} from "rxjs";
import {Store} from "@ngrx/store";
import * as ShoppingListActions from "../shopping-list/store/shopping-list.actions";
import * as fromShoppingList from "../shopping-list/store/shopping-list.reducer";
import * as fromApp from '../store/app.reducer';


@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'A test recipe',
  //     'Test desc',
  //     'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_1280.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('French fries', 21)
  //     ]),
  //   new Recipe(
  //     'Second recipe',
  //     'Another desc',
  //     'https://img.taste.com.au/gD11HemW/w720-h480-cfill-q80/taste/2016/11/butter-chicken-with-naan-81484-1.jpeg',
  //     [
  //       new Ingredient('Buns', 2),
  //       new Ingredient('Meat', 3)
  //     ])
  // ];

  private recipes: Recipe[] = [];

  constructor(
    private store: Store<fromApp.AppState>
  ) { }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.slService.addIngredients(ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
