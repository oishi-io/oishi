class MeasuresController < ApplicationController
  def create
    @measure = Measure.new(measure_params)
    @recipe = Recipe.find(params[:recipe_id])
    @measure.recipe = @recipe
    authorize @measure
    @measure.save
    respond_to do |format|
      format.js  # <-- will render `app/views/measures/create.js.erb`
    end
  end

  def edit
    @recipe = Recipe.find(params[:recipe_id])
    @measure = Measure.find(params[:id])
  end

  def update
    @measure= Measure.update(measure_params)
    redirect_to recipe_path(@recipe)
  end

  def destroy
    @measure = Measure.find(params[:id]) #get the measure from the id
    @recipe = @measure.recipe
    @measure.destroy
    redirect_to recipe_path(@recipe)
  end

  private

  def measure_params
    params.require(:measure).permit(:quantity, :text_1, :ingredient_id, :text_2)
  end
end
