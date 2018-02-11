class MeasuresController < ApplicationController
  def create
    @measure = Measure.find_by(id: params[:measure][:measure_id])
    binding.pry
    if @measure == nil
      @measure = Measure.new(measure_params)
    else
      @measure.update(measure_params)
    end
    authorize @measure
    @measure.save
    render json: { @measure['id'] => {
        measure_id: @measure.id,
        quantity: @measure.quantity,
        text1: @measure.text_1,
        ingredient: { name: @measure.ingredient.name, id: @measure.ingredient.id },
        text2: @measure.text_2
      }
    }
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
    params.require(:measure).permit(:recipe_id, :quantity, :text_1, :ingredient_id, :text_2)
  end
end
