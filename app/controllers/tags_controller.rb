class TagsController < ApplicationController
  before_action :set_tag, only: [:edit, :update, :destroy]

  def index
    @tags = policy_scope(Tag)
    @tags = Tag.all
    authorize @tags
  end

  def create
    @tag = Tag.new(tag_params)
    authorize @tag
    @tag.save
    render json: { tag: @tag }, status: 200
  end

  def new
    @tag = Tag.new
    authorize @tag
  end

  def destroy
    @tag.destroy
    redirect_to tags_path
  end

  def update
    @tag.update(tag_params)
    if @tag.save
      redirect_to tags_path
    else
      render 'edit'
    end
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
