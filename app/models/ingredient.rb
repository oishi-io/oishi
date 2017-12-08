class Ingredient < ApplicationRecord
  has_many :measures
  has_attachment :photo
end
