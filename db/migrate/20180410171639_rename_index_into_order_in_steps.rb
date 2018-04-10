class RenameIndexIntoOrderInSteps < ActiveRecord::Migration[5.0]
  def change
    add_column :steps, :order, :integer
    get_order
    remove_column :steps, :index, :integer
  end

  def get_order
    Step.all.each do |step|
      step.order = step.index
      step.save
    end
  end
end
