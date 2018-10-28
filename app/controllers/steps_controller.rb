class StepsController < ApplicationController
  def create
    return unless params[:text].present? && params[:order].present?

    if params[:step_id] != ''
      @step = Step.find(params[:step_id])
      @step.update(
        text: params[:text],
        order: params[:order]
      )
    else
      @step = Step.create(
        recipe_id: params[:recipe_id],
        text: params[:text],
        order: params[:order]
      )
    end
    authorize @step
    render json: { step: @step, status: 200 }
  end

  def destroy
    @step = Step.find(params[:id])
    @step.destroy
    authorize @step
    render json: @step
  end
end
