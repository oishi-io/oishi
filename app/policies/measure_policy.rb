class MeasurePolicy < ApplicationPolicy
  class Scope < Scope
    def resolve
      scope
    end
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

  def save_order?
    user.admin?
  end
end
