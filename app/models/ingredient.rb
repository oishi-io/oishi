class Ingredient < ApplicationRecord
  has_many :measures, dependent: :destroy
end
