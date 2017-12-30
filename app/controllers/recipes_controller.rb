class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy, :add_details]

  def index
    @recipes = policy_scope(Recipe)
    @recipes = Recipe.all
    authorize @recipes
  end

  def show
    @measure = Measure.new
    @measures = @recipe.measures
    @ingredient = Ingredient.new
    @tag = Tag.new
    @tags = @recipe.tags
    @tool = Tool.new
    @tools = @recipe.tools
  end

  def new
    @recipe = Recipe.new
    authorize @recipe
  end

  def create
    @recipe = Recipe.new(recipe_params)
    @recipe.user = current_user
    authorize @recipe
    if @recipe.save
      redirect_to add_details_path(@recipe)
    else
      render 'new'
    end
  end

  def add_details
    @measure        = Measure.new
    @ingredient     = Ingredient.new
    @ingredients    = Ingredient.all
    gon.ingredients = @ingredients
    @tag            = Tag.new
    @tags           = Tag.all
    gon.tags        = @tags
    @tool           = Tool.new
    @tools          = Tool.all
    gon.tools       = @tools
  end

  def edit
  end

  def update
    @recipe.update(recipe_params)
    redirect_to recipe_path(@recipe)
  end

  def destroy
    @recipe.destroy
    redirect_to recipes_path
  end

  private

  def set_recipe
    @recipe = Recipe.find(params[:id])
    authorize @recipe
  end

  def recipe_params
  params.require(:recipe).permit(:title, :instructions, :servings, photos: [])
  end

end
