class RemoveInstructionsFromRecipes < ActiveRecord::Migration[5.0]
  def change
    remove_column :recipes, :instructions
  end
end
