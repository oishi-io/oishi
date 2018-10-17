class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    if params[:query]
      previous_ids = params[:recipeIds].map(&:to_i)
      recipes = Recipe.search(params[:query])

      recipes_to_add = to_add(recipes, previous_ids)
      recipes_to_remove = to_remove(recipes, previous_ids)
    else
      recipes = Recipe.are_recommended
    end

    respond_to do |format|
      format.json {
        render json: {
          to_add: recipes_to_add,
          to_remove: recipes_to_remove
        },
        status: 200
      }
      format.html { gon.recipes = recipes }
    end
  end

  private

  def to_remove(search_results, previous_ids)
    previous_ids - search_results.pluck(:id)
  end

  def to_add(search_results, previous_ids)
    recipe_to_add = []

    search_results.each do |result|
      next if previous_ids.include?(result.id)

      recipe_to_add << result
    end

    recipe_to_add
  end

  # def organize_search_results(search_results, previous_ids)
  #   organized_results = {
  #     remove: [],
  #     add: []
  #   }
  #
  #   organized_results[:remove] =
  #
  #   search_results.each do |result|
  #     next if previous_ids.include?(result.id)
  #
  #     organized_results[:add] << result
  #   end
  #
  #   organized_results
  # end
end
