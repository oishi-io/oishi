class Step < ApplicationRecord
  belongs_to :recipe
  validates :order, presence: true
  validates :text, presence: true
end
