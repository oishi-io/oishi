class ToolsController < ApplicationController
  before_action :set_tool, only: [:edit, :show, :update, :destroy]
  def create
    @tool = Tool.new(name: params[:name])
    authorize @tool
    @tool.save
    render json: { tool: @tool }, status: 200
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
