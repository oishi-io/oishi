class ChangeTitleColumnInRecipe < ActiveRecord::Migration[5.0]
  def change
    add_column :recipes, :name, :string
    update_name
    remove_column :recipes, :title, :string
  end

  def update_name
    Recipe.all.each do |recipe|
      recipe.update(name: recipe.title)
    end
  end
end
