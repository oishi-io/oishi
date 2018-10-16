class Recipe < ApplicationRecord
  has_many :measures, dependent: :destroy
  has_many :steps, dependent: :destroy
  has_many :ingredients, through: :measures
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :tools
  belongs_to :user
  has_attachments :photos, maximum: 10

  validates :name, presence: true, uniqueness: true

  def visible?
    visible
  end

  def recommended?
    recommended
  end

  def self.are_visible
    where(visible: true)
  end

  def self.are_recommended
    where(visible: true, recommended: true)
  end

  def self.search(query)
    sql_query = 'lower(name) ILIKE :query'

    where(sql_query, query: "%#{query.downcase}%")
  end
end
