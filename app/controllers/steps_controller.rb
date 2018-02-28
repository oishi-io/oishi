class StepsController < ApplicationController
  def create
    @step = Step.find_or_create_by(id: params[:step_id], recipe_id: params[:recipe_id])
    @step.update(text: params[:text], index: params[:index])
    authorize @step
    @step.save
    head :ok
  end

  def destroy
    @step = Step.find(params[:id]) #get the step from the id
    @step.destroy
    authorize @step
    render json: @step
  end
end
