class RecipesController < ApplicationController
  before_action :set_recipe, only: [:show, :edit, :update, :destroy, :add_tags, :add_tools]
  skip_before_action :authenticate_user!, only: [:index, :show]

  def index
    policy_scope(Recipe)
    recipes_index = Recipe.all.order(name: :ASC)
      .map(&:serialize_recipes_index)
      .group_by { |recipe| recipe[:name].first }
    gon.recipes = recipes_index
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
      redirect_to edit_recipe_path(@recipe.slug)
    else
      render 'new'
    end
  end

  def edit
    gon.recipeId = @recipe.id

    gon.recipe = {
      id: @recipe.id,
      slug: @recipe.slug,
      name: @recipe.name,
      servings: @recipe.servings,
      difficulty: @recipe.difficulty,
      preparation_time: @recipe.preparation_time,
      cooking_time: @recipe.cooking_time,
      description: @recipe.description,
      url: recipe_path(@recipe.slug)
    }

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
        ingredient: {
          name: measure.ingredient.name,
          id: measure.ingredient.id
        },
        text2: measure.text_2,
        order: measure.order
      }
    end

    gon.measures = serialized_measures
    gon.steps = @recipe.steps.order(order: :ASC)
    gon.stepsLength = gon.steps.pluck(:text).map(&:length)

    keys_to_extract = %w[name slug]
    gon.recipes = Recipe.all.map { |recipe|
      recipe.attributes.select { |key, _| keys_to_extract.include? key }
    }
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

  def update
    @recipe.update(recipe_params)
    authorize @recipe
    respond_to do |format|
      format.js { head :ok }
      format.html { redirect_to edit_recipe_path(@recipe.slug) }
    end
  end

  def destroy
    @recipe.destroy
    head :ok
  end

  private

  def set_recipe
    @recipe = Recipe.find_by(slug: params[:slug])
    @recipe = Recipe.find(params[:slug]) if @recipe.nil?
    authorize @recipe
  end

  def recipe_params
    params
      .require(:recipe)
      .permit(
        :name,
        :slug,
        :preparation_time,
        :cooking_time,
        :description,
        :difficulty,
        :servings,
        photos: []
      )
  end
end
