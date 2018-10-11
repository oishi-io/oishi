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
    true # Anyone can view a Recipe
  end

  def create?
    user.admin? # Only an admin can create a Recipe
  end

  def edit?
    user.admin? # Only an admin can edit a Recipe
  end

  def update?
    user.admin? # Only an admin can edit a Recipe
  end

  def destroy?
    user.admin? # Only an admin can delete a Recipe
  end

  def add_tags?
    user.admin?
  end

  def add_tools?
    user.admin?
  end
end
