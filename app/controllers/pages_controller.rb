class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    if params[:query] && params[:query] != ''
      sql_query = 'lower(title) ILIKE :query'
      recipes = Recipe.where(sql_query, query: "%#{params[:query].downcase}%")
      text = recipes.ids == params[:recipesIds]&.map(&:to_i) ? 'same' : 'update'
      render json: { recipes: recipes, text: text }, status: 200
    elsif params[:query] == ''
      recipes = Recipe.first(3)
      render json: { recipes: recipes, text: 'update' }, status: 200
    else
      recipes = Recipe.first(3)
      gon.recipes = recipes
    end
  end
end
