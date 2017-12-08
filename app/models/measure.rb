class Measure < ApplicationRecord
  belongs_to :ingredient
  belongs_to :recipe
  validates :text_1, presence: true
end
