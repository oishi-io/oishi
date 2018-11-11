class ChangeRecommendedDefaultValueOnRecipe < ActiveRecord::Migration[5.2]
  def change
    change_column :recipes, :visible, :boolean, default: false
  end
end
