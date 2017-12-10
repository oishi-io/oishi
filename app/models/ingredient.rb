class Ingredient < ApplicationRecord
  has_many :measures, dependent: :destroy
  has_attachment :photo
end
