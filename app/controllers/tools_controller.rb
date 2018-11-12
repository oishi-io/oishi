class ToolsController < ApplicationController
  before_action :set_tool, only: [:edit, :update, :destroy]

  def create
    @tool = Tool.new(tool_params)
    authorize @tool
    @tool.save
    respond_to do |format|
      format.json { render json: { tool: @tool }, status: 200 }
      format.html { redirect_to tools_path }
    end
  end

  def new
    @tool = Tool.new
    authorize @tool
  end

  def edit; end

  def index
    policy_scope(Tool)
    tools = Tool.all.order(:name)
    authorize tools
    gon.tools = tools
  end

  def update
    @tool.update(tool_params)
    if @tool.save
      redirect_to tools_path
    else
      render 'edit'
    end
  end

  def destroy
    @tool.destroy
    head :ok
  end

  private

  def set_tool
    @tool = Tool.find(params[:id])
    authorize @tool
  end

  def tool_params
    params.require(:tool).permit(:name, :description)
  end
end
