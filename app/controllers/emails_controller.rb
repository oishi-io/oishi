class EmailsController < ApplicationController
  skip_before_action :authenticate_user!, only: [:create]
  def create
    @email = Email.new(email_params)
    authorize @email
    if @email.save
    redirect_to root_path
  else
    render 'pages/home'
    end
  end

  private

  def email_params
  params.require(:email).permit(:email_address)
  end
end
