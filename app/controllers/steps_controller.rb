class StepsController < ApplicationController
  def create
    @step = Step.new
    if params[:text] != "" && params[:index] != "" && params[:step_id] != ""
      @step = Step.find_by(id: params[:step_id])
      @step.update(text: params[:text], index: params[:index])
    elsif params[:text] != "" && params[:index] != ""
      @step = Step.create(recipe_id: params[:recipe_id], text: params[:text], index: params[:index])
    end
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
