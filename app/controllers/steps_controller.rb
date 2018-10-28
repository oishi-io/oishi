class StepsController < ApplicationController
  def create
    @step = Step.new
    if params[:text] != '' && params[:order] != '' && params[:step_id] != ''
      @step = Step.find_by(id: params[:step_id])
      @step.update(text: params[:text], order: params[:order])
    elsif params[:text] != '' && params[:order] != ''
      @step = Step.create(recipe_id: params[:recipe_id], text: params[:text], order: params[:order])
    end
    authorize @step
    @step.save
    render json: { step: @step, status: 200 }
  end

  def destroy
    @step = Step.find(params[:id]) # get the step from the id
    @step.destroy
    authorize @step
    render json: @step
  end
end
