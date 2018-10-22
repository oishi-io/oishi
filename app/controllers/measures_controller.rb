class MeasuresController < ApplicationController
  def create
    if Measure.exists?(params[:measure_id])
      @measure = Measure.update(measure_params)
    else
      @measure = Measure.new(measure_params)
    end
    authorize @measure
    @measure.save
    render json: { measure_id: @measure.id,
                   quantity: @measure.quantity.to_i,
                   text1: @measure.text_1,
                   ingredient: {
                     name: @measure.ingredient.name,
                     id: @measure.ingredient.id
                   },
                   text2: @measure.text_2,
                   order: @measure.order }
  end

  def save_order
    measures = params[:measures]
    measures.each do |_k, v|
      @measure = Measure.find_by(id: v['measure_id'])
      @measure.update(order: v['order'])
      authorize @measure
      @measure.save
    end
  end

  def edit
    @recipe = Recipe.find(params[:recipe_id])
    @measure = Measure.find(params[:id])
  end

  def update
    @measure = Measure.update(measure_params)
    redirect_to recipe_path(@recipe.slug)
  end

  def destroy
    @measure = Measure.find(params[:id]) # get the measure from the id
    @measure.destroy
    authorize @measure
    render json: @measure
  end

  private

  def measure_params
    params.require(:measure).permit(:recipe_id, :quantity, :text_1, :ingredient_id, :text_2, :order)
  end
end
