class ToolsController < ApplicationController
  before_action :set_tool, only: [:edit, :show, :update, :destroy]
  def create
    @tool = Tool.find_or_create_by(tool_params)
    authorize @tool
    @tool.save
    @update = false
    if recipe_params[:recipe_id]
      @recipe = Recipe.find(recipe_params[:recipe_id])
      unless @recipe.tools.include?(@tool)
        @recipe.tools << @tool
        authorize @recipe
        @recipe.save
        @update = true
      end
    end
    respond_to do |format|
      format.html {redirect_to(root_path)}
      format.js  # <-- will render `app/views/tools/create.js.erb`
    end
  end
  def new
    @tool = Tool.new
    authorize @tool
  end

  def edit

  end

   def index
    @tools = policy_scope(Tool)
    @tools = Tool.all
    authorize @tools
  end

  def show

  end

  def update
    @tool.update(ingredient_params)
    if tool.save
      redirect_to root_path
    else
      render 'edit'
    end
  end

  def destroy
    @tool.destroy
    redirect_to tools_path
  end

  private

  def set_tool
    @tool = Tool.find(params[:id])
    authorize @tool
  end
  def tool_params
    params.require(:tool).permit(:name, :description)
  end

  def recipe_params
    params.require(:tool).permit(:recipe_id)
  end
end
