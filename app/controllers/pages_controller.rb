class PagesController < ApplicationController
  skip_before_action :authenticate_user!, only: [:home]

  def home
  @recipes = Recipe.first(3)
  @email = Email.new
  authorize @email
  end
end
