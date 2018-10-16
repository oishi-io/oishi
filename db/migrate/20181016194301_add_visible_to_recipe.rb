class AddVisibleToRecipe < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :visible, :boolean, default: true
    add_column :recipes, :recommended, :boolean, default: false
  end
end
