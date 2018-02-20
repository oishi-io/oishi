class AddOrderToMeasures < ActiveRecord::Migration[5.0]
  def change
    add_column :measures, :order, :integer, default: 0
  end
end
