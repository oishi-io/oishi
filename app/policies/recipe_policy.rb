class RecipePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
  end

  def index?
    true
  end

  def show?
    true # Anyone can view a restaurant
  end

  def create?
    user.admin? # Only an admin can create a new Recipe
  end

  def update?
    user.admin? # Only an admin can update a Recipe
  end

  def destroy?
    user.admin? # Only an admin can delete a Recipe
  end

  def add_details?
    user.admin?
  end
end
