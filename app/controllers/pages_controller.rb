class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
    # email = Email.new
    # authorize email
    if params[:query]
      sql_query = 'lower(title) ILIKE :query'
      recipes = Recipe.where(sql_query, query: "%#{params[:query].downcase}%")
      render json: { recipes: recipes }, status: 200
    else
      recipes = Recipe.first(3)
      gon.recipes = recipes
    end
  end
end
