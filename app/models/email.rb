class Email < ApplicationRecord
  validates :email_address, presence: true
end
