class Recipe < ApplicationRecord
  has_many :measures, dependent: :destroy
  has_many :steps, dependent: :destroy
  has_many :ingredients, through: :measures
  has_and_belongs_to_many :tags
  has_and_belongs_to_many :tools
  belongs_to :user
  has_attachments :photos, maximum: 10

  validates :name, presence: true, uniqueness: true

  include PgSearch

  pg_search_scope :pg_search,
    against: :name,
    associated_against: {
      ingredients: :name,
      tags: :name
    },
    using: {
      tsearch: { prefix: true }
    }

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
    return are_recommended if query == ''

    safe_query = ActionController::Base.helpers.sanitize(query).strip
    pg_search(safe_query)
  end
end
