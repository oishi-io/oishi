class Recipe < ApplicationRecord
  has_many :measures, dependent: :destroy
  has_many :steps, dependent: :destroy
  has_many :ingredients, through: :measures
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :tools
  belongs_to :user
  has_attachments :photos, maximum: 10

  validates :name, presence: true, uniqueness: true
end
