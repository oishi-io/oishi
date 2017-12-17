class EmailsController < ApplicationController
  def create
    @email = Email.new
    authorize @email
    @email.save
  end
end
