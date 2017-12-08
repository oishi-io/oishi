class CreateTools < ActiveRecord::Migration[5.0]
  def change
    create_table :tools do |t|
      t.string :name
      t.text :description
      t.timestamps
    end

    create_table :recipes_tools, id: false do |t|
      t.belongs_to :recipe, index: true
      t.belongs_to :tool, index: true
    end
  end
end
