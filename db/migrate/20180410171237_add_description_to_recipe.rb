class AddDescriptionToRecipe < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :description, :text
  end
end
