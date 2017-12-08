class AddColumnToMeasure < ActiveRecord::Migration[5.0]
  def change
    rename_column :measures, :description, :text_1
    add_column :measures, :text_2, :string
    add_column :measures, :quantity, :integer
  end
end
