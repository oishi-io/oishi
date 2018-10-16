class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    text = 'update'
    if params[:query] && params[:query] != ''
      recipes = Recipe.search(params[:query])
      text = recipes.ids == params[:recipesIds]&.map(&:to_i) ? 'same' : 'update'
    else
      recipes = Recipe.are_recommended
    end

    respond_to do |format|
      format.json { render json: { recipes: recipes, text: text }, status: 200 }
      format.html { gon.recipes = recipes }
    end
  end
end
