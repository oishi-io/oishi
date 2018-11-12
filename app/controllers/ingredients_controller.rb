class IngredientsController < ApplicationController
  before_action :set_ingredient, only: [:show, :edit, :update, :destroy]

  def index
    policy_scope(Ingredient)
    ingredients = Ingredient.all.order(:name)
    authorize ingredients
    gon.ingredients = ingredients
  end

  def show; end

  def new
    @ingredient = Ingredient.new
    authorize @ingredient
  end

  def create
    @ingredient = Ingredient.new(ingredient_params)
    authorize @ingredient
    @ingredient.save
    respond_to do |format|
      format.json { render json: { ingredient: @ingredient }, status: 200 }
      format.html { redirect_to ingredients_path }
    end
  end

  def edit; end

  def update
    @ingredient.update(ingredient_params)
    if @ingredient.save
      redirect_to ingredients_path
    else
      render 'edit'
    end
  end

  def destroy
    @ingredient.destroy
    head :ok
  end

  private

  def set_ingredient
    @ingredient = Ingredient.find(params[:id])
    authorize @ingredient
  end

  def ingredient_params
    params.require(:ingredient).permit(:name, :description)
  end
end
