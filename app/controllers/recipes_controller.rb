class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy, :add_details, :add_tags, :add_tools]
  skip_before_action :authenticate_user!, only: [:show]

  def index
    @recipes = policy_scope(Recipe)
    @recipes = Recipe.all
    authorize @recipes
  end

  def show
    @measures = @recipe.measures.order(order: :ASC)
    @steps = @recipe.steps.order(order: :ASC)
    @tags = @recipe.tags
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
    gon.recipeId = @recipe.id
    gon.recipe   = { id: @recipe.id,
                     title: @recipe.title,
                     servings: @recipe.servings,
                     preparation_time: @recipe.preparation_time,
                     cooking_time: @recipe.cooking_time,
                     url: recipe_path(@recipe) }
    gon.ingredients = Ingredient.all
    gon.selectedTags = @recipe.tags.pluck(:id)
    gon.tags = Tag.all
    gon.selectedTools = @recipe.tools.pluck(:id)
    gon.tools = Tool.all
    @measure = Measure.new
    @measures = @recipe.measures.includes(:ingredient).order(order: :ASC)

    serialized_measures = []
    @measures.each do |measure|
      serialized_measures << {
        measure_id: measure.id,
        quantity: measure.quantity.to_i,
        text1: measure.text_1,
        ingredient: { name: measure.ingredient.name, id: measure.ingredient.id },
        text2: measure.text_2,
        order: measure.order }
    end
    gon.measures = serialized_measures
    gon.steps = @recipe.steps.order(order: :ASC)
    gon.stepsLength = gon.steps.pluck(:text).map(&:length)
  end

  def add_tags
    @recipe.tags = Tag.where(id: params[:tags])
    @recipe.save
    head :ok
  end

  def add_tools
    @recipe.tools = Tool.where(id: params[:tools])
    @recipe.save
    head :ok
  end

  def edit
  end

  def update
    @recipe.update(recipe_params)
    authorize @recipe
    @recipe.save
    render json: { recipe: @recipe }, status: 200
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
    params.require(:recipe).permit(:title, :preparation_time, :cooking_time, :servings, photos: [])
  end
end
