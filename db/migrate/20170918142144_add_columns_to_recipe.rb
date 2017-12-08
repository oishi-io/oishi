class AddColumnsToRecipe < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :cooking_time, :integer
    add_column :recipes, :preparation_time, :integer
    add_column :recipes, :difficulty, :string
    add_column :recipes, :servings, :integer
  end
end
