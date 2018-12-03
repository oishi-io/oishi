class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    if params[:query].present?
      if params[:query] == "Recettes du moment"
        recipes = Recipe.visible.recommended.map(&:serialize)
      else
        recipes = Recipe.search(params[:query]).map(&:serialize)
      end

      query = ActionController::Base.helpers.sanitize(params[:query])&.strip
    else
      query = nil
      recipes = Recipe.visible.recommended.map(&:serialize)
    end

    respond_to do |format|
      format.json {
        render json: {
          recipes_count: recipes.count,
          recipes: recipes,
          query: query,
        },
        status: 200
      }
      format.html {
        gon.recipes = recipes
        gon.query = query
      }
    end
  end
end
