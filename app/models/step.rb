class Step < ApplicationRecord
  belongs_to :recipe
  validates :index, presence: true
  validates :text, presence: true
end
