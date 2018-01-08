class TagsController < ApplicationController
  before_action :set_tag, only: [:destroy]
  def create
    @tag = Tag.new(name: params[:name])
    authorize @tag
    @tag.save
    render json: { tag: @tag }, status: 200
  end

  def destroy
    @tag.destroy
    redirect_to tags_path
  end

  private

  def set_tag
    @tag = Tag.find(params[:id])
    authorize @tag
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
